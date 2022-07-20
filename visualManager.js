var heart_disease_csv =[];
var heart_disease_yes =[];
var flag_barclick = 0;
var flag_depthclick = 0;
var w=550;
var h=400;
var wpad =100;
var hpad =100;
var dialog = null;
var svg_AgevsPopulation = d3.select("body").select("#barchart")
    .append("svg")
    .attr("id", "svg_AgevsPopulation")
    .attr("width", w)
    .attr("height", h);
var svg_Smoking_Drinking = d3.select("body").select("#groupedbarchart2")
    .append("svg")
    .attr("id", "svg_Smoking_Drinking")
    .attr("width", w-150)
    .attr("height", h-100);
var svg_AgevsPopulation_4all = d3.select("body").select("#barchart_allDisease")
    .append("svg")
    .attr("id", "svg_AgevsPopulation_4all")
    .attr("width", w)
    .attr("height", h)
    .attr("id","barChart");
var svg_BMI_category = d3.select("body").select("#BMIhistogram")
    .append("svg")
    .attr("id", "svg_BMIhistogram")
    .attr("width", w)
    .attr("height", h);
var svg_RacevsPopulation = d3.select("body").select("#barchartRD")
    .append("svg")
    .attr("id", "svg_RacevsPopulation")
    .attr("width", w)
    .attr("height", h);
//var svg_GenHealth = d3.select("body").select("#genhealthPie")
//    .append("svg")
//    .attr("id", "svg_GenHealth")
 //   .attr("width", w-200)
//    .attr("height", h-200);
var divT = d3.select("body").append("div")
    .attr("id","tooltip")
    .attr("class", "tooltip")
    .style("opacity", 0);
    
(function loadVideoDialog(){
dialog = document.getElementById('videoDialog');
document.getElementById('hide').onclick = function(){
    dialog.close();
    };})();

    function showEmbeddedVideo(){
        if(dialog != null){dialog.showModal();}
        else return true;
    };

d3.csv("heart_2020_cleaned.csv", function(data) {
    var w=550;
    var h=400;
    var wpad =100;
    var hpad =100;
    
    data.map(function(d){
        heart_disease_csv.push(d);
    }
    );    
    if (heart_disease_csv!=[])
    {
        for(i=0;i<heart_disease_csv.length;i++)
        {
            if(heart_disease_csv[i]["HeartDisease"] == "Yes"){
                heart_disease_yes.push(heart_disease_csv[i])
            }
        }

        const distinctAgeCat = [...new Set(heart_disease_csv.map(x =>x.AgeCategory))];
        distinctAgeCat.sort();
        var AgevsPopulation =[];
        for(i=0;i<distinctAgeCat.length;i++){
            AgevsPopulation.push([distinctAgeCat[i],0])
        }    
        var AgevsPopulation_4all = AgevsPopulation;

        AgevsPopulation=calculateAgegroupBar(heart_disease_yes);
        createBarchart(AgevsPopulation,svg_AgevsPopulation,w,h,wpad,hpad,"Heart Disease by Age Group","Age Groups","Population","AG");
               
        Smoking_Drinking_dataset =calculateSmokingDrinking(heart_disease_yes);
        createGroupedBarchart(Smoking_Drinking_dataset,svg_Smoking_Drinking);

        //Question 3.b
        paramsOtherDisease = ["Stroke", "DiffWalking","Diabetic","Asthma", "KidneyDisease", "SkinCancer"];
        d3.select("#Alldisease_selector")
        .selectAll('AllDisease')
        .data(paramsOtherDisease)
        .enter()
        .append('option')
        .text(function (d) { return d; }) 
        .attr("value", function (d) { return d; }) 
        var selectDisease = paramsOtherDisease[0];
        DiseasedatabyAgegrp = getDiseaseData(selectDisease,AgevsPopulation_4all);
        
        var title = selectDisease + " by Age Group";
        //createBarchart(DiseasedatabyAgegrp,svg_AgevsPopulation_4all,w,h,wpad,hpad,title,"Age Groups","Population","AG_All");

        d3.select("#Alldisease_selector").on("change", function(d) {    
            var selectDisease = d3.select(this).property("value")    
            updateBar(selectDisease,AgevsPopulation_4all)
        })
        //console.log(selectDisease);
        
         //Question 5.a.2 What population of people having heart disease lie in which weight group?
         //var BMI=[];
         //heart_disease_yes.map(function (d) {
          //   BMI.push(+d["BMI"])});
         //console.log(BMI);
         //createHistogram(BMI,"#BMIhistogram",30);
         
        BMI_category= calculateBMICat(heart_disease_yes) 
        createBarchart(BMI_category,svg_BMI_category,w,h,wpad,hpad,"Weight categories","Weight groups","Population","BMI_WG");
        
        

         var PH=calculatePH(heart_disease_yes);
         createHistogram(PH,"#PHhistogram",5,"Physical Health","PH");

         var MH=calculateMH(heart_disease_yes);
         createHistogram(MH,"#MHhistogram",5,"Mental Health","MH");
        
        var pie_svg_gh= d3.select("body").select("#genhealthPie")
         .append("svg")            
         .attr("id","pie_svg");
        genHealth =calculategenHealth(heart_disease_yes);
        //console.log(genHealth);
        createdepthpie(genHealth,pie_svg_gh,30,"General Health","GH");

        var pie_svg_pa= d3.select("body").select("#physicalActivity")
         .append("svg")            
         .attr("id","pie_svg");
        PhysicalActivity =calculatePhysicalActivity(heart_disease_yes);
        //console.log(PhysicalActivity);
        createdepthpie(PhysicalActivity,pie_svg_pa,0,"Physical Activity","PA");

        var pie_svg_sex= d3.select("body").select("#pieDiv")
         .append("svg")            
         .attr("id","pie_svg");
        gender =calculateGender(heart_disease_yes);
        //console.log(gender);
        createpie(gender,pie_svg_sex,0,"Gender Distribution");
      
        //Question 2: b-Which race/ethnicity has a greater number of heart diseases?
        RacevsPopulation=calculateRaceBar(heart_disease_yes);
        createBarchart(RacevsPopulation,svg_RacevsPopulation,w,h,wpad,hpad,"Heart Disease by Race","Race","Heart Disease","Race");
    }
});

