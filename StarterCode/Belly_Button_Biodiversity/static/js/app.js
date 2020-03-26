function unpack(rows, index) {
  return rows.map(function(row) {
    return row[index];
  });
}

// Fetch the JSON data and console log it
// d3.json("samples.json").then(function(data) {
//   // return data;
//   console.log(data);
//   var names = data.names;
//   console.log(names);
//   var metadata = data.metadata;
//   // console.log(metadata);
//   var samples = data.samples;
//   // console.log(samples);
//   // console.log(samples[0].sample_values);
// });

function init() {
  d3.json("samples.json").then(function(data) {
    // return data;
    var names = data.names;
    console.log(names);
    var metadata = data.metadata;
    var samples = data.samples;
    var sampleValues = samples[0].sample_values
    var otuIDs = samples[0].otu_ids
    var otuLabels - samples[0].otu_labels
    var sortedV = sampleValues.sort((a, b) => b - a);
    var sortedIDs = otuIDs.sort((a, b) => b - a);
    var slicedV = sortedV.slice(0, 10);
    var slicedIDs = sortedIDs.slice(0, 10);


    var ele = document.getElementById('selDataset');
    // var dropdownMenu = d3.select("#selDataset");
    // var ele = dropdownMenu.property("value");
    for (var i = 0; i < names.length; i++) {
      console.log(names[1]);
        // POPULATE SELECT ELEMENT WITH JSON.
        ele.innerHTML = ele.innerHTML +
            '<option value="' + names[i] + '">' + names[i] + '</option>';
    }


  // Trace1 for the Greek Data
  var trace1 = {
    x: slicedV,
    y: otuLabels,
    // text: reversedData.map(object => object.otu_labels ),
    name: "Greek",
    type: "bar",
    orientation: "h"
  };
  var data = [trace1];
  // Apply the group bar mode to the layout
  var layout = {
    title: "Sample values",
    margin: {
      l: 100,
      r: 100,
      t: 100,
      b: 100
    }
  };
  // Plotly.newPlot("bar", data, layout);

  var trace2 = {
    x: [1, 2, 3, 4],
    y: [10, 11, 12, 13],
    text: ['A<br>size: 40', 'B<br>size: 60', 'C<br>size: 80', 'D<br>size: 100'],
    mode: 'markers',
    marker: {
      color: ['rgb(93, 164, 214)', 'rgb(255, 144, 14)',  'rgb(44, 160, 101)', 'rgb(255, 65, 54)'],
      size: [40, 60, 80, 100]
      }
  };

  var data_bubble = [trace2];

  var layout_bubble = {
    title: 'Bubble Chart of Samples',
    showlegend: false,
    height: 600,
    width: 600
  };

  Plotly.newPlot('bubble', data_bubble, layout_bubble);
  });
  }

// Call updatePlotly() when a change takes place to the DOM
d3.selectAll("#selDataset").on("change", updatePlotly);

// This function is called when a dropdown menu item is selected
function updatePlotly() {
  // Use D3 to select the dropdown menu
  var dropdownMenu = d3.select("#selDataset");
  // Assign the value of the dropdown menu option to a variable
  var name = dropdownMenu.property("value");

  // Sort the data by Greek search results
  var sortedSampleValues = data.sort((a, b) => b.name.sample_values  - a.name.sample_values );
  // Slice the first 10 objects for plotting
  slicedData = sortedSampleValues.slice(0, 10);
  reversedData = slicedData.reverse();

  var trace1 = {
    x: reversedData.map(object => object.name.sample_values),
    y: reversedData.map(object => object.name.otu_ids ),
    text: reversedData.map(object => object.name.otu_labels ),
    // text: reversedData.map(object => object.otu_labels ),
    name: "Samples",
    type: "bar",
    orientation: "h"
  };
  var data = [trace1];
  // Apply the group bar mode to the layout
  var layout = {
    title: "Sample values",
    margin: {
      l: 100,
      r: 100,
      t: 100,
      b: 100
    }
  };

  // Render the plot to the div tag with id "bar"
  Plotly.restyle("bar", "layout", [layout]);
  Plotly.restyle("bar", "data", [data]);

  var sample = name.sample_values

  var trace2 = {
    x: sample.map(object => object.otu_ids),
    y: sample.map(object => object.sample_values),
    text: sample.map(object => object.otu_labels),
    mode: 'markers',
    marker: {
      color: sample.map(object => object.otu_ids),
      size: sample.map(object => object.sample_values)
      }
  };

  var data_bubble = [trace1];

  var layout_bubble = {
    title: 'Bubble Chart of Samples',
    showlegend: false,
    height: 600,
    width: 600
  };

  Plotly.restyle("bubble", "layout", [layout_bubble]);
  Plotly.restyle("bubble", "data", [data_bubble]);

  // // Initialize x and y arrays
  // var x = [];
  // var y = [];
  //
  // if (dataset === 'dataset1') {
  //   x = [1, 2, 3, 4, 5];
  //   y = [1, 2, 4, 8, 16];
  // }
  //
  // if (dataset === 'dataset2') {
  //   x = [10, 20, 30, 40, 50];
  //   y = [1, 10, 100, 1000, 10000];
  // }
  //
  // // Note the extra brackets around 'x' and 'y'
  // Plotly.restyle("plot", "x", [x]);
  // Plotly.restyle("plot", "y", [y]);
}

init();
