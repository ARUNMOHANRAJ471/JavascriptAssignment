var fs = require("fs");
var data = fs.readFileSync('files/Book2.csv');
var stringData=data.toString();
var conv = stringData.replace(/"[^"]+"/g, function (match) {
  return match.replace(/,/g,"");
}).split(",");
var arrayOne= conv.toString().split('\r\n');
var header=arrayOne[0].split(',');
var noOfRow=arrayOne.length;
var noOfCol=header.length;
var jArray1=[];var jArray2=[];var jArray3=[];
var mainObj = {};
var i=0,j=0,count1=0,count2=0,count3=0,g1,h1,k1,g2,h2,k2,g3,h3,k3;
var Fat1=0,Protein1=0,Fat2=0,Protein2=0,Fat3=0,Protein3=0;
var Carbohydrate1=0,Carbohydrate2=0,Carbohydrate3=0;
var country1,country2,country3 ;
       for (i = 1; i < noOfRow-1; i++) {
        var obj1 = {};var obj2 = {};var obj3 = {};
           var myNewLine=arrayOne[i].split(',');
             for (j = 0; j<noOfCol ; j++) {
               if(header[j] ==='countries')
               {
                 var headerText = header[j];
                 var valueText = myNewLine[j];
                  if(valueText === "United Kingdom" || valueText==="Sweden" || valueText==="Denmark" || valueText==="Norway")
                  {
                      if(count1==0)
                      {
                          country1=header[j];
                         count1++;
                      }
                      for(z=0;z<header.length;z++){
                            if(header[z]==='fat_100g')
                            {
                                Fat1 += Number(myNewLine[z]);
                                g1=header[z];
                            }
                            if(header[z]==='proteins_100g')
                            {
                                Protein1 += Number(myNewLine[z]);
                                h1=header[z];
                            }
                            if(header[z]==='carbohydrates_100g')
                            {
                                Carbohydrate1 += Number(myNewLine[z]);
                                k1=header[z];
                            }
                      }
                  }
                  ////////////////////////////////////////////
                                    if(valueText === "France" || valueText==="Belgium" || valueText==="Germany" || valueText==="Switzerland" || valueText==="Netherlands")
                                    {
                                        if(count2==0)
                                        {
                                              country2=header[j];
                                           count2++;
                                        }
                                        for(z=0;z<header.length;z++){
                                              if(header[z]==='fat_100g')
                                              {
                                                  Fat2 += Number(myNewLine[z]);
                                                  g2=header[z];
                                              }
                                              if(header[z]==='proteins_100g')
                                              {
                                                  Protein2 += Number(myNewLine[z]);
                                                  h2=header[z];
                                              }
                                              if(header[z]==='carbohydrates_100g')
                                              {
                                                  Carbohydrate2 += Number(myNewLine[z]);
                                                  k2=header[z];
                                              }
                                        }
                                    }
                  /////////////////////////////
                                    if(valueText === "Portugal" || valueText==="Italy" || valueText==="Spain" || valueText==="Croatia" || valueText==="Albania")
                                    {
                                        if(count3==0)
                                        {
                                            country3=header[j];
                                           count3++;
                                        }
                                        for(z=0;z<header.length;z++){
                                              if(header[z]==='fat_100g')
                                              {
                                                  Fat3 += Number(myNewLine[z]);
                                                  g3=header[z];
                                              }
                                              if(header[z]==='proteins_100g')
                                              {
                                                  Protein3 += Number(myNewLine[z]);
                                                  h3=header[z];
                                              }
                                              if(header[z]==='carbohydrates_100g')
                                              {
                                                  Carbohydrate3 += Number(myNewLine[z]);
                                                  k3=header[z];
                                              }
                                        }
                                    }
                        ////////////////////////////////////////
             }
            }
            if(i==noOfRow-2){
              obj1[country1]="North Europe";
              obj1[g1]=Fat1;
              obj1[h1]=Protein1;
              obj1[k1]=Carbohydrate1;
              obj2[country2]="Central Europe";
              obj2[g2]=Fat2;
              obj2[h2]=Protein2;
              obj2[k2]=Carbohydrate2;
              obj3[country3]="South Europe";
              obj3[g3]=Fat3;
              obj3[h3]=Protein3;
              obj3[k3]=Carbohydrate3;
              jArray1.push(obj1);
              jArray1.push(obj2);
              jArray1.push(obj3);
            }
       };
 fs.writeFile(process.cwd() + "/files/region.json", JSON.stringify(jArray1,undefined, 2), function (err) {
   if (err) throw err;
   console.log('It\'s saved!');
});
