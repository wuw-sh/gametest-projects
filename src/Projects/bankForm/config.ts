export const config = {
    tagsUI: {
        bankmenu: 'bankmenu',
        deposit: 'bank',
        withdraw: 'mot',
        transfer: 'mot2',
        setting: {
            tagUi: 'banksetting',
            toggleOn: 'cashsuffixes:true',
            toggleOff: 'cashsuffixes:false',
        }
    },
    objectives: {
        money: 'm',
        bank: 'bank'
    },
    items: {
        bankMenu: 'minecraft:emerald',
        deposit: '',
        withdraw: '',
        transfer: 'minecraft:clock',
        setting: '',
        useItemUI: true
    },
    forms: {
        bankMenu: {
            title: '§l§aธนาคาร',
            body: (money: string | number, bank: string | number) => `เงินสด§e: §a${money} §fบาท\n§fเงินในธนาคาร§e: §a${bank} §fบาท\n\n`,
            buttons: {
                deposit: {
                    text: '§l§aฝากเงิน',
                    iconPath: 'textures/icons/deposit_money'
                },
                withdraw: {
                    text: '§l§eถอนเงิน',
                    iconPath: 'textures/icons/withdraw_money'
                },
                transfer: {
                    text: '§l§bโอนเงิน',
                    iconPath: 'textures/icons/transfer_money'
                },
                setting: {
                    text: '§l§7ตั้งค่า',
                    iconPath: 'textures/icons/setting'
                }
            }
        },
        deposit: {
            title: '§l§aฝากเงิน',
            body: (money: string | number, bank: string | number) => `เงินสด§e: §a${money} §fบาท\n§fเงินในธนาคาร§e: §a${bank} §fบาท\n\n`,
            input: {
                text: 'ใส่จำนวนเงินที่ต้องการ §aฝาก',
                placeHolderText: '§7ใส่จำนวนเงิน',
                defaultValue: ''
            },
            send: {
                success: {
                    deposit: (value: string | number) => `§l§fคุณได้ §aฝากเงิน§f เข้าธนาคาร ทั้งหมด§e: §a${value} §fบาท`
                },
                wrongs: {
                    isEmpty: '§l§cกรุณาใส่จำนวนเงินที่ต้องการฝาก',
                    notNumber: '§l§cกรุณาใส่จำนวนเงินเป็นตัวเลข',
                    amountLess: '§l§cกรุณาใส่จำนวนเงินที่มากกว่า §f0 §cบาท',
                    moneyNotEnough: (value: number) => `§l§eเงินสด §cของคุณไม่เพียงพอ ขาดอีก§e: §a${value} §fบาท`
                }
            }
        },
        withdraw: {
            title: '§l§eถอนเงิน',
            body: (money: string | number, bank: string | number) => `เงินสด§e: §a${money} §fบาท\n§fเงินในธนาคาร§e: §a${bank} §fบาท\n\n`,
            input: {
                text: 'ใส่จำนวนเงินที่ต้องการ §eถอน',
                placeHolderText: '§7ใส่จำนวนเงิน',
                defaultValue: ''
            },
            send: {
                success: {
                    withdraw: (value: string | number) => `§l§fคุณได้ §eถอนเงิน§f ออกจากธนาคาร ทั้งหมด§e: §a${value} §fบาท`
                },
                wrongs: {
                    isEmpty: '§l§cกรุณาใส่จำนวนเงินที่ต้องการถอน',
                    notNumber: '§l§cกรุณาใส่จำนวนเงินเป็นตัวเลข',
                    amountLess: '§l§cกรุณาใส่จำนวนเงินที่มากกว่า §f0 §cบาท',
                    bankNotEnough: (value: number) => `§l§aเงินในธนาคาร §cของคุณไม่เพียงพอ ขาดอีก§e: §a${value} §fบาท`
                }
            }
        },
        transfer: {
            title: '§l§bโอนเงิน',
            body: (money: string | number, bank: string | number) => `เงินสด§e: §a${money} §fบาท\n§fเงินในธนาคาร§e: §a${bank} §fบาท\n\n`,
            dropdown: {
                lable: 'เลือกผู้รับเงิน',
                options: {
                    noPlayer: 'None Player',
                    listPlayer: (index: number, listpayeename: string, listpayeebank: string | number) => `§a#§e${index} §f${listpayeename} §e(§a${listpayeebank} §fบาท§e)`
                },
                defaultValueIndex: ''
            },
            input: {
                text: 'ใส่จำนวนเงินที่ต้องการ §bโอน',
                placeHolderText: '§7ใส่จำนวนเงิน',
                defaultValue: ''
            },
            input1: {
                text: 'ใส่คำอวยพร §o§7*ไม่จำเป็นต้องกรอก',
                placeHolderText: '§7ใส่คำอวยพร',
                defaultValue: ''
            },
            send: {
                success: {
                    giverTransfer: (payeeName: string, value: string | number, wish: string) => `§l§fคุณได้ §bโอนเงิน §fให้ §e@${payeeName}\n §e-§fจำนวน§7: §r§a${value} §fบาท\n §l§e-§fคำอวยพร§7: §r§f${wish}`,
                    payeeTransfer: (giverName: string, value: string | number, wish: string) => `§l§fคุณได้รับเงินจาก §e@${giverName}\n §e-§fจำนวน§7: §r§a${value} §fบาท\n §l§e-§fคำอวยพร§7: §r§f${wish}`
                },
                wrong: {
                    isEmpty: '§l§cกรุณาใส่จำนวนเงินที่ต้องการโอน',
                    noPlayer: '§l§cไม่พบผู้เล่น',
                    transferYourSelf: '§l§cคุณไม่สามารถโอนเงินให้ตัวเองได้',
                    notNumber: '§l§cกรุณาใส่จำนวนเงินเป็นตัวเลข',
                    amountLess: '§l§cกรุณาใส่จำนวนเงินที่มากกว่า §f0 §cบาท',
                    bankNotEnough: (value: number) => `§l§aเงินในธนาคาร §cของคุณไม่เพียงพอ ขาดอีก§e: §a${value} §fบาท`
                }
            }
        },
        setting: {
            title: '§l§7ตั้งค่า',
            toggle: {
                lable: '§aเปิด§f/§cปิด §fการย่อค่าเงิน §7(k, M, B)',
                defaultValue: true
            },
            send: {
                cashSiffixesOn: `§l§fคุณได้ตั้งค่า §7(§aการย่อค่าเงิน§7) §fเป็น §aเปิดใช้งาน`,
                cashSiffixesOff: `§l§fคุณได้ตั้งค่า §7(§aการย่อค่าเงิน§7) §fเป็น §cปิดใช้งาน`
            }
        }
    }
}
