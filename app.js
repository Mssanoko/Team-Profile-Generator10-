const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const render = require("./lib/htmlRenderer");

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const employees = [];

function addMember() {
   
   inquirer.prompt([{
         message: "Enter team member's name: ",
         name: "name"
      },
      {
         type: "list",
         message: "Select team member's role: ",
         choices: [
               "Manager",
               "Engineer",
               "Intern"
         ],
         name: "role"
      },
      {
         message: "Enter team member's ID: ",
         name: "id"
      },
      {
         message: "Enter team member's email address: ",
         name: "email"
      }
   ]).then(function ({ name, role, id, email }) {

         let infoType;

         if (role === "Manager") {
            infoType = "office phone number";
         } else if (role === "Engineer") {
            infoType = "GitHub username";
         } else {
            infoType = "school name";
         }

         inquirer.prompt([
            {
               message: `Enter team member's ${infoType}: `,
               name: "info"
            },
            {
               type: "list",
               message: "Would you like to add more team members?",
               choices: [
                     "yes",
                     "no"
               ],
               name: "moreMembers"
            }
         ]).then(function ({ info, moreMembers }) {
               let newMember;

               if (role === "Engineer") {
                  newMember = new Engineer(name, id, email, info);
               } else if (role === "Intern") {
                  newMember = new Intern(name, id, email, info);
               } else {
                  newMember = new Manager(name, id, email, info);
               }

               employees.push(newMember);
               
               if (moreMembers === "yes") {
                  addMember();
               } else {
                  createHtml();
               }
         });
   
   });
}

function createHtml() {

   const htmlPage = render(employees);

   if (!fs.existsSync(OUTPUT_DIR)){
      console.log(`'output' folder does not exist. Creating it now ...`)
      fs.mkdirSync(OUTPUT_DIR);
   } else {
      console.log(`output folder already exists.`);
   }

   fs.writeFile(outputPath, htmlPage, function (err) {
      if (err) {
           console.log(`Failed to create file - ${outputPath}. Error - ${err}`);
      } else {
         console.log(`Successfully created html file - ${outputPath}`);
      }      
   });

}

function main(){

   console.log("Get team's members information and generate an HTML file");
   console.log("-------------------------------------------------------------")
   addMember();

}

main();
