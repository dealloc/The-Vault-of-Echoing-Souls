import CONSTANTS from '../constants';

/** Get the module object, mostly used to store runtime information localized to this module. */
export default function getModule(): Module {
    const module = game.modules.get(CONSTANTS.id);

    if (module === null || module === undefined) {
        throw new Error(`Failed to retrieve module ${CONSTANTS.id}`);
    }

    return module;
}