import {Player, world} from "mojang-minecraft";

const gacha = [
    {
        id: 'I',
        percent: 10,
    },
    {
        id: 'Here',
        percent: 20,
    },
    {
        id: 'Too',
        percent: 70,
    }
]
world.events.itemUse.subscribe(data => {
    const pl = data.source as Player
    if (data.item.id === 'minecraft:compass') {
        const rnd = Math.floor(Math.random() * 100)
        const item = gacha.find(i => 71 < i.percent);
        if (item) {
            pl.runCommand(`say You got ${item.id}!`);
        } else {
            pl.runCommand(`say You got nothing!`);
        }
    }
})