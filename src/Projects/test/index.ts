import {world} from "mojang-minecraft";

world.events.tick.subscribe(() => {
    [...world.getPlayers()].map(pl => {
        const armor_stand = [...world.getDimension(pl.dimension.id).getEntities()].filter(x => x.id === 'minecraft:armor_stand')[0]
        const p1 = pl
        const p1H = p1.headLocation
        const p2H = armor_stand.headLocation
        const a = ((p1H.y - p2H.y) ** 2) ** 0.5
        const b = (((p1H.x - p2H.x) ** 2) + ((p1H.z - p2H.z) ** 2)) ** 0.5
        const c = ((a ** 2) + (b ** 2)) ** 0.5

        const d = ((p1H.x - p2H.x) ** 2) ** 0.5
        const e = ((p1H.z - p2H.z) ** 2) ** 0.5
        const f = ((d ** 2) + (e ** 2)) ** 0.5
        p1.runCommand(`title @s actionbar Angle X: ${Math.asin(a / c) * 180 / Math.PI}\nAngle Y: ${Math.asin(d / f) * 180 / Math.PI}\nRot X: ${pl.rotation.x}\nRot Y: ${pl.rotation.y}\n${a}\n${b}\n${c}`)
    })
})