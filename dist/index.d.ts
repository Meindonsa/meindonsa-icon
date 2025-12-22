export type SiIconAttributes = {
    name: string;
    size?: string | number;
    color?: string;
    class?: string;
};
declare global {
    namespace VUE {
        interface GlobalComponents {
            'si-icon': SiIconAttributes;
        }
    }
    namespace JSX {
        interface IntrinsicElements {
            'si-icon': SiIconAttributes;
        }
    }
}
export declare class SiIcon extends HTMLElement {
    static get observedAttributes(): string[];
    private _name;
    private _size;
    private _color;
    private _class;
    private _spritePath;
    constructor();
    private _determineSpritePath;
    connectedCallback(): void;
    attributeChangedCallback(attrName: string, _oldValue: string | null, newValue: string | null): void;
    private _updateAttributes;
    render(): void;
}
