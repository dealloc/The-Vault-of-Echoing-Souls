import CONSTANTS from "../constants";
import pickOptionDialog from "../utilities/pick-option-dialog";

export default async function(): Promise<void> {
    const scene = game.scenes.get(CONSTANTS.scenes.landing);

    const result = await pickOptionDialog([
        {
            label: `Landing Art 1`,
            value: `/modules/${CONSTANTS.id}/assets/...`,
        }
    ]);

    if (result !== null) {
        await scene.update({
            background: {
                src: result,
            }
        });
    }
}