import {
    ActionFormData,
    API,
    bankMenuForm,
    config,
    depositForm,
    ModalFormData,
    settingForm,
    transferForm,
    withdrawForm,
    world
} from '../index.js';

export function tagUpdateListener() {
    try {
        world.events.tick.subscribe(() => {
            API.tagUpdate((pl, tag) => {
                const
                    addTag = (tag: string) => pl.addTag(tag),
                    removeTag = (tag: string) => pl.removeTag(tag),
                    modalForm = new ModalFormData(),
                    actionForm = new ActionFormData(),
                    tagUI = config.tagsUI,
                    bankmenu = tagUI.bankmenu,
                    deposit = tagUI.deposit,
                    withdraw = tagUI.withdraw,
                    transfer = tagUI.transfer,
                    setting = tagUI.setting,
                    settingToggleSend = config.forms.setting.send,
                    cashSiffixesOn = settingToggleSend.cashSiffixesOn,
                    cashSiffixesOff = settingToggleSend.cashSiffixesOff,
                    send = (msg: string) => API.sendMessage(pl, msg)
                switch (tag) {
                    case bankmenu:
                        bankMenuForm(pl, actionForm)
                        removeTag(tag)
                        return;
                    case deposit:
                        depositForm(pl, modalForm)
                        removeTag(tag)
                        return;
                    case withdraw:
                        withdrawForm(pl, modalForm)
                        removeTag(tag)
                        return;
                    case transfer:
                        transferForm(pl, modalForm)
                        removeTag(tag)
                        return;
                    case setting.tagUi:
                        settingForm(pl, modalForm)
                        removeTag(tag)
                        return;
                    case setting.toggleOn:
                        addTag(tag)
                        removeTag(setting.toggleOff)
                        send(cashSiffixesOn)
                        return;
                    case setting.toggleOff:
                        addTag(tag)
                        removeTag(setting.toggleOn)
                        send(cashSiffixesOff)
                        return;
                }
            })
        })
    } catch (e) {
        console.error(e)
    }
}