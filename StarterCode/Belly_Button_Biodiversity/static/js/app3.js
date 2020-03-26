function DrawBarChart(sampleID)
{
  console.log(`Calling DrawBarChart(${sampleID})`)
}

function DrawBubblechart(sampleID)
{
  console.log(`Calling DrawBubblechart(${sampleID})`)
}

function ShowMetadata(sampleID)
{
  console.log(`Calling ShowMetadata(${sampleID})`)
  d3.json("samples.json").then(function(data) {
    // return data;
    // var names = data.names;
    // console.log(names);
    var metadata = data.metadata;
    console.log(metadata);
})

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
