import CONSTANTS from './constants';
import { onGetProseMirrorMenuDropDowns } from "./hooks/prose-mirror";
import { onSequencerReady } from './hooks/sequencer';
import AdventureJournalSheet from './journals/sheet';
import AdventureJournalTextPageSheet from './journals/text-page';
import { initializeMacros } from './macros';

Hooks.once('init', () => {
    DocumentSheetConfig.registerSheet(JournalEntry, CONSTANTS.id, AdventureJournalSheet, {
        types: ['base'],
        makeDefault: false,
        canBeDefault: false,
        label: CONSTANTS.name
    });

    DocumentSheetConfig.registerSheet(JournalEntryPage, CONSTANTS.id, AdventureJournalTextPageSheet, {
        types: ['text'],
        makeDefault: false,
        canBeDefault: false,
        label: `${CONSTANTS.name} text`
    });

    initializeMacros();
    console.info('Loaded', CONSTANTS.id);
});

Hooks.on('sequencerReady', onSequencerReady);

// Only hook the prosemirror extensions in debug mode.
// This code gets removed in production
if (process.env.NODE_ENV) {
    Hooks.on("getProseMirrorMenuDropDowns", onGetProseMirrorMenuDropDowns);
}