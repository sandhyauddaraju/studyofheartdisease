loadParallelCoordinates =  function(dataset){

  var margin = {top: 30, right: 10, bottom: 10, left: 10},
  width = 600 - margin.left - margin.right,
  height = 350 - margin.top - margin.bottom;
  h = 250;
  w = 500;
  isAgeGrp = false;
  isBMI = false;
  isSleepTime = false;
  isRace = false;
  isGender = false;
  var extentsGlobal;

var indicators = dataset;
var extentsAgeGrp;
var extentsBMI;
var extentsSleepTime;
//console.log(indicators);
//console.log("In parallel coordinates test-" + indicators.length)
var color = d3.scale.ordinal()
.domain(["18-24", "25-29", "30-34", "35-39", "40-44","45-49","50-54","55-59","60-64","65-69","70-74","75-79","80-older" ])
  .range([ "#440154ff", "#21908dff", "#fde725ff","#9e0142","#9bae38","violet","#d53e4f","#fdae61","#f46d43","#fc9272","#fee08b","#932063","blue",])
  
var x = d3.scale.ordinal().rangePoints([0, w], 1),
  y = {},
  dragging = {};

var line = d3.svg.line(),
  axis = d3.svg.axis().orient("left"),
  background,
  foreground;

var svg = d3.select("body").select("#parallelDiv").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


// Extract the list of dimensions and create a scale for each.
x.domain(dimensions = d3.keys(indicators[0]).filter(function(d) {

 // console.log(d[0]);
 if(d == "AgeGrpNumeric" || d == "BMI" || d == "SleepTime" )//
 {
  return y[d] = d3.scale.linear()
  .domain(d3.extent(indicators, function(p) { return +p[d]; }))
  .range([h, 0]);
 }
 if(d == "RaceNumeric")
 {
  return y[d] = d3.scale.linear()
  .domain([0,7])
  .range([h,0])
  //.range([h, 0], 1);
 }

 if(d=="GenderNumeric")
 {
  return y[d] = d3.scale.linear()
  .domain([0,1])
  .range([h,0])
  //.range([h, 0],1);
 }
  
 }));

//console.log("after x domain-" )

// Add grey background lines for context.
background = svg.append("g")
    .attr("class", "background")
    .selectAll("path")
    .data(indicators)
    .enter().append("path")
    .attr("d", path);
    //after grey background

// Add foreground color lines for focus.
foreground = svg.append("g")
    .attr("class", "foreground")
    .selectAll("path")
    .data(indicators)
    .enter().append("path")
    .attr("d", path)
    .style("stroke", function(d){ 
      if(d.AgeGrpNumeric<=4)
      {
        return "red";
      } 
      if(d.AgeGrpNumeric<=8)
      {
        return "green";
      }
      else{
        return "blue";
        //return( color(d.AgeGrp));
      }      
    }) //console.log(d);
    .style("opacity", 0.5);
    
    
    brushend();
     
         //after blue foreground

// Add a group element for each dimension.
var g = svg.selectAll(".dimension")
    .data(dimensions)
    .enter().append("g")
    .attr("class", "dimension")
    .attr("transform", function(d) { return "translate(" + x(d) + ")"; })
    .call(d3.behavior.drag()
    .origin(function(d, i) {  return {x: x(d)}; })//console.log(x(d));    
    .on("dragstart", function(d,i) {
      //console.log(d[i]);
        dragging[d] = x(d);
        background.attr("visibility", "hidden");
      })
      .on("drag", function(d,i) {
         // console.log(d[1]);
          //console.log(d3.event);
        dragging[d] = Math.min(width, Math.max(0, d3.event.x));
        foreground.attr("d", path);
        dimensions.sort(function(a, b) { return position(a) - position(b); }); //console.log("In drag"+position(d[a])+ " " +position(b));
        x.domain(dimensions);
        g.attr("transform", function(d) { return "translate(" + position(d) + ")"; })
      })
      .on("dragend", function(d) {
        delete dragging[d];          
        transition(d3.select(this)).attr("transform", "translate(" + x(d) + ")");
        transition(foreground).attr("d", path);
        background
            .attr("d", path)
            .transition()
            .delay(500)
            .duration(0)
            .attr("visibility", null);
      }));

// Add an axis and title.
g.append("g")
    .attr("class", "axis")
    .each(function(d) { d3.select(this).call(axis.scale(y[d])); })
    .append("text")
    .style("text-anchor", "middle")
    .attr("y", -9)
    .text(function(d) { return d; });

// Add and store a brush for each axis.
g.append("g")
    .attr("class", "brush")
    .each(function(d) {
      //  console.log(d);        
      d3.select(this).call(y[d].brush = d3.svg.brush().y(y[d]).on("brushstart", brushstart).on("brush", brush)
      .on("brushend",brushend));
     // .on("click", function(){alert("click!");}));
      //.on("click", function(){alert("click!");})
      
  })
  .selectAll("rect")
  .attr("x", -8)
  .attr("width", 16);
  //.on("click", function(){alert("click!");});


function position(d) {
 // console.log(d); 
var v = dragging[d];
return v == null ? x(d) : v;
}

function transition(g) {
return g.transition().duration(500);
}

// Returns the path for a given data point.
function path(d) {
brushend();
return line(dimensions.map(function(p) { return [position(p), y[p](d[p])]; }));
}



function brushstart() {
  isAgeGrp = false;
  isBMI = false;
  isSleepTime = false;
  isRace = false;
  isGender = false;
  //d3.selectAll('#tblChart')
  //.remove();
d3.event.sourceEvent.stopPropagation();
}
function brushend() {
  d3.selectAll('#tblChart')
  .remove();    
filteredData = filerBrushData(indicators,extentsGlobal, isAgeGrp,isBMI,isSleepTime,isRace,isGender);
const groupByCategory = filteredData.reduce((group, parallelCoor) => {
  const { AgeGrp } = parallelCoor;
  group[AgeGrp] = group[AgeGrp] ?? [];
  group[AgeGrp].push(parallelCoor);
  return group;
}, {});
 // console.log(groupByCategory);
var countsExtended = Object.keys(groupByCategory).map(k => {
  return {AgeGrp: k, count: groupByCategory[k]}; });

//console.log(countsExtended); 
arrObj = [] 
for(i=0;i<countsExtended.length;i++)
{    
  tableData={};
  AgeGrp = countsExtended[i].AgeGrp;
  //console.log(AgeGrp);
  Count = countsExtended[i].count.length;
  //AgeGrpNumeric = countsExtended[i].AgeGrpNumeric;
  //console.log(Count);
  tableData.AgeGrp = AgeGrp;
  tableData.TotalCount = Count;
 // tableData.AgeGrpNumeric = AgeGrpNumeric;
  BMI = {};
  SleepTime = {};
  Gender = {};
  Race = {};
  underWeightCount = 0;
  normalWeightCount = 0;
  overWeightCount = 0;
  ObeseCount = 0;
  veryShortSleepCount = 0;
  shortSleepCount= 0;
  avgSleepCount = 0;
  longSleepCount = 0;
  AgeGrpNumeric=0;
  maleCount = 0;
  femaleCount = 0;
  WhiteCount = 0;
  BlackCount = 0;
  AsianCount = 0;
  HispanicCount = 0;
  AmericanIndian_AlaskanNativeCount = 0;
  OtherCount = 0;


  for(j=0;j<Count;j++)
  {
//    console.log(countsExtended[i].count[j]);
    if(countsExtended[i].count[j].BMI < 18.5)
    {
      underWeightCount = underWeightCount + 1;
    }
    if(countsExtended[i].count[j].BMI >= 18.5 && countsExtended[i].count[j].BMI <= 24.9)
    {
      normalWeightCount = normalWeightCount + 1;
    }
    if(countsExtended[i].count[j].BMI >= 24.9 && countsExtended[i].count[j].BMI <= 29.9)
    {
      overWeightCount = overWeightCount + 1;
    }
    if(countsExtended[i].count[j].BMI >= 30)
    {
      ObeseCount = ObeseCount + 1;
    }//very short (≤4h), short (5–6h), and long (≥9h) versus average (7–8h)
    if(countsExtended[i].count[j].SleepTime <= 4)
    {
      veryShortSleepCount = veryShortSleepCount + 1;
    }
    if(countsExtended[i].count[j].SleepTime >= 5 && countsExtended[i].count[j].SleepTime <= 6)
    {
      shortSleepCount = shortSleepCount + 1;
    }
    if(countsExtended[i].count[j].SleepTime >= 7 && countsExtended[i].count[j].SleepTime <= 8)
    {
      avgSleepCount = avgSleepCount + 1;
    }
    if(countsExtended[i].count[j].SleepTime >= 9)
    {
      longSleepCount = longSleepCount + 1;
    }
    if(countsExtended[i].count[j].GenderNumeric == 0)
    {
      maleCount = maleCount + 1;
    }
    if(countsExtended[i].count[j].GenderNumeric == 1)
    {
      femaleCount = femaleCount + 1;
    }
    if(countsExtended[i].count[j].RaceNumeric == 1)
    {
      WhiteCount = WhiteCount + 1;
    }
    if(countsExtended[i].count[j].RaceNumeric == 2)
    {
      BlackCount = BlackCount + 1;
    }
    if(countsExtended[i].count[j].RaceNumeric == 3)
    {
      AsianCount = AsianCount + 1;
    }
    if(countsExtended[i].count[j].RaceNumeric == 4)
    {
      HispanicCount = HispanicCount + 1;
    }
    if(countsExtended[i].count[j].RaceNumeric == 5)
    {
      AmericanIndian_AlaskanNativeCount = AmericanIndian_AlaskanNativeCount + 1;
    }
    if(countsExtended[i].count[j].RaceNumeric == 6)
    {
      OtherCount = OtherCount + 1;
    }

    AgeGrpNumeric = countsExtended[i].count[j].AgeGrpNumeric;

  }
  tableData.AgeGrpNumeric = AgeGrpNumeric;
  BMI.Underweight = underWeightCount;
  BMI.NormalWeight = normalWeightCount;
  BMI.OverWeight = overWeightCount;
  BMI.Obese = ObeseCount;
  tableData.BMIRange = BMI;
  
  SleepTime.VeryShort = veryShortSleepCount;
  SleepTime.Short = shortSleepCount;
  SleepTime.Average = avgSleepCount;
  SleepTime.Long = longSleepCount;
  tableData.SleepTime = SleepTime;
  
  Race.White = WhiteCount;
  Race.Black = BlackCount;
  Race.Asian = AsianCount;
  Race.Hispanic = HispanicCount;
  Race.AmericanIndian_AlaskanNative = AmericanIndian_AlaskanNativeCount;
  Race.Other = OtherCount;
  tableData.Race = Race;

  Gender.Male = maleCount;
  Gender.Female = femaleCount;
  tableData.Gender = Gender;
  arrObj.push(tableData);
 // console.log(arrObj);
}
//console.log(arrObj);
arrObj.sort((a, b) => b.TotalCount - a.TotalCount);
//console.log(arrObj.length);
tabulate(arrObj,['AgeGrpNumeric', 'AgeGrp', 'TotalCount', 'Gender', 'Race', 'BMIRange', 'SleepTime' ]);
//tabulate(arrObj,['AgeGrp', 'TotalCount','Under_Weight','Normal_Weight','Over_Weight','Obese', 'VeryShort_SleepTime','Short_SleepTime','Average_SleepTime','Long_SleepTime' ]);
}

// Handles a brush event, toggling the display of foreground lines.
function brush() {
 
var actives = dimensions.filter(function(p) {return !y[p].brush.empty(); }),
    extents = actives.map(function(p) { 
        switch(p)
        {
          case "AgeGrpNumeric":
              isAgeGrp = true;
              break;
          case "BMI":
              isBMI = true;
              break;
          case "SleepTime":
              isSleepTime = true;
              break;
          case "GenderNumeric":
              isGender = true;
              break;
          case "RaceNumeric":
              isRace = true;
              break;
          default:
              break;
        }          
        return  y[p].brush.extent(); 
      });
      //console.log(isAgeGrp +" " + isBMI +" " + isSleepTime);
      extentsGlobal=extents;
    //console.log(extents);     

foreground.style("display", function(d) {  
  // create data table, row hover highlighting
  return actives.every(function(p, i) {    
      return extents[i][0] <= d[p] && d[p] <= extents[i][1];
  }) ? null : "none";
});
}
}

