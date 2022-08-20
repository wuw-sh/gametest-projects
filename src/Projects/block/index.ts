import {world} from 'mojang-minecraft'
import {Timers} from "../API/index.js";

const timers = new Timers();
timers.start()
world.events.blockBreak.subscribe(data => {
    const pl = data.player
    const bl = data.block
    const dim = data.dimension
    const blPerm = data.brokenBlockPermutation
    const blId = blPerm.type.id
    const blpos = Math.floor(bl.location.x) + ' ' + Math.floor(bl.location.y) + ' ' + Math.floor(bl.location.z)
    const block = [
        {
            id: 'minecraft:coal_ore',
            time: 150
        },
        {
            id: "minecraft:iron_ore",
            time: 300
        }
    ]
    const blCheck = block.find(b => b.id === blId)
    if (blCheck) {
        pl.runCommand(`setblock ${blpos} stone`)
        timers.setTimeout(() => {
            pl.runCommand(`setblock ${blpos} ${blCheck.id}`)
        }, blCheck.time);
    } else if (blId === 'minecraft:stone') {
        bl.setPermutation(blPerm)
    }
})