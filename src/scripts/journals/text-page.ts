export default class AdventureJournalTextPageSheet extends JournalTextPageSheet {
    // register your journal's custom listeners.
    activateListeners(html: JQuery): void {
        $(html).find('.narrate').on('click', this.#narrate);
        $(html).find('[data-id][data-type="Scene"]').on('click', this.#openScene);

        super.activateListeners(html);
    }

    #narrate() {
        alert('narrate me!');
    }

    protected async _renderInner(data: ReturnType<this["getData"]>): Promise<JQuery<HTMLElement>> {
        const result = await super._renderInner(data);
        this.#updateImages(result);
        this.#updateSounds(result);

        return result;
    }

    // Automatically add 'shape-outside' to all images with '.outside' classes.
    #updateImages(content: JQuery<HTMLElement>) {
        content.find("img.outside").each((_, img) => {
            const $img = $(img);
            const src = $img.attr("src");
            const existingStyle = $img.attr("style") || "";
            const shapeOutsideRule = `shape-outside: url('${src}');`;

            // Append if not already present
            if (!existingStyle.includes("shape-outside")) {
                $img.attr("style", `${existingStyle} ${shapeOutsideRule}`.trim());
            }
        });
    }

    // Automatically update ambient sound links to have the music icon similar to rolls etc and make them clickable to toggle the sound linked.
    #updateSounds(content: JQuery<HTMLElement>) {
        content.find('[data-id][data-type="AmbientSound"]').each((_, link) => {
            const id: string = $(link).data('id');
            const sound = game.canvas.sounds.get(id)

            if (sound) {
                const icon = sound.document.hidden ? 'play' : 'stop';
                $(link).html(`<i class="fas fa-${icon}"></i> ${$(link).text()}`);

                $(link).on('click', async (event) => {
                    event.preventDefault();
                    event.stopPropagation();
            
                    await (sound as any).document.update({ hidden: !sound.document.hidden });
                    const icon = sound.document.hidden ? 'play' : 'stop';
                    $(link).html(`<i class="fas fa-${icon}"></i> ${$(link).text()}`);
                });
            }
        });
    }

    #openScene(event: JQuery.Event) {
        event.preventDefault();
        event.stopPropagation();

        const id: string = (event as any).currentTarget.dataset.id;
        const scene = game.scenes.get(id);

        if (scene) {
            (scene as any).view();
        }
    }
}