function tabulate(data, columns) {
  var table = d3.select('body').select("#grid")
                 .append('table')
                 .attr("id","tblChart")
                 .style('border-collapse', 'collapse')
                 .style('border', '1px  solid')
                 .style('table-layout','fixed');
                 
  var thead = table.append('thead')
  var	tbody = table.append('tbody');

  // append the header row
  thead.append('tr')
    .selectAll('th')
    .data(columns).enter()
    .append('th')
      .text(function (column) {
        if(column == "Gender")
        {
          column = "Gender [0-Male / 1-Female]";
        }
        if(column == "Race")
        {
          column = "Race [1-White / 2-Black / 3-Asian / 4-Hispanic / 5-American Indian/Alaskan Native / 6-Other]";
        }
        if(column == "BMIRange")
        {
          column="BMI Range [under weight(< 18.5) / normal weight(18.5 - 24.9) / over weight(25 - 29.9)/ obese(> 30)]"
        }
        if(column == "SleepTime")
        {
          column="Sleep Time in hrs [very short(≤4h) / short(5–6h) / average(7–8h)/ long(≥9h)]"
        }

         return column; 
        })
      .style('width', '190px')
      .style('text-align','left');

  // create a row for each object in the data
  var rows = tbody.selectAll('tr')
    .data(data)
    .enter()
    .append('tr')
    .style('background-color','#9ebcda');

  // create a cell in each row for each column
  var cells = rows.selectAll('td')
    .data(function (row) {
      return columns.map(function (column) {
        //Underweight: BMI is less than 18.5.
        //Normal weight: BMI is 18.5 to 24.9.
        //Overweight: BMI is 25 to 29.9.
        //Obese: BMI is 30 or more.
        //very short (≤4h), short (5–6h), and long (≥9h) versus average (7–8h)

        if(column == "BMIRange")
        {
          return {column: column, value: "under weight: "+ row[column].Underweight + " \n" + 
          "normal weight: " + row[column].NormalWeight + "  \n" + 
          "over weight: " + row[column].OverWeight + "  \n" + 
          "obese: " + row[column].Obese};
          //console.log("In obese - "+row[column].Obese);
        }
        if(column == "SleepTime")
        {
          return {column: column, value: "very short(≤4h): "+ row[column].VeryShort + "\n" + 
          "short(5–6h): " + row[column].Short + "\n" + 
          "average(7–8h): " + row[column].Average + "\n" + 
          "long(≥9h): " + row[column].Long};
        }
        if(column == "Gender")
        {
          return {column: column, value: "Male: "+ row[column].Male + " \n" + 
          "Female: " + row[column].Female};
        }
        if(column == "Race")
        {
          return {column: column, value: "White: "+ row[column].White + ", \n" + 
          " Black: " + row[column].Black + ", \n" +
          " Asian:"  + row[column].Asian + ", \n" +
          " Hispanic:" + row[column].Hispanic + ", \n" +
          " American Indian/Alaskan Native:" + row[column].AmericanIndian_AlaskanNative + ", \n"  +
          " Other:" + row[column].Other
        };
        }
        //console.log(column + ":" + row[column]);
        else{
        return {column: column, value: row[column]};
        }
      });
    })
    .enter()
    .append('td')
    .style('border', '1px solid')
    //.append('hr')
      .text(function (d) { return d.value; })
      .style('width', '90px')
      .style('text-align','left');
      


return table;
}

