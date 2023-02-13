const express = require("express")
var bodyParser = require("body-parser")

const app = express()
const port = 3000

/* 
  Det här används för att skicka alla filer som ligger i public som så kallade "statiska" filer. 
  Om någon gör GET på "/" eller "/index.html" så kommer filen "/public/index.html" skickas.
*/
app.use(express.static("public"))

/* 
  bodyParser gör det mycket lättare att jobba med data som POSTas till servern.
  Den information som postas kommer ligga i body-attributet på request-objektet.

  T.ex.
  req.body
*/
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

/************************************************* 
  Hantera GET-requests
**************************************************/
// Den här hanterar en GET request till routen /hello.
// req är ett request-objekt, det innehåller information om den request som gjorts till servern.
// res är ett response-objekt, det används för att skicka tillbaka svar till den som gjorde requesten.
app.get("/hello", (req, res) => {
  res.send("Hello, ExpressJS nodemon world!")
})

app.get("/greet", (req, res) => {
  console.log("Detta har skickats på querystring:", req.query)
  const name = req.query.name // i req.query finns värden som skickats på querystring ex. http://localhost:3000/greet?name=Kim
  let html = `<html><head><body><h1>Hej ${name}</h1></body></html>`
  res.send(html)
})

/************************************************* 
  Hantera POST-requests
**************************************************/

// Detta är en POST-hanterare. Den hanterar om någon POSTar till routen "/posta-hit"
app.post("/posta-hit", (req, res) => {
  console.log("Detta har skickats med POST:", req.body) //req.body innehåller det som postats till denna route.
  res.send("ok")
})

/************************************************* 
  Starta servern
**************************************************/
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
  console.log(`Available routes:`)
  console.log(
    `GET http://localhost:${port}/ (will server static content from folder named public)`
  )
  console.log(`GET http://localhost:${port}/hello`)
  console.log(`GET http://localhost:${port}/greet`)
  console.log(`POST http://localhost:${port}/posta-hit`)
})
