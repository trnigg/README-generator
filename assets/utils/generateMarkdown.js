// FUNCTION to render license badges using img.shields.io
// In the future, could implement: https://www.npmjs.com/package/badge-maker
function renderLicenseBadge(license) {
  // DECLARE URL variations depending on badges
  const licenseBadges = {
    'GNU AGPLv3': 'AGPL_3.0' ,
    'GNU GPLv3': 'GPL_3.0',
    'GNU LGPLv3': 'LGPL_3.0' ,
    'Mozilla Public License 2.0': 'MPL_2.0' ,
    'Apache License 2.0' : 'Apache_2.0' ,
    'MIT License' : 'MIT' ,
    'Boost Software License 1.0' : 'BSL_1.0' ,
    'The Unlicense' : 'Unlicense' ,
  } 
  // CHECK IF license is a key within object of licenseBadges and combine value with URL; ELSE empty string
  if (licenseBadges[license]) {
  return `[![${license}](https://img.shields.io/badge/License-${licenseBadges[license]}-blue)](#license)`;
  } else {
  return '';
  }
}

// FUNCTION to create license info link
function renderLicenseLink(license) {
  // DECLARE Root URL + appendages depending on license
  let licenseLink = 'https://choosealicense.com/licenses/';
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
  // CHECK IF license is a key within object of linkAppendages, add value to link and return; ELSE empty string
  if (licenseAppendages[license]) {
    licenseLink += licenseAppendages[license];
    return licenseLink;
  } else {
    return '';
  }
}

// FUNCTION to create license section with license link
  // CHECK IF license isn't undefined, then generate markdown with appropriate license link; ELSE empty string
  function renderLicenseSection(license) {
  if (license) {
    return `
    ## License
    This project is licensed under [${license}](${renderLicenseLink(license)}).
    `;
  } else {
    return '';
  }
}

// FUNCTION to render table of contents - License is a conditional inclusion at the end
// NOTE: Avoided template literals because it seemed to add undesired linebreaks
function renderTableOfContents(data) {
  let tableofContents = 
    '- [Installation](#installation)\n' + 
    '- [Usage](#usage)\n' +
    '- [Tests](#tests)\n' +
    '- [Contribution](#contribution)\n' +
    '- [Questions](#questions)\n';
  if (data.includeLicense) {
    tableofContents += '- [License](#license)';
  }
  return tableofContents;
}

// FUNCTION to render Test section
function renderTestSection(data) {
  // CHECK IF hasTests is true, then generate markdown with Test content; ELSE placeholder text
  if (data.hasTests) {
    return `${data.tests}`;
  } else {
    return `This project does not currently include any tests.`;
  }
}

// FUNCTION to render Contribution section
function renderContributionSection(data) {
  // CHECK IF acceptingContribution is true, then generate markdown with Test content; ELSE placeholder text
  if (data.acceptingContribution) {
    return `${data.contribution}`;
  }
  return `Thank you for your interest. However, I am not currently looking for any contributions towards this project.`;
}

// FUNCTION to render Questions section - conditional inclusion of email 
function renderQuestionsSection(data) {
  // DECLARE boilderplate text
  let questionsSection = `For any questions or feedback, please reach out to me on GitHub at [${data.username}](https://github.com/${data.username})`;
  // CHECK IF includeEmail is true, then generate additional markdown with email data
  if (data.includeEmail) {
    questionsSection += `, or via email at ${data.email}`;
  }
  // Add full-stop to all scenarios and return the generated text.
  questionsSection += '.';
  return questionsSection;
}

// FUNCTION to Generate markdown by combining all elements
function generateMarkdown(data) {
  // DECLARE variables with new data and/or call above functions with data from index.js
  // trim leading/trailing whitespaces for better readme (esp. when empty strings above are returned)
  const title = data.title.trim();
  const licenseBadge = renderLicenseBadge(data.licenseType).trim();
  const descriptionSection = data.description.trim();
  const tableofContents = renderTableOfContents(data).trim();
  const installationSection = data.installation.trim();
  const usageSection = data.usage.trim();
  const testSection = renderTestSection(data).trim();
  const licenseSection = renderLicenseSection(data.licenseType).trim();
  const contributionSection = renderContributionSection(data).trim();
  const questionsSection = renderQuestionsSection(data).trim();

  // DECLARE variable to contain the generated string using template literals and variables above
  const generatedMarkdown = `# ${title}
    ${licenseBadge}
    ## Description
    ${descriptionSection}

    ## Table of Contents
    ${tableofContents}

    ## Installation
    ${installationSection}

    ## Usage
    ${usageSection}

    ## Tests
    ${testSection}

    ## Contribution
    ${contributionSection}

    ## Questions
    ${questionsSection}

    ${licenseSection}
  `;

// Post-process to remove the leading whitespaces on lines using Regex
// https://stackoverflow.com/questions/5799801/regular-expression-to-remove-space-in-the-beginning-of-each-line
const formattedMarkdown = generatedMarkdown.replace(/^ +/gm, '');
return formattedMarkdown;
}

// Export key function for use in index.js
module.exports = generateMarkdown;