filerBrushData = function(data, extents, isAgeGrp, isBMI, isSleepTime, isRace, isGender){
var filteredData = [];
//console.log(extents.length); 
if(extents === undefined)
{
  isAgeGrp = true;
  isBMI = true;
  isSleepTime = true;
  isRace = true;
  isGender = true;
  for( i=0 ; i< data.length; i++)
  { 
    filteredData.push(data[i]);
  }
}
else{
if(extents.length == 1)
{ 
//console.log(extents);
for( i=0 ; i< data.length; i++)
{  
  if(isAgeGrp)
  {
    min = Math.ceil(extents[0][0]).toFixed(2); //up
    max = Math.floor(extents[0][1]).toFixed(2); //down
    if (data[i].AgeGrpNumeric >= parseInt(min) && data[i].AgeGrpNumeric <= parseInt(max)) //data[i].AgeGrpNumeric >= min &&
    {
         filteredData.push(data[i]);         
    }
   // console.log("In isAgeGrp - "+ filteredData)
  }
  if(isRace)
  {
    min = Math.ceil(extents[0][0]).toFixed(2); //up
    max = Math.floor(extents[0][1]).toFixed(2); //down
    if (data[i].RaceNumeric >= parseInt(min) && data[i].RaceNumeric <= parseInt(max)) //data[i].AgeGrpNumeric >= min &&
    {
         filteredData.push(data[i]);         
    }
  }
  if(isGender)
  {
    min = Math.ceil(extents[0][0]).toFixed(2); //up
    max = Math.floor(extents[0][1]).toFixed(2); //down
    if (data[i].GenderNumeric >= parseInt(min) && data[i].GenderNumeric <= parseInt(max)) //data[i].AgeGrpNumeric >= min &&
    {
         filteredData.push(data[i]);         
    }
  }
  if(isBMI)
  {
    minBMI = Math.round(extents[0][0]).toFixed(2);
    maxBMI = Math.round(extents[0][1]).toFixed(2);
    if (data[i].BMI >= minBMI && data[i].BMI <= maxBMI)
    {
         filteredData.push(data[i])
    }
   // console.log("In isBMI - "+ filteredData)
  }
  if(isSleepTime)
  {
    minSleepTime = Math.ceil(extents[0][0]).toFixed(2); //up
    maxSleepTime = Math.floor(extents[0][1]).toFixed(2); //down
    if (data[i].SleepTime >= parseInt(minSleepTime) && data[i].SleepTime <= parseInt(maxSleepTime))
    {
         filteredData.push(data[i])
    }
  }
}

}
if(extents.length == 2)
{
for( i=0 ; i< data.length; i++)
{ 
if(isAgeGrp && isBMI)
{
     min = Math.ceil(extents[0][0]).toFixed(2); //up
     max = Math.floor(extents[0][1]).toFixed(2); //down
     minBMI = Math.round(extents[1][0]).toFixed(2);
     maxBMI = Math.round(extents[1][1]).toFixed(2);

     if (data[i].AgeGrpNumeric >= parseInt(min) && data[i].AgeGrpNumeric <= parseInt(max)&&
        data[i].BMI >= parseInt(minBMI) && data[i].BMI <= parseInt(maxBMI))
        {            
              filteredData.push(data[i])
             // console.log(filteredData);
             // count++;
        }
      //  console.log("In isBMI, isAgeGrp - "+ filteredData)
}
if(isBMI && isSleepTime)
{
  minBMI = Math.round(extents[0][0]).toFixed(2);
  maxBMI = Math.round(extents[0][1]).toFixed(2);
  minSleepTime = Math.ceil(extents[1][0]).toFixed(2); //up
  maxSleepTime = Math.floor(extents[1][1]).toFixed(2); //down
  if (data[i].BMI >= minBMI && data[i].BMI <= maxBMI 
    && data[i].SleepTime >= parseInt(minSleepTime) && data[i].SleepTime <= parseInt(maxSleepTime))
  {
      filteredData.push(data[i]);
  }
//  console.log("In isBMI, isSleepTime - "+ filteredData)
}
if(isAgeGrp && isSleepTime)
{
     min = Math.ceil(extents[0][0]).toFixed(2); //up
     max = Math.floor(extents[0][1]).toFixed(2); //down
     minSleepTime = Math.ceil(extents[1][0]).toFixed(2); //up
     maxSleepTime = Math.floor(extents[1][1]).toFixed(2); //down

     if (data[i].AgeGrpNumeric >= parseInt(min) && data[i].AgeGrpNumeric <= parseInt(max)&&
         data[i].SleepTime >= parseInt(minSleepTime) && data[i].SleepTime <= parseInt(maxSleepTime))
        {            
              filteredData.push(data[i])
             
             // count++;
        }
        //console.log("In isSleepTime, isAgeGrp - "+ filteredData)
}
if(isAgeGrp && isGender)
{
      min = Math.ceil(extents[0][0]).toFixed(2); //up
      max = Math.floor(extents[0][1]).toFixed(2); //down
      minGender = Math.ceil(extents[0][0]).toFixed(2); //up
      maxGender = Math.floor(extents[0][1]).toFixed(2); //down
      if (data[i].AgeGrpNumeric >= parseInt(min) && data[i].AgeGrpNumeric <= parseInt(max)&&
      data[i].GenderNumeric >= parseInt(minGender) && data[i].GenderNumeric <= parseInt(maxGender))
     {            
           filteredData.push(data[i])
          
          // count++;
     }
}
if(isAgeGrp && isRace)
{
      min = Math.ceil(extents[0][0]).toFixed(2); //up
      max = Math.floor(extents[0][1]).toFixed(2); //down
      minRace = Math.ceil(extents[0][0]).toFixed(2); //up
      maxRace = Math.floor(extents[0][1]).toFixed(2); //down
      if (data[i].AgeGrpNumeric >= parseInt(min) && data[i].AgeGrpNumeric <= parseInt(max)&&
      data[i].RaceNumeric >= parseInt(minRace) && data[i].RaceNumeric <= parseInt(maxRace))
     {            
           filteredData.push(data[i])
          
          // count++;
     }
}
if(isGender && isRace)
{
      minGender = Math.ceil(extents[0][0]).toFixed(2); //up
      maxGender = Math.floor(extents[0][1]).toFixed(2); //down
      minRace = Math.ceil(extents[0][0]).toFixed(2); //up
      maxRace = Math.floor(extents[0][1]).toFixed(2); //down
      if (data[i].GenderNumeric >= parseInt(minGender) && data[i].GenderNumeric <= parseInt(maxGender)&&
      data[i].RaceNumeric >= parseInt(minRace) && data[i].RaceNumeric <= parseInt(maxRace))
     {            
           filteredData.push(data[i])          
          // count++;
     }
}
if(isSleepTime && isGender)
{
  minGender = Math.ceil(extents[0][0]).toFixed(2); //up
  maxGender = Math.floor(extents[0][1]).toFixed(2); //down
  minSleepTime = Math.ceil(extents[1][0]).toFixed(2); //up
  maxSleepTime = Math.floor(extents[1][1]).toFixed(2); //down
  if (data[i].GenderNumeric >= parseInt(minGender) && data[i].GenderNumeric <= parseInt(maxGender)&&
      data[i].SleepTime >= parseInt(minSleepTime) && data[i].SleepTime <= parseInt(maxSleepTime))
     {            
           filteredData.push(data[i])
          
          // count++;
     }
}
if(isSleepTime && isRace)
{
  minSleepTime = Math.ceil(extents[1][0]).toFixed(2); //up
  maxSleepTime = Math.floor(extents[1][1]).toFixed(2); //down
  minRace = Math.ceil(extents[0][0]).toFixed(2); //up
  maxRace = Math.floor(extents[0][1]).toFixed(2); //down
  if (data[i].RaceNumeric >= parseInt(minRace) && data[i].RaceNumeric <= parseInt(maxRace)&&
      data[i].SleepTime >= parseInt(minSleepTime) && data[i].SleepTime <= parseInt(maxSleepTime))
     {            
           filteredData.push(data[i])
          
          // count++;
     }
}
if(isBMI && isGender)
{
  minGender = Math.ceil(extents[0][0]).toFixed(2); //up
  maxGender = Math.floor(extents[0][1]).toFixed(2); //down
  minBMI = Math.round(extents[0][0]).toFixed(2);
  maxBMI = Math.round(extents[0][1]).toFixed(2);
  if (data[i].BMI >= minBMI && data[i].BMI <= maxBMI 
    && data[i].GenderNumeric >= parseInt(minGender) && data[i].GenderNumeric <= parseInt(maxGender))
  {
      filteredData.push(data[i]);
  }
}
if(isBMI && isRace)
{
  minBMI = Math.round(extents[0][0]).toFixed(2);
  maxBMI = Math.round(extents[0][1]).toFixed(2);
  minRace = Math.ceil(extents[0][0]).toFixed(2); //up
  maxRace = Math.floor(extents[0][1]).toFixed(2); //down
  if (data[i].BMI >= minBMI && data[i].BMI <= maxBMI &&
  data[i].RaceNumeric >= parseInt(minRace) && data[i].RaceNumeric <= parseInt(maxRace))
 {            
       filteredData.push(data[i])          
      // count++;
 }
}


}
//console.log(filteredData);
}
if(extents.length == 3)
{
for( i=0 ; i< data.length; i++)
{ 
if(isAgeGrp && isBMI && isSleepTime)
{
  min = Math.ceil(extents[0][0]).toFixed(2); //up
  max = Math.floor(extents[0][1]).toFixed(2); //down
  minBMI = Math.round(extents[1][0]).toFixed(2);
  maxBMI = Math.round(extents[1][1]).toFixed(2);
  minSleepTime = Math.ceil(extents[2][0]).toFixed(2); //up
  maxSleepTime = Math.floor(extents[2][1]).toFixed(2); //down

  if (data[i].AgeGrpNumeric >= parseInt(min) && data[i].AgeGrpNumeric <= parseInt(max) && 
                 data[i].BMI >= minBMI && data[i].BMI <= maxBMI 
                 && data[i].SleepTime >= parseInt(minSleepTime) && data[i].SleepTime <= parseInt(maxSleepTime))
    {
        filteredData.push(data[i]);
    }
}
if(isAgeGrp && isGender && isRace)
{
  min = Math.ceil(extents[0][0]).toFixed(2); //up
  max = Math.floor(extents[0][1]).toFixed(2); //down
  minGender = Math.ceil(extents[0][0]).toFixed(2); //up
  maxGender = Math.floor(extents[0][1]).toFixed(2); //down
  minRace = Math.ceil(extents[0][0]).toFixed(2); //up
  maxRace = Math.floor(extents[0][1]).toFixed(2); //down
  if (data[i].AgeGrpNumeric >= parseInt(min) && data[i].AgeGrpNumeric <= parseInt(max) && 
      data[i].GenderNumeric >= parseInt(minGender) && data[i].GenderNumeric <= parseInt(maxGender)&&
      data[i].RaceNumeric >= parseInt(minRace) && data[i].RaceNumeric <= parseInt(maxRace))
    {
        filteredData.push(data[i]);
    }

}
if(isBMI && isSleepTime && isGender)
{
  minBMI = Math.round(extents[1][0]).toFixed(2);
  maxBMI = Math.round(extents[1][1]).toFixed(2);
  minSleepTime = Math.ceil(extents[2][0]).toFixed(2); //up
  maxSleepTime = Math.floor(extents[2][1]).toFixed(2); //down
  minGender = Math.ceil(extents[0][0]).toFixed(2); //up
  maxGender = Math.floor(extents[0][1]).toFixed(2); //down
  if (data[i].BMI >= minBMI && data[i].BMI <= maxBMI &&
     data[i].SleepTime >= parseInt(minSleepTime) && data[i].SleepTime <= parseInt(maxSleepTime) &&
     data[i].GenderNumeric >= parseInt(minGender) && data[i].GenderNumeric <= parseInt(maxGender))
    {
        filteredData.push(data[i]);
    }
}
if(isBMI && isSleepTime && isRace)
{
  minBMI = Math.round(extents[1][0]).toFixed(2);
  maxBMI = Math.round(extents[1][1]).toFixed(2);
  minSleepTime = Math.ceil(extents[2][0]).toFixed(2); //up
  maxSleepTime = Math.floor(extents[2][1]).toFixed(2); //down
  minRace = Math.ceil(extents[0][0]).toFixed(2); //up
  maxRace = Math.floor(extents[0][1]).toFixed(2); //down
  if (data[i].BMI >= minBMI && data[i].BMI <= maxBMI &&
    data[i].SleepTime >= parseInt(minSleepTime) && data[i].SleepTime <= parseInt(maxSleepTime) &&
    data[i].RaceNumeric >= parseInt(minRace) && data[i].RaceNumeric <= parseInt(maxRace))
   {
       filteredData.push(data[i]);
   }
}
if(isBMI && isGender && isRace)
{
  minBMI = Math.round(extents[1][0]).toFixed(2);
  maxBMI = Math.round(extents[1][1]).toFixed(2);
  minGender = Math.ceil(extents[0][0]).toFixed(2); //up
  maxGender = Math.floor(extents[0][1]).toFixed(2); //down
  minRace = Math.ceil(extents[0][0]).toFixed(2); //up
  maxRace = Math.floor(extents[0][1]).toFixed(2); //down
  if (data[i].BMI >= minBMI && data[i].BMI <= maxBMI &&
    data[i].GenderNumeric >= parseInt(minGender) && data[i].GenderNumeric <= parseInt(maxGender) &&
    data[i].RaceNumeric >= parseInt(minRace) && data[i].RaceNumeric <= parseInt(maxRace))
   {
       filteredData.push(data[i]);
   }

}
if(isAgeGrp && isBMI && isGender)
{
  min = Math.ceil(extents[0][0]).toFixed(2); //up
  max = Math.floor(extents[0][1]).toFixed(2); //down
  minBMI = Math.round(extents[1][0]).toFixed(2);
  maxBMI = Math.round(extents[1][1]).toFixed(2);
  minGender = Math.ceil(extents[0][0]).toFixed(2); //up
  maxGender = Math.floor(extents[0][1]).toFixed(2); //down
  if (data[i].AgeGrpNumeric >= parseInt(min) && data[i].AgeGrpNumeric <= parseInt(max) &&
    data[i].BMI >= minBMI && data[i].BMI <= maxBMI &&
    data[i].GenderNumeric >= parseInt(minGender) && data[i].GenderNumeric <= parseInt(maxGender)
    )
   {
       filteredData.push(data[i]);
   }
}
if(isAgeGrp && isBMI && isRace)
{
  min = Math.ceil(extents[0][0]).toFixed(2); //up
  max = Math.floor(extents[0][1]).toFixed(2); //down
  minBMI = Math.round(extents[1][0]).toFixed(2);
  maxBMI = Math.round(extents[1][1]).toFixed(2);
  minRace = Math.ceil(extents[0][0]).toFixed(2); //up
  maxRace = Math.floor(extents[0][1]).toFixed(2); //down
  if (data[i].AgeGrpNumeric >= parseInt(min) && data[i].AgeGrpNumeric <= parseInt(max) &&
    data[i].BMI >= minBMI && data[i].BMI <= maxBMI &&
    data[i].RaceNumeric >= parseInt(minRace) && data[i].RaceNumeric <= parseInt(maxRace)
    )
   {
       filteredData.push(data[i]);
   }  
}
if(isSleepTime && isGender && isRace)
{
  minSleepTime = Math.ceil(extents[2][0]).toFixed(2); //up
  maxSleepTime = Math.floor(extents[2][1]).toFixed(2); //down
  minGender = Math.ceil(extents[0][0]).toFixed(2); //up
  maxGender = Math.floor(extents[0][1]).toFixed(2); //down
  minRace = Math.ceil(extents[0][0]).toFixed(2); //up
  maxRace = Math.floor(extents[0][1]).toFixed(2); //down
  if (data[i].RaceNumeric >= parseInt(minRace) && data[i].RaceNumeric <= parseInt(maxRace) &&
    data[i].SleepTime >= parseInt(minSleepTime) && data[i].SleepTime <= parseInt(maxSleepTime) &&
    data[i].GenderNumeric >= parseInt(minGender) && data[i].GenderNumeric <= parseInt(maxGender))
   {
       filteredData.push(data[i]);
   }
}
if(isAgeGrp && isSleepTime && isGender)
{
  min = Math.ceil(extents[0][0]).toFixed(2); //up
  max = Math.floor(extents[0][1]).toFixed(2); //down
  minSleepTime = Math.ceil(extents[2][0]).toFixed(2); //up
  maxSleepTime = Math.floor(extents[2][1]).toFixed(2); //down
  minGender = Math.ceil(extents[0][0]).toFixed(2); //up
  maxGender = Math.floor(extents[0][1]).toFixed(2); //down
  if (data[i].AgeGrpNumeric >= parseInt(min) && data[i].AgeGrpNumeric <= parseInt(max) &&
    data[i].SleepTime >= parseInt(minSleepTime) && data[i].SleepTime <= parseInt(maxSleepTime) &&
    data[i].GenderNumeric >= parseInt(minGender) && data[i].GenderNumeric <= parseInt(maxGender)
    )
   {
       filteredData.push(data[i]);
   }  
}
if(isAgeGrp && isSleepTime && isRace)
{
  min = Math.ceil(extents[0][0]).toFixed(2); //up
  max = Math.floor(extents[0][1]).toFixed(2); //down
  minSleepTime = Math.ceil(extents[2][0]).toFixed(2); //up
  maxSleepTime = Math.floor(extents[2][1]).toFixed(2); //down
  minRace = Math.ceil(extents[0][0]).toFixed(2); //up
  maxRace = Math.floor(extents[0][1]).toFixed(2); //down
  if (data[i].AgeGrpNumeric >= parseInt(min) && data[i].AgeGrpNumeric <= parseInt(max) &&
    data[i].SleepTime >= parseInt(minSleepTime) && data[i].SleepTime <= parseInt(maxSleepTime) &&
    data[i].RaceNumeric >= parseInt(minRace) && data[i].RaceNumeric <= parseInt(maxRace)
    )
   {
       filteredData.push(data[i]);
   }  
}
}
}
if(extents.length == 4)
{  
  if(isAgeGrp && isBMI && isSleepTime && isGender)
  {
    min = Math.ceil(extents[0][0]).toFixed(2); //up
    max = Math.floor(extents[0][1]).toFixed(2); //down
    minBMI = Math.round(extents[1][0]).toFixed(2);
    maxBMI = Math.round(extents[1][1]).toFixed(2);
    minSleepTime = Math.ceil(extents[2][0]).toFixed(2); //up
    maxSleepTime = Math.floor(extents[2][1]).toFixed(2); //down
    minGender = Math.ceil(extents[0][0]).toFixed(2); //up
    maxGender = Math.floor(extents[0][1]).toFixed(2); //down
    if (data[i].AgeGrpNumeric >= parseInt(min) && data[i].AgeGrpNumeric <= parseInt(max) && 
    data[i].BMI >= minBMI && data[i].BMI <= maxBMI 
    && data[i].SleepTime >= parseInt(minSleepTime) && data[i].SleepTime <= parseInt(maxSleepTime)
    && data[i].GenderNumeric >= parseInt(minGender) && data[i].GenderNumeric <= parseInt(maxGender))
    {
    filteredData.push(data[i]);
    }

  }
  if(isAgeGrp && isBMI && isSleepTime && isRace)
  {
    min = Math.ceil(extents[0][0]).toFixed(2); //up
    max = Math.floor(extents[0][1]).toFixed(2); //down
    minBMI = Math.round(extents[1][0]).toFixed(2);
    maxBMI = Math.round(extents[1][1]).toFixed(2);
    minSleepTime = Math.ceil(extents[2][0]).toFixed(2); //up
    maxSleepTime = Math.floor(extents[2][1]).toFixed(2); //down
    minRace = Math.ceil(extents[0][0]).toFixed(2); //up
    maxRace = Math.floor(extents[0][1]).toFixed(2); //down
    if (data[i].AgeGrpNumeric >= parseInt(min) && data[i].AgeGrpNumeric <= parseInt(max) && 
    data[i].BMI >= minBMI && data[i].BMI <= maxBMI 
    && data[i].SleepTime >= parseInt(minSleepTime) && data[i].SleepTime <= parseInt(maxSleepTime)
    && data[i].RaceNumeric >= parseInt(minRace) && data[i].RaceNumeric <= parseInt(maxRace))
    {
    filteredData.push(data[i]);
    }

  }
  if(isBMI && isSleepTime && isGender && isRace)
  {
    minBMI = Math.round(extents[1][0]).toFixed(2);
    maxBMI = Math.round(extents[1][1]).toFixed(2);
    minSleepTime = Math.ceil(extents[2][0]).toFixed(2); //up
    maxSleepTime = Math.floor(extents[2][1]).toFixed(2); //down
    minGender = Math.ceil(extents[0][0]).toFixed(2); //up
    maxGender = Math.floor(extents[0][1]).toFixed(2); //down
    minRace = Math.ceil(extents[0][0]).toFixed(2); //up
    maxRace = Math.floor(extents[0][1]).toFixed(2); //down
    if (data[i].BMI >= minBMI && data[i].BMI <= maxBMI 
    && data[i].SleepTime >= parseInt(minSleepTime) && data[i].SleepTime <= parseInt(maxSleepTime)
    && data[i].GenderNumeric >= parseInt(minGender) && data[i].GenderNumeric <= parseInt(maxGender)
    && data[i].RaceNumeric >= parseInt(minRace) && data[i].RaceNumeric <= parseInt(maxRace)
     )
    {
    filteredData.push(data[i]);
    }

  }
  if(isAgeGrp && isSleepTime && isGender && isRace)
  {
    min = Math.ceil(extents[0][0]).toFixed(2); //up
    max = Math.floor(extents[0][1]).toFixed(2); //down
    minSleepTime = Math.ceil(extents[2][0]).toFixed(2); //up
    maxSleepTime = Math.floor(extents[2][1]).toFixed(2); //down
    minGender = Math.ceil(extents[0][0]).toFixed(2); //up
    maxGender = Math.floor(extents[0][1]).toFixed(2); //down
    minRace = Math.ceil(extents[0][0]).toFixed(2); //up
    maxRace = Math.floor(extents[0][1]).toFixed(2); //down
    if (data[i].AgeGrpNumeric >= parseInt(min) && data[i].AgeGrpNumeric <= parseInt(max) 
      && data[i].SleepTime >= parseInt(minSleepTime) && data[i].SleepTime <= parseInt(maxSleepTime)
      && data[i].GenderNumeric >= parseInt(minGender) && data[i].GenderNumeric <= parseInt(maxGender)
      && data[i].RaceNumeric >= parseInt(minRace) && data[i].RaceNumeric <= parseInt(maxRace)
       )
      {
      filteredData.push(data[i]);
      }

  }
  if(isGender && isRace && isAgeGrp && isBMI)
  {
    minGender = Math.ceil(extents[0][0]).toFixed(2); //up
    maxGender = Math.floor(extents[0][1]).toFixed(2); //down
    minRace = Math.ceil(extents[0][0]).toFixed(2); //up
    maxRace = Math.floor(extents[0][1]).toFixed(2); //down
    min = Math.ceil(extents[0][0]).toFixed(2); //up
    max = Math.floor(extents[0][1]).toFixed(2); //down
    minBMI = Math.round(extents[1][0]).toFixed(2);
    maxBMI = Math.round(extents[1][1]).toFixed(2);
    if (data[i].BMI >= minBMI && data[i].BMI <= maxBMI 
      && data[i].SleepTime >= parseInt(minSleepTime) && data[i].SleepTime <= parseInt(maxSleepTime)
      && data[i].GenderNumeric >= parseInt(minGender) && data[i].GenderNumeric <= parseInt(maxGender)
      && data[i].RaceNumeric >= parseInt(minRace) && data[i].RaceNumeric <= parseInt(maxRace)
       )
      {
      filteredData.push(data[i]);
      }

  }
  
}
if(extents.length == 5)
{
  if(isAgeGrp && isBMI && isSleepTime && isGender && isRace)
  {
    min = Math.ceil(extents[0][0]).toFixed(2); //up
    max = Math.floor(extents[0][1]).toFixed(2); //down
    minBMI = Math.round(extents[1][0]).toFixed(2);
    maxBMI = Math.round(extents[1][1]).toFixed(2);
    minSleepTime = Math.ceil(extents[2][0]).toFixed(2); //up
    maxSleepTime = Math.floor(extents[2][1]).toFixed(2); //down
    minGender = Math.ceil(extents[0][0]).toFixed(2); //up
    maxGender = Math.floor(extents[0][1]).toFixed(2); //down
    minRace = Math.ceil(extents[0][0]).toFixed(2); //up
    maxRace = Math.floor(extents[0][1]).toFixed(2); //down
  
    if (data[i].AgeGrpNumeric >= parseInt(min) && data[i].AgeGrpNumeric <= parseInt(max) && 
        data[i].BMI >= minBMI && data[i].BMI <= maxBMI 
        && data[i].SleepTime >= parseInt(minSleepTime) && data[i].SleepTime <= parseInt(maxSleepTime)
        && data[i].GenderNumeric >= parseInt(minGender) && data[i].GenderNumeric <= parseInt(maxGender)
        && data[i].RaceNumeric >= parseInt(minRace) && data[i].RaceNumeric <= parseInt(maxRace))
      {
          filteredData.push(data[i]);
      }
  }
}
}   

 return filteredData;

}