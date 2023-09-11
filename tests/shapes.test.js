const Generator = require('../lib/shapes.js'); 
const inquirer = require('inquirer');

jest.mock('inquirer');

describe('Generator', () => {
    test('generateLogo should generate an SVG file', async () => {
        inquirer.prompt = jest.fn()
            .mockResolvedValueOnce({
                text: 'ABC',
                textColor: 'blue',
                shape: 'circle',
                shapeColor: 'red'
            });
        const consoleLogMock = jest.spyOn(console, 'log');
        consoleLogMock.mockImplementation(() => {});

        const generator = new Generator();

        await generator.generateLogo();

        expect(consoleLogMock).toHaveBeenCalledWith('Generated logo.svg');
        
        consoleLogMock.mockRestore();
    });
    test('Shape should change color', async() =>{
        inquirer.prompt = jest.fn()
            .mockResolvedValueOnce({
                text: 'ABC',
                textColor: 'blue',
                shape: 'circle',
                shapeColor: 'red'
            });
        const shapeColor = jest.spyOn(console, 'log')
        shapeColor.mockImplementation(() => {});

        const generator = new Generator();

        await generator.generateLogo();

        expect(shapeColor).toHaveBeenCalledWith(`Generated ShapeColor red`);
        
        shapeColor.mockRestore();
    })
    test('Shape should change color', async() =>{
        inquirer.prompt = jest.fn()
            .mockResolvedValueOnce({
                text: 'ABC',
                textColor: 'blue',
                shape: 'circle',
                shapeColor: 'red'
            });
        const textColor = jest.spyOn(console, 'log')
        textColor.mockImplementation(() => {});

        const generator = new Generator();

        await generator.generateLogo();

        expect(textColor).toHaveBeenCalledWith(`Generated textColor blue`);
        
        textColor.mockRestore();
    })
});


