
//First, checking if I am able to read the data
d3.json("samples.json").then((data) => {
console.log("This is the complete samples json file information")
console.log(data);
var metadata = data.metadata;
var samples= data.samples;
var names=data.names;
console.log("This is metada")
console.log(metadata);
console.log("This is names")
console.log(names);
console.log("This is samples")
console.log(samples);
});



//This functions displays the Test Subject ID information selected in the table:
//==================================================================
function tableInfo(numID){
 d3.json("samples.json").then((data) => {
    // from samples.json bring only the metadata
    var metadata = data.metadata;
    // on the metadata, look for the test subject ID selected dictioray
    var selectedInfo= metadata.filter(sample => sample.id == numID);
   //assign the dictionary selected to result. 
    var result =selectedInfo[0]
    //select the Table from the HTML file
    var TABLA =d3.select("#sample-metadata");
    // clear the existing output
    TABLA.html("");
    //read the dictionary and apped each value to the table:
    Object.entries(result).forEach(([key,value]) => {
        TABLA.append("h6").text(`${key}:${value}`);
    });
 })
}



//This functions displays the Test Subject ID information selected in the graph:
//==================================================================

function chartInfo(numID){
    d3.json("samples.json").then((data) => {
         // from samples.json bring only the samples info
        var samples= data.samples;
         // on the samples, look for the test subject ID selected list
        var selectedInfo= samples.filter(sample => sample.id == numID);
         //assign the dictionary selected to result, and then obtain the dictionaries value.
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

// console.log(sampleName[0]);
var initialID =sampleName[0];
// console.log(sampleName[0]);
 chartInfo(initialID);
 tableInfo(initialID);
});
}

//this function creates the initial gauge chart

function init2(){
    console.log("starts init2")
    d3.json("samples.json").then((data) => {
           var metadata= data.metadata;
           var initialID2 =metadata[0].id;
           console.log(initialID2)
           gaugeChart(initialID2);
           console.log("finishes init2")
       });
   }


//this function creates the gaugeChart
function gaugeChart(numID2){
    d3.json("samples.json").then((data) => {
            var metadata= data.metadata;
            var selectedInfo2= metadata.filter(sample => sample.id == numID2);
            var result2 =selectedInfo2[0]
            var washNumber =result2.wfreq;
            console.log(washNumber);
        var level = parseFloat(washNumber) * 20;


// I obtained the code for the gauge chart from here:
// source: https://community.plotly.com/t/plotly-js-gauge-pie-chart-data-order/8686

    var degrees = 180 - level;
    var radius = 0.5;
    var radians = (degrees * Math.PI) / 180;
    var x = radius * Math.cos(radians);
    var y = radius * Math.sin(radians);

    var mainPath = 'M -.0 -0.035 L .0 0.035 L ',
     pathX = String(x),
     space = ' ',
     pathY = String(y),
     pathEnd = ' Z';
    var path = mainPath.concat(pathX,space,pathY,pathEnd);

 //create the data variable   
var data = [
    {
      type: "scatter",
      x: [0],
      y: [0],
      marker: { size: 12, color: "850000" },
      showlegend: false,
      name: "Freq",
      text: level,
      hoverinfo: "text+name"
    },
    {
      values: [50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50],
      rotation: 90,
      text: ["8-9", "7-8", "6-7", "5-6", "4-5", "3-4", "2-3", "1-2", "0-1", ""],
      textinfo: "text",
      textposition: "inside",
      marker: {
        colors: [
          "rgba(0, 105, 11, .5)",
          "rgba(10, 120, 22, .5)",
          "rgba(14, 127, 0, .5)",
          "rgba(110, 154, 22, .5)",
          "rgba(170, 202, 42, .5)",
          "rgba(202, 209, 95, .5)",
          "rgba(210, 206, 145, .5)",
          "rgba(232, 226, 202, .5)",
          "rgba(240, 230, 215, .5)",
          "rgba(255, 255, 255, 0)"
        ]
      },
      labels: ["8-9", "7-8", "6-7", "5-6", "4-5", "3-4", "2-3", "1-2", "0-1", ""],
      hoverinfo: "label",
      hole: 0.5,
      type: "pie",
      showlegend: false
    }

  ];


  
 //create the layout variable  
  var layout = {
    
    shapes: [
      {
        type: "path",
        path: path,
        fillcolor: "850000",
        line: {
          color: "850000"
        }
      }
    ],
    title: "<b>Belly Button Washing Frequency</b> <br> Scrubs per Week",
    height: 500,
    width: 500,
    xaxis: {
      zeroline: false,
      showticklabels: false,
      showgrid: false,
      range: [-1, 1]
    },
    yaxis: {
      zeroline: false,
      showticklabels: false,
      showgrid: false,
      range: [-1, 1]
    }

  };
  
  Plotly.newPlot("gauge", data, layout);
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










