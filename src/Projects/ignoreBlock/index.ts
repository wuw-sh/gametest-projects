import {BlockComponent, world} from "mojang-minecraft";

world.events.tick.subscribe(() => {
    Array.from(world.getPlayers()).map(pl => {
        pl.runCommand('title @s actionbar ' + Object.keys(BlockComponent).map(k => k).join('\n'));
    })
})

world.events.beforeItemUseOn.subscribe(res => {
    const pl = res.source;
    const bl = pl.dimension.getBlock(res.blockLocation);
    const warn = () => pl.runCommand('say §cYou are not allowed to use this block in this area!');
    const cancel = () => {
        res.cancel = true
        warn();
    }
    if (bl.id.includes('trapdoor')) {
        cancel();
    } else if (bl.id.includes('chest')) {
        cancel();
    } else if (bl.id.includes('gate')) {
        cancel();
    }
});