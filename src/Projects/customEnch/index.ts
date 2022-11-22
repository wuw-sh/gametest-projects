import {
    EffectType,
    Entity,
    EntityInventoryComponent,
    Items,
    ItemStack,
    MinecraftEffectTypes,
    MolangVariableMap,
    Player,
    world
} from "mojang-minecraft"
import {API} from "../API/index.js";

const efType = MinecraftEffectTypes
const findTag = (player: Player, tag: string) => player.getTags().filter(x => x.startsWith('ench:')).find(x => x.includes(tag)) ?? ''
const addEffect = (player: Player, effect: EffectType, amplifier: number) => player.addEffect(effect, 6000, amplifier, false)
const removeEffect = (player: Player, effect: EffectType) => player.runCommand(`effect @s ${effect.getName()} 0 0 false`)
const customEnch = [
    {
        id: 'speed',
        name: "Speed",
        call: (player: Player) => {
            return {
                add: (amplifier: number) => addEffect(player, efType.speed, amplifier),
                remove: () => removeEffect(player, efType.speed)
            }
        }
    },
    {
        id: 'jump',
        name: "Jump",
        call: (player: Player) => {
            return {
                add: (amplifier: number) => addEffect(player, efType.jumpBoost, amplifier),
                remove: () => removeEffect(player, efType.jumpBoost)
            }
        }
    },
    {
        id: 'water_damage',
        name: "Water Damage",
        call: (player: Player) => {
            return {
                add: (amplifier: number) => player.addTag(`ench:water_damage ${amplifier * 4}`),
                remove: () => player.removeTag(findTag(player, 'water_damage'))
            }
        }
    },
    {
        id: 'fire_damage',
        name: "Fire Damage",
        call: (player: Player) => {
            return {
                add: (amplifier: number) => player.addTag(`ench:fire_damage ${amplifier * 4}`),
                remove: () => player.removeTag(findTag(player, 'fire_damage'))
            }
        }
    },
    {
        id: 'winter_damage',
        name: "Winter Damage",
        call: (player: Player) => {
            return {
                add: (amplifier: number) => player.addTag(`ench:winter_damage ${amplifier * 4}`),
                remove: () => player.removeTag(findTag(player, 'winter_damage'))
            }
        }
    }
]

const cmds = {
    help: {
        name: 'help',
        alias: '?',
        desc: 'Shows a list of commands and help.',
        usage: ['-help [Command: CommandName]'],
        header: (txt: string) => `§2--- Showing ${txt} §2command ---\n§f`
    },
    enchantList: {
        name: 'enchantList',
        alias: 'enchL',
        desc: 'Shows a list of custom enchantments name.',
        usage: ['-enchantList']
    },
    enchant: {
        name: 'enchant',
        alias: 'ench',
        desc: 'Adds an custom enchantment to a player\'s selected item.',
        usage: [
            '-enchant <enchantmentName: Custom Enchant> [amplifier: Integer (1-255)]',
            '-enchant <enchantmentName: Custom Enchant> [amplifier: Roman numeral (I-CCLV)]'
        ]
    }
}

world.events.beforeChat.subscribe(chat => {
    let msg = chat.message
    if (msg.startsWith('-')) {
        const pl = chat.sender
        const args = msg.substring(1).split(' ')
        const cEnch = customEnch.sort((a, b) => a.id < b.id ? -1 : a.id > b.id ? 1 : 0)
        const help = cmds.help
        const enchL = cmds.enchantList
        const ench = cmds.enchant
        const helpMsg = (header: string, cmd: { usage: string[]; name: string; alias: string; desc: string }) => API.sendMessage(pl, `${help.header(`help §e${header}`)}§eCommand§7: §f${cmd.name}\n§eAlias§7: §f${cmd.alias}\n§eDescription§7: §f${cmd.desc}\n§eUsage§7:§f\n${cmd.usage.map(x => `   ${x}`).join('\n')}`)
        if (args[0] === help.name || args[0] === help.alias) {
            chat.cancel = true
            if (args[1] === enchL.name || args[1] === enchL.alias) {
                return helpMsg('enchantList', enchL)
            } else if (args[1] === ench.name || args[1] === ench.alias) {
                return helpMsg('enchant', ench)
            }
            API.sendMessage(pl, `${help.header('list (3)')}   §f-${help.name}[§bAlias§e: §a${help.alias}§f] §7${help.usage} - ${help.desc}\n   §f-${enchL.name}[§bAlias§e: §a${enchL.alias}§f] §7- ${enchL.desc}\n   §f-${ench.name}[§bAlias§e: §a${ench.alias}§f] §7${ench.usage[0]} - ${ench.desc}\n   §f-${ench.name}[§bAlias§e: §a${ench.alias}§f] §7${ench.usage[1]} - ${ench.desc}`)
        } else if (args[0] === enchL.name || args[0] === enchL.alias) {
            chat.cancel = true
            API.sendMessage(pl, `§b--- Showing list of custom enchantments ---\n§f${cEnch.map(e => `§e- §f${e.id} §7(${e.name})`).join('\n')}`)
        } else if (args[0] === ench.name || args[0] === ench.alias) {
            chat.cancel = true
            if (!args[1] || !args[2]) return helpMsg('enchant', ench)
            const inv = (pl.getComponent('minecraft:inventory') as EntityInventoryComponent).container
            const item = inv.getItem(pl.selectedSlot)
            if (!item) return API.sendMessage(pl, '§cYou must have an item selected.')
            const enchId = args[1]
            if (!enchId || !cEnch.find(ench => ench.id === enchId)) return API.sendMessage(pl, `§cInvalid §denchantment id§c\nAt: "-${args[0]} >>${typeof enchId === 'undefined' ? '' : enchId}<<"\nUsage:\n   ${ench.usage[0]}\n   ${ench.usage[1]}`)
            const amplifier = parseInt(args[2]) ? romanToInt(parseInt(args[2])) : romanToInt(args[2])
            if (!amplifier || (amplifier < 1 || amplifier > 255)) return API.sendMessage(pl, `§cInvalid §bamplifier§c\nAt: "-${args[0]} ${enchId} >>${typeof args[2] === 'undefined' ? '' : args[2]}<<"\nUsage:\n   ${ench.usage[0]}\n   ${ench.usage[1]}`)

            const newItem = new ItemStack(Items.get(item.id), 1, 0)
            if (!item.nameTag) {
                newItem.nameTag = `§b${titleCase(item.id, true, 0)}\n§7${titleCase(enchId, false, 0)} ${intToRoman(amplifier)}`
            } else if (item.nameTag.includes('\n')) {
                const enchs = item.nameTag.split('\n').splice(1)
                const checkEnch = enchs.find(e => e.includes(titleCase(enchId, false, 0)))
                const newEnch = `§7${titleCase(enchId, false, 0)} ${intToRoman(amplifier)}`
                if (checkEnch === newEnch) return API.sendMessage(pl, '§cThis item already has this enchantment.')
                if (checkEnch) enchs.splice(enchs.indexOf(checkEnch), 1)
                newItem.nameTag = `§b${titleCase(item.id, true, 0)}\n${enchs.join('\n')}\n§7${newEnch}`
            }
            inv.setItem(pl.selectedSlot, newItem)
        }
    }
})

