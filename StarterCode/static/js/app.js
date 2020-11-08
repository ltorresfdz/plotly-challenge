d3.json("samples.json").then((data) => {
    console.log(data);
var metadata = data.metadata;
var samples= data.samples;
var names=data.names;
console.log("uno")

// console.log(metadata);
// console.log(names);
// console.log(samples);
});


function tableInfo(numID){
 d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    var selectedInfo= metadata.filter(sample => sample.id == numID);
    var result =selectedInfo[0]
    var TABLA =d3.select("#sample-metadata");
    TABLA.html("");
    Object.entries(result).forEach(([key,value]) => {
        TABLA.append("h6").text(`${key}:${value}`);
    });
 }
 )
}

function chartInfo(numID){




}




//assigns the test subject ID No. to the selector and show initial sample
//for the chart and table.

function init(){
var option = d3.select("#selDataset");
d3.json("samples.json").then((data) => {
var sampleName= data.names;
sampleName.forEach((sample)=> {
  option.append("option").text(sample).property("value",sample);
})
    
});
const initialID =sampleName[0];
 chartInfo(initialID);
 tableInfo(initialID);

};


//select the new Test ID, and call the functions to build chart and table.
function optionChanged(newID) {
    chartInfo(newID);
    tableInfo(newID);
   
   }


init();









