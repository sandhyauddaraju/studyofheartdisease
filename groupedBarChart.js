loadGroupedBarChart = function(dataset){    

       
groupInfo =  getDataForGroupedBarChart(dataset);
   // totalCount = GetTotalCountOfDeaths();
//console.log(groupInfo);
var x0 = d3.scale.ordinal()
      .rangeRoundBands([0, 600], .1);
  
  var x1 = d3.scale.ordinal();
  
  var y = d3.scale.linear()
  .range([height, 0]);
  //.range([h - padding, padding]);
 // "#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"
  //var DiseaseCategory = ["Diabetes", "Kidney Disease", "Asthma", "Skin Cancer"];
  var DiseaseCategory = ["Asthma", "Kidney Disease", "Skin Cancer", "Diabetes"];
  var color = d3.scale.ordinal()
      .range(["#8a89a6","#6b486b","#a05d56","#ff8c00"]);
  var colorLegend = d3.scale.ordinal()
      .range(["#8a89a6","#6b486b","#a05d56","#ff8c00"]);
  
  var xAxis = d3.svg.axis()
      .scale(x0)
      .orient("bottom");
  
  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");
      //.ticks(6);
      //.tickFormat(d3.format(".2s"));
  

//var svg = d3.select("body")
 //     .select("#chart-area2")
 //         .append("svg")
 //         .attr("width", 500) //+ 
 //         .attr("height", 650)          
  var svg = d3.select("body")
  .select("#groupedbarchart")
  .append("svg")
   .attr("width", 1000)
   .attr("height", 450)
   //.attr("overflow" ,"visible")
   //.style("position","bottom")
   .append("g")
   .attr("transform", "translate(" + margin.left + "," + 0   + ")")
   ;
   //.style("display","inline-block");
   //console.log(d.AgeGrp);
      var groups = d3.map(groupInfo, function(d){  return(d.AgeGrp)}).keys();
      //console.log(groups);
      var diseasegroups =  d3.keys(groupInfo[0]).filter(function(key) { return key !== "AgeGrp"; });
      //console.log(diseasegroups );
  
      groupInfo.forEach(function(d) {//console.log("name:"+ name+ "value:" +d[name]);
          d.disease = diseasegroups.map(function(name) {  return {name: name, value: +d[name]}; });
        });
   
     
        x0.domain(groupInfo.map(function(d) { return d.AgeGrp; }));
        x1.domain(diseasegroups).rangeRoundBands([0, x0.rangeBand()]);
       // y.domain([0, d3.max(groupInfo, function(d) { return d3.max(d.gender, function(d) { return d.value; }); })])
       y.domain([
        0,
        d3.max(groupInfo, function(d) { return d3.max(d.disease, function(d) { return d.value; }); })])
        //console.log(d.value);
        // d3.max(groupInfo, function(d) { return d3.max(d.gender, function(d) { return d.value; }); })])
         //.range([h - padding, padding]);
        // .range([0,200]);
      
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")") //height subtract
            .call(xAxis);

     svg.append("text")
            .attr("class", "x label")
            .attr("text-anchor", "middle")
            .attr("x", 200)//450
            .attr("y", 460)
            .text("Age Groups (having heart disease)")
            .style("font-size", "10px")
            .style("text-decoration","bold")
            .attr("font-weight",function(d,i) {return 500;}) ;

    svg.append("g")
            .style("transform", `translate(${50}px,${10}px)`)
            .append("text")
            .attr("class", "title")
            .attr("x", width / 8)
            .attr("y", margin.top/4)
            .attr("text-anchor", "middle")
            .text("Age & Other Disease Distribution")
            .style("font-size", "12px")
            .style("text-decoration", "underline");
      
        svg.append("g")
            .attr("class", "y axis")
            //.attr("transform", "translate("  + ",100)")
           // .attr("transform", "translate(0," + 100 + ")") //160
            //.attr("transform", "translate(" + padding + ",0)")
            .call(yAxis)
         svg.append("text")
         .attr("transform", "translate(0," + ( 10) + "),rotate(-90)")
            //.attr("transform", "rotate(-90)")
            .attr("x", 0)
            .attr("y", 4)
            .attr("dy", ".75em")
            .style("text-anchor", "end")
            .text("Disease count")
            .style("font-size", "10px")
            .attr("font-weight",function(d,i) {return 500;});
      
        var ageGrp = svg.selectAll(".ageGrps")
            .data(groupInfo)
          .enter().append("g")
            .attr("class", "g") //console.log(d.AgeGrp);
            .attr("transform", function(d) {  return "translate(" + x0(d.AgeGrp) + ",0)"; });
      
        ageGrp.selectAll("rect")
            .data(function(d) { return d.disease; })
          .enter().append("rect")
          .attr("id",function(d,i){
              return i;})
           // .attr("width", x1.rangeBand())
           .attr("width", x1.rangeBand())
            .attr("x", function(d) { return x1(d.name); })
            .attr("y", function(d) { return  y(d.value); })
            .attr("height", function(d) { return height - y(d.value); })
            //.attr("height", function(d) { console.log(d.value + " --"+ y(d.value));  return y(d.value); })
            .style("fill", function(d) { return color(d.name); })
            .append("title")
            . text(function(d){ 
                // console.log("in grouped chart "+ d.value);
                    return d.value;
                })
          //  .on("mouseover", function(d) {
          //      d3.select(this).style("fill", d3.rgb(color(d.name)).darker(6));
          //      return d.value;
          //  })
          //  .on("mouseout", function(d) {
          //      d3.select(this).style("fill", color(d.name));
          //  });          


          var legend = svg.selectAll(".legend")
          .data(DiseaseCategory.slice())
          .enter().append("g")
          .attr("class", "legend")
          //.style("transform", `translate(${50}px,${15}px)`)
          .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });
    
      legend.append("rect")
      .attr("x", 670)
      .attr("y", 15)         
      .attr("width", 10)
      .attr("height", 10)
      .style("fill", colorLegend);
    
      legend.append("text")
      .attr("x", 670)
      .attr("y", 20)
      .style("text-anchor", "end")
      .text(function(d) { return d; });
}