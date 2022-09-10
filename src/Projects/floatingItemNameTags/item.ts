import {Entity, EntityItemComponent, Player, world} from "mojang-minecraft";

/**
 * gets a entitys itemStack nameTag
 * @param {Entity} entity entity to get from
 * @returns {String}
 */
function getEntitysItemName(entity: Entity): string {
    try {
        const cmd = entity.runCommand("testfor @s");
        return cmd.victim[0];
    } catch (error) {
        return (entity.getComponent("item") as unknown as EntityItemComponent).itemStack.id;
    }
}

world.events.tick.subscribe(() => {
    Array.from(world.getDimension('overworld').getEntities()).filter(e => e.id === 'minecraft:item').map(entity => {
        /**
         * @type {ItemStack}
         */
        const ItemStack = (entity.getComponent("item") as unknown as EntityItemComponent).itemStack;
        entity.nameTag = `§e${ItemStack.amount}x§r ${getEntitysItemName(entity)}`;
        const et = Array.from(entity.dimension.getEntities()).filter(e => !entity.location.equals(e.location) && entity.location.isNear(e.location, 1) && e.id === entity.id)
        Array.from(world.getPlayers()).forEach(pl => {
            pl.runCommand('title @s actionbar ' + et.map(e => getEntitysItemName(e)).join('\n'))
        })
    });
})