d3.json("samples.json").then((data) => {
    console.log(data);
var metadata = data.metadata;
var samples= data.samples;
var names=data.names;
// console.log("uno")
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
// clear the existing output
    TABLA.html("");
    Object.entries(result).forEach(([key,value]) => {
        TABLA.append("h6").text(`${key}:${value}`);
    });
 })
}

function chartInfo(numID){
    d3.json("samples.json").then((data) => {
        var samples= data.samples;
        var selectedInfo= samples.filter(sample => sample.id == numID);
        var result =selectedInfo[0]
        var ids =result.otu_ids;
        var labels = result.otu_labels;
        var values =result.sample_values;

  // Bar chart
  
  var dataBar = [
    {
      y:ids.slice(0,10).map(otuID => `OTU ${otuID}` ).reverse(),
      x:values.slice(0,10).reverse(),
      text:labels.slice(0,10).reverse(),
      type:"bar",
      orientation:"h"
    }];

  var layoutBar = {
    title: "Top 10 OTUs found in the selected Test Subject" ,
    margin: { t:25, 1:150}
  };

  Plotly.newPlot("bar",dataBar,layoutBar);

// Bubble Chart

var trace1 = {
    x: ids,
    y: values,
    text: labels,
    mode: 'markers',
    marker: {
      color: ids,
      size: values
    }
  };
  
  var data = [trace1];
  
  var layout = {
    
    margin: {t:0},
    xaxis: {title: "OTU Id's"},
    yaxis: {title: "Sample size"},
    hovermode: "closest",
    
    
  };
  
  Plotly.newPlot("bubble", data, layout);






    });
}




//assigns the test subject ID No. to the selector and show initial sample
//for the chart and table.

function init(){
var option = d3.select("#selDataset");
d3.json("samples.json").then((data) => {
var sampleName= data.names;
sampleName.forEach((sample)=> {
  option.append("option").text(sample).property("value",sample);
});

console.log(sampleName[0]);
var initialID =sampleName[0];
console.log(sampleName[0]);
 chartInfo(initialID);
 tableInfo(initialID);


});


}

function init2(){
    console.log("si hace algo1")
    d3.json("samples.json").then((data) => {
           var metadata= data.metadata;
           var initialID2 =metadata[0].id;
           console.log(initialID2)
           gaugeChart(initialID2);
           console.log("si hace algo")
       });
   }

function gaugeChart(numID2){
    d3.json("samples.json").then((data) => {
            var metadata= data.metadata;
            var selectedInfo2= metadata.filter(sample => sample.id == numID2);
            var result2 =selectedInfo2[0]
            var washNumber =result2.wfreq;
            console.log(washNumber);
    });
    }
 


//select the new Test ID, and call the functions to build chart and table.
function optionChanged(newID) {
    chartInfo(newID);
    tableInfo(newID);
    gaugeChart(newID);
   
   }


init2();
init();










