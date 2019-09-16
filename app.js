

/// only works with zip code
/// needs a searchbar with dropdown
///https://www.w3schools.com/howto/howto_js_filter_dropdown.asp


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


var searchtest = ""
function searchclick() {
    // alert("Search doesn't work yet!")
    var search = document.getElementById("searchCity");
    var countyarray = Object.keys(countyjson);
    // search.value = "Search does not work yet!"
    // var searchtest = search.value
    
    if (countyarray.includes(search.value)) {
            searchtest = search.value
        } else {
            searchtest = countyarray.find(key => countyjson[key] === search.value)
        }

    // let city_keys = Object.keys(master["36061"])
    // d3.select("#meal").text(`Meal for Two:  ${master["36061"][(city_keys[1])]}`)
    // console.log(searchtest);


    let search_variable = master[searchtest]
    let city_keys = Object.keys(master[searchtest])
    let city_values = Object.values(master[searchtest]) // use this and above somehow
    if (countyarray.includes(searchtest)) {
        // d3.select("#county").text(`County:  `)
        d3.select("#city").text(`City:  ${countyjson[searchtest]}`)
        d3.select("#meal").text(`Meal for Two:  ${master[searchtest][(city_keys[1])]}`)
        d3.select("#domestic_beer").text(`Domestic Beer (1 pint):  ${master[searchtest][(city_keys[4])]}`)
        d3.select("#monthlycommute").text(`Monthly Commuting Pass:  ${master[searchtest][(city_keys[29])]}`)
        d3.select("#gas").text(`Gas (1 gallon):  ${master[searchtest][(city_keys[33])]}`)
        d3.select("#milk").text(`Milk (1 gallon):  ${master[searchtest][(city_keys[9])]}`)
        d3.select("#eggs").text(`Eggs (dozen):  ${master[searchtest][(city_keys[12])]}`)
        d3.select("#movieticket").text(`Movie (1 ticket):  ${master[searchtest][(city_keys[41])]}`)
        d3.select("#fitness-club").text(`Gym Membership (monthly):  ${master[searchtest][(city_keys[39])]}`)
        d3.select("#monthly-utilities").text(`Basic Monthly Utilities (Eletricity, Water, Heating and Cooling):  ${master[searchtest][(city_keys[36])]}`)
        d3.select("#rent").text(`Rent for 1BR (City Center):  ${master[searchtest][(city_keys[48])]}`)
        d3.select("#rent2").text(`Rent for 1BR:  ${master[searchtest][(city_keys[49])]}`)
        d3.select("#mortgage-rate").text(`Mortgage Rate:  ${master[searchtest][(city_keys[55])]}%`)
        d3.select("#imported_beer").text(`Imported Beer (1 pint): ${master[searchtest][(city_keys[5])]}`)
        d3.select("#water").text(`Bottled Water (12 oz): ${master[searchtest][(city_keys[8])]}`)
        d3.select("#chicken").text(`Chicken Breasts (1 lb): ${master[searchtest][(city_keys[15])]}`)
        d3.select("#apple").text(`Apples (1 lb): ${master[searchtest][(city_keys[17])]}`)
        d3.select("#banana").text(`Banana (1 lb): ${master[searchtest][(city_keys[18])]}`)
        d3.select("#internet").text(`Internet (monthly): ${master[searchtest][city_keys[38]]}`)
        d3.select("#average-monthly-salary").text(`Average Salary (monthly): ${master[searchtest][city_keys[54]]}`)
        d3.select("#pre-school").text(`Tuition for Pre-School (monthly): ${master[searchtest][city_keys[42]]}`)    
    };

}

