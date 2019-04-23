const express = require('express');
const bookRouter= express.Router();
const bookController= require('../controllers/bookController');
const bookService= require('../services/goodreadsService');


function router(nav){
  const { getIndex, getById, middleware }=bookController(bookService, nav);
  bookRouter.use(middleware);
bookRouter.route('/').get(getIndex);
/*  request.query('select * from books').then((result)=>{   // =admin==> using promises
    debug(result);
    res.render('bookListView',{ nav, title: 'GAME OF BOOKS!',books:result.recordset })
  }) */

bookRouter.route('/:id').get(getById);
return bookRouter;
}

module.exports=router;