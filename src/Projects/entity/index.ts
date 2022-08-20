import {world} from 'mojang-minecraft';
import {Timers} from "../API/index.js";
import {entityData} from "./mob";

const timer = new Timers()
timer.start()

try {
    world.events.tick.subscribe(() => {
        entityData.map(ET => {
            ET.map(etData => {
                const getEntities = Array.from(world.getDimension(etData.dimension).getEntities());
                const locationTag = etData.location.x + ':' + etData.location.y + ':' + etData.location.z;
                const entitiesFilter = getEntities.filter(et => (et.id === etData.id) && et.getTags().find(a => a === locationTag))
                const entityCount = entitiesFilter.length;
                if (entityCount < etData.count) {
                    timer.setInterval(() => {
                        world.getDimension(etData.dimension).spawnEntity(etData.id, etData.location).addTag(locationTag);
                    }, etData.delay)
                }
                if (entityCount > etData.count) {
                    for (let i = 0; i < entityCount - etData.count; i++) {
                        entitiesFilter[entitiesFilter.length - 1].kill()
                    }
                }
            })
        })
    })
} catch (e) {
}