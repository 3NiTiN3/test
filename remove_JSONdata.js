const fs = require('fs');

// Read the JSON file
const rawData = fs.readFileSync('countries.json');
const countries = JSON.parse(rawData);

// Loop through each country object and delete the translations and timezones fields
countries.forEach(country => {
    delete country.translations;
    delete country.timezones;
    delete country.emojiU;
    delete country.country_flag;
});

// Convert the modified data back to a JSON string
const modifiedData = JSON.stringify(countries, null, 2);

// Write the modified JSON back to the file
fs.writeFileSync('countries_modified.json', modifiedData);

console.log('Translations and timezones removed successfully.');