API.onItemChangeSlot(data => {
    const pl = data.player
    const oIt = data.oldItem
    const nIt = data.newItem
    const oSl = data.oldSlot
    const nSl = data.newSlot
    const rainbow = '§c--§6--§e--§a--§b--§d--§9--§9--§d--§b--§a--§e--§6--§c--'
    const current = `§e(${nSl})§bCurrent Slot: §f${nIt?.id ?? '§cUndefined'}`
    const old = `§e(${oSl})§7Olded Slot: §f${oIt?.id ?? '§cUndefined'}`
    const sortSlot = [current, old].sort((a, b) => b.length - a.length)
    API.sendMessage(pl, `${rainbow}\n${old}\n${' '.repeat(sortSlot[0].length / 2)}§aTo\n${current}`)
    customEnch.forEach(cEnch => cEnch.call(pl).remove())
})

world.events.tick.subscribe(() => {
    Array.from(world.getPlayers()).map(pl => {
        let item = (pl.getComponent('minecraft:inventory') as EntityInventoryComponent).container.getItem(pl.selectedSlot)
        if (!item || !item.nameTag) return
        item.nameTag.split('\n').map((line, i) => {
            if (i === 0) return
            const roman = line.slice(line.lastIndexOf(' ') + 1)
            const amplifier = romanToInt(roman)
            customEnch.map(cEnch => {
                if (line.includes(cEnch.name)) {
                    cEnch.call(pl).add(amplifier - 1)
                }
            })
        })
    })
})
world.events.entityHit.subscribe(data => {
    try {
        if (data.hitBlock) return
        const attacker = data.entity as Player
        const getTags = attacker.getTags().filter(tag => tag.startsWith('ench:') && tag.includes('damage'))
        if (getTags.length === 0) return
        const damager = data.hitEntity as Entity
        const damage = (tag: string) => damager.runCommand(`damage @s ${findTag(attacker, tag).split(' ')[1]} entity_attack entity ${attacker.nameTag}`)
        const particle = (particleName: string) => damager.dimension.spawnParticle(particleName, damager.location, new MolangVariableMap())
        getTags.map(tag => {
            if (tag.includes('ench:water_damage')) {
                damage('ench:water_damage')
                particle('minecraft:water_splash_particle')
            }
            if (tag.includes('ench:fire_damage')) {
                damage('ench:fire_damage')
                particle('minecraft:candle_flame_particle')
            }
            if (tag.includes('ench:winter_damage')) {
                damage('ench:winter_damage')
                particle('minecraft:huge_explosion_emitter')
            }
        })
    } catch (e) {
    }
})

function romanToInt(roman: string | number) {
    if (typeof roman === 'undefined') return NaN
    if (typeof roman === 'number') return roman
    const romanHash = {
        I: 1,
        V: 5,
        X: 10,
        L: 50,
        C: 100,
        D: 500,
        M: 1000
    };
    let num = 0;
    for (let i = 0; i < roman.length; i++) {
        if (roman[i] === "I" && roman[i + 1] === "V") {
            num += 4;
            i++;
        } else if (roman[i] === "I" && roman[i + 1] === "X") {
            num += 9;
            i++;
        } else if (roman[i] === "X" && roman[i + 1] === "L") {
            num += 40;
            i++;
        } else if (roman[i] === "X" && roman[i + 1] === "C") {
            num += 90;
            i++;
        } else if (roman[i] === "C" && roman[i + 1] === "D") {
            num += 400;
            i++;
        } else if (roman[i] === "C" && roman[i + 1] === "M") {
            num += 900;
            i++;
        } else {
            // @ts-ignore
            num += romanHash[roman[i]];
        }
    }
    return num;
}

function intToRoman(num: number) {
    let lookup = {M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1},
        roman = '', i;
    for (i in lookup) {
        // @ts-ignore
        while (num >= lookup[i]) {
            roman += i;
            // @ts-ignore
            num -= lookup[i];
        }
    }
    return roman;
}

function titleCase(item: string, split = true, index = 0, joiner = ' ') {
    const splitStr = split ? item.toLowerCase().split(':')[1].split('_') : item.toLowerCase().split('_')
    for (let i = index; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(joiner);
}