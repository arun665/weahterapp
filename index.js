
const fs=require('fs');
const requests=require('requests');
const express = require('express')
const app = express();
var bodyParser = require('body-parser');
const path = require('path') 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.set("view engine", "ejs") 
  

app.use(bodyParser.json())
 

function replaceval(tempval,orgval){
var temperature=tempval.replace("{%tempval%}",orgval.main.temp);
temperature=temperature.replace("{%location%}",orgval.name);

temperature=temperature.replace("{%tempmax%}",orgval.main.temp_max);
temperature=temperature.replace("{%tempmin%}",orgval.main.temp_min);

console.log("replaced");

return temperature;


}

app.get('/', (req, res) => {


  var state="Pune";

  var rainy="https://images-eu.ssl-images-amazon.com/images/I/71UnO0vNYHL.png";
  var sunny="https://www.westfield.surrey.sch.uk/_site/data/images/news/116/main-sun%201.png"
  var clear="https://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/256/Status-weather-clear-icon.png";
  var cloudy="https://cdn1.iconfinder.com/data/icons/weather-429/64/weather_icons_color-10-512.png";
 var fog="https://www.pngfind.com/pngs/m/75-753375_free-weather-icon-fog-clipart-hd-png-download.png";

  var countries = [ "Andhra Pradesh",
                  "Arunachal Pradesh",
                  "Assam",
                  "Bihar",
                  "Chhattisgarh",
                  "Goa",
                  "Gujarat",
                  "Haryana",
                  "Himachal Pradesh",
                  "Jammu and Kashmir",
                  "Jharkhand",
                  "Karnataka",
                  "Kerala",
                  "Madhya Pradesh",
                  "Maharashtra",
                  "Manipur",
                  "Meghalaya",
                  "Mizoram",
                  "Nagaland",
                  "Odisha",
                  "Punjab",
                  "Rajasthan",
                  "Sikkim",
                  "Tamil Nadu",
                  "Telangana",
                  "Tripura",
                  "Uttarakhand",
                  "Uttar Pradesh",
                  "West Bengal",
                  "Andaman and Nicobar Islands",
                  "Chandigarh",
                  "Dadra and Nagar Haveli",
                  "Daman and Diu",
                  "Delhi",
                  "Lakshadweep",
                  "Puducherry"];
                  var n = countries.includes(state);
  
                  if(n==false){
                    state="Pune";
                  }
    requests("http://api.openweathermap.org/data/2.5/weather?q="+ state +"&units=metric&appid=3abad4c808ca4a56e5a7649d47b926f3")
    .on("data",function(chunk){
  
      var arrdata=JSON.parse(chunk);
      var arr=[arrdata];
  
      console.log(arr);
  
  
      var status=arr[0].weather[0].main;
      var des=arr[0].weather[0].description;
  var temp_status="";
      if(status=="Clear"){
  temp_status=clear;
      }
      else if(status=="Clouds"){
        temp_status=cloudy;
      }
      else if(status=="Rainy"){
        temp_status=rainy;
      }
      else if(status=="Fog"){
        temp_status=fog;
      }
      else{
        temp_status=sunny;
      }
  
  
  
     res.render("ejs/home2.ejs",{state:state,tempval:arr[0].main.temp , temp_feel:arr[0].main.feels_like,temp_stat:arr[0].weather[0].main,temp_max:arr[0].main.temp_max,temp_min:arr[0].main.temp_min,temp_status:temp_status , des: des});
  
    })
  
    .on("end",function(err){
     if(err)
      console.log(err);
  
  
      res.end();
  
    })
  
  
  console.log("arun sharma ");
 
})

app.post("/", function (req,res,){


  console.log(req.body);
var state=req.body.state;

var rainy="https://images-eu.ssl-images-amazon.com/images/I/71UnO0vNYHL.png";
var sunny="https://www.westfield.surrey.sch.uk/_site/data/images/news/116/main-sun%201.png"
var clear="https://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/256/Status-weather-clear-icon.png";
var cloudy="https://cdn1.iconfinder.com/data/icons/weather-429/64/weather_icons_color-10-512.png";
var fog="https://www.pngfind.com/pngs/m/75-753375_free-weather-icon-fog-clipart-hd-png-download.png";

var countries = [ "Andhra Pradesh",
                "Arunachal Pradesh",
                "Assam",
                "Bihar",
                "Chhattisgarh",
                "Goa",
                "Gujarat",
                "Haryana",
                "Himachal Pradesh",
                "Jammu and Kashmir",
                "Jharkhand",
                "Karnataka",
                "Kerala",
                "Madhya Pradesh",
                "Maharashtra",
                "Manipur",
                "Meghalaya",
                "Mizoram",
                "Nagaland",
                "Odisha",
                "Punjab",
                "Rajasthan",
                "Sikkim",
                "Tamil Nadu",
                "Telangana",
                "Tripura",
                "Uttarakhand",
                "Uttar Pradesh",
                "West Bengal",
                "Andaman and Nicobar Islands",
                "Chandigarh",
                "Dadra and Nagar Haveli",
                "Daman and Diu",
                "Delhi",
                "Lakshadweep",
                "Puducherry"];
                var n = countries.includes(state);

                if(n==false){
                  state="Pune";
                }
  requests("http://api.openweathermap.org/data/2.5/weather?q="+ state +"&units=metric&appid=3abad4c808ca4a56e5a7649d47b926f3")
  .on("data",function(chunk){

    var arrdata=JSON.parse(chunk);
    var arr=[arrdata];

    console.log(arr);


    var status=arr[0].weather[0].main;
    var des=arr[0].weather[0].description;
var temp_status="";
    if(status=="Clear"){
temp_status=clear;
    }
    else if(status=="Clouds"){
      temp_status=cloudy;
    }
    else if(status=="Rainy"){
      temp_status=rainy;
    }
    else if(status=="Fog"){
      temp_status=fog;
    }
    else{
      temp_status=sunny;
    }



   res.render("ejs/home2.ejs",{state:state,tempval:arr[0].main.temp , temp_feel:arr[0].main.feels_like,temp_stat:arr[0].weather[0].main,temp_max:arr[0].main.temp_max,temp_min:arr[0].main.temp_min,temp_status:temp_status , des: des});

  })

  .on("end",function(err){
   if(err)
    console.log(err);


    res.end();

  })

})
var port=8000|| process.env.PORT;
app.listen(port);




//https://www.interviewbit.com/contest/code-drift-bit-manipulation?rcy=1&rce=74c0d93247a1