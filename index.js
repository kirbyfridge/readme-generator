// TODO: Include packages needed for this application
const inquirer = require("inquirer");
const fs = require("fs");
const generateMarkdown = require("./utils/generateMarkdown.js")

// TODO: Create an array of questions for user input
const questions = [

    // welcome message
    {
        type: "input",
        name: "welcome",
        message: "📝 Welcome to README generator! Press 'enter' to start."
    },

    // question to create project title
    // pressing enter allows the questions to start
    {
        type: "input",
        name: "title",
        message: "💡 Project title",
        validate: titleInput => {
            if (titleInput) {
                return true;
            } else {
                console.log("Please provide a title for your project!");
                return false;
            }
        }
    },

    // question to create project description
    // this is a required field. if not inputted by user, it will ask for user input again.
    {
        type: "input",
        name: "description",
        message: "📄 Project description",
        validate: descriptionInput => {
            if (descriptionInput) {
                return true;
            } else {
                console.log("Please provide a description for your project!");
                return false;
            }
        }
    },

    // question to add screenshot or demo
    // this is a required field. if not inputted by user, it will ask for user input again.
    {
        type: "list",
        name: "screenshotDemo",
        message: "📷 Provide a screenshot or demo?",
        choices: ["Screenshot", "Demo"],
        validate: ssDemoChoice => {
            if (ssDemoChoice) {
                return true;
            } else {
                console.log("Please choose whether you want to provide a screenshot or demo for your project!")
                return false;
            }
        }
    },

    {
        type: "list",
        name: "linkPic",
        message: "📷 Will your demo be shown as a video link or gif?",
        choices: ["Link", "Gif"],
        when: linkPicChoice => linkPicChoice.screenshotDemo === "Demo",
        validate: linkPicChoice => {
            if (linkPicChoice) {
                return true;
            } else {
                console.log("Please choose whether you want to provide a link or gif to display your demo!")
                return false;
            }
        }
    },

    // question to add image url of screenshot or demo
    // this is a required field. if not inputted by user, it will ask for user input again.
    {
        type: "input",
        name: "imageUrl",
        message: "🔗 URL of screenshot / demo",
        when: picChoice => picChoice.screenshotDemo == "Screenshot" || picChoice.linkPic == "Gif",
        validate: picUrlInput => {
            if (picUrlInput) {
                return true;
            } else {
                console.log("Please provide the image url of the screenshot / demo of your project!")
                return false;
            }
        }
    },

    // question to add url link of demo
    // this is a required field. if not inputted by user, it will ask for user input again.
    {
        type: "input",
        name: "linkUrl",
        message: "🔗 URL of demo",
        when: linkChoice => linkChoice.linkPic === "Link",
        validate: linkUrlInput => {
            if (linkUrlInput) {
                return true;
            } else {
                console.log("Please provide the link url of the demo of your project!")
                return false;
            }
        }
    },

    // question to add description of what is happening in the screenshot or demo provided
    // this is a required field. if not inputted by user, it will ask for user input again.
    {
        type: "input",
        name: "screenshotDemoDesc",
        message: "✨ Explaination of project screenshot / demo",

        validate: ssDemoDesc => {
            if (ssDemoDesc) {
                return true;
            } else {
                console.log("Please give a short explaination of what's happening in the screenshot / demo!")
                return false;
            }
        }
    },

    // question to see if there needs to be anything installed to use project
    // this field is optional
    {
        type: "confirm",
        name: "install",
        message: "📥 Any installation required?",
        default: false
    },

    // question to add installation instructions
    // this is a required field. if not inputted by user, it will ask for user input again.
    {
        type: "input",
        name: "installInst",
        message: "💿 Installation requirements",
        when: installConfirm => installConfirm.install === true,
        validate: installInput => {
            if (installInput) {
                return true;
            } else {
                console.log("Please provide the installation instructions for your project!")
                return false;
            }
        }
    },

    // question to add usage
    // this is a required field. if not inputted by user, it will ask for user input again.
    {
        type: "input",
        name: "usage",
        message: "📁 Project usage",
        validate: usageInput => {
            if (usageInput) {
                return true;
            } else {
                console.log("Please explain the usage of your project!")
                return false;
            }
        }
    },

    // question to confirm if tests are included
    // this field is optional
    {
        type: "confirm",
        name: "tests",
        message: "🧪 Includes tests?",
        default: false
    },

    // question to describe tests written & how to run them
    // this is a required field. if not inputted by user, it will ask for user input again.
    {
        type: "input",
        name: "testsDesc",
        message: "📋 Describe tests & how to run them",
        when: testsConfirm => testsConfirm.tests === true,
        validate: testInput => {
            if (testInput) {
                return true;
            } else {
                console.log("Please provide a description of your project's tests & how to run them!")
                return false;
            }
        }
    },

    // question to confirm if this project allows contributors 
    // this field is optional
    {
        type: "confirm",
        name: "contributors",
        message: "🤝 Allow contributors?",
        default: false
    },

    // question to describe how other users can contribute to the project
    // this is a required field. if not inputted by user, it will ask for user input again.
    {
        type: "input",
        name: "contributorsDesc",
        message: "👫 How to contribute",
        when: contributorsConfirm => contributorsConfirm.contributors === true,
        validate: contributorsInput => {
            if (contributorsInput) {
                return true;
            } else {
                console.log("Please describe how other users can contribute to the project!")
                return false;
            }
        }
    },

    // question to ask user's GitHub username
    // this is a required field. if not inputted by user, it will ask for user input again.
    {
        type: "input",
        name: "ghUsername",
        message: "👤 GitHub username",
        validate: githubUsernameInput => {
            if (githubUsernameInput) {
                return true;
            } else {
                console.log("Please provide your GitHub username!")
                return false;
            }
        }
    },

    // question to ask user's GitHub username
    // this is a required field. if not inputted by user, it will ask for user input again.
    {
        type: "input",
        name: "email",
        message: "📧 Email",
        validate: emailInput => {
            if (emailInput) {
                return true;
            } else {
                console.log("Please provide your email address!")
                return false;
            }
        }
    },

    // question to confirm if project is deployed on GitHub
    // this field is optional
    {
        type: "confirm",
        name: "pages",
        message: "🚀 Deploy your project on GitHub Pages?",
        default: false
    },

    // question to get repo name
    // this is a required field. if not inputted by user, it will ask for user input again.
    {
        type: "input",
        name: "repo",
        message: "✏️ Project repo name",
        validate: repoInput => {
            if (repoInput) { 
                return true;
            } else {
                console.log("Please provide the name of your GitHub repo!")
                return false;
            }
        }
    },

    // question to add license
    // this is a required field. if not inputted by user, it will ask for user input again.
    {
        type: "list",
        name: "license",
        message: "📃 License",
        choices: ["MIT", "Apache", "GPL", "BSD", "LGPL", "MPL", "None"],
        validate: licensingChoice => {
            if (licensingChoice) {
                return true;
            } else {
                console.log("You must choose a license for your project!");
                return false;
            }
        }
    },


];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, (error) => {
        if (error) {
            console.log("❌ Something went wrong... Try & create your README again.")
            throw error;
        } else {
            console.log("✔️ Success! Your project's README has been created! Please grab the README.md file from the generated folder before creating another.")
        }
    });
};



// TODO: Create a function to initialize app
function init() {
    inquirer.prompt(questions)
    .then(function (userInput) {
        writeToFile("./generated/README.md", generateMarkdown(userInput));
    });
};

// Function call to initialize app
init();