function getDiseaseData(diseaseName,AgevsPopulation_4all){
    var Disease_yes =[];
    for(i=0;i<heart_disease_csv.length;i++)
    {
        if(heart_disease_csv[i][diseaseName] == "Yes"){
            Disease_yes.push(heart_disease_csv[i])
        }
    }

    for(i=0;i<Disease_yes.length;i++)
        {
            if(Disease_yes[i]["AgeCategory"] == '18-24'){
                AgevsPopulation_4all[0][1]= AgevsPopulation_4all[0][1] +1;
            }
            else if(Disease_yes[i]["AgeCategory"] == '25-29'){
                AgevsPopulation_4all[1][1]= AgevsPopulation_4all[1][1] +1;
            }
            else if(Disease_yes[i]["AgeCategory"] == '30-34'){
                AgevsPopulation_4all[2][1]= AgevsPopulation_4all[2][1] +1;
            }
            else if(Disease_yes[i]["AgeCategory"] == '35-39'){
                AgevsPopulation_4all[3][1]= AgevsPopulation_4all[3][1] +1;
            }
            else if(Disease_yes[i]["AgeCategory"] == '40-44'){
                AgevsPopulation_4all[4][1]= AgevsPopulation_4all[4][1] +1;
            }
            else if(Disease_yes[i]["AgeCategory"] == '45-49'){
                AgevsPopulation_4all[5][1]= AgevsPopulation_4all[5][1] +1;
            }
            else if(Disease_yes[i]["AgeCategory"] == '50-54'){
                AgevsPopulation_4all[6][1]= AgevsPopulation_4all[6][1] +1;
            }
            else if(Disease_yes[i]["AgeCategory"] == '55-59'){
                AgevsPopulation_4all[7][1]= AgevsPopulation_4all[7][1] +1;
            }
            else if(Disease_yes[i]["AgeCategory"] == '60-64'){
                AgevsPopulation_4all[8][1]= AgevsPopulation_4all[8][1] +1;
            }
            else if(Disease_yes[i]["AgeCategory"] == '65-69'){
                AgevsPopulation_4all[9][1]= AgevsPopulation_4all[9][1] +1;
            }
            else if(Disease_yes[i]["AgeCategory"] == '70-74'){
                AgevsPopulation_4all[10][1]= AgevsPopulation_4all[10][1] +1;
            }
            else if(Disease_yes[i]["AgeCategory"] == '75-79'){
                AgevsPopulation_4all[11][1]= AgevsPopulation_4all[11][1] +1;
            }
            else {
                AgevsPopulation_4all[12][1]= AgevsPopulation_4all[12][1] +1;
            }
        }
    return AgevsPopulation_4all;
}

function updateBar(selectDisease,AgevsPopulation_4all) {

    DiseasedatabyAgegrp = getDiseaseData(selectDisease,AgevsPopulation_4all);
    d3.selectAll('#barChart')
    .remove();
    
            var svg_AgevsPopulation_4all = d3.select("body").select("#barchart_allDisease")
            .append("svg")
            .attr("id", "#svg_AgevsPopulation_4all")
            .attr("width", w)
            .attr("height", h)
            .attr("id","barChart");
var title = selectDisease + " by Age Group";
            createBarchart(DiseasedatabyAgegrp,svg_AgevsPopulation_4all,w,h,wpad,hpad,title,"Age Groups","Population","AG_All");

    }


