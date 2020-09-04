const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


let allStarTeam = [];

// console.log("Welcome to the team, please follow the set of questions that are presented to you.");
// Set of Questions for Employee who are ready to start!
const employeeQuestions = [
    // Tests to run for Employee's
    {
        type: "input",
        message: "What's the employee's name?",
        name: "name"
    },

    {
        type: "input",
        message: "What's the ID of the employee?",
        name: "id"
    },

    {
        type: "input",
        message: "What's your direct email of the employee?",
        name: "email"
    },
];

//Managers are you ready!
const questionForManager = [
    {
        type: "input",
        message: "What your direct contact number to your office?",
        name: "officeNumber"
    },
    {
        type: "checkbox",
        message: "How many employee's have you managed in your experience?",
        choices: ["1-25", "26-50", "51-75", "76+"],
        name: "managed"
    },
    {
        type: "list",
        message: "What kind of team memeber would you like to add?",
        choices: ["intern", "engineer", "manager", "n/a"],
        name: "add"
    }

];

// Intern's we want to know about you!
const questionForIntern = [{
    type: "input",
    message: "What is the name of your school?",
    name: "school"
},
{
    type: "input",
    message: "If hired full-time, what would be your short term/long term goals in the company",
    name: "perseverance"

},
{
    type: "list",
    message: "What kind of team memeber would you like to add?",
    choices: ["intern", "engineer", "manager", "n/a"],
    name: "add"
}

];

// Geeks talk to us about your passion!
const questionForEngineer = [{
    type: "input",
    message: "What is your GitHub username?",
    name: "github"
},
{
    type: "list",
    message: "What kind of team memeber would you like to add?",
    choices: ["intern", "engineer", "manager", "n/a"],
    name: "add"
}
];

// Oh no, need new members?
const askForEmployees = {
    type: "when",
    name: "HireorFired",
    message: "Anyone new or let go from the allStar team?",
    default: false
};

function addManager() {
    //Manager questions
    let managerQuestions = [...employeeQuestions, ...questionForManager]
    inquirer.prompt(managerQuestions).then(data => {
        let manager = new Manager(data.name, data.id, data.email, data.officeNumber, data.managed)
        allStarTeam.push(manager)
        console.log(allStarTeam)
        switch (data.add) {
            case "intern":
                addIntern()
                break;
            case 'engineer':
                addEngineer()

                break;
            case 'manager':
                addManager()
            case 'n/a':
                mainHTML()

        }
    })
}


function addIntern() {
    // Intern questions
    let internQuestions = [...employeeQuestions, ...questionForIntern]
    inquirer.prompt(internQuestions).then(data => {
        let intern = new Intern(data.name, data.id, data.email, data.school, data.perseverances)
        allStarTeam.push(intern)
        console.log(allStarTeam)
        switch (data.add) {
            case "intern":
                addIntern()
                break;
            case 'engineer':
                addEngineer()
                break;
            case 'manager':
                addManager()
            case 'n/a':
                mainHTML()

        }
    })
}

function addEngineer() {
    // Engineer questions
    let engineerQuestions = [...employeeQuestions, ...questionForEngineer]
    inquirer.prompt(engineerQuestions).then(data => {
        let engineer = new Engineer(data.name, data.id, data.email, data.github)
        allStarTeam.push(engineer)
        console.log(allStarTeam)
        switch (data.add) {
            case "intern":
                addIntern()
                break;
            case 'engineer':
                addEngineer()
                break;
            case 'manager':
                addManager()
            case 'n/a':
                mainHTML()

        }
    })
}

//creates an async function to check if user wanted to add more employees
// Refer to hired/fired statement.
async function checkForEmployees() {
    try {
        const checkForMore = await inquirer.prompt(askForEmployees);
        if (checkForMore.HireorFired) {
            await createTeam();
        }
        return team;
    } catch (err) {
        console.log("Any err for: checkForEmployees Function");
    }
}

//async function
async function mainHTML() {

    //write to fs
    //use parameters 
    fs.writeFile("test.html", render(allStarTeam), error => {
        if (error) throw error;
        console.log("You have successfully generated a new member!");
    });
}

addManager()