type SiIconAttributes = {
    name: string;
    size?: string | number;
    color?: string;
    class?: string;
    spritePath?: string;
};
declare class SiIcon extends HTMLElement {
    static get observedAttributes(): string[];
    private _name;
    private _size;
    private _color;
    private _class;
    private _spritePath;
    constructor();
    connectedCallback(): void;
    attributeChangedCallback(attrName: string, _oldValue: string | null, newValue: string | null): void;
    private _updateAttributes;
    render(): void;
}
export { SiIcon, SiIconAttributes };
