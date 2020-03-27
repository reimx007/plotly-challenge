function DrawBubbleChart(sampleID)
{
  console.log(`Calling DrawBubbleChart(${sampleID})`)
  d3.json("samples.json").then(function(data) {
    var sampleID_int = parseInt(sampleID);
    console.log(sampleID_int);
    var samples = data.samples;
    var sampleArrays = [];
    Object.entries(samples).forEach(([key, value]) => sampleArrays.push(value));
    var samplesFiltered = sampleArrays.filter(sample => sample.id == sampleID_int);
    console.log(samplesFiltered);
    var selectedSample = samplesFiltered[0]
    console.log(selectedSample);
    var selectedItems = []
    Object.entries(selectedSample).forEach(([key, value]) => selectedItems.push(value));
    var otu_ids = selectedItems[1];
    var sample_values = selectedItems[2];
    var otu_labels = selectedItems[3];
    console.log(`Coolio, we have our values.`);

    var trace2 = {
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: 'markers',
      marker: {
        color: otu_ids,
        size: [40, 60, 80, 100]
        }
    };

    var data_bubble = [trace2];

    var layout_bubble = {
      title: `Bubble Chart for subject: ${sampleID_int}`,
      xaxis: { title: "OTU IDs" },
      yaxis: { title: "Sample Values"},
      showlegend: false,
      height: 600,
      width: 1000
    };

    Plotly.newPlot('bubble', data_bubble, layout_bubble);
});
}

function DrawBarChart(sampleID)
{
  console.log(`Calling DrawBarchart(${sampleID})`);

  d3.json("samples.json").then((data) => {
    var sampleID_int = parseInt(sampleID);
    var samples = data.samples;
    var resultArray = samples.filter(s => s.id === sampleID);
    var result = resultArray[0];
    var otu_ids = result.otu_ids;
    var otu_labels = result.otu_labels;
    var sample_values = result.sample_values;

    yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();

    var barData = [{
      x: sample_values.slice(0, 10).reverse(),
      y: yticks,
      type: "bar",
      text: otu_labels.slice(0,10).reverse(),
      orientation: "h"
    }];

    var layout = {
      title: `Sample Values fort: ${sampleID_int}`,
      margin: {
        l: 80,
        t: 30,
        b: 30
      }
    };
    Plotly.newPlot("bar", barData, layout);
  });
}

function DrawGauge(sampleID)
{
  console.log(`Calling DrawGauge(${sampleID})`);
  d3.json("samples.json").then(function(data) {
    var sampleID_int = parseInt(sampleID);
    // console.log(sampleID_int);
    var metadata = data.metadata;
    // console.log(metadata);
    var filteredData = metadata.filter(person => person.id === sampleID_int);
    // console.log(filteredData)
    var metadataValues = [];

    Object.entries(filteredData[0]).forEach(([key, value]) => metadataValues.push(value));
    console.log(`wfreq: ${metadataValues[6]}`);

    var data = [
  {
    domain: { x: [0, 1], y: [0, 1] },
    value: metadataValues[6],
    title: { text: "Washing frequency per week" },
    type: "indicator",
    mode: "gauge+number",
    // delta: { reference: 380 },
    gauge: {
      axis: {
        range: [null, 9],
        tickmode: "array",
        tickvals: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        ticktext: ["1", "2", "3", "4", "5", "6", "7", "8", "9"]
       },
      steps: [
        { range: [0, 1], color: "#A3C1AD" },
        { range: [1, 2], color: "#A3C1AD" },
        { range: [2, 3], color: "#A3C1AD" },
        { range: [3, 4], color: "#A3C1AD" },
        { range: [4, 5], color: "#A3C1AD" },
        { range: [5, 6], color: "#A3C1AD" },
        { range: [6, 7], color: "#A3C1AD" },
        { range: [7, 8], color: "#A3C1AD" },
        { range: [8, 9], color: "#A3C1AD" }
      ],
    }
  }
];

var layout = { width: 600, height: 450, margin: { t: 0, b: 0 } };
Plotly.newPlot('gauge', data, layout);

});
}

function ShowMetadata(sampleID)
{
  console.log(`Calling ShowMetadata(${sampleID})`);
  d3.json("samples.json").then(function(data) {
    var sampleID_int = parseInt(sampleID);
    // console.log(sampleID_int);
    var metadata = data.metadata;
    // console.log(metadata);
    var filteredData = metadata.filter(person => person.id === sampleID_int);
    // console.log(filteredData)
    var metadataValues = [];

    Object.entries(filteredData[0]).forEach(([key, value]) => metadataValues.push(value));
    console.log(`Values for ${sampleID}: ${metadataValues}`);
    // Use chaining to create a new element and set its text
    var id_p = d3.select("#sample-metadata").html("").append("p").text(`ID: ${metadataValues[0]}`);
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

  DrawBubbleChart(newSampleID);
  DrawBarChart(newSampleID);
  DrawGauge(newSampleID);
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

      var sampleID = names[0];

      DrawBubbleChart(sampleID);
      DrawBarChart(sampleID);
      DrawGauge(sampleID);
      ShowMetadata(sampleID);

    });
}

InitDashboard();
