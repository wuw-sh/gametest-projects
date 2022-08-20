import {BlockLocation, MinecraftDimensionTypes, Player, world} from "mojang-minecraft";
import {calScreen, draw, setCalScreen} from "./draw.js";

const basicMath = ['+', '-', '*', '/', '^', '√']

world.events.buttonPush.subscribe(data => {
    const pl = data.source as Player;
    const blPos = data.block.location
    const blLo = BlockLocation
    const numPad = [
        new blLo(-8, 50, -2),//0
        new blLo(-9, 53, -2),//1
        new blLo(-8, 53, -2),//2
        new blLo(-7, 53, -2),//3
        new blLo(-9, 52, -2),//4
        new blLo(-8, 52, -2),//5
        new blLo(-7, 52, -2),//6
        new blLo(-9, 51, -2),//7
        new blLo(-8, 51, -2),//8
        new blLo(-7, 51, -2),//9
    ]
    const Delete = new blLo(-8, 55, -2)
    const Clear = new blLo(-12, 51, -2)
    const Calculate = new blLo(-5, 51, -2)
    const basicMathLo = [
        new blLo(-3, 51, -2),
        new blLo(-2, 51, -2),
        new blLo(-1, 51, -2),
        new blLo(0, 51, -2),
        new blLo(1, 51, -2),
        new blLo(2, 51, -2),
    ]
    if (numPad.find(x => x.equals(blPos))) {
        const num = numPad.findIndex(x => x.equals(blPos))
        setCalScreen(calScreen + num)
        world.getDimension(data.dimension.id).runCommand(`say ${num}`)
        draw(calScreen, 65)
        draw(String(evil(calScreen)), 55)
        world.getDimension(MinecraftDimensionTypes.overworld).runCommand(`say §aAnswer§7: §f${evil(calScreen)}`)
    } else if (Delete.equals(blPos)) {
        setCalScreen(calScreen.substring(0, calScreen.length - 1))
        draw(calScreen, 65)
    } else if (Clear.equals(blPos)) {
        setCalScreen("")
        draw(calScreen, 65)
        draw(String(eval(calScreen)), 55)
    } else if (basicMathLo.find(x => x.equals(blPos))) {
        const math = basicMathLo.findIndex(x => x.equals(blPos))
        setCalScreen(calScreen + basicMath[math])
        draw(calScreen, 65)
    } else if (Calculate.equals(blPos)) {
        //setCalScreen(evil(calScreen))
        draw(calScreen, 65)
        draw(String(evil(calScreen)), 55)
        world.getDimension(MinecraftDimensionTypes.overworld).runCommand(`say §aAnswer§7: §f${evil(calScreen)}`)
    }
})

function evil(fn: string) {
    let a = [...fn]
    let b = a
    let arr = [...Array(a.length).keys()]
    for (let i of arr) {
        if (a[i] == '√') {
            let nums = []
            for (let j of b.splice(i + 1)) {
                if (isNaN(Number(j))) {
                    break
                }
                nums.push(j)
            }
            a[i + 1].replace(nums.join(''), '')
            a[i] = Math.sqrt(Number(nums.join(''))).toString()
        }
    }
    return eval(a.join(''))
}