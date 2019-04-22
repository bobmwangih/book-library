const express = require('express');
const bookRouter= express.Router();
const sql=require('mssql');
const debug=require('debug')('app:bookRoutes');
const { MongoClient, ObjectID }=require('mongodb');   ///before destructuring


function router(nav){
  bookRouter.use((req,res,next)=>{
    if(req.user){
      next();
  }else{
      res.redirect('/');
  }
  });
bookRouter.route('/').get((req,res)=>{
  const url ='mongodb://localhost:27017';
  const dbName='libraryApp';
        
        (async function mongo(){
            let client;
            try{
                client=await MongoClient.connect(url);      //connects to mongo
                debug('connected succesfully to server');

                const db =client.db(dbName);                //connect to the db

                const col =await db.collection('books');    //connect to the table/collection
                const books=await col.find().toArray();     //fetch the whole collection into an array called book

                 res.render('bookListView',{ nav, title: 'GAME OF BOOKS! \n vitabu bomba', books })}
              catch (err){
               debug(err.stack);
               }
    client.close();
  }());
})
/*  request.query('select * from books').then((result)=>{   // =admin==> using promises
    debug(result);
    res.render('bookListView',{ nav, title: 'GAME OF BOOKS!',books:result.recordset })
  }) */

bookRouter.route('/:id').get((req,res)=>{
    const {id}=req.params;

    const url ='mongodb://localhost:27017';
    const dbName='libraryApp';
    
    (async function mongo(){
      let client;
            try{
                client=await MongoClient.connect(url);   

                const db =client.db(dbName);          

                const col =await db.collection('books');     
                const books=await col.find().toArray();      
                const book= await col.findOne({_id:new ObjectID(id)});
                debug(book);

                res.render('bookView',{ nav, title: 'GAME OF BOOKS!',
                book })}
            catch(err){
              debug(err.stack);
            }

  }());  
});
return bookRouter;
}

module.exports=router;