function searchkey() {
    let input = document.getElementById("searchCity")
    input.addEventListener("keyup", function(event) {
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
          // Cancel the default action, if needed
          event.preventDefault();
          // Trigger the button element with a click
          document.getElementById("test-click").click();
        }
      });
}

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
        if (countyarray.includes(d.id) && !(searchtest)) {
            return "#F4D03F"
        }
    })
    .on("mouseover",function(d) {
        statelistener = d.id;
        // console.log(statelistener);
        //on search 
        //filter 
        let search_variable = master[d.id]
        let city_keys = Object.keys(master[d.id])
        let city_values = Object.values(master[d.id]) // use this and above somehow
        if (countyarray.includes(d.id)) {
            // d3.select("#county").text(`County:  ${d.properties.name}`)
            d3.select("#city").text(`City:  ${countyjson[d.id]}`)
            d3.select("#meal").text(`Meal for Two:  ${master[d.id][(city_keys[1])]}`)
            d3.select("#domestic_beer").text(`Domestic Beer (1 pint):  ${master[d.id][(city_keys[4])]}`)
            d3.select("#monthlycommute").text(`Monthly Commuting Pass:  ${master[d.id][(city_keys[29])]}`)
            d3.select("#gas").text(`Gas (1 gallon):  ${master[d.id][(city_keys[33])]}`)
            d3.select("#milk").text(`Milk (1 gallon):  ${master[d.id][(city_keys[9])]}`)
            d3.select("#eggs").text(`Eggs (dozen):  ${master[d.id][(city_keys[12])]}`)
            d3.select("#movieticket").text(`Movie (1 ticket):  ${master[d.id][(city_keys[41])]}`)
            d3.select("#fitness-club").text(`Gym Membership (monthly):  ${master[d.id][(city_keys[39])]}`)
            d3.select("#monthly-utilities").text(`Basic Monthly Utilities (Eletricity, Water, Heating and Cooling):  ${master[d.id][(city_keys[36])]}`)
            d3.select("#rent").text(`Rent for 1BR (City Center):  ${master[d.id][(city_keys[48])]}`)
            d3.select("#rent2").text(`Rent for 1BR:  ${master[d.id][(city_keys[49])]}`)
            d3.select("#mortgage-rate").text(`Mortgage Rate:  ${master[d.id][(city_keys[55])]}%`)
            d3.select("#imported_beer").text(`Imported Beer (1 pint): ${master[d.id][(city_keys[5])]}`)
            d3.select("#water").text(`Bottled Water (12 oz): ${master[d.id][(city_keys[8])]}`)
            d3.select("#chicken").text(`Chicken Breasts (1 lb): ${master[d.id][(city_keys[15])]}`)
            d3.select("#apple").text(`Apples (1 lb): ${master[d.id][(city_keys[17])]}`)
            d3.select("#banana").text(`Banana (1 lb): ${master[d.id][(city_keys[18])]}`)
            d3.select("#internet").text(`Internet (monthly): ${master[d.id][city_keys[38]]}`)
            d3.select("#average-monthly-salary").text(`Average Salary (monthly): ${master[d.id][city_keys[54]]}`)
            d3.select("#pre-school").text(`Tuition for Pre-School (monthly): ${master[d.id][city_keys[42]]}`)
            };

            // if (d3.select(this).classed("active")) return;
            /* no need to change class when county is already selected */
      
            
              d3.select(this).attr("class", "hover");
            
      
            // if(toolTipVisible){
            //   div.transition()
            //       .duration(200)
            //       .style("opacity", .9);
            //   div .html(d3.select(this).attr('id').replace("_", " "))
            //       .style("left", (d3.event.pageX) + "px")
            //       .style("top", (d3.event.pageY - 5) + "px");
            // } 
    })
    // .on("mouseover", handleHover )
 

    svg.selectAll("path")
    .on("mouseout", function (d) {
        d3.select(this).attr("class","unhover")
    })

    function handleHover(d) {
        // if (d3.select(this).classed("active")) return;
        // /* no need to change class when county is already selected */
  
        // if (!d3.select(this).classed("highlight")){
        //   d3.select(this).attr("class", "hover");
        // }
  
        // if(toolTipVisible){
        //   div.transition()
        //       .duration(200)
        //       .style("opacity", .9);
        //   div .html(d3.select(this).attr('id').replace("_", " "))
        //       .style("left", (d3.event.pageX) + "px")
        //       .style("top", (d3.event.pageY - 5) + "px");
        // } 
    }

    // d3.select("#test-click")
    // .on('click', function() {
    //     d3.select("#meal").text(`Meal for Two:  ${master["36061"][(city_keys[1])]}`)
    // })

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

