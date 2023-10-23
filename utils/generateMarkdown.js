// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
// [TR] TODO: Refactor method, abbrev. license names
function renderLicenseBadge(license) {
  const licenseBadges = {
    'GNU AGPLv3': 'GNU_AGPLv3' ,
    'GNU GPLv3': 'GNU_GPLv3',
    'GNU LGPLv3': 'GNU_LGPLv3' ,
    'Mozilla Public License 2.0': 'Mozilla_Public_License_2.0' ,
    'Apache License 2.0' : 'Apache_License_2.0' ,
    'MIT License' : 'MIT_License' ,
    'Boost Software License 1.0' : 'Boost_Software_License_1.0' ,
    'The Unlicense' : 'The_Unlicense' ,
  } // Check if license is a key within object of licenseBadges and get the resulting badge URL and combine with link
  if (licenseBadges[license]) {
  return `[${license}](https://img.shields.io/badge/License-${licenseBadges[license]}-blue)(${renderLicenseLink(license)}).`;
  }
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
    return `This project is licensed under [${license}](${licenseLink}${licenseAppendages[license]}).`;
  } else {
    return '';
  }

}

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {
  return `
  ## License
  ${renderLicenseLink(license)}
  `;
}
  

// TODO: Create a function to generate markdown for README
function generateMarkdown(data) {

  return `# ${data.title}

  ${renderLicenseBadge(data.licenseType)}

  ${renderLicenseSection(data.licenseType)}

`;
}

module.exports = generateMarkdown;

// https://www.npmjs.com/package/badge-maker