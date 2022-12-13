// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) {
  if (license !== "None") {
    return `![](https://img.shields.io/badge/license-${license}-green?style=flat-square)`
  } else {
    return "";
  }
};

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) {
  if (license !== "None") {
    return `
- [License](#License)`
  } else {
    return "";
  }
}

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {
  if (license !== "None") {
    return `## License

    This application is covered by the ${license} license.`
  } else {
    return "";
  }
}

// renders image of screenshot or demo
function renderPicLink(imageUrl) {
  if (imageUrl !== undefined) {
    return `![](${imageUrl})`
  } else {
    return "";
  }
}

// renders link of demo video
function renderDemoLink(linkUrl) {
  if (linkUrl !== undefined) {
    return `  🔗 ${linkUrl}`
  } else {
    return "";
  }
}

// renders table of contents link of the installation section
function renderInstallLink(install) {
  if (install !== false) {
    return `
- [Installation](#Installation)`
  } else {
    return "";
  }
}


// renders installation section
function renderInstallInfo(installInst) {
  if (installInst !== undefined) {
    return `## Installation

    ${installInst}
    
    `
  } else {
    return "";
  }
}

// renders table of contents link of the tests section
function renderTestLink(tests) {
  if (tests !== false) {
    return `
- [Tests](#Tests)`
  } else {
    return "";
  }
}

// renders tests section
function renderTestInfo(testsDesc) {
  if (testsDesc !== undefined) {
    return `## Tests

    ${testsDesc}
    
    `
  } else {
    return "";
  }
}

// renders table of contents link of the contributing section
function renderContrLink(contributors) {
  if (contributors !== false) {
    return `
- [Contributing](#Contributing)`
  } else {
    return "";
  }
}

// renders contributing section
function renderContrInfo(contributorsDesc) {
  if (contributorsDesc !== undefined) {
    return `## Contributing

    ${contributorsDesc}
    
    `
  } else {
    return "";
  }
}

// renders table of contents link of the pages section
function renderPagesLink(pages) {
  if (pages !== false) {
    return `
- [Pages](#Pages)`
  } else {
    return "";
  }
}

// renders pages section
function renderGHpages(pages, ghUsername, repo) {
  if (pages !== false) {
    return `## Pages

You can view the deployed application at the link below. 

🔗 https://${ghUsername}.github.io/${repo}

`
  } else {
    return "";
  }
}

// TODO: Create a function to generate markdown for README
// creates each section of the readme 
function generateMarkdown(data) {
  return `# ${data.title}

${renderLicenseBadge(data.license)} 
![](https://img.shields.io/github/repo-size/${data.ghUsername}/${data.repo}?style=flat-square) 
![](https://img.shields.io/github/languages/top/${data.ghUsername}/${data.repo}?style=flat-square) 
![](https://img.shields.io/github/last-commit/${data.ghUsername}/${data.repo}?style=flat-square) 
![](https://img.shields.io/github/issues/${data.ghUsername}/${data.repo}?style=flat-square)


## Description

${data.description}


## Table of Contents

- [${data.screenshotDemo}](#${data.screenshotDemo}) ${renderInstallLink(data.install)}
- [Usage](#Usage) ${renderTestLink(data.tests)} ${renderContrLink(data.contributors)}
- [Questions](#Questions) ${renderPagesLink(data.pages)} ${renderLicenseLink(data.license)}


## ${data.screenshotDemo}

${data.screenshotDemoDesc}

${renderPicLink(data.imageUrl)} ${renderDemoLink(data.linkUrl)} 


${renderInstallInfo(data.installInst)}
## Usage

${data.usage}


${renderTestInfo(data.testsDesc)}
${renderContrInfo(data.contributorsDesc)}
## Questions

Got any questions about this application? Contact me!

Github: 
🔗 https://github.com/${data.ghUsername}/

Email: 
🔗 ${data.email}


${renderGHpages(data.pages, data.ghUsername, data.repo)}
${renderLicenseSection(data.license)}`;
}

module.exports = generateMarkdown;