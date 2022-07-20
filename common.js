var getDataOnCondition = function(dataset, condition)
    {
      // console.log(dataset);
       arrHeartIndicatorData = getHeartDiseaseData(dataset);
      // console.log(arrHeartData);
       params = ["gender", "ageGroup", "AllDiseases"];
       paramsOtherDisease = ["Stroke", "DiffWalking","Diabetic","Asthma", "KidneyDisease", "SkinCancer"];
      
       if(condition == params[0])
       {
         GenderInfo =  getMaleFemaleCount(arrHeartIndicatorData);
         return GenderInfo;
       }
       else if(condition == params[1])
       {
         AgeGrpInfo = getAgeGrpCount(arrHeartIndicatorData);
         return AgeGrpInfo;
       }
       else if(condition == params[2])
       {
        AllDiseasesInfo = getOtherDiseaseCount(arrHeartIndicatorData, condition, true);
        return AllDiseasesInfo;
       }
       else if(condition == paramsOtherDisease[0] || condition == paramsOtherDisease[1] || condition == paramsOtherDisease[2]|| condition == paramsOtherDisease[3]|| condition == paramsOtherDisease[4]|| condition == paramsOtherDisease[5])
       {
        OtherDiseaseInfo = getOtherDiseaseCount(arrHeartIndicatorData,condition, false);
        return OtherDiseaseInfo;
       }
    }

    getMaleFemaleCount = function(arrData){
        totalMaleCount = 0;
        totalFemaleCount = 0;
        malePercentage= 0.0;
        femalePercentage = 0.0; 
        totalCount = arrData.length;
        var objGender = [];       
        for(var i =0 ; i < arrData.length; i++)
        {       
            if(arrData[i].Gender == "Male")
            {           
                totalMaleCount = totalMaleCount + 1;
            }
            else if(arrData[i].Gender == "Female")
            {
                totalFemaleCount= totalFemaleCount + 1;
            }
        }
        malePercentage = ((totalMaleCount/totalCount)* 100).toFixed(2);
        femalePercentage = ((totalFemaleCount/totalCount)* 100).toFixed(2);
        var objMale  = new  HeartDiseaseByMaleFemale(totalMaleCount,"Male" , malePercentage);
        var objFemale  = new  HeartDiseaseByMaleFemale(totalFemaleCount,"Female" , femalePercentage);
        objGender.push(objMale);
        objGender.push(objFemale);
       // console.log(totalMaleCount + " " + totalFemaleCount + " " + malePercentage + " " +femalePercentage);
        return objGender;
    }

getAgeGrpCount = function(arrData){
    ageGrp0Count = 0; ageGrp1Count = 0; ageGrp2Count = 0; ageGrp3Count = 0; ageGrp4Count = 0; ageGrp5Count = 0;
    ageGrp6Count = 0; ageGrp7Count = 0; ageGrp8Count = 0; ageGrp9Count = 0; ageGrp10Count = 0; ageGrp11Count = 0;ageGrp12Count = 0;
    totalCount = arrData.length;
    age = ["18-24", "25-29", "30-34","35-39","40-44","45-49","50-54","55-59","60-64", "65-69","70-74","75-79","80 or older"];
    objAgeGrpArr = [];
    for(var i =0 ; i < arrData.length; i++)
    {
        if(arrData[i].AgeGrp == age[0])
        {
            ageGrp0Count = ageGrp0Count + 1;
        }
        else if(arrData[i].AgeGrp == age[1])
        {
            ageGrp1Count = ageGrp1Count + 1;
        }
        else if(arrData[i].AgeGrp == age[2])
        {
            ageGrp2Count = ageGrp2Count + 1;
        }
        else if(arrData[i].AgeGrp == age[3])
        {
            ageGrp3Count = ageGrp3Count + 1;
        }
        else if(arrData[i].AgeGrp == age[4])
        {
            ageGrp4Count = ageGrp4Count + 1;
        }
        else if(arrData[i].AgeGrp == age[5])
        {
            ageGrp5Count = ageGrp5Count + 1;
        }
        else if(arrData[i].AgeGrp == age[6])
        {
            ageGrp6Count = ageGrp6Count + 1;
        }
        else if(arrData[i].AgeGrp == age[7])
        {
            ageGrp7Count = ageGrp7Count + 1;
        }
        else if(arrData[i].AgeGrp == age[8])
        {
            ageGrp8Count = ageGrp8Count + 1;
        }
        else if(arrData[i].AgeGrp == age[9])
        {
            ageGrp9Count = ageGrp9Count + 1;
        }
        else if(arrData[i].AgeGrp == age[10])
        {
            ageGrp10Count = ageGrp10Count + 1;
        }
        else if(arrData[i].AgeGrp == age[11])
        {
            ageGrp11Count = ageGrp11Count + 1;
        }
        else if(arrData[i].AgeGrp == age[12])
        {
            ageGrp12Count = ageGrp12Count + 1;
        }
    }

    //for(var i=0 ; i < age.length; i++)
    //{
    //    count = "ageGrp"+i+"Count";
    //    console.log("AgeGrp Count"+ count);
    //    var objAgeGrp = new HeartDiseaseByAgeGroup(count, age[0], ((count/totalCount)* 100).toFixed(2));
    //    objAgeGrpArr.push(objAgeGrp);
    //}
    var objAgeGrp1 = new HeartDiseaseByAgeGroup(ageGrp0Count, age[0], ((ageGrp0Count/totalCount)* 100).toFixed(2));
    var objAgeGrp2 = new HeartDiseaseByAgeGroup(ageGrp1Count, age[1], ((ageGrp1Count/totalCount)* 100).toFixed(2));
    var objAgeGrp3 = new HeartDiseaseByAgeGroup(ageGrp2Count, age[2], ((ageGrp2Count/totalCount)* 100).toFixed(2));
    var objAgeGrp4 = new HeartDiseaseByAgeGroup(ageGrp3Count, age[3], ((ageGrp3Count/totalCount)* 100).toFixed(2));
    var objAgeGrp5 = new HeartDiseaseByAgeGroup(ageGrp4Count, age[4], ((ageGrp4Count/totalCount)* 100).toFixed(2));
    var objAgeGrp6 = new HeartDiseaseByAgeGroup(ageGrp5Count, age[5], ((ageGrp5Count/totalCount)* 100).toFixed(2));
    var objAgeGrp7 = new HeartDiseaseByAgeGroup(ageGrp6Count, age[6], ((ageGrp6Count/totalCount)* 100).toFixed(2));
    var objAgeGrp8 = new HeartDiseaseByAgeGroup(ageGrp7Count, age[7], ((ageGrp7Count/totalCount)* 100).toFixed(2));
    var objAgeGrp9 = new HeartDiseaseByAgeGroup(ageGrp8Count, age[8], ((ageGrp8Count/totalCount)* 100).toFixed(2));
    var objAgeGrp10 = new HeartDiseaseByAgeGroup(ageGrp9Count, age[9], ((ageGrp9Count/totalCount)* 100).toFixed(2));
    var objAgeGrp11 = new HeartDiseaseByAgeGroup(ageGrp10Count, age[10], ((ageGrp10Count/totalCount)* 100).toFixed(2));
    var objAgeGrp12 = new HeartDiseaseByAgeGroup(ageGrp11Count, age[11], ((ageGrp11Count/totalCount)* 100).toFixed(2));
    var objAgeGrp13 = new HeartDiseaseByAgeGroup(ageGrp12Count, age[12], ((ageGrp12Count/totalCount)* 100).toFixed(2));
    objAgeGrpArr.push(objAgeGrp1)
    objAgeGrpArr.push(objAgeGrp2)
    objAgeGrpArr.push(objAgeGrp3)
    objAgeGrpArr.push(objAgeGrp4)
    objAgeGrpArr.push(objAgeGrp5)
    objAgeGrpArr.push(objAgeGrp6)
    objAgeGrpArr.push(objAgeGrp7)
    objAgeGrpArr.push(objAgeGrp8)
    objAgeGrpArr.push(objAgeGrp9)
    objAgeGrpArr.push(objAgeGrp10)
    objAgeGrpArr.push(objAgeGrp11)
    objAgeGrpArr.push(objAgeGrp12)
    objAgeGrpArr.push(objAgeGrp13)
    return objAgeGrpArr; 

}

