var fs = require("fs");
var data = fs.readFileSync('files/test2.csv');
var stringData=data.toString();

var conv = stringData.replace(/"[^"]+"/g, function (match) {
  return match.replace(/,/g,"");
}).split(",");
var arrayOne= conv.toString().split('\r\n');

var header=arrayOne[0].split(',');
var noOfRow=arrayOne.length;
var noOfCol=header.length;
var jArray1=[];var jArray2=[];var jArray3=[];var jArray4=[];var jArray5=[];var jArray6=[];var jArray7=[];
var mainObj = {};
var i=0,j=0,count1=0,count2=0,count3=0,count4=0,count5=0,count6=0,count7=0,g1,h1,g2,h2,g3,h3,g4,h4,g5,h5,g6,h6,g7,h7;
var sugarSum7=0,saltSum7=0,sugarSum1=0,saltSum1=0,sugarSum2=0,saltSum2=0,sugarSum3=0,saltSum3=0,sugarSum4=0,saltSum4=0;
var sugarSum5=0,saltSum5=0,sugarSum6=0,saltSum6=0;
var country1,country2,country3,country4,country5,country6,country7;
       for (i = 1; i < noOfRow-1; i++) {
         var obj7 = {};var obj1 = {};var obj2 = {};var obj3 = {};var obj4 = {};var obj5 = {};var obj6 = {};
           var myNewLine=arrayOne[i].split(',');
             for (j = 0; j<noOfCol ; j++) {
               if(header[j] ==='countries')
               {
                 var headerText = header[j];
                 var valueText = myNewLine[j];

                  if(valueText === 'Netherlands')
                  {
                      if(count1==0)
                      {
                        country1=header[j];
                         count1++;
                      }
                      for(z=0;z<header.length;z++){
                            if(header[z]==='sugars_100g')
                            {
                                sugarSum1 += Number(myNewLine[z]);
                                g1=header[z];

                            }
                            if(header[z]==='salt_100g')
                            {
                                saltSum1 += Number(myNewLine[z]);
                                h1=header[z];
                            }
                      }

                  }

                  ////////////////////////////////////////////
                  if(valueText === 'Canada')
                  {
                      if(count2==0)
                      {
                        country2=header[j];
                         count2++;
                      }
                      for(z=0;z<header.length;z++){
                            if(header[z]==='sugars_100g')
                            {
                                sugarSum2 += Number(myNewLine[z]);
                                g2=header[z];
                            }
                            if(header[z]==='salt_100g')
                            {
                                saltSum2 += Number(myNewLine[z]);
                                h2=header[z];
                            }
                      }
                  }
                  /////////////////////////////

                  if(valueText === "UK" || valueText==="USA" || valueText==="United Kingdom" || valueText==="United States")
                  {
                      if(count3==0)
                      {
                        country3=header[j];
                         count3++;
                      }
                      for(z=0;z<header.length;z++){
                            if(header[z]==='sugars_100g')
                            {
                                sugarSum3 += Number(myNewLine[z]);
                                g3=header[z];
                            }
                            if(header[z]==='salt_100g')
                            {
                                saltSum3 += Number(myNewLine[z]);
                                h3=header[z];
                            }
                      }
                  }
                  /////////////////////////////////////

                  if(valueText === "Australia")
                  {
                      if(count4==0)
                      {
                        country4=header[j];
                         count4++;
                      }
                      for(z=0;z<header.length;z++){
                            if(header[z]==='sugars_100g')
                            {
                                sugarSum4 += Number(myNewLine[z]);
                                g4=header[z];
                            }
                            if(header[z]==='salt_100g')
                            {
                                saltSum4 += Number(myNewLine[z]);
                                h4=header[z];
                            }
                      }
                  }

                  ////////////////////////////////////////////////

                  if(valueText === "France" || valueText ==="en:FR" || valueText ==="FR")
                  {
                      if(count5==0)
                      {
                      country5=header[j];
                         count5++;
                      }
                      for(z=0;z<header.length;z++){
                            if(header[z]==='sugars_100g')
                            {
                                sugarSum5 += Number(myNewLine[z]);
                                g5=header[z];
                            }
                            if(header[z]==='salt_100g')
                            {
                                saltSum5 += Number(myNewLine[z]);
                                h5=header[z];
                            }
                      }
                  }

                  ///////////////////////////////////////////

                  if(valueText === "Germany")
                  {
                      if(count6==0)
                      {
                        country6=header[j];
                         count6++;
                      }
                      for(z=0;z<header.length;z++){
                            if(header[z]==='sugars_100g')
                            {
                                sugarSum6 += Number(myNewLine[z]);
                                g6=header[z];
                            }
                            if(header[z]==='salt_100g')
                            {
                                saltSum6 += Number(myNewLine[z]);
                                h6=header[z];
                            }
                      }
                  }

                  /////////////////////////////////


                  if(valueText === "Spain")
                  {
                      if(count7==0)
                      {
                    country7=header[j];
                         count7++;
                      }
                      for(z=0;z<header.length;z++){
                            if(header[z]==='sugars_100g')
                            {
                                sugarSum7 += Number(myNewLine[z]);
                                g7=header[z];
                            }
                            if(header[z]==='salt_100g')
                            {
                                saltSum7 += Number(myNewLine[z]);
                                h7=header[z];
                            }
                      }
                  }


                  ////////////////////////////////////////
             }
            }
            if(i==noOfRow-2){
              obj1[country1]="Netherland";
              obj1[g1]=sugarSum1;
              obj1[h1]=saltSum1;
              obj2[country1]="Canada";
              obj2[g2]=sugarSum2;
              obj2[h2]=saltSum2;
              obj3[country3]="UK/USA";
               obj3[g3]=sugarSum3;
               obj3[h3]=saltSum3;
               obj4[country4]="Australia";
              obj4[g4]=sugarSum4;
               obj4[h4]=saltSum4;
                obj5[country5]="France";
               obj5[g5]=sugarSum5;
               obj5[h5]=saltSum5;
                 obj6[country6]="Germany";
              obj6[g6]=sugarSum6;
              obj6[h6]=saltSum6;
                 obj7[country7]="Spain";
              obj7[g7]=sugarSum7;
              obj7[h7]=saltSum7;
              console.log(obj3);
              jArray1.push(obj1);
              jArray1.push(obj2);
              jArray1.push(obj3);
              jArray1.push(obj4);
              jArray1.push(obj5);
                  jArray1.push(obj6);
                      jArray1.push(obj7);
              // mainObj[country1]=jArray1;
              // mainObj[country2]=jArray2;
              // mainObj[country3]=jArray3;
              // mainObj[country4]=jArray4;
              // mainObj[country5]=jArray5;
              // mainObj[country6]=jArray6;
              // mainObj[country7]=jArray7;

            }
       };


 fs.writeFile(process.cwd() + "/files/test2.json", JSON.stringify(jArray1,undefined, 2), function (err) {
   if (err) throw err;
   console.log('It\'s saved!');
});
