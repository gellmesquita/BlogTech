const dataBase =require('../database/DataConect');
const sequelize =require ('sequelize')
const categories= dataBase.define('Categories', {
    title:{
        type: sequelize.STRING,
        allowNull: false
    },
    slug:{
        type:sequelize.STRING,
        allowNull: false
    }
})

/*
categories.sync({force:true}).then(function(){
    console.log('Table Categories was called')
}).catch(function(erro){
    console.log(erro)
}) *///Comentei ele para nÃo tentar uma tabela novamente o que daria erro


module.exports= categories;