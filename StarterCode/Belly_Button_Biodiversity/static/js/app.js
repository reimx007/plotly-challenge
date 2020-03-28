
// =============================================
// Create function to draw bubble chart
// =============================================
function DrawBubbleChart(sampleID)
{
  console.log(`Calling DrawBubbleChart(${sampleID})`)
  // Get json file
  d3.json("././samples.json").then(function(data) {
    //convert ID to int
    var sampleID_int = parseInt(sampleID);
    console.log(sampleID_int);
    // extract samples from dataset
    var samples = data.samples;
    // Get values and filter down to just sample that matches the ID
    var sampleArrays = [];
    Object.entries(samples).forEach(([key, value]) => sampleArrays.push(value));
    var samplesFiltered = sampleArrays.filter(sample => sample.id == sampleID_int);
    console.log(samplesFiltered);
    var selectedSample = samplesFiltered[0]
    console.log(selectedSample);
    // extract each item from the sample array
    var selectedItems = []
    Object.entries(selectedSample).forEach(([key, value]) => selectedItems.push(value));
    // set variables for ID list, samples list and otu labels
    var otu_ids = selectedItems[1];
    var sample_values = selectedItems[2];
    var otu_labels = selectedItems[3];
    console.log(`Coolio, we have our values.`);

    // set up trace and use sample variables for bubble graph
    var trace1 = {
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: 'markers',
      marker: {
        color: otu_ids,
        size: [40, 60, 80, 100]
        }
    };

    var data_bubble = [trace1];

    //create layout
    var layout_bubble = {
      title: `Bubble Chart for subject: ${sampleID_int}`,
      xaxis: { title: "OTU IDs" },
      yaxis: { title: "Sample Values"},
      showlegend: false,
      height: 600,
      width: 1000
    };

    // Plot it
    Plotly.newPlot('bubble', data_bubble, layout_bubble);
});
}

// =============================================
// Create function to draw bar chart
// =============================================
function DrawBarChart(sampleID)
{
  console.log(`Calling DrawBarchart(${sampleID})`);
 // read in json data file
  d3.json("././samples.json").then((data) => {
    var sampleID_int = parseInt(sampleID);
    // extract samples
    var samples = data.samples;
    // filter to jsut the sample that matchs sampleID
    var resultArray = samples.filter(s => s.id === sampleID);
    var result = resultArray[0];
    // set variables
    var otu_ids = result.otu_ids;
    var otu_labels = result.otu_labels;
    var sample_values = result.sample_values;

    // set the out ids to be the y ticks and reverse their order
    yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();

    // use extracted sample data to set up bar chart, reversing their orders and splicing them
    var barData = [{
      x: sample_values.slice(0, 10).reverse(),
      y: yticks,
      type: "bar",
      text: otu_labels.slice(0,10).reverse(),
      orientation: "h"
    }];

    // Set layout
    var layout = {
      title: `Sample Values fort: ${sampleID_int}`,
      margin: {
        l: 80,
        t: 30,
        b: 30
      }
    };
    // plot the bar chat
    Plotly.newPlot("bar", barData, layout);
  });
}

// =============================================
// Create function to draw gauge
// =============================================
function DrawGauge(sampleID)
{
  console.log(`Calling DrawGauge(${sampleID})`);
  // read in json
  d3.json("././samples.json").then(function(data) {
    // parse sampleID into integer
    var sampleID_int = parseInt(sampleID);
    // console.log(sampleID_int);
    // Extract metadata
    var metadata = data.metadata;
    // console.log(metadata);
    // filter metadata to match the sampleID
    var filteredData = metadata.filter(person => person.id === sampleID_int);
    // console.log(filteredData)
    // Create array and populate it with values
    var metadataValues = [];
    Object.entries(filteredData[0]).forEach(([key, value]) => metadataValues.push(value));
    // Extract the belly button washing frequency
    console.log(`wfreq: ${metadataValues[6]}`);

    // Set up gauge
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
// create layout and plot it
var layout = { width: 600, height: 450, margin: { t: 0, b: 0 } };
Plotly.newPlot('gauge', data, layout);
});
}

// =============================================
// Create function to show metadata
// =============================================
function ShowMetadata(sampleID)
{
  console.log(`Calling ShowMetadata(${sampleID})`);
  // read in json data
  d3.json("././samples.json").then(function(data) {
    var sampleID_int = parseInt(sampleID);
    // console.log(sampleID_int);
    // extract metadata
    var metadata = data.metadata;
    // console.log(metadata);
    // filter to be jsut metadata matching sampleID
    var filteredData = metadata.filter(person => person.id === sampleID_int);
    // console.log(filteredData)
    // Extract metadata values
    var metadataValues = [];
    Object.entries(filteredData[0]).forEach(([key, value]) => metadataValues.push(value));
    console.log(`Values for ${sampleID}: ${metadataValues}`);
    // Append each metadata value into an html element. Use .html("") to reset each time
    var id_p = d3.select("#sample-metadata").html("").append("p").text(`ID: ${metadataValues[0]}`);
    var eth_p = d3.select("#sample-metadata").append("p").text(`Ethnicity: ${metadataValues[1]}`);
    var gen_p = d3.select("#sample-metadata").append("p").text(`Gender: ${metadataValues[2]}`);
    var age_p = d3.select("#sample-metadata").append("p").text(`Age: ${metadataValues[3]}`);
    var location_p = d3.select("#sample-metadata").append("p").text(`Location: ${metadataValues[4]}`);
    var bbtype_p = d3.select("#sample-metadata").append("p").text(`bbtype: ${metadataValues[5]}`);
    var wfreq_p = d3.select("#sample-metadata").append("p").text(`wfreq: ${metadataValues[6]}`);
});
}

// =============================================
// Create function to call other functions when the dropdown changes
// =============================================
function optionChanged(newSampleID)
{
  console.log(`User selected ${newSampleID}`)

  DrawBubbleChart(newSampleID);
  DrawBarChart(newSampleID);
  DrawGauge(newSampleID);
  ShowMetadata(newSampleID);

}

// =============================================
// Create function to set the initial page.
// =============================================
function InitDashboard()
{
    console.log("Initializing Dashboard");

    var selector = d3.select("#selDataset");
    // read in json data
    d3.json("././samples.json").then(function(data) {
      console.log(data);
      // Use the names list to populate the dropdown menu
      var names = data.names;
      names.forEach((sampleId) => {
        selector.append("option")
          .text(sampleId)
          .property("value", sampleId);
      });

      // Use the first sample ID to populate the default charts
      var sampleID = names[0];

      DrawBubbleChart(sampleID);
      DrawBarChart(sampleID);
      DrawGauge(sampleID);
      ShowMetadata(sampleID);

    });
}

InitDashboard();
