const express = require('express');
//const {MongoClient}= require('mongodb');               ////destructuring
const mongoClient =require('mongodb').MongoClient;   ///before destructuring
const debug=require('debug')('app:adminRoutes');
const adminRouter= express.Router();

const books=[
    {title:'ghost hour',
    author:'kijana fupi'},
{title:'murder she wrote',
author:'kijana nono round'},
{title:'djumanji',author:'mwangi'},
{title:'secret',author:'secret squad'},
{title:'life',author:'ethiopia'},
{title:'of',author:'bobgitch'},
{title:'pets',author:'bobmwangi'},
];


function router(nav){
    adminRouter.route('/')
    .get((req,res)=>{
        const url ='mongodb://localhost:27017';
        const dbName='libraryApp';
        
        (async function mongo(){
            let client;
            try{
                client=await mongoClient.connect(url);
                debug('connected succesfully to server');

                const db =client.db(dbName);   

                const response =await db.collection('books').insertMany(books); ///a collection in mongo==a table in sql
                res.json(response);
            }
            catch(err){
                debug(err.stack);
            }
            client.close();
        }());  
    });
    return adminRouter;
}

module.exports=router;