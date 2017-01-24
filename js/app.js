const fs = require('fs');
const rl = require('readline');

// var csvfile = fs.readFileSync('FoodFacts.csv').toString();
var jsonArray = [];
var jsonArray1 = [];


var snscountry = ['Netherlands', 'Canada', 'United Kingdom', 'United States', 'Australia', 'France', 'Germany', 'Spain', 'South Africa'];
var northEurope = ['United Kingdom', 'Denmark', 'Sweden', 'Norway'];
var centralEurope = ['France', 'Belgium', 'Germany', 'Switzerland', 'Netherlands'];
var southEurope = ['Portugal', 'Greece', 'Italy', 'Spain', 'Croatia', 'Albania'];


var saltArr = new Uint8Array(9);
var sugarArr = new Uint8Array(9);
var fatNorthEurope = 0;
var fatCentralEurope = 0;
var fatSouthEurope = 0;
var proteinNorthEurope = 0;
var proteinCentralEurope = 0;
var proteinSouthEurope = 0;
var carboNorthEurope = 0;
var carboCentralEurope = 0;
var carboSouthEurope = 0;
let lineTitle = 0;
var titles;
var countryIndex;
var saltIndex;
var sugarIndex;
var protienIndex;
var carboIndex;
var fatIndex;
let rd = rl.createInterface({
    input: fs.createReadStream('../inputdata/FoodFacts.csv'),
    terminal: false
});

rd.on('line', (line) => {

    if (lineTitle == 0) {
        titles = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
        countryIndex = titles.indexOf("countries_en");
        saltIndex = titles.indexOf("salt_100g");
        sugarIndex = titles.indexOf("sugars_100g");
        protienIndex = titles.indexOf("proteins_100g");
        carboIndex = titles.indexOf("carbohydrates_100g");
        fatIndex = titles.indexOf("fat_100g");
        lineTitle = lineTitle + 1;
    }
    var values = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
    var countryCheckforNorthEurope = northEurope.includes(values[countryIndex]);
    var countryCheckforCentralEurope = centralEurope.includes(values[countryIndex]);
    var countryCheckforSouthEurope = southEurope.includes(values[countryIndex]);

    if (snscountry.includes(values[countryIndex])) {
        var salt = values[saltIndex];
        var sugar = values[sugarIndex];

        if (salt == "" || salt == undefined || salt == NaN) {
            salt = 0;
        }
        if (sugar == "") {
            sugar = 0;
        }

        var snscountryIndex = snscountry.indexOf(values[countryIndex]);
        // console.log(values[saltIndex]);
        // console.log('salt',salt);
        // console.log('sugar',sugar);



        saltArr[snscountryIndex] += parseInt(salt);
        sugarArr[snscountryIndex] += parseInt(sugar);

    }

    if (countryCheckforNorthEurope || countryCheckforCentralEurope || countryCheckforSouthEurope) {
        var fat = values[fatIndex];
        var protein = values[protienIndex];
        var carbo = values[carboIndex];
        // console.log(fat,'fat');
        if (fat == "")
            fat = 0;
        if (protein == "")
            protein = 0;
        if (carbo == "")
            carbo = 0;
        if (countryCheckforNorthEurope) {
            // console.log('fat',fat);
            fatNorthEurope += parseInt(fat);
            proteinNorthEurope += fat = parseInt(protein);
            carboNorthEurope += parseInt(carbo);
            countryCheckforNorthEurope = false;
        }
        if (countryCheckforCentralEurope) {
            // console.log('fat',fat);
            fatCentralEurope += parseInt(fat);
            proteinCentralEurope += parseInt(protein);
            carboCentralEurope += parseInt(carbo);
            countryCheckforCentralEurope = false;
        }
        if (countryCheckforSouthEurope) {
            fatSouthEurope += parseInt(fat);
            proteinSouthEurope += parseInt(protein);
            carboSouthEurope += parseInt(carbo);
            countryCheckforSouthEurope = false;
        }
    }
});



rd.on('close', () => {
    for (var i = 0; i < snscountry.length; i++) {
        var obj = {};
        obj["country"] = snscountry[i];
        obj["sugar"] = sugarArr[i];
        obj["salt"] = saltArr[i];
        jsonArray.push(obj);
    }

    var objNorthEurope = {
        region: "North Europe",
        fat: fatNorthEurope,
        protein: proteinNorthEurope,
        carbohydrates: carboNorthEurope
    }

    var objCentralEurope = {
        region: "Central Europe",
        fat: fatCentralEurope,
        protein: proteinCentralEurope,
        carbohydrates: carboCentralEurope
    }
    var objSouthEurope = {
        region: "South Europe",
        fat: fatSouthEurope,
        protein: proteinSouthEurope,
        carbohydrates: carboSouthEurope
    }
    jsonArray1.push(objNorthEurope);
    jsonArray1.push(objCentralEurope);
    jsonArray1.push(objSouthEurope);
    fs.writeFileSync('../outputdata/foodfacts.json', JSON.stringify(jsonArray));
    fs.writeFileSync('../outputdata/foodfacts1.json', JSON.stringify(jsonArray1));
});
