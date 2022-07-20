loadPie = function(dataset)
{
  var width = 250,
  height = 250,
  radius = 190 / 2;
    var outerRadius = w / 2;
    var innerRadius = 0;
    var arc = d3.svg.arc()
            .outerRadius(radius - 10)
            .innerRadius(0);
    var arc2 = d3.svg.arc()
            .outerRadius(radius - 5)
            .innerRadius(0);

      
     var pie = d3.layout.pie()
                 .value(function(d){ return d.percentage});
 
     //Gender // condition
     //var color = d3.scale.ordinal()
     //            .range(["#fec44f","#fc9272"]);
     var color;
     var category;
     console.log(params[0]);
     if(loadCondition == params[0])
     {
         category=["Male", "Female"];
         color = d3.scale.ordinal()
         .range(["#fec44f","#fc9272"]);
     }
      if(loadCondition == params[1])
     {
         color = d3.scale.ordinal()
         .range(["#9e0142","#d53e4f","#f46d43","#fdae61","#fee08b","#ffffbf","#e6f598","#abdda4","#66c2a5","#3288bd","#5e4fa2","#d8daeb","#f7f7f7"]);
     } 
     if(loadCondition == params[2])
     {
         color = d3.scale.ordinal()
         .range(["#9e0142","#d53e4f","#f46d43","#fdae61","#66c2a5","#abdda4"]);
     }            
 
     //Create SVG element
     var svg = d3.select("body")
                 .select("#pieDiv")
                 .select("#Genderpie_svg")
                 .attr("width", width)
                 .attr("height", height)
                 .attr("transform", "translate(" + (width-200)/ 2 + "," + (height-100 ) / 2 + ")");
                // .attr("id","pieChart");
                // .style("position","center");
         
     var arcs = svg.selectAll("g.arc")
                   .data(pie(dataset))
                   .enter()
                   .append("g")
                   .attr("class", "arc")
                   .attr("transform", "translate(" + radius + "," + radius + ")");
 
    var arcs1 =arcs.append("path")
          .attr("id",function(d,i) { return "MF"+i; })
                   .attr("fill", function(d, i) {
                       return color(i);
                   })
                   .attr("d", arc);
    arcs1.on("click", function(d) {
      if (flag_barclick == 0){
        var myid = this.id;
                d3.select(this).attr("d", arc2);
        console.log(myid);
        recreateOtherCharts(myid);
        flag_barclick = 1;
       
    }
        else{
            
          d3.select(this)
          .attr("d", arc)
          .attr("opacity",1);
            recreateOtherCharts("All");
            flag_barclick = 0;
        }  
     })               

    svg.append("g")
    .attr("transform", "translate(" + (width-300)/ 2 + "," + (height-100 ) / 2 + ")")
    .append("text")
    .attr("class", "title")
    .attr("x", w / 4)
    .attr("y", 150)
    .attr("text-anchor", "middle")
    .text("Total percentage of male/female")
    .style("font-size", "12px")
    .style("text-decoration", "underline");
    

     arcs1.append("text")
         .attr("transform", function(d) {
             return "translate(" + arc.centroid(d) + ")";
         })
         .attr("text-anchor", "middle")
         .attr("font-size", "10px")
         .text(function(d) {
             return (d.value + "%");})   ;     
         //.on("mouseover", function(d,i) {
         //d3.select("#tooltip")                   
         //.style("position","absolute")
         //.style("left", Math.max(0, d3.event.pageX - 150) + "px") 
         //.style("top",  (d3.event.pageY + 20) + "px")//	yPosition
         //.select("#value")
         //.text(function(){
             //condition
         //    var txt;
         //    console.log(dataset[i].genderCount +"  " + dataset[i].gender);
            // console.log(loadCondition + "  " + params[0]);
            // if(loadCondition == params[0])
            // {
        //         txt = "Count: "+ dataset[i].genderCount  + ", Gender :" + dataset[i].gender;
            // }
            //  if(loadCondition == params[1])
            // {
            //     txt = "Count: "+ dataset[i].ageGrpCount  + ", age Group :" + dataset[i].ageGrp;
            //     //constructor(ageGrpCount, ageGrp,  percentage) {
            // }
            // if(loadCondition == params[2])
            // {
            //     //constructor(diseaseCount, diseaseName, percentage)
            //     txt = "Count: "+ dataset[i].diseaseCount  + ", Disease Name :" + dataset[i].diseaseName; 
            // }
            //console.log(txt);
           //  return txt;});
         //d3.select("#tooltip").classed("hidden", false)
     //})
     //.on("mouseout", function(){
     //    d3.select("#tooltip").classed("hidden", true)
     //});

     var legendG = svg.selectAll(".legend") // note appending it to mySvg and not svg to make positioning easier
     .data(category.slice())
  //   .data(pie(dataset))
  .enter().append("g")
  .attr("class", "legend")
  //.attr("transform", function(d, i) { console.log(d); return "translate(0," + i * 20 + ")"; });
  .attr("transform", function(d,i){
    return "translate(" + (w-330) + "," + (i * 15 ) + ")"; // place each legend on the right and bump each one down 15 pixels
  })
    

legendG.append("rect") // make a matching color rect
  .attr("width", 10)
  .attr("height", 10)
  .attr("fill", function(d, i) {
    return color(i);
  });

legendG.append("text") // add the text
  .text(function(d){
      console.log(d);
    return d;
  })
  .style("font-size", 12)
  .attr("y", 10)
  .attr("x", 11);
  
}
