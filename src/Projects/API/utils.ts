import {EntityInventoryComponent, ItemStack, Player, world} from "mojang-minecraft";

export function executeCommand(pl: Player, command: string): { err: boolean, errCode: number, statusMsg: string } {
    try {
        const cmd = pl.runCommand(command)
        return {err: false, errCode: 0, statusMsg: cmd.statusMessage}
    } catch (e) {
        const cmd = pl.runCommand(command)
        return {err: true, errCode: cmd.statusCode, statusMsg: cmd.statusMessage}
    }
}

export function sendMessage(pl: Player, message: string) {
    pl.runCommand('tellraw @s ' + JSON.stringify({rawtext: [{text: message}]}))
}

export function rawtext(text: string): string {
    return JSON.stringify({rawtext: [{text}]})
}

export type Awaitable<T> = T | PromiseLike<T>

interface onItemChangeSlotEvent {
    player: Player
    oldItem: ItemStack | undefined
    newItem: ItemStack | undefined
    oldSlot: number | undefined
    newSlot: number | undefined
}

export function onItemChangeSlot(callback: (arg: onItemChangeSlotEvent) => void): void {
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
                return () => {oldItem.set(pl, item); oldSlot.set(pl, slot)}
            }
            if (oldItem.get(pl) !== item && !item) {
               callbackFunc()
                return () => {oldItem.set(pl, item); oldSlot.set(pl, slot)}
            }
            if (!oldItem.has(pl)) oldItem.set(pl, item)
            if (!oldSlot.has(pl)) oldSlot.set(pl, slot)
            if (oldItem.get(pl)?.id === item?.id && oldSlot.get(pl) === slot) return
            if (oldItem.get(pl) !== item) {
                callbackFunc()
                return () => {oldItem.set(pl, item); oldSlot.set(pl, slot)}
            }
        }
    })
}

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