function createBarchart(dataset,svg_var,width,height,w_padding,h_padding,title,xtitle,ytitle,identifier){	
    //console.log(dataset);
    var xScale = d3.scale.ordinal()
        .domain(d3.range(dataset.length))
        .rangeRoundBands([w_padding, width-w_padding], 0.09);
    var yScale = d3.scale.linear()
        .domain([0, d3.max(dataset, function(d,i) { 
        return dataset[i][1]; })])
        .range([height- h_padding,h_padding ]);
    var xAxis = d3.svg.axis().scale(xScale).tickFormat(function(d,i) { return dataset[i][0]; });
        var yAxis = d3.svg.axis()
            .scale(yScale)
            .orient("left")
            .ticks(4);
       
        svg_var.selectAll("rect")
                .data(dataset)
                .enter()
                .append("rect")
                .attr("id", function(d, i) {
                return identifier + i;        
                })
                .attr("width", xScale.rangeBand()) 
                .attr("fill", function(d) {
                    return "#525252";
                })
                .attr("y",function(d,i) {
                    return  yScale(0);  
                })
                .attr("x", function(d, i) {
                    return xScale(i);        
                    })
                .attr("height",function(d,i) {
                    return 0  ;
                })
                .on("mouseover", function() {
                    var myid = this.id;
                    
                    let myID1 = myid.substring(identifier.length );
                    //console.log(myID1);
                    divT.transition()
                        .duration(50)
                        .style("opacity", 1);
                    divT.html(" Count: "+dataset[myID1][1] )
                        .style("left", (d3.event.pageX + 10) + "px")
                        .style("top", (d3.event.pageY - 15) + "px");
                                            
                })
                .on("mouseout", function(d) {
                        
                        divT.transition()
                            .duration('50')
                            .style("opacity", 0);
                })                
                .on("click", function() {
                    //console.log("Test");
                    if (flag_barclick == 0){
                    d3.select(this)
                        .attr("fill", "#ec7014");
                    myid =(this.id);
                   // console.log(myid);
                    recreateOtherCharts(myid);
                    flag_barclick = 1;
                   
                     }
                    else{
                        
                        d3.select(this)
                        .attr("fill", "#525252");
                        recreateOtherCharts("All");
                        flag_barclick = 0;
                    }            
                });
        svg_var.selectAll("rect")
                .transition()
                .duration(800)
                .attr("y", function(d,i) { return yScale(dataset[i][1]);  })
                .attr("height", function(d,i) { return  yScale(0)- yScale(dataset[i][1]); })
                .delay(function(d,i){return(i*100)});
           

        // svg_var.selectAll("rect")
        //         .transition()
        //         .delay(function (d) {return Math.random()*1000;})
        //         .duration(1000)
        //         .attr("y", function(d) { 
        //             return yScale(d[1]); })
        //         .attr("height", function(d) { return yScale(0)- yScale(d[1]); });
                
                
        // svg_var.selectAll("text")
        //         .data(dataset)
        //         .enter()
        //         .append("text")
        //         .text(function(d,i) {
        //             return dataset[i][1];
        //         })
        //         .attr("x", function(d, i) {
        //             return xScale(i) + xScale.rangeBand() / 2;        
        //         })
        //         .attr("y", function(d,i) {
        //             return  yScale(dataset[i][1]) +10;
        //         })
        //         .attr("font-family", "sans-serif")
        //         .attr("font-size", "9px")
        //         .attr("fill", "white")
        //         .attr("text-anchor", "middle");
                        
        svg_var.append("text")
                    .attr("x", (width / 2))             
                    .attr("y", 35 )
                    .attr("text-anchor", "middle") 
                    .attr("font-family", "arial") 
                    .style("font-size", "18px") 
                    .text(title);
        svg_var.append("g")
                .attr("class", "axis")
                .attr("transform", "translate(" + w_padding + ",0)")
                .call(yAxis)
                .attr("font-size", "12px") ;
        svg_var.append("g")
                .attr("class", "axis")
                .attr("transform", "translate(0,"+(height -h_padding)+")")
                .call(xAxis)
                .selectAll("text")	
                .style("text-anchor", "end")
                .attr("dx", "-.8em")
                .attr("dy", "-.4em")
                .attr("font-size", "12px") 
                .attr("transform", function(d) {
                        return "rotate(-90)" 
                    });
                    
        svg_var.append("text")             
                    .attr("transform",
                        "translate(" + (width/2) + " ," + 
                                        (height-10) + ")")
                    .attr("text-anchor", "middle")
                    .attr("font-size", "15px") 
                    .text(xtitle);
                    
        svg_var.append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 50  )
                .attr("x",-170)
                
                .style("text-anchor", "middle")
                .style("font-size", "15px") 
                .text(ytitle); 
    }

    
    function createHistogram(dataset,divid,bins,title1,identifier){
        var color = "steelblue";
        var formatCount = d3.format(",.0f");
        var margin = {top: 20, right: 30, bottom: 30, left: 30},
            width = 500 - margin.left - margin.right,
            height = 300 - margin.top - margin.bottom;

        var max = d3.max(dataset);
        var min = d3.min(dataset);
        var x = d3.scale.linear()
            .domain([min, max])
            .range([0, width]);
        var data = d3.layout.histogram()
            .bins(x.ticks(bins))
            (dataset);
        var yMax = d3.max(data, function(d){return d.length});
        var yMin = d3.min(data, function(d){return d.length});
        var colorScale = d3.scale.linear()
                    .domain([yMin, yMax])
                    .range([d3.rgb(color).brighter(), d3.rgb(color).darker()]);

        var y = d3.scale.linear()
            .domain([0, yMax])
            .range([height, 0]);

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");

        var svg = d3.select("body").select(divid).append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        svg.append("text")
            .attr("x", (width / 2))             
            .attr("y", 12 )
            .attr("text-anchor", "middle")  
            .attr("font-family", "arial") 
            .style("font-size", "15px") 
            .text(title1);
        var bar = svg.selectAll(".bar")
            .data(data)
        .enter().append("g")
            .attr("class", "bar")
            .attr("transform", function(d) { return "translate(" + x(d.x) + "," + y(d.y) + ")"; });

        bar.append("rect")
        .attr("id",function(d,i){return identifier +i;})
            .attr("x", 1)
            .attr("width", (x(data[0].dx) - x(0)) - 1)
            .attr("height", function(d) { return height - y(d.y); })
            .attr("fill", function(d) { return colorScale(d.y) });

        bar.append("text")
            .attr("dy", ".75em")
            .attr("y", -12)
            .attr("x", (x(data[0].dx) - x(0)) / 2)
            .attr("text-anchor", "middle")
            .text(function(d) { return formatCount(d.y); });

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);
                
    }

    function createGroupedBarchart(dataset,svg_var){	
                
        var w=550;
        var h =400;
        var margin = {top: 15, right: 25, bottom: 15, left: 40},
        width = w-150 - margin.left - margin.right,
        height = h-100 - margin.top - margin.bottom;

        var x0 = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1);

        var x1 = d3.scale.ordinal();

        var y = d3.scale.linear()
        .range([height, 0]);

        var xAxis = d3.svg.axis()
        .scale(x0)
        .tickSize(0)
        .orient("bottom");

        var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

        var color = d3.scale.ordinal()
        .range(["#f4a582","#92c5de"]);

        var svg = svg_var
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var categoriesNames = dataset.map(function(d) { return d.categorie; });
        var ValNames = dataset[0].values.map(function(d) { return d.rate; });

        x0.domain(categoriesNames);
        x1.domain(ValNames).rangeRoundBands([0, x0.rangeBand()]);
        y.domain([0, d3.max(dataset, function(categorie) { return d3.max(categorie.values, function(d) { return d.value; }); })]);

        svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

        svg.append("g")
        .attr("class", "y axis")
        .style('opacity','0')
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .style('font-weight','bold')
        .text("Value");

        svg.select('.y').transition().duration(500).delay(1300).style('opacity','1');
        svg.append("text")
            .attr("x", (width / 2))             
            .attr("y", 12 )
            .attr("text-anchor", "middle")  
            .attr("font-family", "arial") 
            .style("font-size", "15px") 
            .text("Somking and Drinking");
        var slice = svg.selectAll(".slice")
        .data(dataset)
        .enter().append("g")
        .attr("class", "g")
        .attr("transform",function(d) { return "translate(" + x0(d.categorie) + ",0)"; });

        slice.selectAll("rect")
        .data(function(d) { return d.values; })
        .enter().append("rect")
        .attr("id", function(d,i) {
            return d.category+i;})
        .attr("width", x1.rangeBand())
        .attr("x", function(d) { return x1(d.rate); })
        .style("fill", function(d) { return color(d.rate) })
        .attr("y", function(d) { return y(0); })
        .attr("height", function(d) { return height - y(0); })
        .on("click", function() {
            //console.log("Test");
            if (flag_barclick == 0){
            d3.select(this)
                .style("fill", "black");
            myid =(this.id);
            //console.log(myid);
            recreateOtherCharts(myid);
            flag_barclick = 1;
           
             }
            else{
                
                d3.select(this)
                .attr("fill", "#525252");
                recreateOtherCharts("All");
                flag_barclick = 0;
            }            
        });

        slice.selectAll("rect")
        .transition()
        .delay(function (d) {return Math.random()*1000;})
        .duration(1000)
        .attr("y", function(d) { return y(d.value); })
        .attr("height", function(d) { return height - y(d.value); });

        //Legend
        var legend = svg.selectAll(".legend")
        .data(dataset[0].values.map(function(d) { return d.rate; }).reverse())
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d,i) { return "translate(15," + i * 30 + ")"; })
        .style("opacity","0");

        legend.append("rect")
        .attr("x", width - 9)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", function(d) { return color(d); });

        legend.append("text")
        .attr("x", width - 10)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function(d) {return d; });

        legend.transition().duration(500).delay(function(d,i){ return 1300 + 100 * i; }).style("opacity","1");

        
    }

function createpie(dataarray,pie_svg,innerradius,title1){
    
var width = 280,
height = 220,
radius = 190 / 2;

var color = d3.scale.ordinal()
    .range(['#8c510a','#d8b365','#f6e8c3','#c7eae5','#5ab4ac','#01665e']);
var arc = d3.svg.arc()
        .outerRadius(radius - 10)
        .innerRadius(innerradius);
var arc2 = d3.svg.arc()
        .outerRadius(radius - 5)
        .innerRadius(innerradius);

var pie = d3.layout.pie()
        .sort(null)
        .value(function(d,i) { return dataarray[i][1]; });
var title = pie_svg ;
var pie_svg = pie_svg.attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + (width +100)/ 2 + "," + (height ) / 2 + ")");
            
//var title = pie_svg ;            
title.append("text")
    .attr("x", (width / 2))             
    .attr("y", 12 )
    .attr("text-anchor", "middle")  
    .attr("font-family", "arial") 
    .style("font-size", "15px") 
    .text(title1);
var g = pie_svg.selectAll(".arc")
        .data(pie(dataarray))
        .enter().append("g")
        .attr("class", "arc");

var pie = g.append("path")
        .attr("id",function(d,i) { return "MF"+i; })
        .attr("d", arc)
        .style("fill", function(d,i) { return color(i); });
        
