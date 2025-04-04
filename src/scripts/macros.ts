import setWeather from "./macros/set-weather";
import updateLanding from "./macros/update-landing";
import getModule from "./utilities/get-module";

export function initializeMacros(): void {
    const module = getModule();

    (module as any).macros = {
        setWeather,
        updateLanding,
    };
}