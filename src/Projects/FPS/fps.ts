import {world} from "mojang-minecraft";

const fpsMap = new Map<string, { fpsArr: number[], fps: number }>()
world.events.itemUseOn.subscribe(() => {
    [...world.getPlayers()].map(pl => {
        if (!fpsMap.get(pl.name)) {
            fpsMap.set(pl.name, {fpsArr: [], fps: 0})
        }
        fpsMap.get(pl.name)?.fpsArr.push(new Date().getTime());
    })
})
world.events.tick.subscribe(({currentTick}) => {
    [...world.getPlayers()].map(pl => {
        if (currentTick % 20 === 0) {
            let getFps = fpsMap.get(pl.name)?.fpsArr ?? []
            const now = Date.now()
            getFps = getFps.filter(t => now - t < 1000)
            getFps.push(now)
            fpsMap.set(pl.name, {fpsArr: fpsMap.get(pl.name)?.fpsArr ?? [], fps: getFps.length - 1})
        }
        const fps = fpsMap.get(pl.name)?.fps ?? 0
        pl.runCommand('title @s actionbar FPS: ' + fps)
        if (fps === 0) {
            fpsMap.delete(pl.name)
        }
    })
})