pie.on("mouseover", function() {
            var myid = this.id;
            d3.select(this).attr("d", arc2)
                ;
            let myID1 = myid.substr(myid.length - 1)
            divT.transition()
                .duration(50)
                .style("opacity", 1);
            divT.html("Category: "+dataarray[myID1][0]+ " \n Count: "+dataarray[myID1][1] )
                .style("left", (d3.event.pageX + 10) + "px")
                .style("top", (d3.event.pageY - 15) + "px");
                            
})
.on("mouseout", function(d) {
        d3.select(this)
            .attr("d", arc)
            .attr("opacity",1);
        divT.transition()
            .duration('50')
            .style("opacity", 0);
})
.on("click", function(d) {
    if (flag_barclick == 0){
      var myid = this.id;
              d3.select(this).attr("d", arc2);
      //console.log(myid);
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
   })       ;

var legend_svg = title.append("svg").attr("id","Legendsvg")
.attr("width", 100)
.attr("height", 190) 
.append("g")
.attr("transform", "translate(" + 0 + "," + (height ) / 6 + ")");

var g = legend_svg.selectAll("legendrect")
        .data(dataarray)
        .enter()
        .append("g")
        .attr("class", "legend");

g.append("rect")
    .attr("id",function(d,i){return i;})
    .attr("x", 10)
    .attr("y", function(d,i){ return 10 + i*15}) // 100 is where the first dot appears. 25 is the distance between dots
        .attr("width", 10)
        .attr("height",10)
    .attr("fill", function(d,i){ return color(i);})
    .attr("opacity",1);
    
g.append("text")
    .attr("x", 30)
    .attr("y", function(d,i){ return 17 + i*15}) // 100 is where the first dot appears. 25 is the distance between dots
    .style("fill", "black")
    .text(function(d,i){ return dataarray[i][0]})
    .attr("text-anchor", "left")
    .attr("font-size", 12)
    .style("alignment-baseline", "middle");
}


function createdepthpie(dataarray,pie_svg,innerradius,title1,identifier){
    
    var width = 280,
    height = 220,
    radius = 190 / 2;
    
    var color = d3.scale.ordinal()
        .range(['#8c510a','#d8b365','#f6e8c3','#c7eae5','#5ab4ac','#01665e']);
    var arc = d3.svg.arc()
            .outerRadius(radius - 10)
            .innerRadius(innerradius);
    var arc2 = d3.svg.arc()
            .outerRadius(radius - 5)
            .innerRadius(innerradius);
    
    var pie = d3.layout.pie()
            .sort(null)
            .value(function(d,i) { return dataarray[i][1]; });
    var title = pie_svg ;
    var pie_svg = pie_svg.attr("width", width)
                .attr("height", height)
                .append("g")
                .attr("transform", "translate(" + (width +100)/ 2 + "," + (height ) / 2 + ")");
                
    //var title = pie_svg ;            
    title.append("text")
        .attr("x", (width / 2))             
        .attr("y", 12 )
        .attr("text-anchor", "middle")  
        .attr("font-family", "arial") 
        .style("font-size", "15px") 
        .text(title1);
    var g = pie_svg.selectAll(".arc")
            .data(pie(dataarray))
            .enter().append("g")
            .attr("class", "arc");
    
    var pie = g.append("path")
            .attr("id",function(d,i) { return identifier +i; })
            .attr("d", arc)
            .style("fill", function(d,i) { return color(i); });
            
    pie.on("mouseover", function() {
                var myid = this.id;
                d3.select(this).attr("d", arc2)
                    ;
                    let myID1 = myid.substring(identifier.length )
                divT.transition()
                    .duration(50)
                    .style("opacity", 1);
                divT.html("Category: "+dataarray[myID1][0]+ " \n Count: "+dataarray[myID1][1] )
                    .style("left", (d3.event.pageX + 10) + "px")
                    .style("top", (d3.event.pageY - 15) + "px");
                                
    })
    .on("mouseout", function(d) {
            d3.select(this)
                .attr("d", arc)
                .attr("opacity",1);
            divT.transition()
                .duration('50')
                .style("opacity", 0);
    })
    .on("click", function(d) {
        if (flag_barclick == 0){
          var myid = this.id;
                  d3.select(this).attr("d", arc2);
          //console.log(myid);
          //recreateOtherCharts(myid);
          flag_barclick = 1;
         
      }
          else{
              
            d3.select(this)
            .attr("d", arc)
            .attr("opacity",1);
              //recreateOtherCharts("All");
              flag_barclick = 0;
          }  
       })       ;
    
    var legend_svg = title.append("svg").attr("id","Legendsvg")
    .attr("width", 100)
    .attr("height", 190) 
    .append("g")
    .attr("transform", "translate(" + 0 + "," + (height ) / 6 + ")");
    
    var g = legend_svg.selectAll("legendrect")
            .data(dataarray)
            .enter()
            .append("g")
            .attr("class", "legend");
    
    g.append("rect")
        .attr("id",function(d,i){return i;})
        .attr("x", 10)
        .attr("y", function(d,i){ return 10 + i*15}) // 100 is where the first dot appears. 25 is the distance between dots
            .attr("width", 10)
            .attr("height",10)
        .attr("fill", function(d,i){ return color(i);})
        .attr("opacity",1);
        
    g.append("text")
        .attr("x", 30)
        .attr("y", function(d,i){ return 17 + i*15}) // 100 is where the first dot appears. 25 is the distance between dots
        .style("fill", "black")
        .text(function(d,i){ return dataarray[i][0]})
        .attr("text-anchor", "left")
        .attr("font-size", 12)
        .style("alignment-baseline", "middle");
    }
    

