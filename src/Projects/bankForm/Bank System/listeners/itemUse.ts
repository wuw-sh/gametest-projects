import {
    ActionFormData,
    bankMenuForm,
    config,
    depositForm,
    ItemStack,
    ModalFormData,
    Player,
    settingForm,
    transferForm,
    withdrawForm,
    world
} from '../index.js';

export function itemUseListener() {
    try {
        const Itemuse = (pl: Player, item: ItemStack) => {
            if (config.items.useItemUI === false) return;
            const
                modalForm = new ModalFormData(),
                actionForm = new ActionFormData(),
                itemUI = config.items
            switch (item.id) {
                case itemUI.bankMenu:
                    if (!itemUI.bankMenu.length) return;
                    bankMenuForm(pl, actionForm)
                    return;
                case itemUI.deposit:
                    if (!itemUI.deposit.length) return;
                    depositForm(pl, modalForm)
                    return;
                case itemUI.withdraw:
                    if (!itemUI.withdraw.length) return;
                    withdrawForm(pl, modalForm)
                    return;
                case itemUI.transfer:
                    if (!itemUI.transfer.length) return;
                    transferForm(pl, modalForm)
                    return;
                case itemUI.setting:
                    if (!itemUI.setting.length) return;
                    settingForm(pl, modalForm)
                    return;
            }
        }
        world.events.itemUse.subscribe(data => {
            return Itemuse(data.source as Player, data.item)
        })
    } catch (e) {
        console.error(e)
    }
}
