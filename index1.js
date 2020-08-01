const inquirer = require('inquirer');
const fs = require('fs');

inquirer.prompt([
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
        type: "input",
        message: "Describe what installations are needed to run the project",
        name: "installation"
      },
      {
        type: 'input',
        message: 'How would someone use your project?',
        name: 'howtouse'
      },
      {
        type: 'input',
        message: 'What tests were run?',
        name: 'test'
      },
    {
        type: 'input',
        name: 'license',
        message: 'How is the program licensed?',
    },

]).then(response => {
    console.log(response.user);
    console.log(response.userpassword);

    let data2Write = "";
    data2Write += `# ${response.title}\n`;

    data2Write += "\n";
    data2Write += "## User\n";
    data2Write += "\n";
    data2Write += `${response.user}\n`; 

    data2Write += "\n";
    data2Write += "## Password\n";
    data2Write += "\n";
    data2Write += `${response.userpassword}\n`;

    data2Write += "\n";
    data2Write += "## Repository Name\n";
    data2Write += "\n";
    data2Write += `${response.reponame}\n`;

    data2Write += "\n";
    data2Write += "## Description\n";
    data2Write += "\n";
    data2Write += `${response.description}\n`;

    data2Write += "\n";
    data2Write += "## Installation\n";
    data2Write += "\n";
    data2Write += `${response.installation}\n`;

    data2Write += "\n";
    data2Write += "## How To Use\n";
    data2Write += "\n";
    data2Write += `${response.howtouse}\n`;

    data2Write += "\n";
    data2Write += "## Tests Needed\n";
    data2Write += "\n";
    data2Write += `${response.test}\n`;


    data2Write += "\n";
    data2Write += "## License\n";
    data2Write += "\n";
    data2Write += `${response.license}\n`;

    data2Write += `![GitHub](https://img.shields.io/github/license/${response.user}/${response.reponame})`




    
    fs.writeFile('newreadme.md', data2Write, 'utf8', err => {
        if (err) return console.log(err);
        return console.log("We finished writing the file.");
    });

});