function filterdataset (paramid){
    var returndataset =[];
    if (paramid =="AG12"){
       returndataset = heart_disease_yes.filter(x => x.AgeCategory == "80 or older");
    }
    else if (paramid =="AG11"){
        returndataset = heart_disease_yes.filter(x => x.AgeCategory == "75-79");
    }
    else if (paramid =="AG10"){
        returndataset = heart_disease_yes.filter(x => x.AgeCategory == "70-74");
    }
    else if (paramid =="AG9"){
        returndataset = heart_disease_yes.filter(x => x.AgeCategory == "65-69");
    }
    else if (paramid =="AG8"){
        returndataset = heart_disease_yes.filter(x => x.AgeCategory == "60-64");
    }
    else if (paramid =="AG7"){
        returndataset = heart_disease_yes.filter(x => x.AgeCategory == "55-59");
    }
    else if (paramid =="AG6"){
        returndataset = heart_disease_yes.filter(x => x.AgeCategory == "50-54");
    }
    else if (paramid =="AG5"){
        returndataset = heart_disease_yes.filter(x => x.AgeCategory == "45-49");
    }
    else if (paramid =="AG4"){
        returndataset = heart_disease_yes.filter(x => x.AgeCategory == "40-44");
    }
    else if (paramid =="AG3"){
        returndataset = heart_disease_yes.filter(x => x.AgeCategory == "35-39");
    }
    else if (paramid =="AG2"){
        returndataset = heart_disease_yes.filter(x => x.AgeCategory == "30-34");
    }
    else if (paramid =="AG1"){
        returndataset = heart_disease_yes.filter(x => x.AgeCategory == "25-29");
    }
    else if (paramid =="AG0"){
        returndataset = heart_disease_yes.filter(x => x.AgeCategory == "18-24");
    }
    else if (paramid =="Race0"){
        returndataset = heart_disease_yes.filter(x => x.Race == "American Indian/Alaskan Native");
    }
    else if (paramid =="Race1"){
        returndataset = heart_disease_yes.filter(x => x.Race == "Asian");
    }
    else if (paramid =="Race2"){
        returndataset = heart_disease_yes.filter(x => x.Race == "Black");
    }
    else if (paramid =="Race3"){
        returndataset = heart_disease_yes.filter(x => x.Race == "Hispanic");
    }
    else if (paramid =="Race4"){
        returndataset = heart_disease_yes.filter(x => x.Race == "Other");
    }
    else if (paramid =="Race5"){
        returndataset = heart_disease_yes.filter(x => x.Race == "White");
    }
    else if (paramid =="BMI_WG0"){
        returndataset = heart_disease_yes.filter(x => x.BMI < 18.5);
    }
    else if (paramid =="BMI_WG1"){
        returndataset = heart_disease_yes.filter(x => x.BMI < 25 && x.BMI >= 18.5);
    }
    else if (paramid =="BMI_WG2"){
        returndataset = heart_disease_yes.filter(x => x.BMI < 30 && x.BMI >= 25);
    }
    else if (paramid =="BMI_WG3"){
        returndataset = heart_disease_yes.filter(x => x.BMI >=30);
    }
    else if (paramid =="MF0"){
        returndataset = heart_disease_yes.filter(x => x.Sex =="Female");
    }
    else if (paramid =="MF1"){
        returndataset = heart_disease_yes.filter(x => x.Sex =="Male");
    }
    else if (paramid =="Smoking0"){
        returndataset = heart_disease_yes.filter(x => x.Smoking =="Yes");
    }
    else if (paramid =="Smoking1"){
        returndataset = heart_disease_yes.filter(x => x.Smoking == "No");
    }
    else if (paramid =="Drinking0"){
        returndataset = heart_disease_yes.filter(x => x.AlcoholDrinking =="Yes");
    }
    else if (paramid =="Drinking1"){
        returndataset = heart_disease_yes.filter(x => x.AlcoholDrinking == "No");
    }
    else if (paramid =="GH0"){
        returndataset = heart_disease_yes.filter(x => x.GenHealth =="Excellent");
    }
    else if (paramid =="GH1"){
        returndataset = heart_disease_yes.filter(x => x.GenHealth == "Fair");
    }
    else if (paramid =="GH2"){
        returndataset = heart_disease_yes.filter(x => x.GenHealth =="Good");
    }
    else if (paramid =="GH3"){
        returndataset = heart_disease_yes.filter(x => x.GenHealth == "Poor");
    }
    else if (paramid =="GH4"){
        returndataset = heart_disease_yes.filter(x => x.GenHealth =="Very good");
    }
    else if (paramid =="PA0"){
        returndataset = heart_disease_yes.filter(x => x.PhysicalActivity == "No");
    }
    
    else if (paramid =="PA1"){
        returndataset = heart_disease_yes.filter(x => x.PhysicalActivity == "Yes");
    }
    //console.log(returndataset);
    return(returndataset);

}
function calculatePH(dataset){
    var PH=[];
    dataset.map(function (d) {
            PH.push(+d["PhysicalHealth"])});
    return PH;
}
function calculateMH(dataset){
var MH=[];
dataset.map(function (d) {
            MH.push(+d["MentalHealth"])});
            return MH;
}
function calculateSmokingDrinking(dataset){
        var Smoking_Yes = 0;
        var Smoking_No = 0;
        var Alcohol_Yes = 0;
        var Alcohol_No = 0;
        for(i=0;i<dataset.length;i++)
        {
            if(dataset[i]["Smoking"] == 'Yes'){
                Smoking_Yes = Smoking_Yes +1;                ;
            }
            else{
                Smoking_No = Smoking_No +1;
            };
            if(dataset[i]["AlcoholDrinking"] == 'Yes'){
                Alcohol_Yes = Alcohol_Yes +1;                ;
            }
            else{
                Alcohol_No = Alcohol_No +1;
            }
        }
        var Smoking_Drinking_dataset = [
            {
                "categorie": "Smoking", 
                "values": [
                    {
                        "value": Smoking_Yes, 
                        "rate": "Yes",
                        "category": "Smoking"
                    }, 
                    {
                        "value": Smoking_No, 
                        "rate": "No",
                        "category": "Smoking"
                    }
                ]
            }, 
            {
                "categorie": "Drinking", 
                "values": [
                    {
                        "value": Alcohol_Yes, 
                        "rate": "Yes",
                        "category": "Drinking"
                    }, 
                    {
                        "value": Alcohol_No, 
                        "rate": "No",
                        "category": "Drinking"
                    }
                ]
            }]; 
        
            return Smoking_Drinking_dataset;
        
}
function calculateAgegroupBar(dataset){
    
    const distinctAgeCat = [...new Set(heart_disease_csv.map(x =>x.AgeCategory))];
    distinctAgeCat.sort();
    var AgevsPopulation =[];

    for(i=0;i<distinctAgeCat.length;i++){
        AgevsPopulation.push([distinctAgeCat[i],0])
    }
    
    for(i=0;i<dataset.length;i++)
    {
        if(dataset[i]["AgeCategory"] == '18-24'){
            AgevsPopulation[0][1]= AgevsPopulation[0][1] +1;
        }
        else if(dataset[i]["AgeCategory"] == '25-29'){
            AgevsPopulation[1][1]= AgevsPopulation[1][1] +1;
        }
        else if(dataset[i]["AgeCategory"] == '30-34'){
            AgevsPopulation[2][1]= AgevsPopulation[2][1] +1;
        }
        else if(dataset[i]["AgeCategory"] == '35-39'){
            AgevsPopulation[3][1]= AgevsPopulation[3][1] +1;
        }
        else if(dataset[i]["AgeCategory"] == '40-44'){
            AgevsPopulation[4][1]= AgevsPopulation[4][1] +1;
        }
        else if(dataset[i]["AgeCategory"] == '45-49'){
            AgevsPopulation[5][1]= AgevsPopulation[5][1] +1;
        }
        else if(dataset[i]["AgeCategory"] == '50-54'){
            AgevsPopulation[6][1]= AgevsPopulation[6][1] +1;
        }
        else if(dataset[i]["AgeCategory"] == '55-59'){
            AgevsPopulation[7][1]= AgevsPopulation[7][1] +1;
        }
        else if(dataset[i]["AgeCategory"] == '60-64'){
            AgevsPopulation[8][1]= AgevsPopulation[8][1] +1;
        }
        else if(dataset[i]["AgeCategory"] == '65-69'){
            AgevsPopulation[9][1]= AgevsPopulation[9][1] +1;
        }
        else if(dataset[i]["AgeCategory"] == '70-74'){
            AgevsPopulation[10][1]= AgevsPopulation[10][1] +1;
        }
        else if(dataset[i]["AgeCategory"] == '75-79'){
            AgevsPopulation[11][1]= AgevsPopulation[11][1] +1;
        }
        else {
            AgevsPopulation[12][1]= AgevsPopulation[12][1] +1;
        }
    }
    return(AgevsPopulation);
   

}
function calculateRaceBar(dataset){
    const distinctRaces = [...new Set(dataset.map(x =>x.Race))];
        
        distinctRaces.sort();
        var RacevsPopulation =[];

        for(i=0;i<distinctRaces.length;i++){
            RacevsPopulation.push([distinctRaces[i],0])
        }

        for(i=0;i<dataset.length;i++)
        {
            if(dataset[i]["Race"] == 'American Indian/Alaskan Native'){
                RacevsPopulation[0][1]= RacevsPopulation[0][1] +1;
            }
            else if(dataset[i]["Race"] == 'Asian'){
                RacevsPopulation[1][1]= RacevsPopulation[1][1] +1;
            }
            else if(dataset[i]["Race"] == 'Black'){
                RacevsPopulation[2][1]= RacevsPopulation[2][1] +1;
            }
            else if(dataset[i]["Race"] == 'Hispanic'){
                RacevsPopulation[3][1]= RacevsPopulation[3][1] +1;
            }
            else if(dataset[i]["Race"] == 'Other'){
                RacevsPopulation[4][1]= RacevsPopulation[4][1] +1;
            }
            else if(dataset[i]["Race"] == 'White'){
                RacevsPopulation[5][1]= RacevsPopulation[5][1] +1;
            }
        }
        return RacevsPopulation;

}

