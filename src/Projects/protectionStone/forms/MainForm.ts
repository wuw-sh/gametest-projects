import {EntityInventoryComponent, Items, ItemStack, Player} from "mojang-minecraft";
import {ActionFormData, ModalFormData} from "mojang-minecraft-ui";

export function mainForm(pl: Player) {
    const fm1 = new ActionFormData().title('Protection Stone')
    fm1
        .button('§aCreate\n§7Protection Stone')
        .show(pl).then(res1 => {
        if (res1.isCanceled) return
        const fm2 = new ModalFormData().title('Create Protection Stone')
        fm2
            .dropdown('Select Size:', [
                '§e10 §8x §e10',
                '§e20 §8x §e20',
                '§e30 §8x §e30',
                '§e40 §8x §e40',
                '§e50 §8x §e50'
            ])
            .show(pl).then(res2 => {
            if (res2.isCanceled) return
            const value = Number(res2.formValues)
            const stoneSelection = [
                'coal_ore',
                'copper_ore',
                'iron_ore',
                'diamond_ore',
                'emerald_ore'
            ];
            const stone = new ItemStack(Items.get('minecraft:' + stoneSelection[value]));

            (pl.getComponent('inventory') as EntityInventoryComponent).container.addItem(stone)
        })
    })
}