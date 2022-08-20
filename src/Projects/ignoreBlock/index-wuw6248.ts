/**
 * Ignore Interaction Block Addon
 * Made by: @wuw.sh
 * Last updated: 03/08/2022
 *
 * Github: https://github.com/wuw-sh
 * Youtube: https://www.youtube.com/channel/UCT940bL6xp9HUJ0toiTkxrQ
 * Omlet Arcade: https://omlet.gg/profile/wuw.sh
 */


/**
 * The callback function for the ignoreInteractionBlock behavior.
 *
 * Edit here
 * vvvvvvvvv
 */
ignoreInteractionBlock(/**warnMessage*/'§cคุณไม่มีสิทธิ์ใช้งานบล๊อกนี้!', /**runCommands*/['playsound note.bassattack', 'say Test cmd2'], /**ignoreTag*/['admin', 'staff'], /**useDelay*/true, /**delay*/20);


/**
 * The Function ignoreInteractionBlock
 * @param {string} warnMessage ข้อความแจ้งเตือนเมื่อผู้เ่ล่นกดบล็อก
 * @param {string[]} runCommands คำสั่งที่จะใหเทำงานเมื่อผู้เ่ล่นกดบล็อก
 * @param {string[]} ignoreTag แท็กที่สามารถเข้าใช้งานบล็อกได้
 * @param {boolean} useDelay=false (ค่าปกติ = false) ต้องการให้มีดีเลในการ ส่งข้อความแจ้งเตือนและทำงานคำสั่ง หรือไม่
 * @param {number} delay=20 (ค่าปกติ = 20) ระยะเวลาที่จะให้ ส่งข้อความแจ้งเตือนและทำงานคำสั่ง โดยใช้ tick ของมายคราฟ ตัวอย่าง delay = 20 คือ 1 วินาที
 * @return {void}
 */
import {EntityInventoryComponent, Player, world} from "mojang-minecraft";

function ignoreInteractionBlock(warnMessage: string, runCommands: string[], ignoreTag: string[], useDelay: boolean = false, delay: number = 20): void {
    const playersWarn = new Map<Player, number>()

    world.events.itemStopUseOn.subscribe(res => {
        const pl = res.source as Player
        const it = (pl.getComponent('inventory') as EntityInventoryComponent).container.getItem(pl.selectedSlot)
        let hasTag = false
        ignoreTag.map(tag => {
            if (pl.hasTag(tag)) return hasTag = true
        })
        if (hasTag) return
        const bl = pl.dimension.getBlock(res.blockLocation)
        const blId = bl.id.replace('minecraft:', '')
        const callCmds = () => runCommands.map(cmd => pl.runCommand(cmd))
        const callWarnMsg = () => pl.runCommand(`tellraw @s ${JSON.stringify({rawtext: [{text: warnMessage}]})}`);
        const cancel = () => {
            if (playersWarn.has(pl)) return
            callWarnMsg()
            callCmds()
            if (!useDelay) return
            playersWarn.set(pl, delay)
        }
    })

    world.events.beforeItemUseOn.subscribe(res => {
        const pl = res.source as Player
        const it = (pl.getComponent('inventory') as EntityInventoryComponent).container.getItem(pl.selectedSlot)
        let hasTag = false
        ignoreTag.map(tag => {
            if (pl.hasTag(tag)) return hasTag = true
        })
        if (hasTag) return
        const bl = pl.dimension.getBlock(res.blockLocation)
        const blId = bl.id.replace('minecraft:', '')
        const callCmds = () => runCommands.map(cmd => pl.runCommand(cmd))
        const callWarnMsg = () => pl.runCommand(`tellraw @s ${JSON.stringify({rawtext: [{text: warnMessage}]})}`);
        const cancel = () => {
            res.cancel = true
            if (playersWarn.has(pl)) return
            callWarnMsg()
            callCmds()
            if (!useDelay) return
            playersWarn.set(pl, delay)
        }
        if (blId.includes('chest')) { //กล่องใส่ของ
            cancel();
        } else if (blId.includes('door')) { //ประตู กับ แทรปประตู
            cancel();
        } else if (blId.includes('gate')) { //รั้ว
            cancel();
        } else if (blId === 'flower_pot') { //กระถางดอกไม้
            cancel();
        } else if (blId === 'anvil') { //ทั่ง
            cancel();
        } else if (blId === 'enchanting_table') { //โต้ะเอนชานท์
            cancel();
        } else if (blId.includes('furnace')) { //เตาเผา
            cancel();
        } else if (blId.includes('crafting_table')) { //โต้ะคราฟ
            cancel();
        } else if (blId === 'brewing_stand') { //ที่ปรุงยา
            cancel();
        } else if (blId === 'lever') { //คันโยก
            cancel();
        } else if (blId.includes('repeater')) { //ตัวทำซ้ำ
            cancel();
        } else if (blId.includes('shulker_box')) { //กล่องชูลเกอร์
            cancel();
        } else if (blId.includes('grindstone')) { //ที่ลบเอนชานท์
            cancel();
        } else if ((blId.includes('log') && !blId.includes('stripped')) && it?.id.includes('_axe')) { //กันปลอกเปลือกต้นไม้
            cancel();
        } else if (blId.includes('berry') || blId.includes('berries')) { //เบอร์รี่
            cancel();
        }
        /**
         * เพิ่มเติม
         */
        else if (blId.includes('comparator')) { //เครื่องเปรียบเทียบ
            cancel();
        } else if (blId === 'hopper') { //ท่อส่งของ
            cancel();
        } else if (blId === 'barrel') { //ถังใส่ของ
            cancel();
        } else if (blId === 'dispenser') { //เครื่องจ่ายของ
            cancel();
        } else if (blId === 'dropper') { //เครื่องดรอปของ
            cancel();
        } else if (blId.includes('daylight_detector')) { //เครื่องตรวจจับแสงกลางวัน และ กลางคืน
            cancel();
        } else if (blId === 'stonecutter_block') { //เครื่องตัดหิน
            cancel();
        } else if (blId === 'beacon') { //ที่ส่งไฟสัญญาณ
            cancel();
        } else if (blId === 'tnt') { //ระเบิด
            cancel();
        } else if (blId === 'respawn_anchor') { //บล็อกสำหรับเกิดใหม่ในนรก
            cancel()
        } else if (blId.includes('frame')) { //กรอบไอเท็ม
            cancel();
        } else if (blId === 'noteblock') { //บล็อกโน้ต
            cancel();
        } else if (blId === 'jukebox') { //กล่องเล่นเพลง
            cancel();
        } else if (blId.includes('button')) { //ปุ่ม
            cancel();
        } else if (blId === 'composter') { //ที่ทำปุ๋ยหมัก
            cancel();
        } else if (blId.includes('cauldron')) { //หม้อน้ำ
            cancel();
        } else if (blId.includes('command_block')) { //คอมมานบล็อก
            cancel();
        }
    });

    if (!useDelay) return
    world.events.tick.subscribe(() => {
        playersWarn.forEach((delay, pl) => {
            if (delay <= 0) {
                return playersWarn.delete(pl)
            } else {
                playersWarn.set(pl, delay - 1)
            }
        })
    })
}