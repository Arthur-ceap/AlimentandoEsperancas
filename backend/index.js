const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const dotenv = require("dotenv").config()

const app = express()
app.use(cors())
app.use(express.json({limit: "10mb"}))

const PORT = process.env.PORT || 8080

//MONGODB CONEXAO
console.log(process.env.MONGODB_URL)
mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGODB_URL).
then(()=>console.log("Connect to database "))
.catch((err)=>console.log(err))

//schema 
const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        unique: true,
    },
    password: String,
    confirmPassword: String,
    image: String,
})

//
const userModel = mongoose.model("user",userSchema)



//API
app.get("/",(req,res)=>{
    res.send("Server is running")
})

//API CADASTRO
app.post("/signup", async(req,res)=>{
    console.log(req.body)
    const {email} = req.body

    userModel.findOne({email : email},(err,result)=>{
        console.log(result)
        console.log(err)
        if(result){
            res.send({message : "Email já está registrado",alert: false})
        }else{
            const data = userModel(req.body)
            const save = data.save()
            res.send({message : "Registro feito com sucesso!", alert: true})
        }
    })
})

//API LOGIN
app.post("/login",(req,res)=>{
    console.log(req.body)
    const {email} = req.body
    userModel.findOne({email : email},(err, result)=>{
        if(result){
            const dataSend = {
                _id:result._id,
                firstName: result.firstName,
                lastName: result.lastName,
                email: result.email, 
                Image: result.image,
            }
            console.log(dataSend)
            res.send({message : "Login feito com sucesso!", alert : true,data : dataSend })
        }
        else{
            res.send({message : "Email Inválido, por favor cadastre-se", alert : false,}) 
        }
    })
})


//SEÇÃO DE PRODUTO

const schemaProduct = mongoose.Schema({
    name : String,
    category : String,
    image : String,
    price : String,
    description : String,
})
const productModel = mongoose.model("product",schemaProduct)



//SALVANDO PRODUTO NO BD 
//API

app.post("/uploadProduct",async(req,res)=>{
    console.log(req.body)
    const data = await productModel(req.body)
    const datasave = await data.save()
    res.send({message : "Produto Salvo com sucesso!"})
})

//
app.get("/product", async(req,res)=>{
    const data = await productModel.find({})
    res.send(JSON.stringify(data))
})

//SERVIDOR RODANDO
app.listen(PORT, ()=>console.log("Server is running at port "+PORT))