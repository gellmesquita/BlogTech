//Importando arquivos e bibliotecas
const express =require ('express')
const app= express();
const bodyParser=require('body-parser')
const catControl= require ('./controllers/catController')
const artControl= require ('./controllers/artController')
const catModel= require ('./models/catModel')
const artModel= require ('./models/artModel')
//chamado a conexão com a bd
const DataBase= require('./database/DataConect')
DataBase.authenticate().then(function(){
    console.log('DataBase Chamada')
}).catch(function(erro){
    console.log(erro)
})
//configurando o ejs
app.set('view engine', 'ejs');
//configurando o body-parser
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
//Configurando arquivos estaticos
app.use(express.static('public'));

app.get('/home-page',(req, resp)=>{
    artModel.findAll({
        order:[['id', 'DESC']]
    }).then((article)=>{
        catModel.findAll({
            order:[['title', 'ASC']]
        }).then((category)=>{
            resp.render('home-page',{article:article, category:category})
        })
    })
})
//rotas
app.use('/categories', catControl)
app.use('/article', artControl )





//Criei um serivdor 
app.listen(8000, function(){
    console.log('Servidor Encontrado')
}) 