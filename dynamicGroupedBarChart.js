loadDynamicGroupedBarChart = function(dataset){    
    
    groupInfo =  getDataForDynamicGroupedBarChart(dataset);

    console.log("In dynamic grouped bar chart - " +groupInfo);
  
    var groups = d3.map(groupInfo, function(d){  return(d.AgeGrp)}).keys();
    console.log(groups);
    var diseasegroups =  d3.keys(groupInfo[0]).filter(function(key) { return key !== "AgeGrp"; });
    console.log(diseasegroups);
    groupInfo.forEach(function(d) {//console.log("name:"+ name+ "value:" +d[name]);
    d.disease = diseasegroups.map(function(name) { console.log(name +":" + d[name]); return {name: name, value: +d[name]}; });
  });

 //var ids = ['preeschol', 'gradeschooler', 'teen', 'youngAdult', 'adult', 'middleAge', 'retired'];
 //var ageNames = ['Under 5 Years', '5 to 13 Years', '14 to 17 years', '18 to 24 years', '25 to 44 Years', '45 to 64 Years', '65 Years and Over'];
//var ids = ["AsthmaCount","KidneyDisCount", "DiffWalkingCount","StrokeCount","SkinCancerCount","DiabeticCount"];
var ids = [ "DiffWalkingCount","StrokeCount","AsthmaCount","KidneyDisCount", "SkinCancerCount", "DiabeticCount"];
//var DiseaseCategory = ["Asthma", "Kidney Disease", "Difficulty In Walking","Stroke", "Skin Cancer", "Diabetes"];
var DiseaseCategory = ["Difficulty In Walking","Stroke", "Asthma","Kidney Disease", "Skin Cancer","Diabetes"];

 // Let's populate the categoeries checkboxes
 d3.select('.categories').selectAll('.checkbox')
   .data(ids)
   .enter()
   .append('div')
   .attr('class', 'checkbox')
   .append('label').html(function(id, index) {
     var checkbox = '<input id="' + id + '" type="checkbox" checked class="category">';
     return checkbox + DiseaseCategory[index];
   });
 
 // some variables declarations
 var margin = {top: 20, right: 20, bottom: 30, left: 50},
     width = 800 - margin.left - margin.right,
     height = 400 - margin.top - margin.bottom;
 
 // the scale for the state age value
 var x = d3.scale.linear().range([0, width]);
 
 // the scale for each state
 var y0 = d3.scale.ordinal().rangeBands([0, height], .1);
 // the scale for each state age
 var y1 = d3.scale.ordinal();
 
 // just a simple scale of colors
 var color = d3.scale.ordinal()
        //    .range(["#ff8c00", "#d0743c", "#a05d56", "#6b486b", "#7b6888", "#8a89a6", "#98abc5"]);
     .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
    //["Difficulty In Walking","Stroke", "Asthma","Kidney Disease", "Skin Cancer","Diabetes"];
 //
 var xAxis = d3.svg.axis()
     .scale(x)
     .orient("bottom")
     .tickFormat(d3.format(".2s"));
 
 var yAxis = d3.svg.axis()
     .scale(y0)
     .orient("left");
 
 var svg = d3.select(".graph").append("svg")
     .attr("width", width + margin.left + margin.right)
     .attr("height", height + margin.top + margin.bottom)
     .append("g")
     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.append("g")
     .style("transform", `translate(${30}px,${5}px)`)
     .append("text")
     .attr("class", "title")
     .attr("x", width / 8)
     .attr("y", -5)
     .attr("text-anchor", "middle")
     .text("Age & Other Disease Distribution")
     .style("font-size", "12px")
     .style("text-decoration", "underline");

  svg.append("text")             
              .attr("transform",
                  "translate(" + (width/2) + " ," + 
                                  (height+25) + ")")
              .style("text-anchor", "middle")
              .text("Disease count");
              
  svg.append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", -40  )
          .attr("x",-4)
          
          .style("text-anchor", "middle")
          .text("Age Group");          
 
var z = d3.select('.categories').selectAll('.category:checked');
var zids = z[0].map(function(category) {
       return category.id;
     });
updateGraph(zids);

 d3.select('.categories').selectAll('.category').on('change', function() {
   var x = d3.select('.categories').selectAll('.category:checked');
   var ids = x[0].map(function(category) {
     return category.id;
   });
   updateGraph(ids);
 });
 renderGraph();
 

 //x0.domain(groupInfo.map(function(d) { return d.AgeGrp; }));
 //x1.domain(diseasegroups).rangeRoundBands([0, x0.rangeBand()]);
// y.domain([0, d3.max(groupInfo, function(d) { return d3.max(d.gender, function(d) { return d.value; }); })])
//y.domain([
// 0,
// d3.max(groupInfo, function(d) { return d3.max(d.disease, function(d) { return d.value; }); })])

 function renderGraph() {
   x.domain([0, 0]);
   // y0 domain is all the state names
   y0.domain(groupInfo.map(function(d) { return d.AgeGrp; }));
   // y1 domain is all the age names, we limit the range to from 0 to a y0 band
   y1.domain(DiseaseCategory).rangeRoundBands([0, y0.rangeBand()]);
 
   svg.append("g")
       .attr("class", "x axis")
       .attr("transform", "translate(0," + height + ")")
       .call(xAxis);
 
   svg.append("g")
       .attr("class", "y axis")
       .call(yAxis)
 }
 
 var AgeGroupDiseaseData;
 function updateGraph(selectedIds) {
 
   // groupInfo.forEach(function(d) {//console.log("name:"+ name+ "value:" +d[name]);
   //     d.disease = diseasegroups.map(function(name) {  return {name: name, value: +d[name]}; });
   //   }); 
//
   // var diseaseData = groupInfo
    

   AgeGroupDiseaseData = groupInfo.map(function(data) {
     return {
       ageGrp: data.AgeGrp,
       disease: selectedIds.map(function(selectedId) {
         var index = ids.findIndex(function(id) {
           return selectedId === id;
         });
      //   console.log("in update dynamic"+data.disease[index]);
         return {
           id: ids[index],
           name: DiseaseCategory[index],
           value: data.disease[index].value
         };
       })
     }
   });
 
   console.log(AgeGroupDiseaseData);
 
   // x domain is between 0 and the maximun value in any ages.value
   x.domain([0, d3.max(AgeGroupDiseaseData, function(d) { return d3.max(d.disease, function(d) { return d.value }); })]);
   // y0 domain is all the state names
   y0.domain(AgeGroupDiseaseData.map(function(d) { return d.ageGrp; }));
   // y1 domain is all the age names, we limit the range to from 0 to a y0 band
   y1.domain(ids).rangeRoundBands([0, y0.rangeBand()]);
 
   svg.selectAll('.axis.x').call(xAxis);
   svg.selectAll('.axis.y').call(yAxis);
 
   var state = svg.selectAll(".state")
     .data(AgeGroupDiseaseData);
 
   state.enter().append("g")
     .attr("class", "state")
     .attr("transform", function(d) { return "translate(0, " + y0(d.ageGrp) + ")"; });
 
   var age = state.selectAll("rect")
     .data(function(d) { return d.disease; });
 
   // we append a new rect every time we have an extra data vs dom element
   age.enter().append("rect")
     .attr('width', 0);
 
   // this updates will happend neither inserting new elements or updating them
   age
     .attr("x", 0)
     .attr("y", function(d, index) { return y1(ids[index]); })
     .attr("id", function(d) { return d.id; })
     .style("fill", function(d) { return color(d.name); })
     .text(function(d) { return d.name })
     .transition()
     .attr("width", function(d) { return x(d.value); })
     .attr("height", y1.rangeBand());
 
   age.exit().transition().attr("width", 0).remove();
 
   var legend = svg.selectAll(".legend")
       .data(AgeGroupDiseaseData[0].disease.map(function(d) { return d.name; }));
 
   legend.enter().append("g");
   legend
       .attr("class", "legend")
       .attr("transform", function(d, i) { return "translate(0," + (100 + i * 20) + ")"; });
 
   var legendColor = legend.selectAll('.legend-color').data(function(d) { return [d]; });
   legendColor.enter().append("rect");
   legendColor
     .attr('class', 'legend-color')
     .attr("x", width - 18)
     .attr("width", 18)
     .attr("height", 18)
     .style("fill", color);
 
   var legendText = legend.selectAll('.legend-text').data(function(d) { return [d]; });;
 
   legendText.enter().append("text");
   legendText
     .attr('class', 'legend-text')
     .attr("x", width - 24)
     .attr("y", 9)
     .attr("dy", ".35em")
     .style("text-anchor", "end")
     .text(function(d) { return d; });
 
   legend.exit().remove();
 }
}
