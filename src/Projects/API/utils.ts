import {EntityInventoryComponent, ItemStack, Player, world} from "mojang-minecraft";

interface onItemChangeSlotEvent {
    player: Player
    oldItem: ItemStack | undefined
    newItem: ItemStack | undefined
    oldSlot: number | undefined
    newSlot: number | undefined
}

export type Awaitable<T> = T | PromiseLike<T>

class api {
    private oldTag: Map<Player, string[]> = new Map();
    private ignoreNextAddFor: Player[] = []

    executeCommand(pl: Player, command: string): { err: boolean, errCode: number, statusMsg: string } {
        try {
            const cmd = pl.runCommand(command)
            return {err: false, errCode: 0, statusMsg: cmd.statusMessage}
        } catch (e) {
            const cmd = pl.runCommand(command)
            return {err: true, errCode: cmd.statusCode, statusMsg: cmd.statusMessage}
        }
    }

    sendMessage(pl: Player, message: string) {
        pl.runCommand('tellraw @s ' + JSON.stringify({rawtext: [{text: message}]}))
    }

    rawtext(text: string): string {
        return JSON.stringify({rawtext: [{text}]})
    }


    onItemChangeSlot(callback: (arg: onItemChangeSlotEvent) => void): void {
        let oldItem = new Map<Player, ItemStack>()
        let oldSlot = new Map<Player, number>()
        world.events.tick.subscribe(() => {
            for (const pl of world.getPlayers()) {
                const slot = pl.selectedSlot
                let item = (pl.getComponent('minecraft:inventory') as EntityInventoryComponent).container.getItem(slot)
                const callbackFunc = () => callback({
                    player: pl,
                    oldItem: oldItem.get(pl),
                    newItem: item,
                    oldSlot: oldSlot.get(pl),
                    newSlot: slot
                })
                if (!oldItem.has(pl) && item) {
                    callbackFunc()
                    return () => {
                        oldItem.set(pl, item);
                        oldSlot.set(pl, slot)
                    }
                }
                if (oldItem.get(pl) !== item && !item) {
                    callbackFunc()
                    return () => {
                        oldItem.set(pl, item);
                        oldSlot.set(pl, slot)
                    }
                }
                if (!oldItem.has(pl)) oldItem.set(pl, item)
                if (!oldSlot.has(pl)) oldSlot.set(pl, slot)
                if (oldItem.get(pl)?.id === item?.id && oldSlot.get(pl) === slot) return
                if (oldItem.get(pl) !== item) {
                    callbackFunc()
                    return () => {
                        oldItem.set(pl, item);
                        oldSlot.set(pl, slot)
                    }
                }
            }
        })
    }

    addScore(pl: Player, objective: string, value: number) {
        return this.executeCommand(pl, `scoreboard players add @s ${objective} ${value}`)
    }

    removeScore(pl: Player, objective: string, value: number) {
        return this.executeCommand(pl, `scoreboard players remove @s ${objective} ${value}`)
    }

    getScore(pl: Player, objective: string): number {
        let r;
        let cmd = this.executeCommand(pl, `scoreboard players test @s "${objective}" * *`);
        return cmd.err ? 0 : parseInt(String((r = cmd.statusMsg) == null ? void 0 : r.split(" ")[1]), 10)
    }

    PlayerArray(): Player[] {
        return Array.from(world.getPlayers())
    }

    AllPlayer(): Map<string, Player> {
        return new Map(Array.from(world.getPlayers()).map(pl => [pl.name, pl]))
    }

    tagUpdate(callback: (pl: Player, tag: string) => void): void {
        for (let [, pl] of this.AllPlayer()) {
            const getTag = pl.getTags()
            let i
            if (!this.oldTag.has(pl)) {
                this.oldTag.set(pl, getTag);
                continue
            }
            for (let tag of getTag) {
                if (!((i = this.oldTag.get(pl)) === null ? void 0 : i?.find(d => d === tag))) {
                    if (this.ignoreNextAddFor.includes(pl)) {
                        this.ignoreNextAddFor.splice(this.ignoreNextAddFor.indexOf(pl), 1);
                        continue
                    }
                    callback(pl, tag)
                }
            }
            this.oldTag.set(pl, getTag)
        }
        for (let [pl] of this.oldTag) try {
            pl.id
        } catch (n) {
            () => {
                this.ignoreNextAddFor = this.ignoreNextAddFor.filter(m => m !== pl);
                this.oldTag.delete(pl)
            }
        }
    }
}
export const API = new api
// export function getScore(objective: string, target: Player, useZero = false) {
//     try {
//         const obj = world.scoreboard.getObjective(objective);
//         if (typeof target == 'string') {
//             return obj.getScore(obj.getParticipants().find(v => v.displayName === target));
//         }
//         return obj.getScore(target.scoreboard);
//     } catch {
//         return useZero ? 0 : NaN;
//     }
// }