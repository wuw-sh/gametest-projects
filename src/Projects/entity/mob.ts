import {BlockLocation} from 'mojang-minecraft'

const ETData = {
    huskData: [
        {
            id: 'minecraft:husk',
            count: 5,
            delay: 100,
            dimension: 'overworld',
            location: new BlockLocation(0, -60, 0)
        },
        {
            id: 'minecraft:husk',
            count: 10,
            delay: 100,
            dimension: 'overworld',
            location: new BlockLocation(5, -60, 5)
        }
    ],
    zombieData: [
        {
            id: 'minecraft:zombie',
            count: 2,
            delay: 50,
            dimension: 'overworld',
            location: new BlockLocation(-5, -60, -5)
        },
        {
            id: 'minecraft:zombie',
            count: 1,
            delay: 50,
            dimension: 'overworld',
            location: new BlockLocation(-5, -60, 5)
        }
    ]
}
export const entityData = [ETData.huskData, ETData.zombieData]