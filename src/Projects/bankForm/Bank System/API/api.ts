import {Player, world} from "../index.js";

export class api {
    private oldTag: Map<Player, string[]> = new Map();
    private ignoreNextAddFor: Player[] = []

    executeCommand(pl: Player, cmd: string | Boolean = !1) {
        try {
            let r = pl.runCommand(String(cmd));
            return {
                statusMessage: r.statusMessage,
                err: !1
            }
        } catch (r) {
            return {
                statusMessage: String(r),
                err: !0
            }
        }
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
        return cmd.err ? 0 : parseInt(String((r = cmd.statusMessage) == null ? void 0 : r.split(" ")[1]), 10)
    }

    sendMessage(pl: Player, msg: string): void {
        this.executeCommand(pl, `tellraw @s {"rawtext":[{"text":"${msg.replace(/"/g, '\\"')}"}]}`)
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
            () => {this.ignoreNextAddFor = this.ignoreNextAddFor.filter(m => m !== pl); this.oldTag.delete(pl)}
        }
    }
}

export let API = new api()
