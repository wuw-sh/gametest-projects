import {EntityHealthComponent, Location, world} from 'mojang-minecraft';

world.events.entityHurt.subscribe(data => {
    const target = data.hurtEntity
    const dm = data.damage
    const hp = (target.getComponent("minecraft:health") as EntityHealthComponent)
    target.dimension.spawnEntity("nn:dmgtext", new Location(target.location.x + random(-1, 1.5), target.location.y + random(1, 1.6), target.location.z + random(-1, 1))).nameTag = `-§c${dm} §b[${Math.ceil(hp.current)}]`
    // @ts-ignore
    target["dif"] = hp.current
})
world.events.tick.subscribe(() => {
    let pls = world.getPlayers();
    for (let pl of pls) {
        let ets = pl.dimension.getEntities();
        Array.from(ets).filter(e => e.id !== 'nn:dmgtext' && e.hasComponent('minecraft:health')).map(e => {
            // @ts-ignore
            let dif = e["dif"] as number
            if (!dif) return
            const hp = (e.getComponent("minecraft:health") as EntityHealthComponent)
            if (dif === hp.current) return
            if (hp.current - dif < 0) return
            e.dimension.spawnEntity("nn:dmgtext", new Location(e.location.x + random(-1, 1.5), e.location.y + random(1, 1.6), e.location.z + random(-1, 1))).nameTag = `§a+${~~hp.current - dif} §b[${Math.ceil(hp.current)}]`
            // @ts-ignore
            e["dif"] = hp.current
        });
    }
});

function random(min: number, max: number) {
    return Math.random() * (max - min) + min;
}