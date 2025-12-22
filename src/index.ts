type SiIconAttributes = {
    name: string;
    size?: string | number;
    color?: string;
    class?: string;
};

class SiIcon extends HTMLElement {
    static get observedAttributes(): string[] {
        return ['name', 'size', 'color', 'class'];
    }

    private _name: string = '';
    private _size: string | number = '24';
    private _color: string = 'currentColor';
    private _class: string = '';
    private _spritePath: string = '';

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this._determineSpritePath();
    }

    // Cette méthode trouve automatiquement le chemin vers dist/space-icons.svg
    private _determineSpritePath(): void {
        const script = document.currentScript as HTMLScriptElement ||
            Array.from(document.querySelectorAll('script')).find(s => s.src.includes('index.js'));

        if (script && script.src) {
            const basePath = script.src.substring(0, script.src.lastIndexOf('/'));
            this._spritePath = `${basePath}/space-icons.svg`;
        } else {
            // Fallback si le script n'est pas trouvé (ex: bundle)
            this._spritePath = 'space-icons.svg';
        }
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
        }
        this.render();
    }

    private _updateAttributes(): void {
        this._name = this.getAttribute('name') || '';
        this._size = this.getAttribute('size') || '24';
        this._color = this.getAttribute('color') || 'currentColor';
        this._class = this.getAttribute('class') || '';
    }

    render(): void {
        if (!this._name) return;

        const isNumeric = !isNaN(Number(this._size)) && /^\d+$/.test(String(this._size));
        const sizeValue = isNumeric ? `${this._size}px` : this._size;

        this.shadowRoot!.innerHTML = `
          <style>
            :host { 
                display: inline-block; 
                vertical-align: middle; 
                line-height: 0;
            }
            svg {
              width: ${sizeValue};
              height: ${sizeValue};
              color: ${this._color};
              fill: currentColor;
              stroke: currentColor;
            }
          </style>
          <svg class="si si-${this._name} ${this._class}">
            <use href="${this._spritePath}#${this._name}"></use>
          </svg>
        `;
    }
}

if (typeof window !== 'undefined' && !customElements.get('si-icon')) {
    customElements.define('si-icon', SiIcon);
}

export { SiIcon, SiIconAttributes };