//  get the url

const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Promise Pending
const dataPromise = d3.json(url);
console.log("Data Promise: ", dataPromise);

let sampleData;
let metaData;

// Fetch the JSON data and console log it
d3.json(url).then(function (data) {
    // console.log(data);
    sampleData = (data['samples']);
    metaData = (data['metadata']);
    // populate drop down with IDs
    // on select -> pass the ID and get otu_values/ids and labels
    //slice
    //populate the chart

    let ele = document.getElementById('selDataset');
    for (let i = 0; i < sampleData.length; i++) {
        // POPULATE SELECT ELEMENT WITH JSON.
        ele.innerHTML = ele.innerHTML +
            '<option value="' + sampleData[i]['id'] + '">' + sampleData[i]['id'] + '</option>';
    }
    optionChanged(940);
}

);

function optionChanged(id) {
    // console.log(sampleData)
    barChart(id);
    populateMetaData(id);
    // console.log(metaData);
    bubbleChart(id);
}

function barChart(id) {
    let xValues = [];
    let yValues = [];
    let labels = [];
    let slicedOtu = [];
    let slicedXvalue = [];
    let slicedYvalue = [];
    for (j = 0; j < sampleData.length; j++) {
        if (id == sampleData[j].id) {
            xValues = sampleData[j].sample_values;
            slicedXvalue = xValues.slice(0, 10);
            console.log(slicedXvalue);
            yValues = sampleData[j].otu_ids;
            slicedYvalue = yValues.slice(0, 10);
            for (k = 0; k < slicedYvalue.length; k++) {
                slicedOtu.push('otu' + slicedYvalue[k])
            };
            // console.log(slicedOtu);
            // console.log(slicedYvalue)
            labels = sampleData[j].otu_labels;
            // console.log(labels);
        }
    }
    //  xValues = sampleData.filter((data)=> id==data.id).map(item => item.sample_values);
    //  console.log(xValues);
    //  let slicedXvalue = xValues.slice(0,50);
    //  console.log(slicedXvalue);
    //  yValues = sampleData.filter((data)=> id==data.id).map(item => item.otu_ids);
    //  slicedYvalue = yValues.slice(0, 10);
    // //  console.log(slicedYvalue)
    //  labels = sampleData.filter((data)=> id==data.id).map(item => item.otu_labels);
    let trace = {
        x: slicedXvalue,
        y: slicedOtu,
        text: labels,
        type: 'bar',
        name: 'Belly',
        orientation: 'h'
    }
    let data1 = [trace];
    let layout = {
        yaxis: {
            autorange: 'reversed'
        }
    }
    Plotly.newPlot("bar", data1, layout);
}

function populateMetaData(id) {
    document.getElementById("sample-metadata").innerText = '';
    let elements = [];
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
    for (var i = 0; i < elements.length; i++) {
        document.getElementById("sample-metadata").innerText += elements[i] + "\n";
    }
}


function bubbleChart(id) {
    let xValues = [];
    let yValues = [];
    let color = [];
    let size = [];
    let text = [];
    for (m = 0; m < sampleData.length; m++) {
        if (id == sampleData[m].id) {
            xValues = sampleData[m].otu_ids;
            yValues = sampleData[m].sample_values;
            color = sampleData[m].otu_ids;
            console.log(color);
            size = sampleData[m].sample_values;
            text = sampleData[m].otu_labels
        }
        // marker size=sample_values,marker color=otu_ids,text=otu_labels
    }


    let trace1 = {
        x: xValues,
        y: yValues,
        mode: 'markers',
        marker: {
            color: color,
            size: size,
            text: text,
            colorscale: 'Jet'
            // name: 'Bone',
            // colors: [
            //     '#00000b',
            //     '#202035',
            //     '#404060',
            //     '#606a80',
            //     '#80959f',
            //     '#9fbfbf',
            //     '#cfdfdf',
            //     '#ffffff'
            // ]
        }
    };

    let data2 = [trace1];
    let layout = {
        title: 'Bubble Chart'
    }
    Plotly.newPlot('bubble', data2, layout);
}




