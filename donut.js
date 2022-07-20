loadDonut = function(dataset)
{
    var divT = d3.select("body").append("div")
      .attr("id","tooltip")
      .attr("class", "tooltip")
      .style("opacity", 0);
    //console.log(dataset);
    var w = 150;
    var h = 150;	
    var outerRadius = w / 2;
    var innerRadius = 30;
    var arc = d3.svg.arc()
                 .innerRadius(innerRadius)
                 .outerRadius(outerRadius);
      
     var pie = d3.layout.pie()
                 .value(function(d){ return d.percentage});
 
     var color;
     var category;

     category = ["Having", "Not Having"]

    
         color = d3.scale.ordinal()
         .range(["#e7e1ef","#c994c7"]);
             
 
     //Create SVG element
     var svg = d3.select("body")
                 .select("#donutDiv")
                 .append("svg")
                 .attr("width", 250)
                 .attr("height", 250)
                 .attr("id","donutChart");
                // .style("position","center");
         
     var arcs = svg.selectAll("g.arc")
                   .data(pie(dataset))
                   .enter()
                   .append("g")
                   .attr("class", "arc")
                   .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")");
 
     arcs.append("path")
                   .attr("fill", function(d, i) {
                       return color(i);
                   }).attr("id", function(d,i){return i;})
                   .attr("d", arc);
      // arcs.on("mouseover", function() {
      //   console.log(dataset[0].diseaseCount);
      //  var myid = this.id;
      //  console.log(myid);
      //  divT.transition()
      //  .duration(50)
      //  .style("opacity", 1);
      //  divT.html("Count: "+ dataset[myid].diseaseCount  + ", Name :" + dataset[myid].diseaseName )
      //  .style("left", (d3.event.pageX + 10) + "px")
      //  .style("top", (d3.event.pageY - 15) + "px");

      //   })
      //     .on("mouseout", function(){
      //   //      d3.select("#tooltip").classed("hidden", true)
      //   //  });
      //   divT.transition()
      //   .duration('50')
      //   .style("opacity", 0);});

 
    

     arcs.append("text")
         .attr("transform", function(d) {
             return "translate(" + arc.centroid(d) + ")";
         })
         .attr("text-anchor", "middle")
         .style("font-size", "10px")
         .text(function(d) {
             return d.value + "%";
         });
         

     var legendG = svg.selectAll(".legend") // note appending it to mySvg and not svg to make positioning easier
     .data(category.slice())
  //   .data(pie(dataset))
  .enter().append("g")
  .attr("class", "legend")
  //.attr("transform", function(d, i) { console.log(d); return "translate(0," + i * 20 + ")"; });
  .attr("transform", function(d,i){
    return "translate(" + (w) + "," + (i * 15 ) + ")"; // place each legend on the right and bump each one down 15 pixels
  })
    

legendG.append("rect") // make a matching color rect
  .attr("width", 10)
  .attr("height", 10)
  .attr("fill", function(d, i) {
    return color(i);
  });

legendG.append("text") // add the text
  .text(function(d){
      //console.log(d);
    return d;
  })
  .style("font-size", 12)
  .attr("y", 10)
  .attr("x", 11);
}
