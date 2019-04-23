const debug=require('debug')('app:bookController');
const { MongoClient, ObjectID }=require('mongodb');

function bookController(bookService, nav){
    function getIndex(req,res){
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
      };
    function getById(req,res) {
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

                    book.details= await bookService.getBookById(book.bookId);
    
                    res.render('bookView',{ nav, title: 'GAME OF BOOKS!',
                    book })}
                catch(err){
                  debug(err.stack);
                }
    
      }());  
    };
    function middleware(req,res,next) {
        //if(req.user){               checks if the user is logged in 
          next();
      //}else{
         // res.redirect('/');
      //}
      }
    
    return{
        getIndex,getById,middleware
    };


}


module.exports=bookController;