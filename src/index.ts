type SiIconAttributes = {
    name: string;
    size?: string | number;
    color?: string;
    class?: string;
    spritePath?: string;
};

class SiIcon extends HTMLElement {
    static get observedAttributes(): string[] {
        return ['name', 'size', 'color', 'class', 'sprite-path'];
    }

    private _name: string = '';
    private _size: string | number = '24';
    private _color: string = 'currentColor';
    private _class: string = '';
    private _spritePath: string = 'icons.svg';

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback(): void {
        this._updateAttributes();
        this.render();
    }

    attributeChangedCallback(attrName: string, _oldValue: string | null, newValue: string | null): void {
        switch (attrName) {
            case 'name': this._name = newValue || ''; break;
            case 'size': this._size = newValue || '24'; break;
            case 'color': this._color = newValue || 'currentColor'; break;
            case 'class': this._class = newValue || ''; break;
            case 'sprite-path': this._spritePath = newValue || 'icons.svg'; break;
        }
        this.render();
    }

    private _updateAttributes(): void {
        this._name = this.getAttribute('name') || '';
        this._size = this.getAttribute('size') || '24';
        this._color = this.getAttribute('color') || 'currentColor';
        this._class = this.getAttribute('class') || '';
        this._spritePath = this.getAttribute('sprite-path') || 'icons.svg';
    }

    render(): void {
        if (!this._name) return;

        const sizeValue = typeof this._size === 'number' ? `${this._size}px` : this._size;

        this.shadowRoot!.innerHTML = `
      <style>
        svg {
          width: ${sizeValue};
          height: ${sizeValue};
          fill: ${this._color};
          vertical-align: middle;
        }
      </style>
      <svg class="si si-${this._name} ${this._class}">
        <use href="${this._spritePath}#${this._name}"></use>
      </svg>
    `;
    }
}

customElements.define('si-icon', SiIcon);

export { SiIcon, SiIconAttributes };
