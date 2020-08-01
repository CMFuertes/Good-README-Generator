const inquirer = require('inquirer');
const api = require('./utils/api.js');
const md = require('./utils/generateMarkdown.js');
const fs = require('fs');

// array of questions for user
const questions = [
    {
        type: 'input',
        message: 'Please enter the title of your project',
        name: 'title',
    },
    {
        type: 'input',
        name: 'user',
        message: "What is your GitHub username?",
        validate: user => {
            if (user.length < 1 && user.length > 39) {
                return "User name must be between 1 and 39 characters, please try again.";
            }
            else if (user.startsWith("-", 0)) {
                return "Username cannot start with a dash";
            }
            else {
                return true;
            }
        }
    },
    {
        type: 'password',
        message: 'Please enter your password',
        name: 'pass',
        validate: pass => {
            if (pass.length < 8) {
                return "password is too short."
            }
            else if (pass.length > 32) {
                return "password is too long."
            }
            else {
                return true;
            }
        }
    },
    {
        type: 'input',
        name: 'reponame',
        message: 'What is your repository name?',
        validate: (reponame) => {
            if (reponame.length) {
                return true;
            }
            else {
                return 'Name invalid, please try again!';
            }
        }
    },
    {
        type: 'input',
        name: 'description',
        message: 'Please enter project description',
        validate: (description) => {
            if (description.length) {
                return true;
            }
            else {
                return 'Please enter a detailed description of the project.';
            }
        }
    },
    {
        type: 'checkbox',
        name: 'license',
        message: 'Which License is this project covered under?',
        choices: [
            "MIT",
            "APACHE 2.0",
            "GPL 3.0",
            "None",
        ]
    },

];

inquirer.prompt(questions).then(function(response){
    console.log(response);

    const readme = generateMarkdown.generateMarkdown(response);
    console.log(readme);
    // function to write README file
})
fs.writeFile('readme-out.md', readme, 'utf8', err => {
    if (err) return console.log(err);
    return console.log("We finished writing the file.");
});

// // function to initialize program
// function init() {

// }

// // function call to initialize program
// init();
