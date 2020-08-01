const inquirer = require('inquirer');
const fs = require('fs');

inquirer.prompt([
    {
        type: 'input',
        message: 'Please enter the title of your project',
        name: 'title',
        validate: title => {
            if (title.length < 8) {
                return "Project title is too short."
            }
            else if (title.length > 50) {
                return "Project title is too long."
            }
            else {
                return true;
            }
        }
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

]).then(response => {
    console.log(response.user);
    console.log(response.pass);

    // fs.writeFile('readme-out.md', JSON.stringify(response, null, 2), 'utf8', err => {
    //     if(err) return console.log(err);
    //     return console.log("We finished writing the file.");
    // });
    let data2Write = "";
    data2Write += "# Password File\n";
    data2Write += "\n";
    data2Write += "## User\n"; // heading #2
    data2Write += "\n";
    data2Write += `${response.user}\n`; // data under heading
    data2Write += "\n";
    data2Write += "## Password\n";
    data2Write += "\n";
    data2Write += `${response.pass}\n`;
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