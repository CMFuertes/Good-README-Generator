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

]).then(response => {
    console.log(response.user);
    console.log(response.userpassword);

    let data2Write = "";
    data2Write += "# Password File\n";
    data2Write += "\n";
    data2Write += "## User\n"; // heading #2
    data2Write += "\n";
    data2Write += `${response.user}\n`; // data under heading
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
    data2Write += "## License\n";
    data2Write += "\n";
    data2Write += `${response.license}\n`;
    data2Write += "\n";

    
    fs.writeFile('readme-out.md', data2Write, 'utf8', err => {
        if (err) return console.log(err);
        return console.log("We finished writing the file.");
    });

});