getOtherDiseaseCount = function(arrData, diseaseName, isAllDiseases)
{
    strokeCount = 0; difficultWalkCount = 0; diabeticCount=0;
    asthmaCount = 0; kidneyDiseaseCount = 0; skinCancerCount = 0;
    noStrokeCount = 0; noDifficultWalkCount = 0; noDiabeticCount=0;
    noAsthmaCount = 0; noKidneyDiseaseCount = 0; noSkinCancerCount = 0;
    var objDiseaseArr = [];
    var objDisease;
    totalCount = arrData.length;
    //console.log("totalCount : " + totalCount);
   // console.log(arrData);
    for(var i =0 ; i < arrData.length; i++)
    {        
        if(arrData[i].HasStroke == "Yes")
        {
            strokeCount = strokeCount + 1;
        }
        if(arrData[i].HasStroke == "No")
        {
            noStrokeCount = noStrokeCount + 1;
        }
        if(arrData[i].HasDifficultWalking == "Yes")
        {
            difficultWalkCount = difficultWalkCount + 1;
        }
        if(arrData[i].HasDifficultWalking == "No")
        {
            noDifficultWalkCount = noDifficultWalkCount + 1;
        }
        if(arrData[i].isDiabetic == "Yes")
        {
            diabeticCount = diabeticCount + 1;
        }
        if(arrData[i].isDiabetic == "No")
        {
            noDiabeticCount = noDiabeticCount + 1;
        }
        if(arrData[i].Asthma == "Yes")
        {
            asthmaCount = asthmaCount + 1;
        }
        if(arrData[i].Asthma == "No")
        {
            noAsthmaCount = noAsthmaCount + 1;
        }
        if(arrData[i].HasKidneyDisease == "Yes")
        {
            kidneyDiseaseCount = kidneyDiseaseCount + 1;
        }
        if(arrData[i].HasKidneyDisease == "No")
        {
            noKidneyDiseaseCount = noKidneyDiseaseCount + 1;
        }
        if(arrData[i].HasSkinCancer == "Yes")
        {
            skinCancerCount = skinCancerCount + 1;
        }
        if(arrData[i].HasSkinCancer == "No")
        {
            noSkinCancerCount = noSkinCancerCount + 1;
        }
    }
    //["Stroke", "DiffWalking","Diabetic","Asthma", "KidneyDisease", "SkinCancer"];
    //var objDisease = AllDiseases(strokeCount, "Heart", ((strokeCount/totalCount)* 100).toFixed(2)); 
    //objDiseaseArr.push(objDisease); 
    if(isAllDiseases)
    {              
        var objDisease1 = new AllDiseases(strokeCount, "Stroke", ((strokeCount/totalCount)* 100).toFixed(2)); 
        objDiseaseArr.push(objDisease1);    
        var objDisease2 = new AllDiseases(difficultWalkCount, "DiffWalking", ((difficultWalkCount/totalCount)* 100).toFixed(2)); 
        objDiseaseArr.push(objDisease2);     
        var objDisease3 = new AllDiseases(diabeticCount, "Diabetic", ((diabeticCount/totalCount)* 100).toFixed(2)); 
        objDiseaseArr.push(objDisease3);
        var objDisease4 = new AllDiseases(asthmaCount, "Asthma", ((asthmaCount/totalCount)* 100).toFixed(2)); 
        objDiseaseArr.push(objDisease4);
        var objDisease5 = new AllDiseases(kidneyDiseaseCount, "KidneyDisease", ((kidneyDiseaseCount/totalCount)* 100).toFixed(2)); 
        objDiseaseArr.push(objDisease5); 
        var objDisease6 = new AllDiseases(skinCancerCount, "SkinCancer", ((skinCancerCount/totalCount)* 100).toFixed(2)); 
        objDiseaseArr.push(objDisease6); 
    }
    else{
        //console.log("getOtherDiseaseCount  " + diseaseName);
        switch(diseaseName)
        {//constructor(diseaseCount, diseaseName, percentage) {
            //((ageGrp0Count/totalCount)* 100).toFixed(2)
            case "Stroke":
                objDisease = new AllDiseases(strokeCount, diseaseName, ((strokeCount/totalCount)* 100).toFixed(2)); 
                objDiseaseArr.push(objDisease);
                objDisease1 = new AllDiseases(noStrokeCount, "No Stroke", ((noStrokeCount/totalCount)* 100).toFixed(2)); 
                objDiseaseArr.push(objDisease1);
                //console.log(objDiseaseArr);
                break;
            case "DiffWalking":
                objDisease = new AllDiseases(difficultWalkCount, diseaseName, ((difficultWalkCount/totalCount)* 100).toFixed(2)); 
                objDiseaseArr.push(objDisease);
                objDisease1 = new AllDiseases(noDifficultWalkCount, "No Difficult Walk", ((noDifficultWalkCount/totalCount)* 100).toFixed(2)); 
                objDiseaseArr.push(objDisease1); 
                break;
            case "Diabetic":
                objDisease = new AllDiseases(diabeticCount, diseaseName, ((diabeticCount/totalCount)* 100).toFixed(2)); 
                objDiseaseArr.push(objDisease);
                objDisease1 = new AllDiseases(noDiabeticCount, "No Diabetes", ((noDiabeticCount/totalCount)* 100).toFixed(2)); 
                objDiseaseArr.push(objDisease1);   
                break;
            case "Asthma":
                objDisease = new AllDiseases(asthmaCount, diseaseName, ((asthmaCount/totalCount)* 100).toFixed(2)); 
                objDiseaseArr.push(objDisease);
                objDisease1 = new AllDiseases(noAsthmaCount, "No Asthma", ((noAsthmaCount/totalCount)* 100).toFixed(2)); 
                objDiseaseArr.push(objDisease1);  
                break;
            case "KidneyDisease":
                objDisease = new AllDiseases(kidneyDiseaseCount, diseaseName, ((kidneyDiseaseCount/totalCount)* 100).toFixed(2)); 
                objDiseaseArr.push(objDisease);
                objDisease1 = new AllDiseases(noKidneyDiseaseCount, "No Kidney Disease", ((noKidneyDiseaseCount/totalCount)* 100).toFixed(2)); 
                objDiseaseArr.push(objDisease1);   
                break;
            case "SkinCancer":
                objDisease = new AllDiseases(skinCancerCount, diseaseName, ((skinCancerCount/totalCount)* 100).toFixed(2)); 
                objDiseaseArr.push(objDisease);
                objDisease1 = new AllDiseases(noSkinCancerCount, "No Skin Cancer", ((noSkinCancerCount/totalCount)* 100).toFixed(2)); 
                objDiseaseArr.push(objDisease1);    
                break;
            default:
                break;
        }
    }
   
    return objDiseaseArr;

}

