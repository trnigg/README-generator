// TODO: Include packages needed for this application
var inquirer = require('inquirer');
var fs = require('fs');
// const generateMarkdown = require('./utils/generateMarkdown');


// GLOBAL VARIABLES for console text colours. Combined Module 9 Activity 22 with guide here: 
// https://dev.to/ifenna__/adding-colors-to-bash-scripts-48g4
const redTextCol = '\x1b[31m';
const greenTextCol = '\x1b[32m';
const yellowTextCol = '\x1b[33m';
const endTextCol = '\x1b[0m';


const instructions = "You will be asked a number of questions to help generate your README. Questions with answer that default to N/A can be skipped (left blank) and subsequently won't generate the relevant section in your README."
const confirmInstructions = 
    {
        type: 'confirm',
        name: 'understood',
        message: 'Please confirm you understand and wish to continue:',
    };


// TODO: Create an array of questions for user input
const readmeQuestions = [
    {
        type: 'input',
        name: 'title',
        message: 'What is the title of your project?',
    },
    {
        type: 'input',
        name: 'description',
        message: 'Please briefly describe your project:',
    },
    {
        type: 'checkbox',
        name: 'languages',
        message: 'What languages do you know?',
        choices: ['HTML', 'CSS', 'JavaScript', 'English', 'LOTE']
    },
    {
        type: 'input',
        name: 'github',
        message: 'What is your GitHub username?',
    },
];


function askQuestions() {
    inquirer
    .prompt(confirmInstructions)
    .then((response) => {
        if (response.understood) {
            console.log(`${greenTextCol}Thank you.${endTextCol}`);
            inquirer
            .prompt(readmeQuestions)
            .then((response) =>
                console.log(response));
        } else {
            console.log(`${redTextCol}Ending the README generator.${endTextCol} Please feel free to start again by entering ${yellowTextCol}'node index.js'${endTextCol} in your console.`);
            return;
        }
    }
        
    );
  
    function generateHTML(response) {
        let languagesList = '';
    
        // Loop through the selected languages and create a list item for each
        for (const language of response.languages) {
            languagesList += `<li>${language}</li>`;
        }
        return `
        `
    }
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
