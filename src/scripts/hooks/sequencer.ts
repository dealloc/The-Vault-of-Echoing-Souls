import CONSTANTS from "../constants";

declare const Sequencer: any;

// Called when Sequencer is ready to register assets.
export function onSequencerReady() {
    Sequencer.Database.registerEntries(CONSTANTS.id, {
    })
};