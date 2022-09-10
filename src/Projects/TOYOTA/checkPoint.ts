import {BlockLocation, Player, world} from "mojang-minecraft";

export function checkPoint(pl: Player) {
    const getpcpTag = pl.getTags().filter(tag => tag.includes('pcp|'))
    const lo = pl.location
    const pcpTag = `pcp|${(~~lo.x) + 0.5}:${~~lo.y}:${(~~lo.z) + 0.5}`
    const pos1 = pcpTag.split('|')[1].split(':').map(pos => Number(pos))
    const pos = {x: pos1[0], y: pos1[1], z: pos1[2]}
    pl.runCommand('title @s actionbar §aSave Checpoint\n§f' + getpcpTag + '\n' + pcpTag)
    if (getpcpTag.includes(pcpTag)) return;
    const getBlock = world.getDimension(pl.dimension.id).getBlock(new BlockLocation(pos.x, pos.y - 1, pos.z))
    if (getBlock.id === 'minecraft:lodestone') {
        pl.runCommandAsync('say cpc')
        getpcpTag.map(tag => pl.removeTag(tag))
        pl.addTag(pcpTag)
    }
}