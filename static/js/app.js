//  get the url

const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Promise Pending
const dataPromise = d3.json(url);
console.log("Data Promise: ", dataPromise);

// Fetch the JSON data and console log it
d3.json(url).then(function(data){
    console.log(data);
    console.log(data['samples'][0].id)
    // d3.selectAll("#selDataset").on("change", optionChanged);
    
    // populate drop down with IDs
    // on select -> pass the ID and get otu_values/ids and labels
    //slice
    //populate the chart


});


