// @TODO: YOUR CODE HERE!
d3.csv("data.csv")
  .then(function(data) {
    var svgW = 960;
    var svgH = 500;
    // Step 1: Parse Data/Cast as numbers
    // ==============================
    var x = data.map(data => Number(data.hair_length));
    var y = data.map(data => Number(data.num_hits));
    var extradata = data.map(data => String(data.rockband));
    var ytext = "Y label";
    var xtext = "X label";
    bubblePlot(x,y,xtext, ytext,extradata,".chart", svgW, svgH);
  });

function bubblePlot(x,y,xtext,ytext,extradata,thetag, svgWidth, svgHeight){

  
  var margin = {
    top: 20,
    right: 40,
    bottom: 60,
    left: 100
  };
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select(thetag)
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import Data


    // Step 2: Create scale functions
    // ==============================
    var xLinearScale = d3.scaleLinear()
      .domain([20, d3.max(x)])
      .range([0, width]);

    var yLinearScale = d3.scaleLinear()
      .domain([0, d3.max(y)])
      .range([height, 0]);

    // Step 3: Create axis functions
    // ==============================
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // Step 4: Append Axes to the chart
    // ==============================
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    chartGroup.append("g")
      .call(leftAxis);

    // Step 5: Create Circles
    // ==============================
    var circlesGroup = chartGroup.selectAll("circle")
    .data(extradata)
    .enter()
    .append("circle")
    .attr("cx", (d,i) => xLinearScale(x[i]))
    .attr("cy", (d,i) => yLinearScale(y[i]))
    .attr("r", "15")
    .attr("fill", "pink")
    .attr("opacity", ".5");

    // Step 6: Initialize tool tip
    // ==============================
    
    
    var toolTip = d3.select("body").append("div")
    .attr("class", "tooltip");

    // Step 2: Create "mouseover" event listener to display tooltip
    circlesGroup.on("click", function(d, i) {
      toolTip.style("display", "block");
      toolTip.html(`${extradata[i]}<br>Tooltip 1: ${x[i]}<br>Tooltip 1: ${y[i]}`)
        .style("left", d3.event.pageX + "px")
        .style("top", d3.event.pageY + "px");
    })
      // Step 3: Add an onmouseout event to make the tooltip invisible
      .on("mouseout", function() {
        toolTip.style("display", "none");
      });


    // Create axes labels
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text(ytext);

    chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      .attr("class", "axisText")
      .text(xtext);
  
}