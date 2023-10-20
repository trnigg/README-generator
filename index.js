// TODO: Include packages needed for this application
var inquirer = require('inquirer');
var fs = require('fs');
// const generateMarkdown = require('./utils/generateMarkdown');


// GLOBAL VARIABLES for console text colours. Combined Module 9 Activity 22 with colour numbers found here: 
// https://dev.to/ifenna__/adding-colors-to-bash-scripts-48g4
const textColors = {
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    grey: '\x1b[90m',
    end: '\x1b[0m',
};


const licenseArray = [
    'GNU AGPLv3',
    'GNU GPLv3',
    'GNU LGPLv3',
    'Mozilla Public License 2.0',
    'Apache License 2.0',
    'MIT License',
    'Boost Software License 1.0',
    'The Unlicense'
];

const instructions = "You will be asked a number of questions to help generate your README; all questions must be answered."
const confirmInstructions = 
    {
        type: 'confirm',
        name: 'understood',
        message: 'Please confirm that you understand and wish to continue:',
        default: false,
        // validate: (understood) => {
        //     if (understood !== 'y' || understood !== 'n') {
        //       return 'Cannot be left blank. Please enter a title.'
        //     }
        //     return true;
        // } 
    };

// TODO [TN]: Confirm arrows are okay within this array/objects
// FIX validation for 'confirm questions'
const readmeQuestions = [
    {
        type: 'input',
        name: 'title',
        message: 'What is the title of your project?',
        validate: (title) => {
            if (!title.length) {
              return 'Cannot be left blank. Please enter a title.'
            }
            return true;
        } 
    },
    {
        type: 'input',
        name: 'username',
        message: 'What is your GitHub username?',
        validate: (username) => {
            if (!username.length) {
              return 'Cannot be left blank. Please enter a username.'
            }
            return true;
        } 
    },
    {
        type: 'input',
        name: 'description',
        message: 'Please briefly describe your project:',
        validate: (description) => {
            if (!description.length) {
              return 'Cannot be left blank. Please enter a description.'
            }
            return true;
        } 
    },
    {
        type: 'input',
        name: 'installation',
        message: 'Please briefly describe how to install the application:',
        validate: (installation) => {
            if (!installation.length) {
              return 'Cannot be left blank. Please enter an installation guide.'
            }
            return true;
        } 
    },
    {
        type: 'input',
        name: 'usage',
        message: 'Please briefly describe how to use the application:',
        validate: (usage) => {
            if (!usage.length) {
              return 'Cannot be left blank. Please enter a usage guide.'
            }
            return true;
        } 
    },
    {
        type: 'confirm',
        name: 'acceptingContribution',
        default: false,
        message: 'Are you currently looking for contributions to your project?',
    },
    {
        type: 'input',
        name: 'contribution',
        message: 'Please briefly describe how someone can contribute to your project:',
        when: (responses) => responses.acceptingContribution,
    },
    {
        type: 'confirm',
        name: 'includeLicense',
        default: false,
        message: 'Does your project have a license?',
    },
    {
        type: 'list',
        name: 'licenseType',
        message: 'Please select the license that applies to your project:',
        choices: licenseArray,
        default: 'MIT',
        when: (responses) => responses.includeLicense,
    },
];

// Following guides is comprehensive account (beyond the docs) of how to use Inquirer: 
// https://javascript.plainenglish.io/how-to-inquirer-js-c10a4e05ef1f
// Also helpful: https://geshan.com.np/blog/2023/03/inquirer-js/ 

function askQuestions() {
    inquirer
    .prompt(confirmInstructions)
    .then((confirmResponse) => {
        if (confirmResponse.understood) {
            console.log(`${textColors.green}Thank you.${textColors.end}`);
            inquirer
            .prompt(readmeQuestions)
            .then((responses) =>
                console.log(responses));
        } else {
            console.log(`${textColors.red}Ending the README generator.${textColors.end} Please feel free to start again by entering ${textColors.yellow}'node index.js'${textColors.end} in your console.`);
            return;
        }
    });
}






// TODO: Create a function to write README file
function writeToFile(fileName, data) {}

// TODO: Create a function to initialize app
function init() {
    console.log(instructions);
    askQuestions();
}

// Function call to initialize app
init();
