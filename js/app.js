const fs = require('fs');
const rl = require('readline');

module.exports = ((year) => {
  if(isNaN(year) || typeof year !== 'number') {
    throw Error('Not a number');
  }
  if(!isNaN(year)) {
let jsonArray = [];
let jsonArray1 = [];


let snscountry = ['Netherlands', 'Canada', 'United Kingdom', 'United States', 'Australia',
                  'France', 'Germany', 'Spain', 'South Africa'];
let northEurope = ['United Kingdom', 'Denmark', 'Sweden', 'Norway'];
let centralEurope = ['France', 'Belgium', 'Germany', 'Switzerland', 'Netherlands'];
let southEurope = ['Portugal', 'Greece', 'Italy', 'Spain', 'Croatia', 'Albania'];


let saltArr = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let sugarArr = [0, 0, 0, 0, 0, 0, 0, 0, 0];
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
let rd = rl.createInterface({
    input: fs.createReadStream('../inputdata/FoodFacts.csv'),
    terminal: false
});

rd.on('line', (line) => {
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
    let values = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
    let countryCheckforNorthEurope = northEurope.includes(values[countryIndex]);
    let countryCheckforCentralEurope = centralEurope.includes(values[countryIndex]);
    let countryCheckforSouthEurope = southEurope.includes(values[countryIndex]);

    function cntrindex(cntr) {
      let ind = -1;
      if(cntr) {
        for(let i = 0; i < snscountry.length; i = i + 1) {
          if(cntr.includes(snscountry[i])) {
            ind = i;
          }
        }
      }
      return ind;
    }
    if (values[countryIndex].includes(',')) {
      let countries = values[countryIndex].split(',');
      for (let i = 0; i < countries.length; i = i + 1) {
          let salt = Number(values[saltIndex]);
          let sugar = Number(values[sugarIndex]);

          if (!salt) {
              salt = 0;
          }
          if (!sugar) {
              sugar = 0;
          }

          let snscountryIndex = cntrindex(countries[i]);
          saltArr[snscountryIndex] = saltArr[snscountryIndex] + Number(values[saltIndex]);
          sugarArr[snscountryIndex] = sugarArr[snscountryIndex] + Number(values[sugarIndex]);
          let fat = Number(values[fatIndex]);
          let protein = Number(values[protienIndex]);
          let carbo = values[carboIndex];
          if (northEurope.includes(countries[i])) {
            fatNorthEurope = fatNorthEurope + Number(fat);
            proteinNorthEurope = proteinNorthEurope + Number(protein);
            carboNorthEurope = carboNorthEurope + Number(carbo);
          }
          if (centralEurope.includes(countries[i])) {
            fatCentralEurope = fatCentralEurope + Number(fat);
            proteinCentralEurope = proteinCentralEurope + Number(protein);
            carboCentralEurope = carboCentralEurope + Number(carbo);
        }
          if (southEurope.includes(countries[i])) {
            fatSouthEurope = fatSouthEurope + Number(fat);
            proteinSouthEurope = proteinSouthEurope + Number(protein);
            carboSouthEurope = carboSouthEurope + Number(carbo);
          }
      }
    }
    if (snscountry.includes(values[countryIndex])) {
      let snscountryIndex = cntrindex(values[countryIndex]);
      saltArr[snscountryIndex] = saltArr[snscountryIndex] + Number(values[saltIndex]);
      sugarArr[snscountryIndex] = sugarArr[snscountryIndex] + Number(values[sugarIndex]);
  }

    if (countryCheckforNorthEurope || countryCheckforCentralEurope || countryCheckforSouthEurope) {
        let fat = values[fatIndex];
        let protein = values[protienIndex];
        let carbo = values[carboIndex];
        // console.log(fat,'fat');
        if (!fat) {
            fat = 0;
        }
        if (!protein) {
            protein = 0;
        }
        if (!carbo) {
            carbo = 0;
        }
        if (countryCheckforNorthEurope) {
            // console.log('fat',fat);
            fatNorthEurope = fatNorthEurope + Number(fat);
            proteinNorthEurope = proteinNorthEurope + Number(protein);
            carboNorthEurope = carboNorthEurope + Number(carbo);
            countryCheckforNorthEurope = false;
        }
        if (countryCheckforCentralEurope) {
            // console.log('fat',fat);
            fatCentralEurope = fatCentralEurope + Number(fat);
            proteinCentralEurope = proteinCentralEurope + Number(protein);
            carboCentralEurope = carboCentralEurope + Number(carbo);
            countryCheckforCentralEurope = false;
        }
        if (countryCheckforSouthEurope) {
            fatSouthEurope = fatSouthEurope + Number(fat);
            proteinSouthEurope = proteinSouthEurope + Number(protein);
            carboSouthEurope = carboSouthEurope + Number(carbo);
            countryCheckforSouthEurope = false;
        }
    }
});

rd.on('close', () => {
    for (let i = 0; i < snscountry.length; i = i + 1) {
        let obj = {};
        obj.country = snscountry[i];
        obj.sugar = sugarArr[i];
        obj.salt = saltArr[i];
        jsonArray.push(obj);
    }

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
    fs.writeFileSync('../outputdata/foodfacts.json', JSON.stringify(jsonArray));
    fs.writeFileSync('../outputdata/foodfacts1.json', JSON.stringify(jsonArray1));
});

  return 'JSON written successfully';
}
return '';
})(2001);