getHeartDiseaseData = function(dataset)
{
    arrData = [];
    //console.log("dataset - "+dataset);
    for(var i=0; i< dataset.length; i++)
    {       
     if(dataset[i].HeartDisease == 'Yes')
     {
         var objHeartDiseaseIndicator = new HeartDiseaseIndicator(dataset[i].HeartDisease,dataset[i].BMI,dataset[i].Smoking,
             dataset[i].AlcoholDrinking,dataset[i].Stroke,dataset[i].PhysicalHealth, dataset[i].MentalHealth,dataset[i].DiffWalking,
             dataset[i].Sex,dataset[i].AgeCategory,dataset[i].Race,dataset[i].Diabetic,dataset[i].PhysicalActivity,
             dataset[i].GenHealth,dataset[i].SleepTime,dataset[i].Asthma,dataset[i].KidneyDisease,dataset[i].SkinCancer);
         arrData.push(objHeartDiseaseIndicator);
     }
    }
    return arrData;
}

getDataForParallelCoordinates = function(dataset){
    arrHeartIndicatorData = getHeartDiseaseData(dataset);
   // console.log(arrHeartIndicatorData);
    arrParallelCo = [];
   // console.log("getDataForParallelCoordinates");
    for(var i=0; i < arrHeartIndicatorData.length; i++)
    {        
        //constructor(AgeGrp, BMI, SleepTime,Race,Gender){ 
        var obj = new ParallelCoordinatesIndicators(arrHeartIndicatorData[i].AgeGrp, arrHeartIndicatorData[i].BMI, arrHeartIndicatorData[i].SleepTime,arrHeartIndicatorData[i].Race,arrHeartIndicatorData[i].Gender );
        arrParallelCo.push(obj);
        //arrParallelCo[i];
    }
   // console.log(arrParallelCo);
    return arrParallelCo;
}
getDataForParallelCoordinatesNumeric = function(dataset){
    arrHeartIndicatorData = getHeartDiseaseData(dataset);
   // console.log(arrHeartIndicatorData);
    arrParallelCo = [];
   // console.log("getDataForParallelCoordinates");
   // ageDic = {1:"18-24",2:"25-29",3:"30-34",4:"35-39",5:"40-44",6:"45-49",7:"50-54",8:"55-59",9:"60-64",10:"65-69",11:"70-74",12:"75-79",13:"80-older"};
   // raceArr = {1:"White",2:"Black",3:"Asian",4:"Hispanic",5:"American Indian/Alaskan Native",6:"Other"};
   // genderArr = {0:"Male",1:"Female"};
    AgeGrpNumeric = 0;
    RaceNumeric = 0;
    GenderNumeric = 0;
    for(var i=0; i < arrHeartIndicatorData.length; i++)
    {        
        switch(arrHeartIndicatorData[i].AgeGrp)
        {
            case "18-24":
                AgeGrpNumeric = "1";
            break;
            case "25-29":
                AgeGrpNumeric ="2";
            break;
            case "30-34":
                AgeGrpNumeric = "3";
            break;
            case "35-39":
                AgeGrpNumeric = "4";
            break;
            case "40-44":
                AgeGrpNumeric = "5";
            break;
            case "45-49":
                AgeGrpNumeric = "6";
            break;
            case "50-54":
                AgeGrpNumeric = "7";
            break;
            case "55-59":
                AgeGrpNumeric = "8";
            break;
            case "60-64":
                AgeGrpNumeric = "9";
            break;
            case "65-69":
                AgeGrpNumeric = "10";
            break;
            case "70-74":
                AgeGrpNumeric = "11";
            break;
            case "75-79":
                AgeGrpNumeric = "12";
            break;
            case "80 or older":
                AgeGrpNumeric = "13";
            break;
            default:
                break;
        }
        switch(arrHeartIndicatorData[i].Race)
        {
            case "White":
                RaceNumeric = 1;
            break;
            case "Black":
                RaceNumeric = 2;
            break;
            case "Asian":
                RaceNumeric = 3;
            break;
            case "Hispanic":
                RaceNumeric = 4;
            break;
            case "American Indian/Alaskan Native":
                RaceNumeric = 5;
            break;
            case "Other":
                RaceNumeric = 6;
            break;
            default:
                break;

        }
        switch(arrHeartIndicatorData[i].Gender)
        {
            case "Male":
                GenderNumeric = 0;
            break;
            case "Female":
                GenderNumeric = 1;
            break;
            default:
                break;
        }
        //constructor(AgeGrp,AgeGrpNumeric, BMI, SleepTime,Race, RaceNumeric,Gender,GenderNumeric){
        //constructor(AgeGrp, BMI, SleepTime,Race,Gender){ 
        var obj = new ParallelCoordinatesIndicatorsNumeric(arrHeartIndicatorData[i].AgeGrp,AgeGrpNumeric,
            arrHeartIndicatorData[i].BMI,
             arrHeartIndicatorData[i].SleepTime,arrHeartIndicatorData[i].Race, RaceNumeric,arrHeartIndicatorData[i].Gender, GenderNumeric);
        arrParallelCo.push(obj);
        //arrParallelCo[i];
    }

  var arrParallelCoSubArr =  getRandomSubarray(arrParallelCo, 1000)

   // console.log(arrParallelCo);
    return arrParallelCoSubArr;
}

function getRandomSubarray(arr, size) {
    var shuffled = arr.slice(0), i = arr.length, temp, index;
    while (i--) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(0, size);
}

