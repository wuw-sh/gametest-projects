import {BlockLocation, Location, MinecraftBlockTypes, MinecraftDimensionTypes, Player, world} from 'mojang-minecraft'
import {API} from "../API/index.js";

world.events.itemUseOn.subscribe(data => {
    const pl = data.source instanceof Player ? data.source : null;
    if (!pl) return;
    const blLo = data.blockLocation;
    const bl = pl.dimension.getBlock(blLo)
    const vector = new Location(blLo.x, blLo.y, blLo.z)
    pl.runCommand('say ' + vector.x + ' ' + vector.y + ' ' + vector.z)
    const allBlock = Object.keys(MinecraftBlockTypes)
    const getAllStair = allBlock.filter(key => key.endsWith('Stairs'))
    const getAllSlab = allBlock.filter(key => key.endsWith('Slab') || key.endsWith('Slab2') || key.endsWith('Slab3') || key.endsWith('Slab4'))
    const itemId = titleCase(bl.id, 1)
    const checkStair = getAllStair.find(x => x === itemId)
    const checkSlab = getAllSlab.find(x => x === itemId)
    const testEt = !API.executeCommand(pl, `testfor @e[type=sit:sit,c=1,tag=${pl.name}]`).err
    if (!(checkStair || checkSlab) && pl.hasTag('sit') && testEt) return;
    const dim = pl.dimension
    const rot = pl.rotation
    pl.teleport(vector, dim, rot.x, rot.y, true)
    world.getDimension(dim.id).spawnEntity('sit:sit', vector).addTag(pl.name)
    API.executeCommand(pl, `ride @s start_riding @e[type=sit:sit,c=1,tag=${pl.name}] teleport_rider`)
})
world.events.tick.subscribe(() => {
    try {
        Object.keys(MinecraftDimensionTypes).forEach(dim => {
            Array.from(world.getDimension(dim).getEntities()).filter(e => e.id === 'sit:sit').map(e => {
                const etLo = e.location
                const pos = {x: etLo.x, y: etLo.y, z: etLo.z}
                const checkBlock = world.getDimension(dim).getBlock(new BlockLocation(pos.x, pos.y, pos.z)).id === 'minecraft:air'
                if (checkBlock) {
                    e.triggerEvent('despawn')
                }
                if (e.getTags().length === 0) {
                    e.triggerEvent('despawn')
                }
            })
        })
    } catch (e) {
    }
})

function titleCase(itemId: string, index = 0, joiner = '') {
    const splitStr = itemId.toLowerCase().split(':')[1].split('_');
    for (let i = index; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(joiner);
}