d3.json("master.json",function(data) {
    console.log(data.City[0].item[0]["Meal, Inexpensive Restaurant"]);
  });