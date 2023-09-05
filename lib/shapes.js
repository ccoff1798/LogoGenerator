const fs = require('fs');
const inquirer = require('inquirer');
const SVG = require('svg.js');

async function generateLogo() {
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'text',
            message: 'Enter text (up to three characters):'
        },
        {
            type: 'input',
            name: 'textColor',
            message: 'Enter text color (keyword or hexadecimal):'
        },
        {
            type: 'list',
            name: 'shape',
            message: 'Choose a shape:',
            choices: ['circle', 'triangle', 'square']
        },
        {
            type: 'input',
            name: 'shapeColor',
            message: 'Enter shape color (keyword or hexadecimal):'
        }
    ]);

    const { text, textColor, shape, shapeColor } = answers;

    const draw = SVG().size(300, 200);

    if (shape === 'circle') {
        draw.circle(100).move(100, 50).fill(shapeColor);
    } else if (shape === 'triangle') {
        draw.polygon([[150, 50], [100, 150], [200, 150]]).fill(shapeColor);
    } else if (shape === 'square') {
        draw.rect(100, 100).move(100, 50).fill(shapeColor);
    }

    draw.text(text).move(10, 190).fill(textColor);

    fs.writeFileSync('logo.svg', draw.svg());
    console.log('Generated logo.svg');
}

generateLogo();
