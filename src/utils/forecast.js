const request = require('request')

const forecast = (latitude,longitude,callback)=>{                                               //By destructuring property
    const url = 'https://api.darksky.net/forecast/c97089683e04ff1d682e50c6afac5cd2/'+latitude+','+longitude+'?units=si&lang=en'
    request({url:url,json:true},(error,{body})=>{
        if(error)
        {
            callback('Unable to Connect to Server',undefined)
        }
        else if(body.error)
        {
            callback('Unable to find the Loaction',undefined)
        }
        else
        {
            callback(undefined,body.daily.summary + " It is currently "+ body.currently.temperature +" degrees out. There is " + body.currently.precipProbability +" chance of rain.")
        }
    })
}

module.exports = forecast