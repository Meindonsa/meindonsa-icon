const fs = require('fs');
const path = require('path');

const svgDir = path.join(__dirname, 'icon');
const outFile = path.join(__dirname, 'src', 'meindonsa-icon.css');

const files = fs.readdirSync(svgDir).filter((f) => f.endsWith('.svg'));

let css = `.mei {
  display: inline-block;
  width: 1em;
  height: 1em;
  fill: currentColor;
  vertical-align: middle;
}\n\n`;

files.forEach((f) => {
    const name = f.replace('.svg','');
    css += `.mei-${name} {\n`;
    css += `  mask: url("icons.svg#${name}") no-repeat center;\n`;
    css += `  -webkit-mask: url("icons.svg#${name}") no-repeat center;\n`;
    css += `  background-color: currentColor;\n`;
    css += `}\n\n`;
});

fs.writeFileSync(outFile, css);
console.log('icons.css généré avec succès !');
