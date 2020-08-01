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
        type: 'input',
        name: 'reponame',
        message: 'What is your repository name?',
        validate: input => {
            const validStr = /^[a-z\d_-]{0,99}$/i;
            if(validStr.test(input)){
                return true;
            }
            return "Enter a valid repo name";
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
        message: 'How could someone contribute to your project?',
        name: 'contributors'
      },
    {
        type: 'input',
        name: 'license',
        message: 'How is the program licensed?',
    },

]).then(response => {

    let data2Write = "";
    data2Write += `# ${response.title}\n`;

    data2Write += `## Table Of Contents 
\n1) [Introduction](#user) 
\n2) [Description](#description)
\n3) [Installation](#installation)
\n4) [Usage](#usage)
\n5) [License](#license)
\n6) [Contributing](#contributing)
\n7) [Tests](#tests)
\n7) [Questions](#questions)`

    data2Write += "\n";
    data2Write += "## User\n";
    data2Write += "\n";
    data2Write += `${response.user}\n`; 

    data2Write += "\n";
    data2Write += "## Email\n";
    data2Write += "\n";
    data2Write += `${response.email}\n`; 

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
    data2Write += "## Usage\n";
    data2Write += "\n";
    data2Write += `${response.howtouse}\n`;

    data2Write += "\n";
    data2Write += "## Tests\n";
    data2Write += "\n";
    data2Write += `${response.test}\n`;

    data2Write += "\n";
    data2Write += "## Contributing\n";
    data2Write += "\n";
    data2Write += `${response.contributors}\n`;

    data2Write += "\n";
    data2Write += "## Questions\n";
    data2Write += "\n";
    data2Write += `If you have any questions, please contact ${response.user} at ${response.email}`;


    data2Write += "\n";
    data2Write += "## License\n";
    data2Write += "\n";
    data2Write += `${response.license}\n`;
    data2Write += "\n";

    data2Write += `![GitHub](https://img.shields.io/github/license/${response.user}/${response.reponame})`

    
    fs.writeFile('newreadme.md', data2Write, 'utf8', err => {
        if (err) return console.log(err);
        return console.log("We finished writing the file.");
    });

});