const sequilize= require('sequelize')
const myConect= new sequilize('selfblog', 'root', 'gelsonn99', {
    host:'localhost', 
    dialect:'mysql',
    timezone:'+01:00'
})


module.exports= myConect;