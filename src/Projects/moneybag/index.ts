import {EntityInventoryComponent, ItemStack, MinecraftItemTypes, Player, world} from 'mojang-minecraft'
import {ModalFormData, ModalFormResponse} from "mojang-minecraft-ui";

world.events.beforeItemUse.subscribe(data => {
    const pl = data.source as Player
    const it = data.item
    const inv = (pl.getComponent('inventory') as EntityInventoryComponent).container

    function sendMessage(msg: string) {
        pl.runCommand('tellraw @s ' + JSON.stringify({rawtext: [{text: msg}]}))
    }

    if (it.id === 'minecraft:compass') {

        moneyAmountForm()

        function moneyAmountFormCall(response: ModalFormResponse) {
            const cost = parseInt(response.formValues[0])
            const amount = parseInt(response.formValues[1])
            const moneyItem = new ItemStack(MinecraftItemTypes.goldIngot, amount, 0)

            function utf8_to_utf16(msg: number) {
                const text = msg.toString()
                const utf16: string[] = [];
                [...Array(text.toString().length).keys()].forEach(i => utf16.push('\u005cu' + parseInt(text.charCodeAt(i).toString(), 10).toString(16).padStart(4, '0')))
                return utf16.join('');
            }

            sendMessage(`§e${cost}§a$ §fMoney Bag §b${amount} §feach were given to you.`)

            let rainbow = '§c--§6--§e--§a--§b--§9--§d--§9--§b--§a--§e--§6--§c--'
            moneyItem.nameTag = `§f${cost}§a$ §eMoney Bag\n§7(§bRight Click§7) to get money`
            moneyItem.setLore(['§fMoney Bag', rainbow, `§0${utf8_to_utf16(cost)}`])
            inv.addItem(moneyItem)
        }

        function moneyAmountForm(invaild: boolean = false, index: number[] = []) {
            const form = new ModalFormData()
            const invaildMsg = (i: number) => invaild && index.find(x => x == i) ? ` §f| §cInvalid input! (${i - 1})` : ''
            form
                .title('Money Bag')
                .textField('Input Cost§7: §bint' + invaildMsg(1) + '\n§7input in range: -2147483648 to 2147483647', '§7input cost here')
                .textField('Input Amount§7: §bint' + invaildMsg(2) + '\n§7input in range range 1 to 64', '§7input cost here')
                .show(pl).then(res => {
                if (res.isCanceled) return
                const cost = res.formValues[0]
                const amount = res.formValues[1]
                const sendErr = (i: number[]) => sendMessage(`\n§cInvalid input: at (${i.join(', ')})`)
                const sendcostErr = () => sendMessage(`§c(0) | Cost '${cost}' is out of range -2147483648 to 2147483647`)
                const sendamountErr = () => sendMessage(`§c(1) | Amount '${amount}' is out of range 1 to 64`)
                const sendisNaNErr = (input: string, i: number) => sendMessage(`§c(${i}) | Syntax error: Unexpected "${input}" Please input §bint §cnumbers`)
                const sendisBlank = (i: number[]) => sendMessage(`§c(${i.join(', ')}) | Empty input: Please input §bint §cnumbers`)

                function isBlank(str: string) {
                    return (!str || /^\s*$/.test(str));
                }

                if (isBlank(cost) && isBlank(amount)) {
                    sendErr([0, 1])
                    sendisBlank([0, 1])
                    return moneyAmountForm(true, [1, 2])
                }
                if (isBlank(cost) && isNaN(amount)) {
                    sendErr([0, 1])
                    sendisBlank([0])
                    sendisNaNErr(amount, 1)
                    return moneyAmountForm(true, [1, 2])
                } else if (isBlank(cost) && (amount < 1 || amount > 64)) {
                    sendErr([0, 1])
                    sendisBlank([0])
                    sendamountErr()
                    return moneyAmountForm(true, [1, 2])
                } else if (isBlank(cost)) {
                    sendErr([0])
                    sendisBlank([0])
                    return moneyAmountForm(true, [1])
                }
                if (isNaN(cost) && isBlank(amount)) {
                    sendErr([0, 1])
                    sendisNaNErr(cost, 0)
                    sendisBlank([1])
                    return moneyAmountForm(true, [1, 2])
                } else if ((cost < -2147483648 || cost > 2147483647) && isBlank(amount)) {
                    sendErr([0, 1])
                    sendcostErr()
                    sendisBlank([1])
                    return moneyAmountForm(true, [1, 2])
                } else if (isBlank(amount)) {
                    sendErr([1])
                    sendisBlank([1])
                    return moneyAmountForm(true, [2])
                }

                if (isNaN(cost) && isNaN(amount)) {
                    sendErr([0, 1])
                    sendisNaNErr(cost, 0)
                    sendisNaNErr(amount, 1)
                    return moneyAmountForm(true, [1, 2])
                }
                if (isNaN(cost) && (amount < 1 || amount > 64)) {
                    sendErr([0, 1])
                    sendisNaNErr(cost, 0)
                    sendamountErr()
                    return moneyAmountForm(true, [1, 2])
                } else if (isNaN(cost)) {
                    sendErr([0])
                    sendisNaNErr(cost, 0)
                    return moneyAmountForm(true, [1])
                }
                if (isNaN(amount) && (cost < -2147483648 || cost > 2147483647)) {
                    sendErr([0, 1])
                    sendcostErr()
                    sendisNaNErr(amount, 1)
                    return moneyAmountForm(true, [1, 2])
                } else if (isNaN(amount)) {
                    sendErr([1])
                    sendisNaNErr(amount, 1)
                    return moneyAmountForm(true, [2])
                }

                if ((cost < -2147483648 || cost > 2147483647) && (amount < 1 || amount > 64)) {
                    sendErr([0, 1])
                    sendcostErr()
                    sendamountErr()
                    return moneyAmountForm(true, [1, 2])
                } else if ((cost < -2147483648 || cost > 2147483647)) {
                    sendErr([0])
                    sendcostErr()
                    return moneyAmountForm(true, [1])
                } else if ((amount < 1 || amount > 64)) {
                    sendErr([1])
                    sendamountErr()
                    return moneyAmountForm(true, [2])
                }

                parseInt(cost)
                parseInt(amount)

                moneyAmountFormCall(res)
            })
        }
    } else if (it.id === 'minecraft:gold_ingot') {
        try {
            if (!it.getLore()[0].startsWith('§fMoney Bag')) return;
        } catch (error) {
            return;
        }

        function addScore(objective: string, score: number) {
            try {
                pl.runCommand(`scoreboard players add @s ${objective} ${score}`)
                return {
                    err: false,
                    errMsg: '',
                    errCode: 0
                }
            } catch (e) {
                return {
                    err: true,
                    errMsg: `§cNo objective was found by the name '${objective}'`,
                    errCode: -2147352576
                }
            }
        }

        const cost = parseInt(it.getLore()[2].replace('§0', '').split('\u005cu003').map(i => parseInt(i)).filter(i => !isNaN(i)).join(''))
        const score = addScore('m', cost)
        if (score.err) {
            return sendMessage(score.errMsg + '\nError code: ' + score.errCode)
        } else {
            const items = [...Array(inv.size).keys()].map(slot => inv.getItem(slot))
            sendMessage(`§fYou got §e${cost}§a$ §fMoney Bag`)
            const newItem = new ItemStack(MinecraftItemTypes.goldIngot, it.amount -= 1, 0)
            try {
                inv.setItem(items.indexOf(it), newItem)
            } catch (e) {
            }
        }
    }
})