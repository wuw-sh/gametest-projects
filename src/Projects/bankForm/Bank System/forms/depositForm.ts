import {ActionFormData, API, bankMenuForm, cashSuffixes, config, ModalFormData, Player} from '../index.js';

export function depositForm(pl: Player, modalForm: ModalFormData): void {
    try {
        const
            actionForm = new ActionFormData(),
            moneyobj = config.objectives.money,
            bankobj = config.objectives.bank,
            money = API.getScore(pl, moneyobj),
            bank = API.getScore(pl, bankobj),
            send = (msg: string) => API.sendMessage(pl, msg),
            depositform = config.forms.deposit,
            input = depositform.input,
            success = depositform.send.success,
            wrong = depositform.send.wrongs
        modalForm
            .title(depositform.title)
            .textField(depositform.body(cashSuffixes(pl, money), cashSuffixes(pl, bank)) + input.text, input.placeHolderText, input.defaultValue)
            .show(pl).then(res => {
            if (res.isCanceled) return bankMenuForm(pl, actionForm)
            const value = parseInt(res.formValues[0])
            if (/^\s*$/.test(res.formValues[0])) return send(wrong.isEmpty)
            if (isNaN(value)) return send(wrong.notNumber)
            if (value <= 0) return send(wrong.amountLess)
            if (money < value) return send(wrong.moneyNotEnough(value - money))
            API.removeScore(pl, moneyobj, value)
            API.addScore(pl, bankobj, value)
            send(success.deposit(cashSuffixes(pl, value)))
        })
    } catch (e) {
        console.error(e)
    }
}