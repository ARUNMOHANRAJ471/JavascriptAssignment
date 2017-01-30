// importing modules
const fs = require('fs');
const rl = require('readline');

// exporting the function to another file
module.exports = (country) => {
    // checking for the type of input
    if (!isNaN(country) || typeof country !== 'string') {
        throw Error('country not found');
    }
    if (isNaN(country)) {
        // declaring necessary variables
        let jsonArray = [];
        let jsonArray1 = [];
        let snscountry = ['Netherlands', 'Canada', 'United Kingdom', 'United States', 'Australia',
                          'France', 'Germany', 'Spain', 'South Africa'];
        let northEurope = ['United Kingdom', 'Denmark', 'Sweden', 'Norway'];
        let centralEurope = ['France', 'Belgium', 'Germany', 'Switzerland', 'Netherlands'];
        let southEurope = ['Portugal', 'Greece', 'Italy', 'Spain', 'Croatia', 'Albania'];
        let salt = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        let sugar = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        let fatNorthEurope = 0;
        let fatCentralEurope = 0;
        let fatSouthEurope = 0;
        let proteinNorthEurope = 0;
        let proteinCentralEurope = 0;
        let proteinSouthEurope = 0;
        let carboNorthEurope = 0;
        let carboCentralEurope = 0;
        let carboSouthEurope = 0;
        let lineTitle = 0;
        let titles;
        let countryIndex;
        let saltIndex;
        let sugarIndex;
        let protienIndex;
        let carboIndex;
        let fatIndex;
        // creating interface to read the given large file as streams
        let rd = rl.createInterface({
            input: fs.createReadStream('../inputdata/FoodFacts.csv'),
            terminal: false
        });
        // this event run for every line input
        rd.on('line', (line) => {
            // this if is used to assign the titles to variables properly
            if (lineTitle === 0) {
                titles = line.split(',');
                countryIndex = titles.indexOf('countries_en');
                saltIndex = titles.indexOf('salt_100g');
                sugarIndex = titles.indexOf('sugars_100g');
                protienIndex = titles.indexOf('proteins_100g');
                carboIndex = titles.indexOf('carbohydrates_100g');
                fatIndex = titles.indexOf('fat_100g');
                lineTitle = lineTitle + 1;
            }
            // regex is used to accept commas inside the content
            let values = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
            let countryforNorthEurope = northEurope.includes(values[countryIndex]);
            let countryforCentralEurope = centralEurope.includes(values[countryIndex]);
            let countryforSouthEurope = southEurope.includes(values[countryIndex]);
            // function to find the country index for sugar and salt
            function cntrindex(cntr) {
                let ind = -1;
                if (cntr) {
                    for (let i = 0; i < snscountry.length; i = i + 1) {
                        if (cntr.includes(snscountry[i])) {
                            ind = i;
                        }
                    }
                }
                return ind;
            }
            // to split the multiple countries in same value
            if (values[countryIndex].includes(',')) {
                let countries = values[countryIndex].split(',');
                // loop to set sugar and salt values for all countries in a single value
                for (let i = 0; i < countries.length; i = i + 1) {
                    let snscountryIndex = cntrindex(countries[i]);
                    salt[snscountryIndex] = salt[snscountryIndex] + Number(values[saltIndex]);
                    sugar[snscountryIndex] = sugar[snscountryIndex] + Number(values[sugarIndex]);
                    let fat = Number(values[fatIndex]);
                    let protein = Number(values[protienIndex]);
                    let carbo = values[carboIndex];
                    // check whether the given country is in north Europe
                    if (northEurope.includes(countries[i])) {
                        fatNorthEurope = fatNorthEurope + Number(fat);
                        proteinNorthEurope = proteinNorthEurope + Number(protein);
                        carboNorthEurope = carboNorthEurope + Number(carbo);
                    }
                    // check whether the given country is in central Europe
                    if (centralEurope.includes(countries[i])) {
                        fatCentralEurope = fatCentralEurope + Number(fat);
                        proteinCentralEurope = proteinCentralEurope + Number(protein);
                        carboCentralEurope = carboCentralEurope + Number(carbo);
                    }
                    // check whether the given country is in south Europe
                    if (southEurope.includes(countries[i])) {
                        fatSouthEurope = fatSouthEurope + Number(fat);
                        proteinSouthEurope = proteinSouthEurope + Number(protein);
                        carboSouthEurope = carboSouthEurope + Number(carbo);
                    }
                }
            }
            // adding salt and sugar for the given nine countries
            if (snscountry.includes(values[countryIndex])) {
                let snscountryIndex = cntrindex(values[countryIndex]);
                salt[snscountryIndex] = salt[snscountryIndex] + Number(values[saltIndex]);
                sugar[snscountryIndex] = sugar[snscountryIndex] + Number(values[sugarIndex]);
            }
            // checking countries for north, central and south europe
            if (countryforNorthEurope || countryforCentralEurope || countryforSouthEurope) {
                let fat = values[fatIndex];
                let protein = values[protienIndex];
                let carbo = values[carboIndex];
                // checking countries and adding corresponding values for north Europe
                if (countryforNorthEurope) {
                    fatNorthEurope = fatNorthEurope + Number(fat);
                    proteinNorthEurope = proteinNorthEurope + Number(protein);
                    carboNorthEurope = carboNorthEurope + Number(carbo);
                    countryforNorthEurope = false;
                }
                // checking countries and adding corresponding values for central Europe
                if (countryforCentralEurope) {
                    fatCentralEurope = fatCentralEurope + Number(fat);
                    proteinCentralEurope = proteinCentralEurope + Number(protein);
                    carboCentralEurope = carboCentralEurope + Number(carbo);
                    countryforCentralEurope = false;
                }
                // checking countries and adding corresponding values for south Europe
                if (countryforSouthEurope) {
                    fatSouthEurope = fatSouthEurope + Number(fat);
                    proteinSouthEurope = proteinSouthEurope + Number(protein);
                    carboSouthEurope = carboSouthEurope + Number(carbo);
                    countryforSouthEurope = false;
                }
            }
        });
        // in close event we are adding the objects to json array
        rd.on('close', () => {
            // assigning values for objects and pushing it in json array
            for (let i = 0; i < snscountry.length; i = i + 1) {
                let obj = {};
                obj.country = snscountry[i];
                obj.sugar = sugar[i];
                obj.salt = salt[i];
                jsonArray.push(obj);
            }
            // assigning for objects of north,central and south europe and pushing it in json array
            let objNorthEurope = {
                region: 'North Europe',
                fat: fatNorthEurope,
                protein: proteinNorthEurope,
                carbohydrates: carboNorthEurope
            };

            let objCentralEurope = {
                region: 'Central Europe',
                fat: fatCentralEurope,
                protein: proteinCentralEurope,
                carbohydrates: carboCentralEurope
            };
            let objSouthEurope = {
                region: 'South Europe',
                fat: fatSouthEurope,
                protein: proteinSouthEurope,
                carbohydrates: carboSouthEurope
            };
            jsonArray1.push(objNorthEurope);
            jsonArray1.push(objCentralEurope);
            jsonArray1.push(objSouthEurope);
            // writing json in respective files
            fs.writeFileSync('../outputdata/foodfacts.json', JSON.stringify(jsonArray));
            fs.writeFileSync('../outputdata/foodfacts1.json', JSON.stringify(jsonArray1));
        });

        return 'JSON written successfully';
    }
    return '';
};
