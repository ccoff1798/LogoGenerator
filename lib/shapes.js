const fs = require('fs');
const inquirer = require('inquirer');
const puppeteer = require('puppeteer');

function getShape(shape, shapeColor) {
    switch (shape) {
        case 'circle':
            return `<circle cx="150" cy="100" r="50" fill="${shapeColor}" />`;
        case 'triangle':
            return `<polygon points="150,50 100,150 200,150" fill="${shapeColor}" />`;
        case 'square':
            return `<rect x="50" y="50" width="200" height="100" fill="${shapeColor}" />`;
        default:
            return '';
    }
}

class Generator {
    async generateLogo() {
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

        const browser =await puppeteer.launch({headless: false});
        const page = await browser.newPage();


        await page.setContent(`
            <svg width="300" height="200">
             ${getShape(shape, shapeColor)}
             <text x="125" y="100" font-family="Verdana" font-size="35" fill=${textColor}>${text}</text>
            </svg>
        `);



        const svg = await page.evaluate(() => document.querySelector('svg').outerHTML);

        await browser.close();

        fs.writeFileSync('logo.svg', svg);
        console.log('Generated logo.svg');
        console.log(`Generated ShapeColor ${shapeColor}`)
        console.log(`Generated textColor ${textColor}`)
    }
}

module.exports = Generator
