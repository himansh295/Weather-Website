const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


console.log(__dirname)
console.log(path.join(__dirname,'../public'))

const app  = express()

//define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')               //If views file named to templates
const partialsPath = path.join(__dirname,'../templates/partials')

//set up handle baar engine and views loaction
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to work
app.use(express.static(publicDirectoryPath))
app.get('',(req,res)=>
{
    res.render('index.hbs',{
        title : 'Weather App',
        name : "Himanshu Sharma",
    })
})

app.get('/help',(req,res)=>{                 
        // res.send({
        //     name : 'Himanshu Sharma',
        //     age : "21" 
        // })
    
        res.render('help',{
            title : 'Help weather page',
            name : "Himanshu Sharma",
            helptext : 'Need Help! Click Me!!'
        })
    })

app.get('/about',(req,res)=>{
    res.render('about',{
        title : 'About weather page',
        name : "Himanshu Sharma"
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
        return res.send({
            error : "Provide the Address"
        })
    }

    geocode(req.query.address,(error,{latitude,longitude,placeName}={})=>{
        if(error)
        {
            return res.send({error})
        }

        forecast(latitude,longitude,(error,forecastdata)=>{
            if(error){
                return console.log(error)
            }
    
            res.send({
                Forecast : forecastdata,
                placeName,
                address : req.query.address
            })    
        })
    })
    
    // res.send({
    //     place : [],
    //     forecast : "It is Raining!!",
    //     location : req.query.address
    // })
})

app.get('/product',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error : "You must provide a search term"
        })
    }
    

    console.log(req.query.search)
    res.send({
        product : []
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title : "404",
        name : "Himanshu Sharma",
        errorMessage : 'Help Article not found.'
    })
})


app.get('*',(req,res)=>{
    res.render('404',{
        title : "404",
        name : "Himanshu Sharma",
        errorMessage : 'Page not found.'
    })
})

app.listen(3000,()=>{            //To start the server up, 3000-common developmenty port
    console.log('Server is up on port 3000')
})



//app.com home
//app.com help
//app.com about

// app.get('',(req,res)=>{                   
//     res.send('<h1>Weather</h1>')
// })      

// app.get('/help',(req,res)=>{                 //This tells what server should do when tries to get the resouces at a specfic url
//     // res.send({
//     //     name : 'Himanshu Sharma',
//     //     age : "21" 
//     // })

//     res.send([{
//         name : 'Himanshu Sharma',
//         age : "21" 
//     },{
//         name : 'Rajan ',
//         age : '20'
//     }])
// })