function calculateBMICat(dataset){
        var BMI_category =[["Underweight",0],
         ["Healthy",0],
         ["Overweight",0],
         ["Obese",0]];
         
        for(i=0;i<dataset.length;i++)
        {
            if(dataset[i]["BMI"] < 18.5 ){
                BMI_category[0][1]= BMI_category[0][1] +1;
            }
            else if(dataset[i]["BMI"] < 25 ){
                BMI_category[1][1]= BMI_category[1][1] +1;
            }
            else if(dataset[i]["BMI"] < 30 ){
                BMI_category[2][1]= BMI_category[2][1] +1;
            }
            else {
                BMI_category[3][1]= BMI_category[3][1] +1;
            }
        }
        return(BMI_category);
}

function calculategenHealth(dataset){
    const distinctGenHealth = [...new Set(heart_disease_csv.map(x =>x.GenHealth))];
        
        distinctGenHealth.sort();
        var GenHealtharr =[];

        for(i=0;i<distinctGenHealth.length;i++){
            GenHealtharr.push([distinctGenHealth[i],0])
        }
        //console.log(GenHealtharr);
        for(i=0;i<dataset.length;i++)
        {
            if(dataset[i]["GenHealth"] == 'Excellent'){
                GenHealtharr[0][1]= GenHealtharr[0][1] +1;
            }
            else if(dataset[i]["GenHealth"] == 'Fair'){
                GenHealtharr[1][1]= GenHealtharr[1][1] +1;
            }
            else if(dataset[i]["GenHealth"] == 'Good'){
                GenHealtharr[2][1]= GenHealtharr[2][1] +1;
            }
            else if(dataset[i]["GenHealth"] == 'Poor'){
                GenHealtharr[3][1]= GenHealtharr[3][1] +1;
            }
            else if(dataset[i]["GenHealth"] == 'Very good'){
                GenHealtharr[4][1]= GenHealtharr[4][1] +1;
            }
        }
        return GenHealtharr;

}

function calculatePhysicalActivity(dataset){
    const distinctPhysicalActivity = [...new Set(heart_disease_csv.map(x =>x.PhysicalActivity))];
        
        distinctPhysicalActivity.sort();
        var PhysicalActivity =[];
        //console.log("pa test");
        for(i=0;i<distinctPhysicalActivity.length;i++){
            PhysicalActivity.push([distinctPhysicalActivity[i],0])
        }
        //console.log(PhysicalActivity);
        for(i=0;i<dataset.length;i++)
        {
            if(dataset[i]["PhysicalActivity"] == 'No'){
                PhysicalActivity[0][1]= PhysicalActivity[0][1] +1;
            }
            else if(dataset[i]["PhysicalActivity"] == 'Yes'){
                PhysicalActivity[1][1]= PhysicalActivity[1][1] +1;
            }
        }
        return PhysicalActivity;

}

function calculateGender(dataset){
    const distinctGender = [...new Set(heart_disease_csv.map(x =>x.Sex))];
        
        distinctGender.sort();
        var genderarr =[];
        
        for(i=0;i<distinctGender.length;i++){
            genderarr.push([distinctGender[i],0])
        }
        //console.log(genderarr);
        for(i=0;i<dataset.length;i++)
        {
            if(dataset[i]["Sex"] == 'Female'){
                genderarr[0][1]= genderarr[0][1] +1;
            }
            else if(dataset[i]["Sex"] == 'Male'){
                genderarr[1][1]= genderarr[1][1] +1;
            }
        }
        return genderarr;

}

