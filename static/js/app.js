//  get the url

const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Promise Pending
const dataPromise = d3.json(url);
console.log("Data Promise: ", dataPromise);

let sampleData;
let metaData;

// funtion to load the page with data
function init() {
    // Fetch the JSON data and console log it
    d3.json(url).then(function (data) {
        // console.log(data);
        sampleData = (data['samples']);
        metaData = (data['metadata']);
        let ele = document.getElementById('selDataset');
        for (let i = 0; i < sampleData.length; i++) {
            // POPULATE SELECT ELEMENT WITH JSON.
            ele.innerHTML = ele.innerHTML +
                '<option value="' + sampleData[i]['id'] + '">' + sampleData[i]['id'] + '</option>';
        }
        optionChanged(940);
    }
    );
}
// call function
init();

function optionChanged(id) {
    // console.log(sampleData)
    barChart(id);
    populateMetaData(id);
    // console.log(metaData);
    bubbleChart(id);
    // gaugeChart(id);
}

// Bar Chart
function barChart(id) {
    let xValues = [];
    let yValues = [];
    let labels = [];
    // filter the data passing the id given by the user
    filteredValues = sampleData.filter((data) => id == data.id)

    // to the get array
    filteredList = filteredValues[0];
    console.log(filteredList)

    //get the top 10 sample_values,otu_ids,otu_labels
    xValues = filteredList.sample_values.slice(0, 10);
    yValues = filteredList.otu_ids.slice(0, 10);
    labels = filteredList.otu_labels.slice(0, 10);

    // trace for bar chart
    let trace = {
        x: xValues,
        y: yValues.map(val => `OTU ${val}`),
        text: labels,
        type: 'bar',
        name: 'Belly',
        orientation: 'h'
    }
    //data
    let data1 = [trace];

    //layout
    let layout = {
        yaxis: {
            autorange: 'reversed'
        }
    }
    // Render the plot to the div tag with id "bar"
    Plotly.newPlot("bar", data1, layout);
}

// Function for demographis box
function populateMetaData(id) {

    // get the demographic box id
    document.getElementById("sample-metadata").innerText = '';
    let elements = [];

    // get the metadata values for the entered id
    let filterData = metaData.filter((data) => id == data.id);
    let metaDataId = filterData.map(item => `id: ${item.id}`);
    let ethnicity = filterData.map(item => `ethnicity: ${item.ethnicity}`);
    let gender = filterData.map(item => `gender: ${item.gender}`);
    let age = filterData.map(item => `age: ${item.age}`);
    let location = filterData.map(item => `location: ${item.location}`);
    let bbtype = filterData.map(item => `bbtype: ${item.bbtype}`);
    let wfreq = filterData.map(item => `wfreq:  ${item.wfreq}`);
    elements.push(metaDataId);
    elements.push(ethnicity);
    elements.push(gender);
    elements.push(age);
    elements.push(location);
    elements.push(bbtype);
    elements.push(wfreq);

    //populate the values in the demographic box
    for (var i = 0; i < elements.length; i++) {
        document.getElementById("sample-metadata").innerText += elements[i] + "\n";
    }
}

// Bubble chart
function bubbleChart(id) {
    let xValues = [];
    let yValues = [];
    let color = [];
    let size = [];
    let text = [];

    // filter the data passing the id given by the user
    filteredValues = sampleData.filter((data) => id == data.id)
    console.log(filteredValues)
    // to the get array
    filteredList = filteredValues[0];

    // get xvalues,yvalues labels color and size
    xValues = filteredList.otu_ids;
    console.log(xValues)
    yValues = filteredList.sample_values;
    // console.log(yValues)
    color = xValues;
    size = yValues;
    text = filteredList.otu_labels;

    // trace for bubble chart
    let trace1 = {
        x: xValues,
        y: yValues,
        mode: 'markers',
        marker: {
            color: color,
            size: size,
            text: text,
            colorscale: 'Earth'
        }
    };
    //data
    let data2 = [trace1];
    //layout
    let layout = {
        hovermode: 'closest',
        xaxis: { title: 'OTU ID' },
        yaxis: { title: 'Sample Values' },
    }

    // Render the plot to the div tag with id "bubble"
    Plotly.newPlot('bubble', data2, layout);
}

// function gaugeChart(id) {
//     filterData = metaData.filter((data) => id == data.id);
//     let wfreq = filterData.map(item => item.wfreq);
//     console.log(wfreq)
//     data = [
//         {
//             // domain: { x: [0, 1], y: [0, 1] },
//             // gauge: {
//             //     axis: { range: [0, 9] }
//             // },
//             value: wfreq,
//             name: id,
//             text: wfreq,
//             title: { text: "Belly button Washing Frequency" },
//             type: "indicator",
//             mode: "gauge+number+delta"
//         }  
//     ];
//     // var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
//     Plotly.newPlot('gauge', data);
// }
