import SVGSpriter from 'svg-sprite';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const encodeSVG = (svg) => {
    return svg
        .replace(/"/g, "'")
        .replace(/%/g, '%25')
        .replace(/#/g, '%23')
        .replace(/{/g, '%7B')
        .replace(/}/g, '%7D')
        .replace(/</g, '%3C')
        .replace(/>/g, '%3E')
        .replace(/\s+/g, ' ');
};

const spriter = new SVGSpriter({
    dest: 'dist',
    mode: {
        symbol: { dest: '.', sprite: 'space-icons.svg' }
    },
    shape: {
        id: { generator: '%s' },
        transform: [{
            svgo: {
                plugins: [
                    'preset-default',
                    { name: 'removeViewBox', active: false },
                    { name: 'convertColors', params: { currentColor: true } },
                    { name: 'removeAttrs', params: { attrs: '(style|class|data-name)' } }
                ]
            }
        }]
    }
});

const iconDir = path.resolve(__dirname, 'icon');
const files = fs.readdirSync(iconDir).filter(f => f.endsWith('.svg'));

// Initialisation des contenus
let cssContent = `.si {
    display: inline-block;
    width: 1em;
    height: 1em;
    background-color: currentColor;
    -webkit-mask-size: contain;
    mask-size: contain;
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
    -webkit-mask-position: center;
    mask-position: center;
    vertical-align: middle;
}\n\n`;

let scssIconsMap = '$si-icons: (\n';

files.forEach(file => {
    const name = file.replace('.svg', '');
    const filePath = path.join(iconDir, file);
    const svgRaw = fs.readFileSync(filePath, 'utf-8');

    spriter.add(filePath, null, svgRaw);

    const encoded = encodeSVG(svgRaw);
    const dataUri = `data:image/svg+xml,${encoded}`;

    cssContent += `.si-${name} {
    -webkit-mask-image: url("${dataUri}");
    mask-image: url("${dataUri}");
}\n\n`;

    scssIconsMap += `    "${name}": "${dataUri}",\n`;
});

scssIconsMap += ');';

// Template SCSS final
const scssContent = `// Classe de base
.si {
    display: inline-block;
    width: 1em;
    height: 1em;
    background-color: currentColor;
    -webkit-mask-size: contain;
    mask-size: contain;
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
    -webkit-mask-position: center;
    mask-position: center;
    vertical-align: middle;
}

${scssIconsMap}

@each $name, $url in $si-icons {
    .si-#{$name} {
        -webkit-mask-image: url($url);
        mask-image: url($url);
    }
}
`;

spriter.compile((error, result) => {
    if (error) return console.error(error);

    fs.mkdirSync(path.resolve(__dirname, 'dist'), { recursive: true });

    fs.writeFileSync(path.resolve(__dirname, 'dist/space-icons.svg'), result.symbol.sprite.contents);

    fs.writeFileSync(path.resolve(__dirname, 'dist/space-icons.css'), cssContent);

    fs.writeFileSync(path.resolve(__dirname, 'dist/space-icons.scss'), scssContent);

    console.log('✨ Fichiers générés : SVG, CSS et SCSS sont prêts dans /dist !');
});