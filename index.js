// MODULES required for this application
var inquirer = require('inquirer');
var fs = require('fs');
const generateMarkdown = require('./assets/utils/generateMarkdown');

// GLOBAL VARIABLES 
// Object for console text colours. Combined Module 9 Activity 22 with colour numbers found here: 
// https://dev.to/ifenna__/adding-colors-to-bash-scripts-48g4
const textColors = {
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    grey: '\x1b[90m',
    end: '\x1b[0m',
};
// Array for use in list question
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
// Variable to be printed to consoles + object of corresponding question
const instructions = "You will be asked a number of questions to help generate your README; all questions must be answered."
const confirmInstructions = 
    {
        type: 'confirm',
        name: 'understood',
        message: 'Please confirm that you understand and wish to continue:',
        default: false, 
    };

// Array of Question Objects to be used by Inquirer
    // Following guides is comprehensive account (beyond the docs) of how to use Inquirer: 
    // https://javascript.plainenglish.io/how-to-inquirer-js-c10a4e05ef1f
    // Also helpful: https://geshan.com.np/blog/2023/03/inquirer-js/ 
    // This was helpful in introducing 'validate' and 'when' keys.
const readmeQuestions = [
    {
        type: 'input',
        name: 'title',
        message: 'What is the title of your project?',
        validate: (title) => (title.length ? true : 'Cannot be left blank. Please enter a title.'),
    },
    {
        type: 'input',
        name: 'username',
        message: 'What is your GitHub username?',
        validate: (username) => (username.length ? true : 'Cannot be left blank. Please enter your GitHub username.'),
    },
    {
        type: 'confirm',
        name: 'includeEmail',
        default: false,
        message: 'Would you like to provide your email address as a point of contact?',
    },
    {
        type: 'input',
        name: 'email',
        message: 'Please provide your email address:',
        when: (responses) => responses.includeEmail,
        validate: (email) => (email.length ? true : 'Cannot be left blank. Please enter your email address.'),
    },
    {
        type: 'input',
        name: 'description',
        message: 'Please enter a brief description of your project:',
        validate: (description) => (description.length ? true : 'Cannot be left blank. Please enter a brief description of your project.'),
    },
    {
        type: 'input',
        name: 'installation',
        message: 'Please briefly explain the installation process for your project:',
        validate: (installation) => (installation.length ? true : 'Cannot be left blank. Please briefly explain the installation process.'),
    },
    {
        type: 'input',
        name: 'usage',
        message: 'Please briefly explain how to use the application/project:',
        validate: (usage) => (usage.length ? true : 'Cannot be left blank. Please enter a brief guide for usage.'),
    },
    {
        type: 'confirm',
        name: 'hasTests',
        default: false,
        message: 'Does your project include any tests?',
    },
    {
        type: 'input',
        name: 'tests',
        message: 'Please briefly describe how to run the tests for your project:',
        when: (responses) => responses.hasTests,
        validate: (tests) => (tests.length ? true : 'Cannot be left blank. Please explain how someone can run the tests for your project.'),
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
        message: 'Please briefly describe how someone may contribute to your project:',
        when: (responses) => responses.acceptingContribution,
        validate: (contribution) => (contribution.length ? true : 'Cannot be left blank. Please describe how someone may contribute to your project.'),
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
        message: 'Please select the license that applies to your project from the following:',
        choices: licenseArray,
        default: 'MIT',
        when: (responses) => responses.includeLicense,
    },
];

// FUNCTION To ask the questions above via the console using Inquirer
    // TODO in future: seperate Confirm event and Question event into seperate functions
function askQuestions() {
    inquirer
        // Nested Promise first asks uses to confirm instructions
        .prompt(confirmInstructions)
        .then((confirmResponse) => {
            // IF Instructions are confirmed/understood, THEN display message and begin asking Questions defined above
            if (confirmResponse.understood) {
                console.log(`${textColors.green}Thank you.${textColors.end}`);
                inquirer
                    // Ask questions THEN call function with response data
                    .prompt(readmeQuestions)
                    .then((responses) => writeToFile(responses));
            // ELSE Instructions are NOT confirmed/understood, THEN display message and end sequence
        } else {
                console.log(`${textColors.red}Ending the README generator.${textColors.end}\nPlease feel free to start again by entering ${textColors.yellow}node index.js${textColors.end} in your console.`);
                return;
            }
        });
}


// FUNCTION to handles responses and write to file using 'fs' module and own 'generateMarkdown' module
function writeToFile(responses) {
    fs.writeFile('yourREADME.md', generateMarkdown(responses), (err) => {
        if (err) {
          console.error('Error writing your README file:', err);
        } else {
          console.log(`${textColors.yellow}yourREADME.md${textColors.end} ${textColors.green}was successfully generated.${textColors.end}`);
        }
      });
}

// FUNCTION to initialise app by logging instuctions and calling questions
function init() {
    console.log(instructions);
    askQuestions();
}

// CALL to initialise app
init();