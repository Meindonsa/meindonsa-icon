import SVGSpriter from 'svg-sprite';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const spriter = new SVGSpriter({
    dest: 'dist',
    mode: {
        symbol: {
            dest: '.',
            sprite: 'space-icons.svg',
            prefix: '.',
            dimensions: '',
            render: {
                css: {
                    dest: 'space-icons.css',
                    template: path.resolve(__dirname, 'src/tmpl.css')
                },
                scss: {
                    dest: 'space-icons.scss',
                    template: path.resolve(__dirname, 'src/tmpl.scss')
                }
            }
        }
    },
    shape: {
        id: {
            generator: '%s'
        },
        transform: [
            {
                svgo: {
                    plugins: [
                        {
                            name: 'preset-default',
                            params: {
                                overrides: {
                                    removeViewBox: false,
                                }
                            }
                        },
                        { name: 'convertColors', params: { currentColor: true } },
                        { name: 'removeAttrs', params: { attrs: '(style|class|data-name)' } }
                    ]
                }
            }
        ]
    }
});

const iconDir = path.resolve('icon');
if (!fs.existsSync(iconDir)) {
    fs.mkdirSync(iconDir);
    console.log('Dossier /icon créé. Ajoutez vos SVG dedans.');
    process.exit(0);
}

const files = fs.readdirSync(iconDir).filter(f => f.endsWith('.svg'));

files.forEach(file => {
    const filePath = path.join(iconDir, file);
    spriter.add(filePath, null, fs.readFileSync(filePath, 'utf-8'));
});

// Compilation
spriter.compile((error, result) => {
    if (error) return console.error(error);
    
    for (const mode in result) {
        for (const resource in result[mode]) {
            fs.mkdirSync(path.dirname(result[mode][resource].path), { recursive: true });
            fs.writeFileSync(result[mode][resource].path, result[mode][resource].contents);
        }
    }
    console.log('✨ Fichiers générés dans /dist (space-icons.css & space-icons.svg)');
});