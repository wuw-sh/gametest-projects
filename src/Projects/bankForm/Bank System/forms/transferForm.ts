import {ActionFormData, API, bankMenuForm, cashSuffixes, config, ModalFormData, Player} from '../index.js';

export function transferForm(pl: Player, modalForm: ModalFormData): void {
    try {
        const
            actionForm = new ActionFormData(),
            moneyobj = config.objectives.money,
            bankobj = config.objectives.bank,
            plAll = API.PlayerArray().filter(x => x.name !== pl.name).sort((a, b) => API.getScore(b, bankobj) - API.getScore(a, bankobj)),
            getpayeeName = (Index: number) => plAll[Index].name,
            money = API.getScore(pl, moneyobj),
            bank = API.getScore(pl, bankobj),
            send = (msg: string) => API.sendMessage(pl, msg),
            sendPayee = (msg: string, Index: number) => API.sendMessage(plAll[Index], msg),
            transferForm = config.forms.transfer,
            dropdown = transferForm.dropdown,
            input = transferForm.input,
            input1 = transferForm.input1,
            success = transferForm.send.success,
            wrong = transferForm.send.wrong,
            listpayee = !plAll.length ? [dropdown.options.noPlayer] : plAll.map((x, i) => dropdown.options.listPlayer(i + 1, x.name, cashSuffixes(pl, API.getScore(x, bankobj))))
        modalForm
            .title(transferForm.title)
            .dropdown(transferForm.body(cashSuffixes(pl, money), cashSuffixes(pl, bank)) + dropdown.lable, listpayee)
            .textField(input.text, input.placeHolderText, input.defaultValue)
            .textField(input1.text, input1.placeHolderText, input1.defaultValue)
            .show(pl).then(res => {
            if (res.isCanceled) return bankMenuForm(pl, actionForm)
            const
                selectPayee = parseInt(res.formValues[0]),
                value = parseInt(res.formValues[1]),
                wish = String(res.formValues[2])
            if (!plAll[selectPayee]) return send(wrong.noPlayer)
            if (/^\s*$/.test(res.formValues[1])) return send(wrong.isEmpty)
            if (isNaN(value)) return send(wrong.notNumber)
            if (selectPayee === plAll.indexOf(pl)) return send(wrong.transferYourSelf)
            if (value <= 0) return send(wrong.amountLess)
            if (bank < value) return send(wrong.bankNotEnough(value - bank))
            API.removeScore(pl, bankobj, value)
            send(success.giverTransfer(getpayeeName(selectPayee), cashSuffixes(pl, value), wish))
            API.addScore(plAll[selectPayee], bankobj, value)
            sendPayee(success.payeeTransfer(pl.name, cashSuffixes(plAll[selectPayee], value), wish), selectPayee)
        })
    } catch (e) {
        console.error(e)
    }
}
