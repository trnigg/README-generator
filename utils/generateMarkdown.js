// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
// [TR] TODO: Refactor method, abbrev. license names
function renderLicenseBadge(license) {
  const licenseBadges = {
    'GNU AGPLv3': 'AGPL_3.0' ,
    'GNU GPLv3': 'GPL_3.0',
    'GNU LGPLv3': 'LGPL_3.0' ,
    'Mozilla Public License 2.0': 'MPL_2.0' ,
    'Apache License 2.0' : 'Apache_2.0' ,
    'MIT License' : 'MIT' ,
    'Boost Software License 1.0' : 'BSL_1.0' ,
    'The Unlicense' : 'Unlicense' ,
  } // Check if license is a key within object of licenseBadges and get the resulting badge URL and combine with link
  if (licenseBadges[license]) {
  return `[![${license}](https://img.shields.io/badge/License-${licenseBadges[license]}-blue)](#license)`;
  } 
  return '';
}

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) {
  const licenseLink = 'https://choosealicense.com/licenses/';
  const licenseAppendages = {
    'GNU AGPLv3': 'agpl-3.0/',
    'GNU GPLv3': 'gpl-3.0/',
    'GNU LGPLv3': 'lgpl-3.0/',
    'Mozilla Public License 2.0': 'mpl-2.0/',
    'Apache License 2.0' : 'apache-2.0/',
    'MIT License' : 'mit/',
    'Boost Software License 1.0' : 'bsl-1.0/',
    'The Unlicense' : 'unlicense/',
  }
  // Check if license is a key within object of linkAppendages and get the resulting appendage and combine with link
  if (licenseAppendages[license]) {
    //TODO : rather than template literal, add the appendage to the relevant license link
    //maybe : licenseLink += licenseAppendages[license] - need to test before implementation
    return `[${license}](${licenseLink}${licenseAppendages[license]})`;
  }
  return '';
}

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {
  if (license) {
    return `
    ## License
    This project is licensed under ${renderLicenseLink(license)}.
    `;
  }
  return '';
}

// function renderDescriptionSection(description) {
//   return ` ## Description
//   ${description}
//   `;
// }

function renderTableOfContents(data) {
  let tableofContents = `
  - [Installation](#installation)
  - [Usage](#usage)
  `;
  if (data.includeLicense) {
    tableofContents += '- [License](#license)';
  }
  tableofContents += `
  - [Contribution](#contribution) 
  - [Tests](#tests)
  - [Questions](#questions)
  `;
  return tableofContents;
}

function renderContributionSection(data) {
  if (data.acceptingContribution) {
    return `${data.contribution}`;
  }
  return `Thank you for your interest. However, I am not currently looking for any contributions towards this project.`;
}

function renderQuestionsSection(username) {
  return `For any questions or feedback, please reach out to me on GitHub at [${username}](https://github.com/${username})`;
}






// TODO: Create a function to generate markdown for README
function generateMarkdown(data) {
  // Declare and trim leading/trailing whitespaces for better readme (esp. when empty strings above are returned)
  const title = data.title.trim();
  const licenseBadge = renderLicenseBadge(data.licenseType).trim();
  // const description = renderDescriptionSection(data.description).trim();
  const descriptionSection = data.description.trim();
  const tableofContents = renderTableOfContents(data).trim();
  const installationSection = data.installation.trim();
  const usageSection = data.usage.trim();
  const licenseSection = renderLicenseSection(data.licenseType).trim();
  const contributionSection = renderContributionSection(data).trim();
  const questionsSection = renderQuestionsSection(data.username).trim();


  // Render to follow - note, does not follow indentation convention to avoid whitespaces in readme.
  return `# ${title}
${licenseBadge}
## Description
${descriptionSection}
## Table of Contents
${tableofContents}
## Installation
${installationSection}
## Usage
${usageSection}
## Contribution
${contributionSection}
## Questions
${questionsSection}
${licenseSection}
`;
// [TR] TODO - post-process remove the leading whitespaces on lines before returning
}

module.exports = generateMarkdown;

// https://www.npmjs.com/package/badge-maker