import {ActionFormData, bankMenuForm, config, ModalFormData, Player} from '../index.js';

export function settingForm(pl: Player, modalForm: ModalFormData): void {
    try {
        const
            actionForm = new ActionFormData(),
            hasTag = (tag: string) => pl.hasTag(tag),
            tags = [config.tagsUI.setting.toggleOff, config.tagsUI.setting.toggleOn],
            settingForm = config.forms.setting,
            toggle = settingForm.toggle
        modalForm
            .title(settingForm.title)
            .toggle(toggle.lable, hasTag(tags[0]) ? false : hasTag(tags[1]) ? true : toggle.defaultValue)
            .show(pl).then(res => {
            if (res.isCanceled) return bankMenuForm(pl, actionForm)
            const toggleValue = res.formValues[0]
            if (hasTag(tags[0]) ? false : hasTag(tags[1]) ? false : toggleValue === toggle.defaultValue) return
            if (toggleValue === true) {
                pl.addTag(tags[1])
            } else if (toggleValue === false) {
                pl.addTag(tags[0])
            }
        })
    } catch (e) {
        console.error(e)
    }
}
