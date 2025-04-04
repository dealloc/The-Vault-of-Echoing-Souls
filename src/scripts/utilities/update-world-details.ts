import CONSTANTS from '../constants';

/** Update the login screen with the description and background image from constants.ts */
export default async function updateWorldDetails() {
    const url = foundry.utils.getRoute('setup');
    const details = {
        id: (game.world as any).id,
        action: 'editWorld',
        description: CONSTANTS.loginScreen.description,
        background: `modules/${CONSTANTS.id}${CONSTANTS.loginScreen.background}`
    };

    // If there's no background, don't update it
    if (CONSTANTS.loginScreen.background === null) {
        delete details.background;
    }

    const source = await foundry.utils.fetchJsonWithTimeout(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(details)
    });

    game.world.updateSource(source);
};