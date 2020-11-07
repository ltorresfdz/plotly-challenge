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

//assigns the test subject ID No. to the selector:
var option = d3.select("#selDataset");
d3.json("samples.json").then((data) => {
var sampleName= data.names;
sampleName.forEach((sample)=> {
  option.append("option").text(sample).property("value",sample);
})
    
});











