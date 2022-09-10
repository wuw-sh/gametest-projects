import {Player, world} from "mojang-minecraft";

world.events.tick.subscribe(() => {
    [...world.getPlayers()].map(pl => {
        CPS.runCPS(pl)
        pl.runCommand('title @s actionbar §eCPS§7: §f' + CPS.getLeft(pl) + ' §7| §f' + CPS.getRight(pl))
    })
})
const cps = new Map<string, {
    cpsArr: { L: number[], R: number[] },
    cps: { L: number, R: number }
}>()

class CPS {
    static get get() {
        return cps
    }

    static runCPS(pl: Player) {
        let getCPS_L = cps.get(pl.name)?.cpsArr.L ?? []
        let getCPS_R = cps.get(pl.name)?.cpsArr.R ?? []
        const now = Date.now()
        const cpsFilter = (cpsArr: number[]) => {
            return cpsArr.filter(t => now - t < 1000)
        }
        getCPS_L = cpsFilter(getCPS_L)
        getCPS_L.push(now)
        getCPS_R = cpsFilter(getCPS_R)
        getCPS_R.push(now)
        const cpsL = getCPS_L.length - 1
        const cpsR = getCPS_R.length - 1
        const cpsArr = cps.get(pl.name)?.cpsArr
        cps.set(pl.name, {
            cpsArr: {L: cpsArr.L ?? [], R: cpsArr.R ?? []},
            cps: {L: cpsL, R: cpsR}
        })
        if (cpsL === 0 || cpsR === 0) {
            cps.delete(pl.name)
        }
    }

    static getLeft(pl: Player): number {
        return cps.get(pl.name)?.cps.L ?? 0
    }

    static getRight(pl: Player): number {
        return cps.get(pl.name)?.cps.R ?? 0
    }

    static clickLeft(pl: Player) {
        if (!cps.get(pl.name)) {
            cps.set(pl.name, {
                cpsArr: {L: new Array<number>(), R: new Array<number>()},
                cps: {L: 0, R: 0}
            });
        }
        cps.get(pl.name)?.cpsArr.L!.push(new Date().getTime());
    }

    static clickRight(pl: Player) {
        if (!cps.get(pl.name)) {
            cps.set(pl.name, {
                cpsArr: {L: new Array<number>(), R: new Array<number>()},
                cps: {L: 0, R: 0}
            });
        }
        cps.get(pl.name)?.cpsArr.R!.push(new Date().getTime());
    }
}

world.events.entityHit.subscribe(data => {
    const pl = data.entity
    if (!(pl instanceof Player)) return
    CPS.clickLeft(pl)
})
world.events.beforeItemUseOn.subscribe(data => {
    const pl = data.source
    if (!(pl instanceof Player)) return
    CPS.clickRight(pl)
})
world.events.blockPlace.subscribe(data => CPS.clickRight(data.player))
world.events.playerLeave.subscribe(data => {
    CPS.get.delete(data.playerName)
})