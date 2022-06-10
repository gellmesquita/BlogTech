const dataBase = require ('../database/DataConect');
const sequelize= require ('sequelize');
const category= require ('../models/catModel')
const article = dataBase.define('articles',{
    type:{
        type: sequelize.STRING,
        allowNull:false
    }, 
    slug:{
        type:sequelize.STRING,
        allowNull: false
    },
    summary:{
        type: sequelize.STRING,
        allowNull:false
    },
    body:{
        type:sequelize.TEXT,
        allowNull: false
    }
});

article.belongsTo(category)


article.sync({force:true}).then(function(){
    console.log('Article Created')
}).catch(function(erro){
    console.log(erro)
})//Comentei ele para nÃo tentar uma tabela novamente o que daria erro

module.exports= article;