function getDataForGroupedBarChart(dataset)
{
    //hearttDiseaseData = getHeartDiseaseData(data);
    GroupInfo = [];
    data = getHeartDiseaseData(dataset);
    //console.log(data);
    var objAgeGrpDis1 = new AgeGrpDiseaseCount("18-24",0,0,0,0,0);
    var objAgeGrpDis2 = new AgeGrpDiseaseCount("25-29",0,0,0,0,0);
    var objAgeGrpDis3 = new AgeGrpDiseaseCount("30-34",0,0,0,0,0);
    var objAgeGrpDis4 = new AgeGrpDiseaseCount("35-39",0,0,0,0,0);
    var objAgeGrpDis5 = new AgeGrpDiseaseCount("40-44",0,0,0,0,0);
    var objAgeGrpDis6 = new AgeGrpDiseaseCount("45-49",0,0,0,0,0);
    var objAgeGrpDis7 = new AgeGrpDiseaseCount("50-54",0,0,0,0,0);
    var objAgeGrpDis8 = new AgeGrpDiseaseCount("55-59",0,0,0,0,0);
    var objAgeGrpDis9 = new AgeGrpDiseaseCount("60-64",0,0,0,0,0);
    var objAgeGrpDis10 = new AgeGrpDiseaseCount("65-69",0,0,0,0,0);
    var objAgeGrpDis11 = new AgeGrpDiseaseCount("70-74",0,0,0,0,0);
    var objAgeGrpDis12 = new AgeGrpDiseaseCount("75-79",0,0,0,0,0);
    var objAgeGrpDis13 = new AgeGrpDiseaseCount(">= 80",0,0,0,0,0);
    
    for(i=0;i<data.length;i++)
    {
        //console.log("in GroupedBarChart"+data[i].AgeCategory);
        
        //console.log(data[0]);
        switch(data[i].AgeGrp)
        {
            case "18-24":
             //   if(data[i].HeartDisease == 'Yes')
             //   {
             //       objAgeGrpDis1.HeartDisCount = objAgeGrpDis1.HeartDisCount + 1;
             //   }
                if(data[i].isDiabetic == 'Yes')
                {
                    objAgeGrpDis1.DiabeticCount = objAgeGrpDis1.DiabeticCount + 1;
                }
                if(data[i].Asthma == 'Yes')
                {
                    objAgeGrpDis1.AsthmaCount = objAgeGrpDis1.AsthmaCount + 1;
                }
                if(data[i].HasKidneyDisease == 'Yes')
                {
                    objAgeGrpDis1.KidneyDisCount = objAgeGrpDis1.KidneyDisCount + 1;
                }
                if(data[i].HasSkinCancer == 'Yes')
                {
                    objAgeGrpDis1.SkinCancerCount = objAgeGrpDis1.SkinCancerCount + 1;
                }
                
            break;
            case "25-29":
             //   if(data[i].HeartDisease == 'Yes')
             //   {
             //       objAgeGrpDis2.HeartDisCount = objAgeGrpDis2.HeartDisCount + 1;
             //   }
                if(data[i].isDiabetic == 'Yes')
                {
                    objAgeGrpDis2.DiabeticCount = objAgeGrpDis2.DiabeticCount + 1;
                }
                if(data[i].Asthma == 'Yes')
                {
                    objAgeGrpDis2.AsthmaCount = objAgeGrpDis2.AsthmaCount + 1;
                }
                if(data[i].HasKidneyDisease == 'Yes')
                {
                    objAgeGrpDis2.KidneyDisCount = objAgeGrpDis2.KidneyDisCount + 1;
                }
                if(data[i].HasSkinCancer == 'Yes')
                {
                    objAgeGrpDis2.SkinCancerCount = objAgeGrpDis2.SkinCancerCount + 1;
                }
            break;
            case "30-34":
              //  if(data[i].HeartDisease == 'Yes')
              //  {
              //      objAgeGrpDis3.HeartDisCount = objAgeGrpDis3.HeartDisCount + 1;
              //  }
                if(data[i].isDiabetic == 'Yes')
                {
                    objAgeGrpDis3.DiabeticCount = objAgeGrpDis3.DiabeticCount + 1;
                }
                if(data[i].Asthma == 'Yes')
                {
                    objAgeGrpDis3.AsthmaCount = objAgeGrpDis3.AsthmaCount + 1;
                }
                if(data[i].HasKidneyDisease == 'Yes')
                {
                    objAgeGrpDis3.KidneyDisCount = objAgeGrpDis3.KidneyDisCount + 1;
                }
                if(data[i].HasSkinCancer == 'Yes')
                {
                    objAgeGrpDis3.SkinCancerCount = objAgeGrpDis3.SkinCancerCount + 1;
                }
            break;
            case "35-39":
              //  if(data[i].HeartDisease == 'Yes')
              //  {
              //      objAgeGrpDis4.HeartDisCount = objAgeGrpDis4.HeartDisCount + 1;
              //  }
                if(data[i].isDiabetic == 'Yes')
                {
                    objAgeGrpDis4.DiabeticCount = objAgeGrpDis4.DiabeticCount + 1;
                }
                if(data[i].Asthma == 'Yes')
                {
                    objAgeGrpDis4.AsthmaCount = objAgeGrpDis4.AsthmaCount + 1;
                }
                if(data[i].HasKidneyDisease == 'Yes')
                {
                    objAgeGrpDis4.KidneyDisCount = objAgeGrpDis4.KidneyDisCount + 1;
                }
                if(data[i].HasSkinCancer == 'Yes')
                {
                    objAgeGrpDis4.SkinCancerCount = objAgeGrpDis4.SkinCancerCount + 1;
                }
            break;
            case "40-44":
              //  if(data[i].HeartDisease == 'Yes')
              //  {
              //      objAgeGrpDis5.HeartDisCount = objAgeGrpDis5.HeartDisCount + 1;
              //  }
                if(data[i].isDiabetic == 'Yes')
                {
                    objAgeGrpDis5.DiabeticCount = objAgeGrpDis5.DiabeticCount + 1;
                }
                if(data[i].Asthma == 'Yes')
                {
                    objAgeGrpDis5.AsthmaCount = objAgeGrpDis5.AsthmaCount + 1;
                }
                if(data[i].HasKidneyDisease == 'Yes')
                {
                    objAgeGrpDis5.KidneyDisCount = objAgeGrpDis5.KidneyDisCount + 1;
                }
                if(data[i].HasSkinCancer == 'Yes')
                {
                    objAgeGrpDis5.SkinCancerCount = objAgeGrpDis5.SkinCancerCount + 1;
                }
            break;
            case "45-49":
             //   if(data[i].HeartDisease == 'Yes')
             //   {
             //       objAgeGrpDis6.HeartDisCount = objAgeGrpDis6.HeartDisCount + 1;
             //   }
                if(data[i].isDiabetic == 'Yes')
                {
                    objAgeGrpDis6.DiabeticCount = objAgeGrpDis6.DiabeticCount + 1;
                }
                if(data[i].Asthma == 'Yes')
                {
                    objAgeGrpDis6.AsthmaCount = objAgeGrpDis6.AsthmaCount + 1;
                }
                if(data[i].HasKidneyDisease == 'Yes')
                {
                    objAgeGrpDis6.KidneyDisCount = objAgeGrpDis6.KidneyDisCount + 1;
                }
                if(data[i].HasSkinCancer == 'Yes')
                {
                    objAgeGrpDis6.SkinCancerCount = objAgeGrpDis6.SkinCancerCount + 1;
                }
            break;
            case "50-54":
              //  if(data[i].HeartDisease == 'Yes')
              //  {
              //      objAgeGrpDis7.HeartDisCount = objAgeGrpDis7.HeartDisCount + 1;
              //  }
                if(data[i].isDiabetic == 'Yes')
                {
                    objAgeGrpDis7.DiabeticCount = objAgeGrpDis7.DiabeticCount + 1;
                }
                if(data[i].Asthma == 'Yes')
                {
                    objAgeGrpDis7.AsthmaCount = objAgeGrpDis7.AsthmaCount + 1;
                }
                if(data[i].HasKidneyDisease == 'Yes')
                {
                    objAgeGrpDis7.KidneyDisCount = objAgeGrpDis7.KidneyDisCount + 1;
                }
                if(data[i].HasSkinCancer == 'Yes')
                {
                    objAgeGrpDis7.SkinCancerCount = objAgeGrpDis7.SkinCancerCount + 1;
                }
            break;
            case "55-59":
              //  if(data[i].HeartDisease == 'Yes')
              //  {
              //      objAgeGrpDis8.HeartDisCount = objAgeGrpDis8.HeartDisCount + 1;
              //  }
                if(data[i].isDiabetic == 'Yes')
                {
                    objAgeGrpDis8.DiabeticCount = objAgeGrpDis8.DiabeticCount + 1;
                }
                if(data[i].Asthma == 'Yes')
                {
                    objAgeGrpDis8.AsthmaCount = objAgeGrpDis8.AsthmaCount + 1;
                }
                if(data[i].HasKidneyDisease == 'Yes')
                {
                    objAgeGrpDis8.KidneyDisCount = objAgeGrpDis8.KidneyDisCount + 1;
                }
                if(data[i].HasSkinCancer == 'Yes')
                {
                    objAgeGrpDis8.SkinCancerCount = objAgeGrpDis8.SkinCancerCount + 1;
                }
            break;
            case "60-64":
             //   if(data[i].HeartDisease == 'Yes')
             //   {
             //       objAgeGrpDis9.HeartDisCount = objAgeGrpDis9.HeartDisCount + 1;
             //   }
                if(data[i].isDiabetic == 'Yes')
                {
                    objAgeGrpDis9.DiabeticCount = objAgeGrpDis9.DiabeticCount + 1;
                }
                if(data[i].Asthma == 'Yes')
                {
                    objAgeGrpDis9.AsthmaCount = objAgeGrpDis9.AsthmaCount + 1;
                }
                if(data[i].HasKidneyDisease == 'Yes')
                {
                    objAgeGrpDis9.KidneyDisCount = objAgeGrpDis9.KidneyDisCount + 1;
                }
                if(data[i].HasSkinCancer == 'Yes')
                {
                    objAgeGrpDis9.SkinCancerCount = objAgeGrpDis9.SkinCancerCount + 1;
                }
            break;
            case "65-69":
             //   if(data[i].HeartDisease == 'Yes')
             //   {
             //       objAgeGrpDis10.HeartDisCount = objAgeGrpDis10.HeartDisCount + 1;
             //   }
                if(data[i].isDiabetic == 'Yes')
                {
                    objAgeGrpDis10.DiabeticCount = objAgeGrpDis10.DiabeticCount + 1;
                }
                if(data[i].Asthma == 'Yes')
                {
                    objAgeGrpDis10.AsthmaCount = objAgeGrpDis10.AsthmaCount + 1;
                }
                if(data[i].HasKidneyDisease == 'Yes')
                {
                    objAgeGrpDis10.KidneyDisCount = objAgeGrpDis10.KidneyDisCount + 1;
                }
                if(data[i].HasSkinCancer == 'Yes')
                {
                    objAgeGrpDis10.SkinCancerCount = objAgeGrpDis10.SkinCancerCount + 1;
                }
            break;
            case "70-74":
             //   if(data[i].HeartDisease == 'Yes')
             //   {
             //       objAgeGrpDis11.HeartDisCount = objAgeGrpDis11.HeartDisCount + 1;
             //   }
                if(data[i].isDiabetic == 'Yes')
                {
                    objAgeGrpDis11.DiabeticCount = objAgeGrpDis11.DiabeticCount + 1;
                }
                if(data[i].Asthma == 'Yes')
                {
                    objAgeGrpDis11.AsthmaCount = objAgeGrpDis11.AsthmaCount + 1;
                }
                if(data[i].HasKidneyDisease == 'Yes')
                {
                    objAgeGrpDis11.KidneyDisCount = objAgeGrpDis11.KidneyDisCount + 1;
                }
                if(data[i].HasSkinCancer == 'Yes')
                {
                    objAgeGrpDis11.SkinCancerCount = objAgeGrpDis11.SkinCancerCount + 1;
                }
            break;
            case "75-79":
             //   if(data[i].HeartDisease == 'Yes')
             //   {
             //       objAgeGrpDis12.HeartDisCount = objAgeGrpDis12.HeartDisCount + 1;
             //   }
                if(data[i].isDiabetic == 'Yes')
                {
                    objAgeGrpDis12.DiabeticCount = objAgeGrpDis12.DiabeticCount + 1;
                }
                if(data[i].Asthma == 'Yes')
                {
                    objAgeGrpDis12.AsthmaCount = objAgeGrpDis12.AsthmaCount + 1;
                }
                if(data[i].HasKidneyDisease == 'Yes')
                {
                    objAgeGrpDis12.KidneyDisCount = objAgeGrpDis12.KidneyDisCount + 1;
                }
                if(data[i].HasSkinCancer == 'Yes')
                {
                    objAgeGrpDis12.SkinCancerCount = objAgeGrpDis12.SkinCancerCount + 1;
                }
            break;
            case "80 or older":
             //   if(data[i].HeartDisease == 'Yes')
             //   {
             //       objAgeGrpDis13.HeartDisCount = objAgeGrpDis13.HeartDisCount + 1;
             //   }
                if(data[i].isDiabetic == 'Yes')
                {
                    objAgeGrpDis13.DiabeticCount = objAgeGrpDis13.DiabeticCount + 1;
                }
                if(data[i].Asthma == 'Yes')
                {
                    objAgeGrpDis13.AsthmaCount = objAgeGrpDis13.AsthmaCount + 1;
                }
                if(data[i].HasKidneyDisease == 'Yes')
                {
                    objAgeGrpDis13.KidneyDisCount = objAgeGrpDis13.KidneyDisCount + 1;
                   // console.log(objAgeGrpDis13.KidneyDisCount);
                }
                if(data[i].HasSkinCancer == 'Yes')
                {
                    objAgeGrpDis13.SkinCancerCount = objAgeGrpDis13.SkinCancerCount + 1;
                }
            break;
            default:
                break;
            
        }
    

    }
    GroupInfo.push(objAgeGrpDis1);
    GroupInfo.push(objAgeGrpDis2);
    GroupInfo.push(objAgeGrpDis3);
    GroupInfo.push(objAgeGrpDis4);
    GroupInfo.push(objAgeGrpDis5);
    GroupInfo.push(objAgeGrpDis6);
    GroupInfo.push(objAgeGrpDis7);
    GroupInfo.push(objAgeGrpDis8);
    GroupInfo.push(objAgeGrpDis9);
    GroupInfo.push(objAgeGrpDis10);
    GroupInfo.push(objAgeGrpDis11);
    GroupInfo.push(objAgeGrpDis12);
    GroupInfo.push(objAgeGrpDis13);

    return GroupInfo;
}

