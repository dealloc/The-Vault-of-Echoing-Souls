interface DialogOption<T> {
    label: string,
    icon?: string,
    value: T
}

export default async function pickOptionDialog<T>(options: DialogOption<T>[], content = ''): Promise<T | null> {
    return new Promise<T | null>((resolve) => {
        new Dialog({
            title: 'Select an option',
            content,
            buttons: options.reduce((result, option) => {
                result[option.label] = {
                    label: option.label,
                    icon: option.icon ? `<i class="fas fa-${option.icon}"></i>` : null,
                    callback: async () => {
                        resolve(option.value);
                    },
                };
    
                return result;
            }, {} as any),
            close: () => resolve(null),
        }).render(true);
    });
}