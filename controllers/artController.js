const express= require('express');
const routes = express.Router();
const artModel= require('../models/artModel');
const catModel= require('../models/catModel');
const slugify= require ('slugify');

routes.use(express.static('public'));

routes.get ('/new-article', (req, resp)=>{
    catModel.findAll().then((category)=>{
        resp.render('article',{category:category})
    })
})

routes.post('/save-article',(req, resp)=>{
    const title= req.body.title;
    const article= req.body.article;
    const idCategory= req.body.idCategory;
    const summary=req.body.summary
    artModel.create({
        type:title,
        slug:slugify(title),
        CategoryId:idCategory,
        body:article,
        summary:summary
    }).then(()=>{
        resp.redirect('/article/all-article');
    })
})

routes.post('/delete-article',(req, resp)=>{
    const id= req.body.id
    artModel.destroy({
        where:{
            id:id
        }
    }).then(()=>{
        resp.redirect('/article/all-article')
    })
})

routes.get('/all-article',(req, resp)=>{
    artModel.findAll({
        include:[{model:catModel}]
    }).then((article)=>{
        //console.log(article);
        resp.render('table-article', {article:article})
    })
})

routes.post('/update-article',function(req, resp){
    const article=req.body.up;
    catModel.findAll().then((category)=>{
        artModel.findByPk(article).then((article)=>{
            resp.render('article-update', {category:category, article:article})
        })
        
    })
    
})

 routes.post('/save-update',(req,resp)=>{
    const type= req.body.title;
    const body= req.body.article;
    const summary= req.body.summary;
    const CategoryId=req.body.CategoryId;
    const id=req.body.idArticle

    artModel.update({
        type:type,
        body:body,
        summary:summary,
        CategoryId:CategoryId,
        slug: slugify(type)
    },{
        where:{
            id:id
        }
    }).then(()=>{
        resp.redirect('/article/all-article')
    })
})

routes.get('/:mySlug',(req, resp)=>{
    const slug=req.params.mySlug;
    artModel.findOne({
        where:{
            slug:slug
        },
        include:[{model:catModel}]
    }).then((article)=>{
        catModel.findAll().then((category)=>{
           resp.render('my-article', {article:article, category:category}) 
        })
        
    })

})


routes.get('/:mySlug/:categoryId',(req, resp)=>{
    const CategoryId= req.params.categoryId
    artModel.findAll({
        order:[['id', 'DESC']],
        where:{
            CategoryId:CategoryId
        },
        include:[{
            model:catModel
        }]
    }).then((article)=>{
        catModel.findAll().then((category)=>{
            resp.render('articleCategory',{article:article, category:category})
        })
    })
})


routes.get('/page/number/:number', function(req, resp){
    let number = req.params.number;
    let espace=0;
    number= parseInt(number)
    if(number==1){
        espace=0;
    }else{
        espace= parseInt((number*4)/2);
    }
    //console.log(espace)
    artModel.findAndCountAll({
        limit:4,
        offset:espace,
        include:[{model:catModel}]
    }).then((article)=>{
        let next;
        if(espace >= article.count){
            next=false
        }else{
            next=true
        }
        let my_article={
            next:next,
            article:article
        }
        //resp.json(my_article.article)
        resp.render('sample', {article:my_article})
    })
})

module.exports= routes;