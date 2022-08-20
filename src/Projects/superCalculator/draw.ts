import {BlockLocation, BlockType, MinecraftBlockTypes, MinecraftDimensionTypes, Vector, world} from "mojang-minecraft";
import {Symbols} from "./index.js"

export let calScreen: string = ""

export function setCalScreen(str: string) {
    calScreen = str
}

const blLo = BlockLocation

export function draw(input: string, y: number) {
    const dim = world.getDimension(MinecraftDimensionTypes.overworld);
    const blType = MinecraftBlockTypes
    let blockStart: Vector = new Vector(0, y, 37)
    const mapStr = [...Array(input.length).keys()]
    const arr = [...Array(500).keys()]
    const arr1 = [...Array(9).keys()]
    arr.forEach(i => {
        arr1.forEach(ii => {
            dim.getBlock(new blLo(250 - i, blockStart.y - ii + 1, blockStart.z)).setPermutation(blType.air.createDefaultBlockPermutation())
        })
    })
    arr.forEach(i => {
        arr1.forEach(ii => {
            dim.getBlock(new blLo(250 - i, blockStart.y - ii + 1, blockStart.z + 1)).setPermutation(blType.air.createDefaultBlockPermutation())
        })
    })
    let spacebar = 0
    mapStr.forEach(i => {
        const charStr = input.charAt(i)
        Symbols.isSymbols(charStr)
        spacebar = spacebar + Symbols.isSpace(charStr)
        blockStart.x = Math.floor(spacebar / 2)
    })
    let spacebar1 = 0
    mapStr.forEach(i => {
        const charStr = input.charAt(i)
        Symbols.isSymbols(charStr).forEach((e, ii) => {
            const setBlock = (location: BlockLocation, block: BlockType) => dim.getBlock(location).setPermutation(block.createDefaultBlockPermutation())
            //world.getDimension(MinecraftDimensionTypes.overworld).runCommand(`/setblock`)
            e.forEach((ee, iii) => {
                const lo = new blLo(blockStart.x - spacebar1 - iii, blockStart.y, blockStart.z)
                setBlock(new blLo(lo.x - 1, lo.y + 1, lo.z), blType.redstoneLamp)
                //runCommand(`setblock ${(blockStart.x - (i * 2)) - iii} ${blockStart.y - ii} ${blockStart.z} redstone_block`)
                setBlock(new blLo(lo.x, lo.y + 1, lo.z), blType.redstoneLamp)
                //runCommand(`setblock ${(blockStart.x - (i * 2)) - iii} ${blockStart.y - ii} ${blockStart.z} redstone_block`)
                setBlock(new blLo(lo.x - 1, lo.y - 7, lo.z), blType.redstoneLamp)
                //runCommand(`setblock ${(blockStart.x - (i * 2)) - iii} ${blockStart.y - ii} ${blockStart.z} redstone_block`)
                setBlock(new blLo(lo.x, lo.y - 7, lo.z), blType.redstoneLamp)
                //runCommand(`setblock ${(blockStart.x - (i * 2)) - iii} ${blockStart.y - ii} ${blockStart.z} redstone_block`)
                setBlock(new blLo(lo.x - 1, lo.y - ii, lo.z), blType.redstoneLamp)
                //runCommand(`setblock ${(blockStart.x - (i * 2)) - iii} ${blockStart.y - ii} ${blockStart.z} redstone_block`)
                if (ee === true) {
                    setBlock(new blLo(lo.x, lo.y - ii, lo.z), blType.litRedstoneLamp)
                    setBlock(new blLo(lo.x, lo.y - ii, lo.z + 1), blType.redstoneBlock)
                } else {
                    setBlock(new blLo(lo.x, lo.y - ii, lo.z), blType.redstoneLamp)
                    //runCommand(`setblock ${(blockStart.x - (i * 2)) - iii} ${blockStart.y - ii} ${blockStart.z} redstone_block`)
                }
            })
        })
        spacebar1 = spacebar1 + Symbols.isSpace(charStr)
    })
    console.warn(input)
}
