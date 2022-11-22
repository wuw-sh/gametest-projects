import {world} from "mojang-minecraft";

world.events.tick.subscribe(() => {
    Array.from(world.getPlayers()).map(pl => {
        const arrows = Array.from(world.getDimension(pl.dimension.id).getEntities()).filter(e => e.id !== 'minecraft:player')
        const mapArrows = arrows.map(function (e, i) {
            const v = e.velocity
            const speed = Math.sqrt((v.x ** 2) + (v.y ** 2) + (v.z ** 2))
            const pos = {x: ~~e.location.x, y: ~~e.location.y, z: ~~e.location.z}
            return {
                text: `§7(§f${i}§7) §7[§8X§b${pos.x}§f, §8Y§c${pos.y}§f, §8Z§a${pos.z}§7]§d: §e${speed.toFixed(3)} §7block/s`,
                speed: speed
            }
        }).sort((a, b) => b.speed - a.speed).map(x => x.text).join('\n')
        pl.runCommand('title @s actionbar ' + mapArrows)
    });
})