function recreateOtherCharts(paramid){
    //console.log(paramid);
    if( paramid =="All"){
        filteredData = heart_disease_yes;
    }
    else{
        filteredData = filterdataset(paramid);
    }
    //console.log(filteredData);
    w=550;
    h=400;
    wpad =100;
    hpad =100;
    if (paramid.match(/AG.*/)) {
        
        RacevsPopulation=calculateRaceBar(filteredData);
        d3.selectAll('#svg_RacevsPopulation')
        .remove();
       
        var svg_RacevsPopulation = d3.select("body").select("#barchartRD")
            .append("svg")
            .attr("id", "svg_RacevsPopulation")
            .attr("width", w)
            .attr("height", h);

        createBarchart(RacevsPopulation,svg_RacevsPopulation,w,h,wpad,hpad,"Heart Disease by Race","Race","Heart Disease","Race");
        
        d3.selectAll('#svg_BMIhistogram')
        .remove();
        BMI_category= calculateBMICat(filteredData) ;
        //console.log(BMI_category);
        var svg_BMI_category = d3.select("body").select("#BMIhistogram")
        .append("svg")
        .attr("id", "svg_BMIhistogram")
        .attr("width", w)
        .attr("height", h);

        createBarchart(BMI_category,svg_BMI_category,w,h,wpad,hpad,"Weight categories","Weight groups","Population","BMI_WG");
        
        d3.selectAll('#svg_Smoking_Drinking')
        .remove();
        Smoking_Drinking_dataset =calculateSmokingDrinking(filteredData);
        var svg_Smoking_Drinking = d3.select("body").select("#groupedbarchart2")
            .append("svg")
            .attr("id", "svg_Smoking_Drinking")
            .attr("width", w-150)
            .attr("height", h-100);
        createGroupedBarchart(Smoking_Drinking_dataset,svg_Smoking_Drinking);

        d3.selectAll('#pieDiv').select("#pie_svg")
        .remove();
        var pie_svg_sex= d3.select("body").select("#pieDiv")
         .append("svg")            
         .attr("id","pie_svg");
        gender =calculateGender(filteredData);        
        createpie(gender,pie_svg_sex,0,"Gender Distribution");
      

    }
    else if (paramid.match(/Race.*/)) {
        
        AgevsPopulation=calculateAgegroupBar(filteredData) ;
        d3.selectAll('#svg_AgevsPopulation')
        .remove();
       
        var svg_AgevsPopulation = d3.select("body").select("#barchart")
            .append("svg")
            .attr("id", "svg_AgevsPopulation")
            .attr("width", w)
            .attr("height", h);

            createBarchart(AgevsPopulation,svg_AgevsPopulation,w,h,wpad,hpad,"Heart Disease by Age Group","Age Groups","Population","AG");
        
        d3.selectAll('#svg_BMIhistogram')
        .remove();
        BMI_category= calculateBMICat(filteredData) ;
        //console.log(BMI_category);
        var svg_BMI_category = d3.select("body").select("#BMIhistogram")
        .append("svg")
        .attr("id", "svg_BMIhistogram")
        .attr("width", w)
        .attr("height", h);

        createBarchart(BMI_category,svg_BMI_category,w,h,wpad,hpad,"Weight categories","Weight groups","Population","BMI_WG");
        
        d3.selectAll('#svg_Smoking_Drinking')
        .remove();
        Smoking_Drinking_dataset =calculateSmokingDrinking(filteredData);
        var svg_Smoking_Drinking = d3.select("body").select("#groupedbarchart2")
            .append("svg")
            .attr("id", "svg_Smoking_Drinking")
            .attr("width", w-150)
            .attr("height", h-100);
        createGroupedBarchart(Smoking_Drinking_dataset,svg_Smoking_Drinking);

        d3.selectAll('#pieDiv').select("#pie_svg")
        .remove();
        var pie_svg_sex= d3.select("body").select("#pieDiv")
         .append("svg")            
         .attr("id","pie_svg");
        gender =calculateGender(filteredData);        
        createpie(gender,pie_svg_sex,0,"Gender Distribution");

    }
    else if (paramid.match(/BMI.*/)) {
        
        AgevsPopulation=calculateAgegroupBar(filteredData) ;
        d3.selectAll('#svg_AgevsPopulation')
        .remove();
       
        var svg_AgevsPopulation = d3.select("body").select("#barchart")
            .append("svg")
            .attr("id", "svg_AgevsPopulation")
            .attr("width", w)
            .attr("height", h);

        createBarchart(AgevsPopulation,svg_AgevsPopulation,w,h,wpad,hpad,"Heart Disease by Age Group","Age Groups","Population","AG");
        
        RacevsPopulation=calculateRaceBar(filteredData);
        d3.selectAll('#svg_RacevsPopulation')
        .remove();
       
        var svg_RacevsPopulation = d3.select("body").select("#barchartRD")
            .append("svg")
            .attr("id", "svg_RacevsPopulation")
            .attr("width", w)
            .attr("height", h);

        createBarchart(RacevsPopulation,svg_RacevsPopulation,w,h,wpad,hpad,"Heart Disease by Race","Race","Heart Disease","Race");
        
        d3.selectAll('#svg_Smoking_Drinking')
        .remove();
        Smoking_Drinking_dataset =calculateSmokingDrinking(filteredData);
        var svg_Smoking_Drinking = d3.select("body").select("#groupedbarchart2")
            .append("svg")
            .attr("id", "svg_Smoking_Drinking")
            .attr("width", w-150)
            .attr("height", h-100);
        createGroupedBarchart(Smoking_Drinking_dataset,svg_Smoking_Drinking);

        d3.selectAll('#pieDiv').select("#pie_svg")
        .remove();
        var pie_svg_sex= d3.select("body").select("#pieDiv")
         .append("svg")            
         .attr("id","pie_svg");
        gender =calculateGender(filteredData);        
        createpie(gender,pie_svg_sex,0,"Gender Distribution");

        
    }else if (paramid.match(/MF.*/)) {
        
        AgevsPopulation=calculateAgegroupBar(filteredData) ;
        d3.selectAll('#svg_AgevsPopulation')
        .remove();
       
        var svg_AgevsPopulation = d3.select("body").select("#barchart")
            .append("svg")
            .attr("id", "svg_AgevsPopulation")
            .attr("width", w)
            .attr("height", h);

        createBarchart(AgevsPopulation,svg_AgevsPopulation,w,h,wpad,hpad,"Heart Disease by Age Group","Age Groups","Population","AG");
        
        RacevsPopulation=calculateRaceBar(filteredData);
        d3.selectAll('#svg_RacevsPopulation')
        .remove();
       
        var svg_RacevsPopulation = d3.select("body").select("#barchartRD")
            .append("svg")
            .attr("id", "svg_RacevsPopulation")
            .attr("width", w)
            .attr("height", h);

        createBarchart(RacevsPopulation,svg_RacevsPopulation,w,h,wpad,hpad,"Heart Disease by Race","Race","Heart Disease","Race");
        
        d3.selectAll('#svg_BMIhistogram')
        .remove();
        BMI_category= calculateBMICat(filteredData) ;
        //console.log(BMI_category);
        var svg_BMI_category = d3.select("body").select("#BMIhistogram")
        .append("svg")
        .attr("id", "svg_BMIhistogram")
        .attr("width", w)
        .attr("height", h);

        createBarchart(BMI_category,svg_BMI_category,w,h,wpad,hpad,"Weight categories","Weight groups","Population","BMI_WG");
        d3.selectAll('#svg_Smoking_Drinking')
        .remove();
        Smoking_Drinking_dataset =calculateSmokingDrinking(filteredData);
        var svg_Smoking_Drinking = d3.select("body").select("#groupedbarchart2")
            .append("svg")
            .attr("id", "svg_Smoking_Drinking")
            .attr("width", w-150)
            .attr("height", h-100);
        createGroupedBarchart(Smoking_Drinking_dataset,svg_Smoking_Drinking);

    }
    else if (paramid.match(/Smoking.*/)) {
        AgevsPopulation=calculateAgegroupBar(filteredData) ;
        d3.selectAll('#svg_AgevsPopulation')
        .remove();
       
        var svg_AgevsPopulation = d3.select("body").select("#barchart")
            .append("svg")
            .attr("id", "svg_AgevsPopulation")
            .attr("width", w)
            .attr("height", h);

        createBarchart(AgevsPopulation,svg_AgevsPopulation,w,h,wpad,hpad,"Heart Disease by Age Group","Age Groups","Population","AG");
        
        RacevsPopulation=calculateRaceBar(filteredData);
        d3.selectAll('#svg_RacevsPopulation')
        .remove();
       
        var svg_RacevsPopulation = d3.select("body").select("#barchartRD")
            .append("svg")
            .attr("id", "svg_RacevsPopulation")
            .attr("width", w)
            .attr("height", h);

        createBarchart(RacevsPopulation,svg_RacevsPopulation,w,h,wpad,hpad,"Heart Disease by Race","Race","Heart Disease","Race");
        
        d3.selectAll('#svg_BMIhistogram')
        .remove();
        BMI_category= calculateBMICat(filteredData) ;
        //console.log(BMI_category);
        var svg_BMI_category = d3.select("body").select("#BMIhistogram")
        .append("svg")
        .attr("id", "svg_BMIhistogram")
        .attr("width", w)
        .attr("height", h);

        createBarchart(BMI_category,svg_BMI_category,w,h,wpad,hpad,"Weight categories","Weight groups","Population","BMI_WG");

        d3.selectAll('#pieDiv').select("#pie_svg")
        .remove();
        var pie_svg_sex= d3.select("body").select("#pieDiv")
         .append("svg")            
         .attr("id","pie_svg");
        gender =calculateGender(filteredData);        
        createpie(gender,pie_svg_sex,0,"Gender Distribution");

        }
    else if (paramid.match(/Drinking.*/)) {
        AgevsPopulation=calculateAgegroupBar(filteredData) ;
        d3.selectAll('#svg_AgevsPopulation')
        .remove();
       
        var svg_AgevsPopulation = d3.select("body").select("#barchart")
            .append("svg")
            .attr("id", "svg_AgevsPopulation")
            .attr("width", w)
            .attr("height", h);

        createBarchart(AgevsPopulation,svg_AgevsPopulation,w,h,wpad,hpad,"Heart Disease by Age Group","Age Groups","Population","AG");
        
        RacevsPopulation=calculateRaceBar(filteredData);
        d3.selectAll('#svg_RacevsPopulation')
        .remove();
       
        var svg_RacevsPopulation = d3.select("body").select("#barchartRD")
            .append("svg")
            .attr("id", "svg_RacevsPopulation")
            .attr("width", w)
            .attr("height", h);

        createBarchart(RacevsPopulation,svg_RacevsPopulation,w,h,wpad,hpad,"Heart Disease by Race","Race","Heart Disease","Race");
        
        d3.selectAll('#svg_BMIhistogram')
        .remove();
        BMI_category= calculateBMICat(filteredData) ;
        //console.log(BMI_category);
        var svg_BMI_category = d3.select("body").select("#BMIhistogram")
        .append("svg")
        .attr("id", "svg_BMIhistogram")
        .attr("width", w)
        .attr("height", h);

        createBarchart(BMI_category,svg_BMI_category,w,h,wpad,hpad,"Weight categories","Weight groups","Population","BMI_WG");

        d3.selectAll('#pieDiv').select("#pie_svg")
        .remove();
        var pie_svg_sex= d3.select("body").select("#pieDiv")
         .append("svg")            
         .attr("id","pie_svg");
        gender =calculateGender(filteredData);        
        createpie(gender,pie_svg_sex,0,"Gender Distribution");

        }
    else if (paramid=="All") {
        
        AgevsPopulation=calculateAgegroupBar(filteredData) ;
        d3.selectAll('#svg_AgevsPopulation')
        .remove();
       
        var svg_AgevsPopulation = d3.select("body").select("#barchart")
            .append("svg")
            .attr("id", "svg_AgevsPopulation")
            .attr("width", w)
            .attr("height", h);

        createBarchart(AgevsPopulation,svg_AgevsPopulation,w,h,wpad,hpad,"Heart Disease by Age Group","Age Groups","Population","AG");
        
        RacevsPopulation=calculateRaceBar(filteredData);
        d3.selectAll('#svg_RacevsPopulation')
        .remove();
       
        var svg_RacevsPopulation = d3.select("body").select("#barchartRD")
            .append("svg")
            .attr("id", "svg_RacevsPopulation")
            .attr("width", w)
            .attr("height", h);

        createBarchart(RacevsPopulation,svg_RacevsPopulation,w,h,wpad,hpad,"Heart Disease by Race","Race","Heart Disease","Race");
        
        d3.selectAll('#svg_BMIhistogram')
        .remove();
        BMI_category= calculateBMICat(filteredData) ;
        //console.log(BMI_category);
        var svg_BMI_category = d3.select("body").select("#BMIhistogram")
        .append("svg")
        .attr("id", "svg_BMIhistogram")
        .attr("width", w)
        .attr("height", h);

        createBarchart(BMI_category,svg_BMI_category,w,h,wpad,hpad,"Weight categories","Weight groups","Population","BMI_WG");
        d3.selectAll('#svg_Smoking_Drinking')
        .remove();
        Smoking_Drinking_dataset =calculateSmokingDrinking(filteredData);
        var svg_Smoking_Drinking = d3.select("body").select("#groupedbarchart2")
            .append("svg")
            .attr("id", "svg_Smoking_Drinking")
            .attr("width", w-150)
            .attr("height", h-100);
        createGroupedBarchart(Smoking_Drinking_dataset,svg_Smoking_Drinking);

        d3.selectAll('#pieDiv').select("#pie_svg")
        .remove();
        var pie_svg_sex= d3.select("body").select("#pieDiv")
         .append("svg")            
         .attr("id","pie_svg");
        gender =calculateGender(filteredData);        
        createpie(gender,pie_svg_sex,0,"Gender Distribution");

    }

}

