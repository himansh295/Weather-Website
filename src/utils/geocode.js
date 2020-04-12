// //Geocoding
// //Address -> latitude,longitude -> Weather
// //1- Address -> latitude,longitude
const request = require('request')

const geocode = (address,callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoiaGltYW5zaDI5NSIsImEiOiJjazhoY3Z0d2gwM245M2lvN2k2aHhkOXI3In0.e95TOF5Nc5GzKH8Kf-N3nw&limit=1'
    request({url ,json: true},(error,{body})=>{                                          //By destructuring property
        if(error){
            callback('Unable to connect to Location services!',undefined)
        }
        else if(body.features.length === 0){
            callback("Unable to find location.Try another Search!!",undefined)
        }
        else{
            
            callback(undefined,{
                // latitude : response.body.features[0].center[1],
                // longitude : response.body.features[0].center[0],
                // placeName : response.body.features[0].place_name

                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0],
                placeName : body.features[0].place_name
            })
        }

    })
}




module.exports = geocode