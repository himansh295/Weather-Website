//  console.log("Client Side JavaScript file is Loaded")

// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })

// fetch('http://localhost:3000/weather?address=Boston').then((response) =>{
//     response.json().then((data)=>{
//         if(data.error)
//         {
//             console.log(data.error)
//         }
//         else
//         {
//             console.log(data.placeName)
//             console.log(data.Forecast)
//         }        
//     })
// })

const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const messageONe = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

//messageONe.textContent = 'From JavaScript'


weatherform.addEventListener('submit',(event)=>{
    event.preventDefault()

    const location = search.value

    messageONe.textContent = 'Locating...'
    messageTwo.textContent = ''

    fetch('/weather?address='+location).then((response) =>{
    response.json().then((data)=>{
        if(data.error)
        {
            messageONe.textContent = data.error
        }
        else
        {
            messageONe.textContent = data.placeName
            messageTwo.textContent = data.Forecast

            //console.log(data.placeName)
            //console.log(data.Forecast)
        }        
    })
})

})