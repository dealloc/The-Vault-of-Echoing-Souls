import CONSTANTS from "../constants";
import pickOptionDialog from "../utilities/pick-option-dialog";

export default async function(): Promise<void> {
    const scene = game.scenes.get(CONSTANTS.scenes.landing);

    const result = await pickOptionDialog([
        {
            label: `Asphodel Mountains`,
            value: `/modules/${CONSTANTS.id}/assets/art-cover/asphodel-mountains.webp`,
        },
        {
            label: `Khavak-Zar entrance`,
            value: `/modules/${CONSTANTS.id}/assets/art-cover/mountain-entrance.webp`,
        },
    ]);

    if (result !== null) {
        await scene.update({
            background: {
                src: result,
            }
        });
    }
}