var width = 1400;
var height = 1400;

var projection = d3.geoAlbers()
    .scale(1000)
    .translate([width/2, height/2]);//not neccesary?

var path = d3.geoPath()
    // .projection(projection);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("x", 0)
    .attr("y", 0); //creates the svg

// var color = d3.scaleThreshold()
//     .domain([0.02, 0.04, 0.06, 0.08, 0.10])
//     .range(["#f2f0f7", "#dadaeb", "#bcbddc", "#9e9ac8", "#756bb1", "#54278f"]);

const countyarray = ['36061',
'02020',
'06075',
'15003',
'36047',
'25025',
'11001',
'53033',
'42101',
'06085',
'17031',
'06037',
'37119',
'06067',
'41051',
'12025',
'36001',
'27053',
'24005',
'08031',
'42003',
'37063',
'06073',
'37021',
'36029',
'13121',
'04019',
'55079',
'48015',
'12095',
'12057',
'39049',
'32003',
'28059',
'47037',
'32031',
'29189',
'04013',
'48113',
'18097',
'48029',
'48225',
'21111',
'55025',
'47157',
'49035',
'05119',]




const cityarray = []
d3.json("master.json", function(data) {
    let array = data.City
    for (let i = 0; i < array.length; i++) {
        cityarray.push(array[i].name.split(", ")[0])
    }
});
//this hacky solution does not work - need to map by id... not name

const fulldataset = (d3.json("master.json", function(data) {
    return data
    //any other functions that depend on data
}));

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
        if (countyarray.includes(d.id)) {
            return "yellow"
        }
    })
    .on("mouseover",function(d) {
        if (countyarray.includes(d.id)) {
        d3.select("h2").text(`County: ${d.properties.name}`)
        d3.select("h3").text()
        };
    })
    .on("mouseout"), function(d) {
        if (countyarray.includes(d.id)) {
            d3.select("h2").text("")};
    };    

   /* svg.apppend("g").attr("class", "items")
        .selectAll("path")
        .data(fulldataset)
        .enter()
        .append("path")
        .attr("d")*/

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

