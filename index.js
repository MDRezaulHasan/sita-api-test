const express=require("express")
const cors= require ("cors")
const morgan= require ("morgan")
const lowDB= require ("lowdb")

//swagger
const swaggerUI = require("swagger-ui-express")
const swaggerJsDOC = require("swagger-jsdoc")

const productsRouter = require("./productsRoute")
const FileSync = require("lowdb/adapters/FileSync")
const adapters= new FileSync("db.json")
const db = lowDB(adapters)
const PORT = 4000
db.defaults({products:[]}).write()

const option = {
    definition:{
        openapi:"3.0.0",
        info:{
            title:"api-test",
            version:"1.0.0",
            description: "Demo project of API test"
        },
        servers:[
            {
                url:"http://localhost:4000",
            }
        ]
    },
    apis:["./*.js"]
}
const specs = swaggerJsDOC(option)
const app = express()
app.use("/api-docs",swaggerUI.serve,swaggerUI.setup(specs));

app.db= db;
app.use(cors())
app.use(express.json())
app.use(morgan("dev"))

//http://localhost:4000
app.use("/products", productsRouter)



app.listen(PORT,()=>console.log(`Server is running on port: ${PORT}`))

