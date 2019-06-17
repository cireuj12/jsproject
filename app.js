var width = 1000;
var height = 1000;

var projection = d3.geoAlbers()
    .scale(500)
    .translate([width/2, height/2]);//not neccesary?

var path = d3.geoPath()
    // .projection(projection);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
     //creates the svg

//store these arrays elsewhere
const countyarray = ['36061','02020','06075','15003','36047','25025',
'11001','53033','42101','06085','17031','06037','37119','06067','41051',
'12025','36001','27053','24005','08031','42003','37063','06073','37021',
'36029','13121','04019','55079','48015','12095','12057','39049','32003',
'28059','47037','32031','29189','04013','48113','18097','48029','48225',
'21111','55025','47157','49035','05119',]

const countyjson = {'36061' : 'New York',
'02020' : 'Anchorage',
'06075' : 'San Francisco',
'15003' : 'Honolulu',
'36047' : 'Brooklyn',
'25025' : 'Boston',
'11001' : 'Washington DC',
'53033' : 'Seattle',
'42101' : 'Philadelphia',
'06085' : 'San Jose',
'17031' : 'Chicago',
'06037' : 'Los Angeles',
'37119' : 'Charlotte',
'06067' : 'Sacramento',
'41051' : 'Portland',
'12025' : 'Miami',
'36001' : 'Albany',
'27053' : 'Minneapolis',
'24005' : 'Baltimore',
'08031' : 'Denver',
'42003' : 'Pittsburgh',
'37063' : 'Raleigh',
'06073' : 'San Diego',
'37021' : 'Asheville',
'36029' : 'Buffalo',
'13121' : 'Atlanta',
'04019' : 'Tuscon',
'55079' : 'Milwaukee',
'48015' : 'Austin',
'12095' : 'Orlando',
'12057' : 'Tampa',
'39049' : 'Columbus',
'32003' : 'Las Vegas',
'28059' : 'Kansas City',
'47037' : 'Nashville',
'32031' : 'Reno',
'29189' : 'St Louis',
'04013' : 'Phoenix',
'48113' : 'Dallas',
'18097' : 'Indianapolis',
'48029' : 'San Antonio',
'48225' : 'Houston',
'21111' : 'Louisville',
'55025' : 'Madison',
'47157' : 'Memphis',
'49035' : 'Salt Lake City',
'05119' : 'Little Rock',}


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
        d3.select("h2").text(`County: ${d.properties.name}`);
        d3.select("h3").text(`City: ${countyjson[d.id]}`)
        };
    })
    .on("mouseout"), function(d) {
            d3.select("h2").text("");
            // d3.select("h3").text("");
    };    

    svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")  
        .style("font-size", "16px") 
        .style("text-decoration", "underline")  
        .text("Map of US");

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

