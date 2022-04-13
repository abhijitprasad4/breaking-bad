const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

//to set the view engine
app.set("view engine", "hbs");

app.use(express.static(__dirname+'/public'));

var correctName = ""
// templete engine route
app.get("/", function(req, res){
    const randomNo = Math.floor(Math.random() * 56) + 1
    console.log(randomNo)
    https.get("https://www.breakingbadapi.com/api/characters/" + randomNo , function(response){
        response.on("data", function(data){
            const nameData = JSON.parse(data)
            correctName = nameData[0].name
            const imageAddress = nameData[0].img
            console.log(correctName)
            res.render("index",{image : imageAddress});

        })
    });
    // res.render("index",{image : imageAddress});
});

// var correctName

// app.get("/", function(req, res){
//     https.get("https://www.breakingbadapi.com/api/characters/1", function(response){
//         response.on("data", function(data){
//             const nameData = JSON.parse(data)
//             correctName = nameData[0].name
//             // console.log(corectName)
//         })
//     });
//     res.sendFile(__dirname + "/index.html",{image : "https://images.amcnetworks.com/amc.com/wp-content/uploads/2015/04/cast_bb_700x1000_walter-white-lg.jpg"});
// });

app.post("/", function(req, res){
    console.log(req.body.inputedname);
    // console.log(req.body.imagename);
    const inputArray = req.body.inputedname.split(" ")
    const correctArray = correctName.split(" ")

    if ((req.body.inputedname.toUpperCase() === correctName.toUpperCase() && (inputArray.length === 2))){
         // || (inputArray[0].toUpperCase() === correctArray[0].toUpperCase())|| (inputArray[1].toUpperCase() === correctArray[1].toUpperCase())){
        res.sendFile(__dirname +"/success.html");
    }

    else if (inputArray.length === 1){
        if  (inputArray[0].toUpperCase() === correctArray[0].toUpperCase()){
            res.sendFile(__dirname +"/success.html");
        }
        else if (correctArray.length === 2){
            if (inputArray[0].toUpperCase() === correctArray[1].toUpperCase()){
                res.sendFile(__dirname +"/success.html");
            }
            else{
                res.sendFile(__dirname +"/failure.html");
            }
        }
        else{
            res.sendFile(__dirname +"/failure.html");
        }
    }
    else{
        res.sendFile(__dirname +"/failure.html");
    }
    console.log(correctName)
    
});

app.listen(3000,function(){
    console.log("server is running on port 3000.");
});