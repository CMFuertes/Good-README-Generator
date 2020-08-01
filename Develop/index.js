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
    },
    {
        type: "input",
        message: "What is your GitHub email?",
        name: "email", 
        validate: function(value) {
         var pass = value.match
         (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
         if (pass) {
            return true;
          }
            return 'Please enter a valid email address'   
        },
      },
    {
        type: 'password',
        message: 'Please enter your password',
        name: 'userpassword',
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

    const content = md.generateMarkdown(response);

    writeToFile('README.md', content);


});

function writeToFile(filename, data) {
    fs.writeFile(fileName, data, function(error) {
        if(error) console.log(error);
        else console.log('Success!');
      });

}