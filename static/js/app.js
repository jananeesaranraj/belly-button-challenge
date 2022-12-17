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
}
);

function optionChanged(id) {
    // console.log(sampleData)
    // alert('coming here') 
    let xValues = [];
    let yValues = [];
    let labels = [];
    let slicedOtu = [];
    for (j = 0; j < sampleData.length; j++) {
        if (id === sampleData[j].id) {
            xValues = sampleData[j].sample_values;
            slicedXvalue = xValues.slice(0, 10);
            // console.log(slicedXvalue);
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
    
    document.getElementById("sample-metadata").innerText = id;
     
//     for (m = 0; m < metaData.length; m++) {
//         console.log(id+'-'+metaData[m].id)
//         if (id === metaData[m].id){
//            alert('')
//            let metaDataId = metaData[m].id
//            console.log(metaDataId)
//            document.getElementById("sample-metadata").innerText = metaDataId;
//            // let ethnicity = `ethnicity : ${metaData[m].ethnicity}`
//            // let gender = `gender: ${metaData[m].gender}`
//         }

//    }

    Plotly.newPlot("bar", data1, layout);
    
    // console.log(metaData);
    // let panelData = d3.select('.panel-body')
    

}





