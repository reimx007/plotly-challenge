function DrawBarChart(sampleID)
{
  console.log(`Calling DrawBarChart(${sampleID})`)
  d3.json("samples.json").then(function(data) {
    var sampleID_int = parseInt(sampleID);
    console.log(sampleID_int);
    var samples = data.samples;
    // samples.forEach(sample => console.log(sample));
    // console.log(samples);
    var filteredData = samples.filter(sample => samples.id === sampleID_int);
    console.log(filteredData);

    // // Sort the data by Greek search results
    // var sortedSampleValues = data.sort((a, b) => b.name.sample_values  - a.name.sample_values );
    // // Slice the first 10 objects for plotting
    // slicedData = sortedSampleValues.slice(0, 10);
    // reversedData = slicedData.reverse();
    //
    // var trace1 = {
    //   x: reversedData.map(object => object.name.sample_values),
    //   y: reversedData.map(object => object.name.otu_ids ),
    //   text: reversedData.map(object => object.name.otu_labels ),
    //   // text: reversedData.map(object => object.otu_labels ),
    //   name: "Samples",
    //   type: "bar",
    //   orientation: "h"
    // };
  // Trace1 for the Greek Data
  // var trace1 = {
  //   x: slicedV,
  //   y: otuLabels,
  //   // text: reversedData.map(object => object.otu_labels ),
  //   name: "Greek",
  //   type: "bar",
  //   orientation: "h"
  // };
  // var data = [trace1];
  // // Apply the group bar mode to the layout
  // var layout = {
  //   title: "Sample values",
  //   margin: {
  //     l: 100,
  //     r: 100,
  //     t: 100,
  //     b: 100
  //   }
  // };
  // Plotly.newPlot("bar", data, layout);
});
}

function DrawBubblechart(sampleID)
{
  console.log(`Calling DrawBubblechart(${sampleID})`)
}

function ShowMetadata(sampleID)
{
  console.log(`Calling ShowMetadata(${sampleID})`)
  d3.json("samples.json").then(function(data) {
    var sampleID_int = parseInt(sampleID);
    // console.log(sampleID_int);
    var metadata = data.metadata;
    // console.log(metadata);
    var filteredData = metadata.filter(person => person.id === sampleID_int);
    // console.log(filteredData)
    var metadataValues = [];
    Object.entries(filteredData[0]).forEach(([key, value]) => metadataValues.push(value));
    console.log(`Metadata values for ${sampleID}: ${metadataValues}`);
    // Use chaining to create a new element and set its text
    var id_p = d3.select("#sample-metadata").append("p").text(`ID: ${metadataValues[0]}`);
    var eth_p = d3.select("#sample-metadata").append("p").text(`Ethnicity: ${metadataValues[1]}`);
    var gen_p = d3.select("#sample-metadata").append("p").text(`Gender: ${metadataValues[2]}`);
    var age_p = d3.select("#sample-metadata").append("p").text(`Age: ${metadataValues[3]}`);
    var location_p = d3.select("#sample-metadata").append("p").text(`Location: ${metadataValues[4]}`);
    var bbtype_p = d3.select("#sample-metadata").append("p").text(`bbtype: ${metadataValues[5]}`);
    var wfreq_p = d3.select("#sample-metadata").append("p").text(`wfreq: ${metadataValues[6]}`);
});
}

function optionChanged(newSampleID)
{
  console.log(`User selected ${newSampleID}`)

  DrawBubblechart(newSampleID);
  DrawBarChart(newSampleID);
  ShowMetadata(newSampleID);
}


function InitDashboard()
{
    console.log("Initializing Dashboard");

    var selector = d3.select("#selDataset");

    d3.json("samples.json").then(function(data) {
      console.log(data);

      var names = data.names;
      names.forEach((sampleId) => {
        selector.append("option")
          .text(sampleId)
          .property("value", sampleId);
      });

    });
}

InitDashboard();
