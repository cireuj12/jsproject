var width = 1200;
var height = 1200;

var projection = d3.geoAlbers()
    .scale(1000)
    .translate([width/2, height/2]);//not neccesary?

var path = d3.geoPath()
    // .projection(projection);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height); //creates the svg

// var color = d3.scaleThreshold()
//     .domain([0.02, 0.04, 0.06, 0.08, 0.10])
//     .range(["#f2f0f7", "#dadaeb", "#bcbddc", "#9e9ac8", "#756bb1", "#54278f"]);

const cityarray = []
d3.json("master.json", function(data) {
    let array = data.City
    for (let i = 0; i < array.length; i++) {
        cityarray.push(array[i].name.split(", ")[0])
    }
});



d3.queue()
    .defer(d3.json, "https://d3js.org/us-10m.v2.json")
    .defer(d3.json, "master.json")
    .await(ready);

function ready (error, us) {
    if (error) throw error;

    // var rateById = {}; //empty object
    // unemployment.forEach(function(d) {
    //     rateById[zeroFill(d.id,d.id.length)] = +d.rate; //create property for each id
    // });
    
    // svg.append("g").attr("class", "states")
    // .selectAll("path")
    // .data(topojson.feature(us,us.objects.states).features) //bind topojson to data elements
    // .enter()
    // .append("path")
    // .attr("d", path)
    svg.append("g").attr("class","counties")
    .selectAll("path")
    .data(topojson.feature(us,us.objects.counties).features) 
    .enter()
    .append("path")
    .attr("d", path)
    .style("fill", function(d) {
        if (cityarray.includes(d.properties.name)) {
            return "yellow"
        }
    });    
        // .style("stroke", "white")
        // .style("fill", "grey");//get ratevalue for property matching dataID
            //pass rate value to color function, return color based on domain and range
    
        // .on("mouseover", function(d){
        //     d3.select("h2").text(d.id);
        //     d3.select("h3").text(rateById[d.id]);
        // })
        // .on("mouseout", function(d){
        //     d2.select("h2").text("");
        //     d3.select("h3").text("");
        // });;
        // .style("stroke", "black");

    // svg.append("path")
    //     // .datum(topojson.mesh(us, us.o    bjects.states, function(a, b) {
    //     //     return a.id !== b.id;
    //     // }))
    //     .attr("class", "states")
    //     .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) {
    //         return a.id !== b.id;
    //     })));
}

