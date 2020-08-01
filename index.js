const inquirer = require('inquirer');
const fs = require ('fs');

inquirer.prompt([
    {
        type: 'input',
        message: 'Please enter the title of your project',
        name: 'projecttitle',
        validate: projecttitle => {
            if(projecttitle.length < 8){
                return "Project title is too short."
            }
            else if(projecttitle.length > 50){
                return "Project title is too long."
            }
            else{
            return true;
            }
        }
    },
{
    type:'input',
    message: "What is your username?",
    name: 'user',
    validate: user => {
        if(user.length < 10){
            return "username is too short";
        }
        else if (user.toLowerCase() != user){
            return "Username should be lowercase.";
        }
        else{
            //all validation checks passed
            return true;
        }
    }
},
{
    type: 'password',
    message: 'Please enter your password',
    name: 'august',
    validate: august => {
        if(august.length < 8){
            return "password is too short."
        }
        else if(august.length > 32){
            return "password is too long."
        }
        else{
        return true;
        }
    }
}
]).then( response => {
    console.log(response.user);
    console.log(response.august);

    // fs.writeFile('readme-out.md', JSON.stringify(response, null, 2), 'utf8', err => {
    //     if(err) return console.log(err);
    //     return console.log("We finished writing the file.");
    // });
let data2Write = "";
// data2Write += "# Password File\n";
data2Write += `# ${response.projecttitle}\n`
data2Write += "\n";
data2Write += "## User\n";
data2Write += "\n";
data2Write += `${response.user}\n`;
data2Write += "\n";
data2Write += "## Password\n";
data2Write += "\n";
data2Write += `${response.august}\n`;
data2Write += "\n";
    fs.writeFile('readme-out.md', data2Write, 'utf8', err => {
        if(err) return console.log(err);
        return console.log("We finished writing the file.");
    });

});