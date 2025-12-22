# 🌌 Meindonsa Icons

[![Version](https://img.shields.io/badge/version-0.0.1-blue.svg)](https://github.com/meindonsa/meindonsa-icon)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> An interstellar icon collection, powered by **Web Components**. Lightweight, universal, and ready to be deployed in any web ecosystem.

## 🚀 Why choose Space Icons?

- **📦 Universal** : Works with React, Vue, Angular, Svelte or pure HTML.
- **⚡ Performance** : Based on an SVG sprite system optimized to minimize network requests.
- **🎨 Flexible** : Native styling via CSS attributes or classes.
- **🛡️ Type-Safe** : Written entirely in TypeScript with definitions included.

---

## 🛠 Installation

Install le package from GitHub registry :

```bash
npm install @meindonsa/space-icon
```

## Usage

### Vue
Install utility for vite

```sh
 npm install -D vite-plugin-static-copy
```
then, add this configuration to your vite.config.ts
``` copy
plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith('si-')
        }
      }
    }),
    viteStaticCopy({
      targets: [
        {
          // On prend le sprite dans la lib
          src: 'node_modules/@meindonsa/space-icons/dist/space-icons.svg',
          // On le met à la racine du build (donc accessible via /space-icons.svg)
          dest: './'
        }
      ]
    })
  ]
```

### 🛠 Integration in HTML
Use the custom <si-icon> tag throughout your application:

```html
<!-- Taille par défaut (24px) -->
<si-icon name="home-house"></si-icon>

<!-- Taille et couleur personnalisées -->
<si-icon name="analytics-graph-chart" size="32" color="#6200ee"></si-icon>

<!-- Utilisation avec unités CSS (rem, em, %) -->
<si-icon name="alert-error" size="2.5rem" color="red"></si-icon>
```
### ⚙️ Configuration of Attributes

| Attribute | Type     | Default     | Description                |
|:----------| :------- | :------- | :------------------------- |
| `name`    | string | `-` | **Required**. icon name|
| `size`    | string \| number | `24` | Icon size  |
| `color`   | string | `currentColor` |Icon color. Allow css  |
| `css`     | string | `-` | Additional CSS classes for the internal SVG. |

## Development & Contribution
### Add a new icon
1. Place your `.svg` file in the `/icon` folder.
2. Start the build process :

```bash
npm run build
```
3. The script will automatically generate:
- The SVG sprite in /dist.
- Utility CSS/SCSS files. 
- The Web Component has been updated.

### Useful commands
- npm run build : Complete build (Assets + TypeScript). 
- npm run generate : Asset generation (SVG/CSS) only.

### Support

For support, email e.borisaxel@gmail.com.
### Authors

- [@Meindonsa](https://github.com/Meindonsa)