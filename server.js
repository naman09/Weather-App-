var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var request = require('request')

app.use(bodyParser.urlencoded({extended:true}))

app.set('view engine','ejs')

app.use(express.static('public'))



app.get('/',(req,res)=>{
    // res.send("hello sekai")
    res.render('index',{weather:null,error:null})
})

app.post('/',(req,res)=>{
    
    var city = req.body.city;
    var apiKey = '74faaf35e315e6594d25d945dbd658a8'
    var url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

    request(url,(err,response,body)=>{
        if(err) res.render('index',{weather:null,error:"Error:please try again"})

        else{
            var weather = JSON.parse(body);
            if(weather.main == undefined){
                res.render('index',{weather:null,error:"Error:please try again"})
            }
            else{
                var weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`
                res.render('index',{weather:weatherText,error:null})
            }
        }
    })
})

app.listen(3000,()=>{})