function recreateOtherCharts_depth(paramid){
   // console.log(paramid);
    if( paramid =="All"){
        filteredData = heart_disease_yes;
    }
    else{
        filteredData = filterdataset(paramid);
    }
    if (paramid.match(/GH.*/)) {
        var PH=calculatePH(filteredData);
         createHistogram(PH,"#PHhistogram",5,"Physical Health","PH");

         var MH=calculateMH(filteredData);
         createHistogram(MH,"#MHhistogram",5,"Mental Health","MH");
        
        

        var pie_svg_pa= d3.select("body").select("#physicalActivity")
         .append("svg")            
         .attr("id","pie_svg");
        PhysicalActivity =calculatePhysicalActivity(filteredData);
        //console.log(PhysicalActivity);
        createdepthpie(PhysicalActivity,pie_svg_pa,0,"Physical Activity","PA");

    }
    else  if (paramid.match(/PA.*/)) {
        var PH=calculatePH(filteredData);
         createHistogram(PH,"#PHhistogram",5,"Physical Health","PH");

         var MH=calculateMH(filteredData);
         createHistogram(MH,"#MHhistogram",5,"Mental Health","MH");
        
        var pie_svg_gh= d3.select("body").select("#genhealthPie")
         .append("svg")            
         .attr("id","pie_svg");
        genHealth =calculategenHealth(filteredData);
        //console.log(genHealth);
        createdepthpie(genHealth,pie_svg_gh,30,"General Health","GH");

        

    }
}