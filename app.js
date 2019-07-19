function searchclick() {
    // alert("Search doesn't work yet!")
    var search = document.getElementById("searchCity");
    search.value = "Search does not work yet!"
}

function searchkey(e) {
    if (e.keyCode === 13) {  //checks whether the pressed key is "Enter"
    alert("Search doesn't work yet!")
}}

var margin = 40;
var width = 1500;
var height = 1000 - 2 * margin;

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
'04019' : 'Tucson',
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
        cityarray.push(array[i].city_name.split(", ")[0])
    }
});
//this hacky solution does not work - need to map by id... not name


var master;
d3.json("countyid.json",function(data) {
    master =  data
});


d3.queue()
    .defer(d3.json, "https://d3js.org/us-10m.v2.json")
    .defer(d3.json, "countyid.json")
    .await(ready);

var statelistener = ""

function ready (error, us, master) {
    if (error) throw error;

    var table  = d3.select("#table").append("table");
    var countyarray = Object.keys(countyjson)



    // document.getElementById("searchButton").onclick = function() {
    //     console.log("this does not work yet!")
        // alert(document.getElementById("searchCity").value);
    // }

    // document.getElementbyId("searchCity").onsubmit = function() {searchFunction()};

    // function searchFunction() {
    //     var x = document.getElementById("searchCity");
    //     return x.value;
    // }

    svg.append("g").attr("class","counties")
    .selectAll("path")
    .data(topojson.feature(us,us.objects.counties).features) 
    .enter()
    .append("path")
    .attr("d", path)
    .style("fill", function(d) {
        if (countyarray.includes(d.id)) {
            return "#F4D03F"
        }
    })
    .on("mouseover",function(d) {
        statelistener = d.id;
        // console.log(statelistener);
        //on search 
        //filter 
        let city_keys = Object.keys(master[d.id])
        let city_values = Object.values(master[d.id]) // use this and above somehow
        if (countyarray.includes(d.id) || countyarray.includes(d.id) ) {
            d3.select("#county").text(`County:  ${d.properties.name}`)
            d3.select("#city").text(`City:  ${countyjson[d.id]}`)
            d3.select("#meal").text(`Meal for Two:  ${master[d.id][(city_keys[1])]}`)
            d3.select("#domestic_beer").text(`Domestic Beer:  ${master[d.id][(city_keys[4])]}`)
            d3.select("#monthlycommute").text(`Monthly Commute:  ${master[d.id][(city_keys[29])]}`)
            d3.select("#gas").text(`Gallon of Gas:  ${master[d.id][(city_keys[33])]}`)
            d3.select("#milk").text(`Gallon of Milk:  ${master[d.id][(city_keys[9])]}`)
            d3.select("#eggs").text(`A Dozen Eggs:  ${master[d.id][(city_keys[12])]}`)
            d3.select("#movieticket").text(`Movie:  ${master[d.id][(city_keys[41])]}`)
            d3.select("#fitness-club").text(`Gym Membership:  ${master[d.id][(city_keys[39])]}`)
            d3.select("#monthly-utilities").text(`Monthly Utilities:  ${master[d.id][(city_keys[36])]}`)
            d3.select("#rent").text(`Rent for 1BR(City Center):  ${master[d.id][(city_keys[48])]}`)
            d3.select("#rent2").text(`Rent for 1BR:  ${master[d.id][(city_keys[49])]}`)
            d3.select("#mortgage-rate").text(`Mortgage Rate:  ${master[d.id][(city_keys[55])]}%`)
            };
    })
    .on("mouseout"), function(d) {
            d3.select("county").text("");
            // d3.select("h3").text("");
    };    

    svg.append("text")
        .attr("x", 500)             
        .attr("y", 30)
        .attr("text-anchor", "middle")  
        .style("font-size", "36px")
        .style("font-family", "Varela Round")
        // .style("text-decoration", "underline")  
        .text("COL-lie");

    svg.append("g")

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

        svg.append("path")
        .datum(topojson.mesh(us, us.objects.states, function(a, b) {
            return a.id !== b.id;
        }))
        .attr("class", "states")
        .attr("d", path)
        .attr("fill", "none");
}

