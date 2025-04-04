// This file contains hooks to insert ProseMirror (journal) functionality.

// helper function to insert HTML blocks, as that's what most of these snippets do.
const _insertHtml = (state, dispatch, html: string) => {
    let { selection, schema } = state;
    let { $from } = selection;

    // Create a temporary DOM element to parse the HTML
    let wrapper = document.createElement("div");
    wrapper.innerHTML = html;

    // Convert HTML to ProseMirror nodes using the schema's DOMParser
    let fragment = (ProseMirror as any).DOMParser.fromSchema(schema).parseSlice(wrapper).content;
    console.info(fragment);

    // Apply the transformation if dispatch is provided
    if (dispatch) {
        dispatch(state.tr.insert($from.pos, fragment));
    }
};

export const onGetProseMirrorMenuDropDowns = function (menu, dropdowns) {
    dropdowns.adventureSnippets = {
        title: 'EDITOR.AdventureSnippets',
        cssClass: 'adventureSnippets',
        icon: '<i class="fas fa-copy"></i>',
        entries: [
            {
                action: 'pf2e-as-encounter',
                class: 'pf2e-as-encounter',
                title: 'Encounter block',
                cmd(state, dispatch, view) {
                    _insertHtml(state, dispatch, `<section class="encounter">
    <div class="header">
        <img src="icons/fvtt.png">
        <h2>TITLE<span>TYPE</span></h2>
        <p>
            <span class="link">
                @UUID[Compendium.pf2e.journals.JournalEntry.6L2eweJuM8W7OCf2.JournalEntryPage.JYJd1xZwqUNRNsqG]{Remaster Changes}
            </span>
        </p>
    </div>
    <p><strong>bottom text</strong></p>
</section>`);

                    return true; // Command executed successfully
                }
            },
            {
                action: 'pf2e-as-statblock',
                class: 'pf2e-as-statblock',
                title: 'Stat block',
                cmd(state, dispatch, view) {
                    _insertHtml(state, dispatch, `<section class="statblock">
    <h1>Name <span>Type 0</span></h1>
    <section class="traits">
        <p class="alignment">N</p>
        <p>trait</p>
    </section>
    <p><em>short italic description</em></p>
    <p><strong>property</strong> description</p>
    <p><strong>property</strong> description</p>
    <hr>
    <p><strong>property</strong> description</p>
    <p><strong>property</strong> description</p>
</section>`);

                    return true; // Command executed successfully
                }
            },
            {
                action: 'pf2e-as-aside',
                class: 'pf2e-as-aside',
                title: 'Aside block',
                cmd(state, dispatch, view) {
                    _insertHtml(state, dispatch, `<aside class="right">
                        <h2 class="hide-toc">This is an aside title</h2>
                        <p>this is an aside block</p>
                    </aside>`);

                    return true; // Command executed successfully
                }
            }
        ],
    };
};