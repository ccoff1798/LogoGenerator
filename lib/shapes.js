const fs = require('fs');
const inquirer = require('inquirer');
const puppeteer = require('puppeteer');

class Generator{
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

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setContent(`
        <svg width="300" height="200">
            <rect x="50" y="50" width="200" height="100" fill="${shapeColor}" />
            <text x="10" y="190" fill="${textColor}">${text}</text>
        </svg>
    `);

    const svg = await page.evaluate(() => document.querySelector('svg').outerHTML);

    await browser.close();

    fs.writeFileSync('logo.svg', svg);
    console.log('Generated logo.svg');
}
}

module.exports = Generator
