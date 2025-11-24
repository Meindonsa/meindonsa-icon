class SiIcon extends HTMLElement {
    static get observedAttributes() {
        return ['name', 'size', 'color', 'class', 'sprite-path'];
    }
    constructor() {
        super();
        this._name = '';
        this._size = '24';
        this._color = 'currentColor';
        this._class = '';
        this._spritePath = 'icons.svg';
        this.attachShadow({ mode: 'open' });
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
            case 'sprite-path':
                this._spritePath = newValue || 'icons.svg';
                break;
        }
        this.render();
    }
    _updateAttributes() {
        this._name = this.getAttribute('name') || '';
        this._size = this.getAttribute('size') || '24';
        this._color = this.getAttribute('color') || 'currentColor';
        this._class = this.getAttribute('class') || '';
        this._spritePath = this.getAttribute('sprite-path') || 'icons.svg';
    }
    render() {
        if (!this._name)
            return;
        const sizeValue = typeof this._size === 'number' ? `${this._size}px` : this._size;
        this.shadowRoot.innerHTML = `
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
export { SiIcon };
