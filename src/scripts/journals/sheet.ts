import CONSTANTS from "../constants";

export default class CrownOfTheKoboldKingJournalSheet extends JournalSheet {
    static get defaultOptions(): JournalSheetOptions {
        return {
            ...JournalSheet.defaultOptions,
            classes: [...JournalSheet.defaultOptions.classes, CONSTANTS.id],
        };
    }

    // Allows us to filter out headings from the table of contents in the sidebar.
    protected async _renderHeadings(page: HTMLElement, toc: Record<string, JournalEntryPage.JournalEntryPageHeading>): Promise<void> {
        for (const [key, heading] of Object.entries(toc)) {
            // if our heading contains a <span> element it's most likely a styled title we don't want to show.
            // we remove it from the ToC (Table of Contents).
            if (this.#shouldBeRemovedFromToc(key, heading)) {
                delete toc[key];
            }
        }

        return super._renderHeadings(page, toc);
    }

    #shouldBeRemovedFromToc(key: string, heading: JournalEntryPage.JournalEntryPageHeading): boolean {
        if (heading.element?.querySelectorAll('span').length) {
            return true;
        }
        if (heading.element?.classList?.contains('hide-toc')) {
            return true;
        }

        return false;
    }
}