import {
    ActionFormData,
    API,
    cashSuffixes,
    config,
    depositForm,
    ModalFormData,
    Player,
    settingForm,
    transferForm,
    withdrawForm
} from '../index.js';

export function bankMenuForm(pl: Player, actionForm: ActionFormData): void {
    try {
        const
            modalForm = new ModalFormData(),
            money = API.getScore(pl, config.objectives.money),
            bank = API.getScore(pl, config.objectives.bank),
            bankmenuForm = config.forms.bankMenu,
            button = config.forms.bankMenu.buttons
        actionForm
            .title(bankmenuForm.title)
            .body(bankmenuForm.body(cashSuffixes(pl, money), cashSuffixes(pl, bank)))
            .button(button.deposit.text, button.deposit.iconPath)
            .button(button.withdraw.text, button.withdraw.iconPath)
            .button(button.transfer.text, button.transfer.iconPath)
            .button(button.setting.text, button.setting.iconPath)
            .show(pl).then(res => {
            if (res.isCanceled) return
            switch (res.selection) {
                case 0:
                    depositForm(pl, modalForm)
                    return;
                case 1:
                    withdrawForm(pl, modalForm)
                    return;
                case 2:
                    transferForm(pl, modalForm)
                    return;
                case 3:
                    settingForm(pl, modalForm)
                    return;
            }
        })
    } catch (e) {
        console.error(e)
    }
}
