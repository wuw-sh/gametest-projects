import {world} from "mojang-minecraft";
import {checkPoint} from "../index.js";

world.events.tick.subscribe(() => {
    Array.from(world.getPlayers()).map(pl => checkPoint(pl))
})