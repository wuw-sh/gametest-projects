import {world} from "mojang-minecraft";

// world.events.entityHit.subscribe(data => {
//     const pl = data.entity
//     const speedComp = pl.getComponent('minecraft:movement') as EntityMovementComponent
//     if (speedComp.current === 0.12999999523162842) {
//         speedComp.setCurrent(0.12999999523162842)
//     }
// })
world.events.tick.subscribe(() => {
    [...world.getPlayers()].map(pl => {
        const v = pl.velocity
        const speed = Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z)
        pl.runCommand(`title @s actionbar ${speed}`)
    })
})