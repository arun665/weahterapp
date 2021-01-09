
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
  var fog="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAkFBMVEX////m6e0AAADr7vKZm57u8fUxMjNUVVd+f4FdXmDl6OxoaGjp7PDw8/d5eXn5+vsUFBTx8fHi4uKSkpLKysqHh4dGRkavr6/r6+uEhojd4OSipKc8PDynp6cqKioJCQm6urrX19dtb3FQUVIgICHLzdHCwsKVlZW0tLQYGBjT09N7e3tKSkqDhYc2NzicnJwYkfE+AAAHgklEQVR4nO2d2ZajIBCGY2g6iUo6idlXsy/TPf3+bzdmkggqCipG9NR3OT3x8AsURVGUjQYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAaM9guBpZ4/W1t2luetf19260Gg7KbpQqBqvduMln3J1UXWb/0okRR7Em07KbmZX+5Fso79mXq37Zjc3ASVbeg9ap7Aan4+u3l0rfnc35q+xmS9MfpZb3oFuNwfrlZNR3Z1ROP/an2+FpuJ1KveFVDn13VkWrCTG9jMZ0Sm3GIzfZtG8/Y5veG++6M+f8cXZ+utYyfp6ub2/S5jE489r7eY5fpf/wGz1ur44mIRijBxgTYtwmsz3/v3ffpM9dxr7m8ZD7i9uV90JmJ8OTZhthbE8pOjp/Ob/Z8J+vWB+vtUy73ehPOBbm0zkSjjhWJrmdOSJHRetLmE4vltvgT/pR53MnkOeLPP5E302xC0dXqC/ynreRPztzLJb3FInNj8jvCxypg42UQM/qUbvqhv92trGkvAcIfYTN66QogZHGJvB6z7+hf2/P0+n7r9GYhZ7iFCPwnELg6z2HvLT9kaTWdwfPQ3utQpaNdkTEfnYZzk3TnB8ns6g1+W1EVsGF9PwLYxM3OEMs9QLDPnNrYhL0MIi2t4CR+aUVkRj8zX6OMuq7g0yrWImh+eRNp3BzEd6Gujko2SFZO/AJWQSe90etwGHg4R2+ubfxNtyPlGN6CxMGHwNGVam5mQYae4ntDZtM+PrWuUboC2QG/MWLQoWsHVkmNhbNee7k0sw5Qp/YKGBTt+KWS8JOQktgD20UHamdzDY0AtmxD1blwPVZgeIFDYXjhFb+KchIZM3ZUpFCxkzvZRpLghI7KgV6T2d94x8lAhnX+WBIDTfEGoSWChsTkMgOVCVeONOFN7n5ZJvUARmrFui9QNbwKQhQMSvFh+x4Qzd/psj1eips80DbpMBDpRv0v/ITCp2ew1rRMhF6+lHpOKUDzk0x4PD/2GFvXoRA7+mMY3HNK5D6a8tUOx9yd7uVeDLcpzPGIW8cle4PLuma65m8Y1ECPZipmNPY+E/qpR5wRQp8TfQ7+Vxw6s90Uy/cxczBJ+yqmMt5o9Mw5SAtHJMqzBVDpU63WbakEIgJM+aZib4TeMgWQyoQTI3Nbw6F/hGJ0g2CEhBdFHs5FPo+dFs7hQamJww5HJv16xlnzQyNB6KhqU52hZ8aKzRsFQuGr9DRUCGm0f5sRxmDFbNZn2mo0Kab8+8M8px1k6WtoUKD0NPwtMM0mreU3ml7A4ytcVPpm3AOsnc6KjTmtH0p9F24B/V6KsR0mErrG8SkfOrn09xhnFPZfNTYY1DFUU9F2DRiI3eKwUmbeHDdL3S0pZ419Zsoddp246przS5bg+gp0MD+ki0T4eecjFmLI8FIIvelLBANdoo3iZEp2LkYvKQsrUAXv7nCpPDwQf1sruvIZGEcN9EOKpR71pbPWyoXGq5x08zB74x5LyVAt8HnRIHBTIRF3rSJN0K9mnaSwEAmQk9B2sT7wLtXuxNPodiN0tisgIGhIH8X3EoQyCZxdnRfH0LQBTFhyWddGeuedJ2IZm+A+t7r+3RzdhaHA9uFIqyfm1ajmG6Ce97Gr6mGhU6WiNnmx/jVWThpNFCpwk1DfOFPlpZGnUjn4bWhTGCzWbYsBuRvGA4N2TR0CTQ6aUP+jmHZsJLanAqdRin2z/86nIsPWdHJ0mA/FbJb09UC+/ms97Pu6a+1b+Wk42y1WvFpCt3zcOZL4JOJ0ctrs2nU+3UjmmhkBxWA6EUePyRcL4l0OWRibbWSSOOln8xuqU4Sacw7cImmPhKZc4tgimJtJDJnT+GbqzWRmHB+WJNenPOnYX0kMht8TrpJHSQSmlDBO5epvkTmWIYfSqy8RCYnKiadveoSJfLaqi2RsTPxEf1KS0T0uCWhllSFJSKmpE+8QG9LjPLvicvZ9CO5PO/p6qedl9mkjH0/lsvVT1cJIpZrQTe4kqAOW9J9i5i75Rkkvl0ge7crIbdUXRj8481zkYnPJHXhQJnAtyf2mUx5hYQuVBcFf3egn70unnT/8EudwvcmumNmKTwkCIxmemXnrcY0cA9YUKYuvhZJOtJcEc6NbTJ52sK00pP19zMv45/3HmUEChqIBHqg3Lz5KAOzB6HiUopflfO8A0UjxFeAKyiQrW0yrqPAQNU/4VWgygm0USAZQVhjqHICkRm4LeHWTiA+Bu4rCa83V04gCRYiFl7Cr5rAcM09oS9TNYHE7dVaIDJ3zToLRChch1boylRKICKTdUigWyOBNjYWh5C+Oi30iGyjtaCXdXHVbETmC86XMMS1aCog8FGT/cz70MdGorR+/g1vkWCMiXGMrasvvgk7nHxozNmZ/em2IobFZy00MYPkivi6I67LNhU/RGMciVpQ0YLc1UFGX6OR/iM9mtCTLXRVdkMz0pGvARVjgbWmNUlTdybNpw20YOemrTS3K7vJ8oy7l0zfznO/Fd59Uk/vsF52unX6/iEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQJv8AoP7EuNnAFnQAAAAASUVORK5CYII=";
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
  
  
  
     res.render("home2.ejs",{state:state,tempval:arr[0].main.temp , temp_feel:arr[0].main.feels_like,temp_stat:arr[0].weather[0].main,temp_max:arr[0].main.temp_max,temp_min:arr[0].main.temp_min,temp_status:temp_status , des: des});
  
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
var fog="data:image/png;base64,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";
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



   res.render("home2.ejs",{state:state,tempval:arr[0].main.temp , temp_feel:arr[0].main.feels_like,temp_stat:arr[0].weather[0].main,temp_max:arr[0].main.temp_max,temp_min:arr[0].main.temp_min,temp_status:temp_status , des: des});

  })

  .on("end",function(err){
   if(err)
    console.log(err);


    res.end();

  })

})
app.listen(8000||process.env.PORT, () => {
  console.log("Example app listening at http://localhost:${8000}")
})



//https://www.interviewbit.com/contest/code-drift-bit-manipulation?rcy=1&rce=74c0d93247a1