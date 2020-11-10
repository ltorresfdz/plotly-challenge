
//this function creates the initial gauge chart
function init2(){

 d3.json("samples.json").then((data) => {
        var metadata= data.metadata;
        var initialID2 =metadata[0].id;
        gaugeChart(initialID2);
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
        { type: "scatter",
          x: [0],
          y: [0],
          marker: { size: 12, color: "850000" },
          showlegend: false,
          name: "Freq",
          text: level,
          hoverinfo: "text+name"
        },
        { values: [50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50],
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

//this function is to generate the new gauge chart everytime a new TEST SUBJECT ID gets selected.
function optionChanged(newID) {
    gaugeChart(newID);
   }

init2();

