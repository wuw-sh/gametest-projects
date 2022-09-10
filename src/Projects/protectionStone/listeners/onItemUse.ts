import {Player, world} from "mojang-minecraft";
import {mainForm} from "../index.js";

world.events.itemUse.subscribe(data => {
    if (!(data.source instanceof Player) || data.item.id !== 'minecraft:paper') return
    const pl = data.source
    mainForm(pl)
})