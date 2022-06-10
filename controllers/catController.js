const express =require ('express');
const routes= express.Router();
const slugify=require ('slugify') // Cria uma Sting sem espaço e nem caracteres especias
const catModel= require ('../models/catModel');

routes.use(express.static('public'));

routes.get('/new-category', function(req,resp){
    resp.render('./form-category')
})
routes.get('/', (req, resp)=>{
    resp.send('<h1>Gelson Domingos</h1>')
})

routes.post('/save-category', function(req,resp){
    const titleForm=req.body.nameCategory;
    if(titleForm != undefined){
        catModel.create({
            title:titleForm,
            slug:slugify(titleForm) //Vai servir com url da categoria
        }).then(function(){
            resp.redirect('/categories/all-category')
        }).catch(function (erro) {
            console.log(erro)
        });
    }else{
        resp.redirect('/categories/form-category')
    }
});

routes.get('/all-Category',function(req, resp){
    catModel.findAll({raw:true}).then((category)=>{
        //console.log(category)
        resp.render('table-category',{myCategory:category})
    })

})
routes.post ('/delete-category',(req, resp)=>{
    const idCat= req.body.idCat;
    catModel.destroy({
        where:{
            id:idCat
        }
    }).then(()=>{
        resp.redirect('/categories/all-category')
    })
});

routes.post('/update-category/', (req, resp)=>{
    const idCat= req.body.cat;
    const text= req.body.updateText;
    console.log(idCat)
    resp.render('update-category',{myCat:idCat, myText:text});
})

routes.post('/up-category',(req, resp)=>{
    const upTitle= req.body.title
    const idCat= req.body.cat
    console.log(idCat)
    console.log(upTitle)
    catModel.update({
        title:upTitle,
        slug:slugify(upTitle)
    },{
        where:{
            id:idCat
        }
    }).then(()=>{
        resp.redirect('/categories/all-category');
    })
})


module.exports= routes;