import {ActionFormData, API, bankMenuForm, cashSuffixes, config, ModalFormData, Player} from '../index.js';

export function withdrawForm(pl: Player, modalForm: ModalFormData): void {
    try {
        const
            actionForm = new ActionFormData(),
            moneyobj = config.objectives.money,
            bankobj = config.objectives.bank,
            money = API.getScore(pl, moneyobj),
            bank = API.getScore(pl, bankobj),
            send = (msg: string) => API.sendMessage(pl, msg),
            withdrawForm = config.forms.withdraw,
            input = withdrawForm.input,
            success = withdrawForm.send.success,
            wrong = withdrawForm.send.wrongs
        modalForm
            .title(withdrawForm.title)
            .textField(withdrawForm.body(cashSuffixes(pl, money), cashSuffixes(pl, bank)) + input.text, input.placeHolderText, input.defaultValue)
            .show(pl).then(res => {
            if (res.isCanceled) return bankMenuForm(pl, actionForm)
            const value = parseInt(res.formValues[0])
            if (/^\s*$/.test(res.formValues[0])) return send(wrong.isEmpty)
            if (isNaN(value)) return send(wrong.notNumber)
            if (value <= 0) return send(wrong.amountLess)
            if (bank < value) return send(wrong.bankNotEnough(value - bank))
            API.removeScore(pl, bankobj, value)
            API.addScore(pl, moneyobj, value)
            send(success.withdraw(cashSuffixes(pl, value)))
        })
    } catch (e) {
        console.error(e)
    }
}
