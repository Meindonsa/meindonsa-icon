export class SiIcon extends HTMLElement {
    static get observedAttributes() {
        return ['name', 'size', 'color', 'class'];
    }
    _name = '';
    _size = '24';
    _color = 'currentColor';
    _class = '';
    _spritePath = '';
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this._determineSpritePath();
    }
    // Cette méthode trouve automatiquement le chemin vers dist/space-icons.svg
    _determineSpritePath() {
        const script = document.currentScript ||
            Array.from(document.querySelectorAll('script')).find(s => s.src.includes('index.js'));
        if (script && script.src) {
            const basePath = script.src.substring(0, script.src.lastIndexOf('/'));
            this._spritePath = `${basePath}/space-icons.svg`;
        }
        else {
            // Fallback si le script n'est pas trouvé (ex: bundle)
            this._spritePath = 'space-icons.svg';
        }
    }
    connectedCallback() {
        this._updateAttributes();
        this.render();
    }
    attributeChangedCallback(attrName, _oldValue, newValue) {
        switch (attrName) {
            case 'name':
                this._name = newValue || '';
                break;
            case 'size':
                this._size = newValue || '24';
                break;
            case 'color':
                this._color = newValue || 'currentColor';
                break;
            case 'class':
                this._class = newValue || '';
                break;
        }
        this.render();
    }
    _updateAttributes() {
        this._name = this.getAttribute('name') || '';
        this._size = this.getAttribute('size') || '24';
        this._color = this.getAttribute('color') || 'currentColor';
        this._class = this.getAttribute('class') || '';
    }
    render() {
        if (!this._name)
            return;
        const isNumeric = !isNaN(Number(this._size)) && /^\d+$/.test(String(this._size));
        const sizeValue = isNumeric ? `${this._size}px` : this._size;
        this.shadowRoot.innerHTML = `
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