function getDataForDynamicGroupedBarChart(dataset)
{
    //hearttDiseaseData = getHeartDiseaseData(data);
    GroupInfo = [];
    data = getHeartDiseaseData(dataset);
    //console.log(data);
    var objAgeGrpDis1 = new AgeGrpDiseaseCountDynamic("18-24",0,0,0,0,0,0,0);
    var objAgeGrpDis2 = new AgeGrpDiseaseCountDynamic("25-29",0,0,0,0,0,0,0);
    var objAgeGrpDis3 = new AgeGrpDiseaseCountDynamic("30-34",0,0,0,0,0,0,0);
    var objAgeGrpDis4 = new AgeGrpDiseaseCountDynamic("35-39",0,0,0,0,0,0,0);
    var objAgeGrpDis5 = new AgeGrpDiseaseCountDynamic("40-44",0,0,0,0,0,0,0);
    var objAgeGrpDis6 = new AgeGrpDiseaseCountDynamic("45-49",0,0,0,0,0,0,0);
    var objAgeGrpDis7 = new AgeGrpDiseaseCountDynamic("50-54",0,0,0,0,0,0,0);
    var objAgeGrpDis8 = new AgeGrpDiseaseCountDynamic("55-59",0,0,0,0,0,0,0);
    var objAgeGrpDis9 = new AgeGrpDiseaseCountDynamic("60-64",0,0,0,0,0,0,0);
    var objAgeGrpDis10 = new AgeGrpDiseaseCountDynamic("65-69",0,0,0,0,0,0,0);
    var objAgeGrpDis11 = new AgeGrpDiseaseCountDynamic("70-74",0,0,0,0,0,0,0);
    var objAgeGrpDis12 = new AgeGrpDiseaseCountDynamic("75-79",0,0,0,0,0,0,0);
    var objAgeGrpDis13 = new AgeGrpDiseaseCountDynamic(">= 80",0,0,0,0,0,0,0);
    
    for(i=0;i<data.length;i++)
    {
        //console.log("in GroupedBarChart"+data[i].AgeCategory);
        
        //console.log(data[0]);
        switch(data[i].AgeGrp)
        {
            case "18-24":
             //   if(data[i].HeartDisease == 'Yes')
             //   {
             //       objAgeGrpDis1.HeartDisCount = objAgeGrpDis1.HeartDisCount + 1;
             //   }
                if(data[i].isDiabetic == 'Yes')
                {
                    objAgeGrpDis1.DiabeticCount = objAgeGrpDis1.DiabeticCount + 1;
                }
                if(data[i].Asthma == 'Yes')
                {
                    objAgeGrpDis1.AsthmaCount = objAgeGrpDis1.AsthmaCount + 1;
                }
                if(data[i].HasKidneyDisease == 'Yes')
                {
                    objAgeGrpDis1.KidneyDisCount = objAgeGrpDis1.KidneyDisCount + 1;
                }
                if(data[i].HasSkinCancer == 'Yes')
                {
                    objAgeGrpDis1.SkinCancerCount = objAgeGrpDis1.SkinCancerCount + 1;
                }
                if(data[i].HasStroke == 'Yes')
                {
                    objAgeGrpDis1.StrokeCount = objAgeGrpDis1.StrokeCount + 1;
                }
                if(data[i].HasDifficultWalking == 'Yes')
                {
                    objAgeGrpDis1.DiffWalkingCount = objAgeGrpDis1.DiffWalkingCount + 1;
                }
                
            break;
            case "25-29":
             //   if(data[i].HeartDisease == 'Yes')
             //   {
             //       objAgeGrpDis2.HeartDisCount = objAgeGrpDis2.HeartDisCount + 1;
             //   }
                if(data[i].isDiabetic == 'Yes')
                {
                    objAgeGrpDis2.DiabeticCount = objAgeGrpDis2.DiabeticCount + 1;
                }
                if(data[i].Asthma == 'Yes')
                {
                    objAgeGrpDis2.AsthmaCount = objAgeGrpDis2.AsthmaCount + 1;
                }
                if(data[i].HasKidneyDisease == 'Yes')
                {
                    objAgeGrpDis2.KidneyDisCount = objAgeGrpDis2.KidneyDisCount + 1;
                }
                if(data[i].HasSkinCancer == 'Yes')
                {
                    objAgeGrpDis2.SkinCancerCount = objAgeGrpDis2.SkinCancerCount + 1;
                }
                if(data[i].HasStroke == 'Yes')
                {
                    objAgeGrpDis2.StrokeCount = objAgeGrpDis1.StrokeCount + 1;
                }
                if(data[i].HasDifficultWalking == 'Yes')
                {
                    objAgeGrpDis2.DiffWalkingCount = objAgeGrpDis1.DiffWalkingCount + 1;
                }
            break;
            case "30-34":
              //  if(data[i].HeartDisease == 'Yes')
              //  {
              //      objAgeGrpDis3.HeartDisCount = objAgeGrpDis3.HeartDisCount + 1;
              //  }
                if(data[i].isDiabetic == 'Yes')
                {
                    objAgeGrpDis3.DiabeticCount = objAgeGrpDis3.DiabeticCount + 1;
                }
                if(data[i].Asthma == 'Yes')
                {
                    objAgeGrpDis3.AsthmaCount = objAgeGrpDis3.AsthmaCount + 1;
                }
                if(data[i].HasKidneyDisease == 'Yes')
                {
                    objAgeGrpDis3.KidneyDisCount = objAgeGrpDis3.KidneyDisCount + 1;
                }
                if(data[i].HasSkinCancer == 'Yes')
                {
                    objAgeGrpDis3.SkinCancerCount = objAgeGrpDis3.SkinCancerCount + 1;
                }
                if(data[i].HasStroke == 'Yes')
                {
                    objAgeGrpDis3.StrokeCount = objAgeGrpDis1.StrokeCount + 1;
                }
                if(data[i].HasDifficultWalking == 'Yes')
                {
                    objAgeGrpDis3.DiffWalkingCount = objAgeGrpDis1.DiffWalkingCount + 1;
                }
            break;
            case "35-39":
              //  if(data[i].HeartDisease == 'Yes')
              //  {
              //      objAgeGrpDis4.HeartDisCount = objAgeGrpDis4.HeartDisCount + 1;
              //  }
                if(data[i].isDiabetic == 'Yes')
                {
                    objAgeGrpDis4.DiabeticCount = objAgeGrpDis4.DiabeticCount + 1;
                }
                if(data[i].Asthma == 'Yes')
                {
                    objAgeGrpDis4.AsthmaCount = objAgeGrpDis4.AsthmaCount + 1;
                }
                if(data[i].HasKidneyDisease == 'Yes')
                {
                    objAgeGrpDis4.KidneyDisCount = objAgeGrpDis4.KidneyDisCount + 1;
                }
                if(data[i].HasSkinCancer == 'Yes')
                {
                    objAgeGrpDis4.SkinCancerCount = objAgeGrpDis4.SkinCancerCount + 1;
                }
                if(data[i].HasStroke == 'Yes')
                {
                    objAgeGrpDis4.StrokeCount = objAgeGrpDis1.StrokeCount + 1;
                }
                if(data[i].HasDifficultWalking == 'Yes')
                {
                    objAgeGrpDis4.DiffWalkingCount = objAgeGrpDis1.DiffWalkingCount + 1;
                }
            break;
            case "40-44":
              //  if(data[i].HeartDisease == 'Yes')
              //  {
              //      objAgeGrpDis5.HeartDisCount = objAgeGrpDis5.HeartDisCount + 1;
              //  }
                if(data[i].isDiabetic == 'Yes')
                {
                    objAgeGrpDis5.DiabeticCount = objAgeGrpDis5.DiabeticCount + 1;
                }
                if(data[i].Asthma == 'Yes')
                {
                    objAgeGrpDis5.AsthmaCount = objAgeGrpDis5.AsthmaCount + 1;
                }
                if(data[i].HasKidneyDisease == 'Yes')
                {
                    objAgeGrpDis5.KidneyDisCount = objAgeGrpDis5.KidneyDisCount + 1;
                }
                if(data[i].HasSkinCancer == 'Yes')
                {
                    objAgeGrpDis5.SkinCancerCount = objAgeGrpDis5.SkinCancerCount + 1;
                }
                if(data[i].HasStroke == 'Yes')
                {
                    objAgeGrpDis5.StrokeCount = objAgeGrpDis1.StrokeCount + 1;
                }
                if(data[i].HasDifficultWalking == 'Yes')
                {
                    objAgeGrpDis5.DiffWalkingCount = objAgeGrpDis1.DiffWalkingCount + 1;
                }
            break;
            case "45-49":
             //   if(data[i].HeartDisease == 'Yes')
             //   {
             //       objAgeGrpDis6.HeartDisCount = objAgeGrpDis6.HeartDisCount + 1;
             //   }
                if(data[i].isDiabetic == 'Yes')
                {
                    objAgeGrpDis6.DiabeticCount = objAgeGrpDis6.DiabeticCount + 1;
                }
                if(data[i].Asthma == 'Yes')
                {
                    objAgeGrpDis6.AsthmaCount = objAgeGrpDis6.AsthmaCount + 1;
                }
                if(data[i].HasKidneyDisease == 'Yes')
                {
                    objAgeGrpDis6.KidneyDisCount = objAgeGrpDis6.KidneyDisCount + 1;
                }
                if(data[i].HasSkinCancer == 'Yes')
                {
                    objAgeGrpDis6.SkinCancerCount = objAgeGrpDis6.SkinCancerCount + 1;
                }
                if(data[i].HasStroke == 'Yes')
                {
                    objAgeGrpDis6.StrokeCount = objAgeGrpDis1.StrokeCount + 1;
                }
                if(data[i].HasDifficultWalking == 'Yes')
                {
                    objAgeGrpDis6.DiffWalkingCount = objAgeGrpDis1.DiffWalkingCount + 1;
                }
            break;
            case "50-54":
              //  if(data[i].HeartDisease == 'Yes')
              //  {
              //      objAgeGrpDis7.HeartDisCount = objAgeGrpDis7.HeartDisCount + 1;
              //  }
                if(data[i].isDiabetic == 'Yes')
                {
                    objAgeGrpDis7.DiabeticCount = objAgeGrpDis7.DiabeticCount + 1;
                }
                if(data[i].Asthma == 'Yes')
                {
                    objAgeGrpDis7.AsthmaCount = objAgeGrpDis7.AsthmaCount + 1;
                }
                if(data[i].HasKidneyDisease == 'Yes')
                {
                    objAgeGrpDis7.KidneyDisCount = objAgeGrpDis7.KidneyDisCount + 1;
                }
                if(data[i].HasSkinCancer == 'Yes')
                {
                    objAgeGrpDis7.SkinCancerCount = objAgeGrpDis7.SkinCancerCount + 1;
                }
                if(data[i].HasStroke == 'Yes')
                {
                    objAgeGrpDis7.StrokeCount = objAgeGrpDis1.StrokeCount + 1;
                }
                if(data[i].HasDifficultWalking == 'Yes')
                {
                    objAgeGrpDis7.DiffWalkingCount = objAgeGrpDis1.DiffWalkingCount + 1;
                }
            break;
            case "55-59":
              //  if(data[i].HeartDisease == 'Yes')
              //  {
              //      objAgeGrpDis8.HeartDisCount = objAgeGrpDis8.HeartDisCount + 1;
              //  }
                if(data[i].isDiabetic == 'Yes')
                {
                    objAgeGrpDis8.DiabeticCount = objAgeGrpDis8.DiabeticCount + 1;
                }
                if(data[i].Asthma == 'Yes')
                {
                    objAgeGrpDis8.AsthmaCount = objAgeGrpDis8.AsthmaCount + 1;
                }
                if(data[i].HasKidneyDisease == 'Yes')
                {
                    objAgeGrpDis8.KidneyDisCount = objAgeGrpDis8.KidneyDisCount + 1;
                }
                if(data[i].HasSkinCancer == 'Yes')
                {
                    objAgeGrpDis8.SkinCancerCount = objAgeGrpDis8.SkinCancerCount + 1;
                }
                if(data[i].HasStroke == 'Yes')
                {
                    objAgeGrpDis8.StrokeCount = objAgeGrpDis1.StrokeCount + 1;
                }
                if(data[i].HasDifficultWalking == 'Yes')
                {
                    objAgeGrpDis8.DiffWalkingCount = objAgeGrpDis1.DiffWalkingCount + 1;
                }
            break;
            case "60-64":
             //   if(data[i].HeartDisease == 'Yes')
             //   {
             //       objAgeGrpDis9.HeartDisCount = objAgeGrpDis9.HeartDisCount + 1;
             //   }
                if(data[i].isDiabetic == 'Yes')
                {
                    objAgeGrpDis9.DiabeticCount = objAgeGrpDis9.DiabeticCount + 1;
                }
                if(data[i].Asthma == 'Yes')
                {
                    objAgeGrpDis9.AsthmaCount = objAgeGrpDis9.AsthmaCount + 1;
                }
                if(data[i].HasKidneyDisease == 'Yes')
                {
                    objAgeGrpDis9.KidneyDisCount = objAgeGrpDis9.KidneyDisCount + 1;
                }
                if(data[i].HasSkinCancer == 'Yes')
                {
                    objAgeGrpDis9.SkinCancerCount = objAgeGrpDis9.SkinCancerCount + 1;
                }
                if(data[i].HasStroke == 'Yes')
                {
                    objAgeGrpDis9.StrokeCount = objAgeGrpDis1.StrokeCount + 1;
                }
                if(data[i].HasDifficultWalking == 'Yes')
                {
                    objAgeGrpDis9.DiffWalkingCount = objAgeGrpDis1.DiffWalkingCount + 1;
                }
            break;
            case "65-69":
             //   if(data[i].HeartDisease == 'Yes')
             //   {
             //       objAgeGrpDis10.HeartDisCount = objAgeGrpDis10.HeartDisCount + 1;
             //   }
                if(data[i].isDiabetic == 'Yes')
                {
                    objAgeGrpDis10.DiabeticCount = objAgeGrpDis10.DiabeticCount + 1;
                }
                if(data[i].Asthma == 'Yes')
                {
                    objAgeGrpDis10.AsthmaCount = objAgeGrpDis10.AsthmaCount + 1;
                }
                if(data[i].HasKidneyDisease == 'Yes')
                {
                    objAgeGrpDis10.KidneyDisCount = objAgeGrpDis10.KidneyDisCount + 1;
                }
                if(data[i].HasSkinCancer == 'Yes')
                {
                    objAgeGrpDis10.SkinCancerCount = objAgeGrpDis10.SkinCancerCount + 1;
                }
                if(data[i].HasStroke == 'Yes')
                {
                    objAgeGrpDis10.StrokeCount = objAgeGrpDis1.StrokeCount + 1;
                }
                if(data[i].HasDifficultWalking == 'Yes')
                {
                    objAgeGrpDis10.DiffWalkingCount = objAgeGrpDis1.DiffWalkingCount + 1;
                }
            break;
            case "70-74":
             //   if(data[i].HeartDisease == 'Yes')
             //   {
             //       objAgeGrpDis11.HeartDisCount = objAgeGrpDis11.HeartDisCount + 1;
             //   }
                if(data[i].isDiabetic == 'Yes')
                {
                    objAgeGrpDis11.DiabeticCount = objAgeGrpDis11.DiabeticCount + 1;
                }
                if(data[i].Asthma == 'Yes')
                {
                    objAgeGrpDis11.AsthmaCount = objAgeGrpDis11.AsthmaCount + 1;
                }
                if(data[i].HasKidneyDisease == 'Yes')
                {
                    objAgeGrpDis11.KidneyDisCount = objAgeGrpDis11.KidneyDisCount + 1;
                }
                if(data[i].HasSkinCancer == 'Yes')
                {
                    objAgeGrpDis11.SkinCancerCount = objAgeGrpDis11.SkinCancerCount + 1;
                }
                if(data[i].HasStroke == 'Yes')
                {
                    objAgeGrpDis11.StrokeCount = objAgeGrpDis1.StrokeCount + 1;
                }
                if(data[i].HasDifficultWalking == 'Yes')
                {
                    objAgeGrpDis11.DiffWalkingCount = objAgeGrpDis1.DiffWalkingCount + 1;
                }
            break;
            case "75-79":
             //   if(data[i].HeartDisease == 'Yes')
             //   {
             //       objAgeGrpDis12.HeartDisCount = objAgeGrpDis12.HeartDisCount + 1;
             //   }
                if(data[i].isDiabetic == 'Yes')
                {
                    objAgeGrpDis12.DiabeticCount = objAgeGrpDis12.DiabeticCount + 1;
                }
                if(data[i].Asthma == 'Yes')
                {
                    objAgeGrpDis12.AsthmaCount = objAgeGrpDis12.AsthmaCount + 1;
                }
                if(data[i].HasKidneyDisease == 'Yes')
                {
                    objAgeGrpDis12.KidneyDisCount = objAgeGrpDis12.KidneyDisCount + 1;
                }
                if(data[i].HasSkinCancer == 'Yes')
                {
                    objAgeGrpDis12.SkinCancerCount = objAgeGrpDis12.SkinCancerCount + 1;
                }
                if(data[i].HasStroke == 'Yes')
                {
                    objAgeGrpDis12.StrokeCount = objAgeGrpDis1.StrokeCount + 1;
                }
                if(data[i].HasDifficultWalking == 'Yes')
                {
                    objAgeGrpDis12.DiffWalkingCount = objAgeGrpDis1.DiffWalkingCount + 1;
                }
            break;
            case "80 or older":
             //   if(data[i].HeartDisease == 'Yes')
             //   {
             //       objAgeGrpDis13.HeartDisCount = objAgeGrpDis13.HeartDisCount + 1;
             //   }
                if(data[i].isDiabetic == 'Yes')
                {
                    objAgeGrpDis13.DiabeticCount = objAgeGrpDis13.DiabeticCount + 1;
                }
                if(data[i].Asthma == 'Yes')
                {
                    objAgeGrpDis13.AsthmaCount = objAgeGrpDis13.AsthmaCount + 1;
                }
                if(data[i].HasKidneyDisease == 'Yes')
                {
                    objAgeGrpDis13.KidneyDisCount = objAgeGrpDis13.KidneyDisCount + 1;
                   // console.log(objAgeGrpDis13.KidneyDisCount);
                }
                if(data[i].HasSkinCancer == 'Yes')
                {
                    objAgeGrpDis13.SkinCancerCount = objAgeGrpDis13.SkinCancerCount + 1;
                }
                if(data[i].HasStroke == 'Yes')
                {
                    objAgeGrpDis13.StrokeCount = objAgeGrpDis1.StrokeCount + 1;
                }
                if(data[i].HasDifficultWalking == 'Yes')
                {
                    objAgeGrpDis13.DiffWalkingCount = objAgeGrpDis1.DiffWalkingCount + 1;
                }
            break;
            default:
                break;
            
        }
    

    }
    // console.log(objAgeGrpDis1);
    // console.log(objAgeGrpDis2);
    // console.log(objAgeGrpDis3);
    // console.log(objAgeGrpDis4);
    // console.log(objAgeGrpDis5);
    // console.log(objAgeGrpDis6);
    // console.log(objAgeGrpDis7);
    // console.log(objAgeGrpDis8);
    // console.log(objAgeGrpDis9);
    // console.log(objAgeGrpDis10);
    // console.log(objAgeGrpDis11);
    // console.log(objAgeGrpDis12);
    // console.log(objAgeGrpDis13);

    GroupInfo.push(objAgeGrpDis1);
    GroupInfo.push(objAgeGrpDis2);
    GroupInfo.push(objAgeGrpDis3);
    GroupInfo.push(objAgeGrpDis4);
    GroupInfo.push(objAgeGrpDis5);
    GroupInfo.push(objAgeGrpDis6);
    GroupInfo.push(objAgeGrpDis7);
    GroupInfo.push(objAgeGrpDis8);
    GroupInfo.push(objAgeGrpDis9);
    GroupInfo.push(objAgeGrpDis10);
    GroupInfo.push(objAgeGrpDis11);
    GroupInfo.push(objAgeGrpDis12);
    GroupInfo.push(objAgeGrpDis13);

    return GroupInfo;
}

