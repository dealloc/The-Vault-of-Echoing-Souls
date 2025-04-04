import pickOptionDialog from "../utilities/pick-option-dialog";

// Example macro that updates the weather on *all* scenes.
export default async function(): Promise<void> {
    const result = await pickOptionDialog([
        {
            label: `Clear`,
            value: { weather: "none" },
        },
        {
            label: `Rain`,
            value: { weather: "rain" },
        },
        {
            label: `Snow`,
            value: { weather: "snow" },
        },
        {
            label: `Autumn Leaves`,
            value: { weather: "clouds" },
        },
        {
            label: `Rain Storm`,
            value: { weather: "rainStorm" },
        },
        {
            label: `Fog`,
            value: { weather: "fog" },
        },
        {
            label: `Blizzard`,
            value: { weather: "blizzard" },
        },
    ], 'Set the weather for <strong>ALL</strong> scenes');

    if (result !== null) {
        for (const scene of game.scenes.values()) {
            await scene.update(result);
        }
    }
}