import {Player, world} from "mojang-minecraft";

world.events.tick.subscribe(() => {
    [...world.getPlayers()].map(pl => {
        CPS.runCPS(pl)
        pl.runCommand('title @s actionbar §eCPS§7: §f' + CPS.getCPS(pl))
    })
})
const cps = new Map<string, { cpsArr: number[], cps: number }>()

class CPS {

    static get get() {
        return cps
    }

    static runCPS(pl: Player) {
        let getCPS = cps.get(pl.name)?.cpsArr ?? []
        const now = Date.now()
        getCPS = getCPS.filter(t => now - t < 1000)
        getCPS.push(now)
        cps.set(pl.name, {cpsArr: cps.get(pl.name)?.cpsArr ?? [], cps: getCPS.length - 1})
        if (getCPS.length - 1 === 0) {
            cps.delete(pl.name)
        }
    }

    static getCPS(pl: Player): number {
        return cps.get(pl.name)?.cps ?? 0
    }

    static click(pl: Player) {
        if (!cps.get(pl.name)) {
            cps.set(pl.name, {cpsArr: new Array<number>(), cps: 0});
        }
        cps.get(pl.name)?.cpsArr!.push(new Date().getTime());
        return
    }
}
world.events.blockPlace.subscribe(data => CPS.click(data.player))
world.events.entityHit.subscribe(t => {
    const pl = t.entity
    if (!(pl instanceof Player)) return
    CPS.click(pl)
})
world.events.playerLeave.subscribe(data => {
    CPS.get.delete(data.playerName)
})