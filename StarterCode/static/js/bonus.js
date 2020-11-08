function init2(){

 d3.json("samples.json").then((data) => {
        var metadata= data.metadata;
        var initialID2 =metadata[0].id;
        gaugeChart(initialID2);
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
// var data = [
//     {
//       type: "indicator",
//       mode: "gauge+number+delta",
//       value: 420,
//       title: { text: "Speed", font: { size: 24 } },
//       delta: { reference: 400, increasing: { color: "RebeccaPurple" } },
//       gauge: {
//         axis: { range: [null, 500], tickwidth: 1, tickcolor: "darkblue" },
//         bar: { color: "darkblue" },
//         bgcolor: "white",
//         borderwidth: 2,
//         bordercolor: "gray",
//         steps: [
//           { range: [0, 250], color: "cyan" },
//           { range: [250, 400], color: "royalblue" }
//         ],
//         threshold: {
//           line: { color: "red", width: 4 },
//           thickness: 0.75,
//           value: 490
//         }
//       }
//     }
//   ];
  
//   var layout = {
//     width: 500,
//     height: 400,
//     margin: { t: 25, r: 25, l: 25, b: 25 },
//     paper_bgcolor: "lavender",
//     font: { color: "darkblue", family: "Arial" }
//   };
  
//   Plotly.newPlot("gauge", data, layout);
// }

function optionChanged(newID) {
    gaugeChart(newID);
    
   
   }

init2();

