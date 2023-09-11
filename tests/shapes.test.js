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
});
