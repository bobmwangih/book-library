const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const bodyParser=require('body-parser');
const passport= require('passport');
const cookieParser =require('cookie-parser');
const session =require('express-session');
// list of packages used

const app = express();
const port = process.env.PORT || 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({secret :'library'})); 
app.use(express.static(path.join(__dirname, '/public/')));
app.use(morgan('tiny'));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.set('views', './src/views');
// app.set('view engine','pug');  //when using pug template
app.set('view engine', 'ejs');     //when using ejs template



const nav=[{title:'Book',link:'/books'}, {title:'Author',link:'/authors'}];

require('./src/config/passport.js')(app);
const bookRouter= require('./src/routes/bookRoutes')(nav);
const adminRouter= require('./src/routes/adminRoutes')(nav);
const authRouter=require('./src/routes/authRoutes')(nav);
app.use('/books',bookRouter);   //if you get a request with localjost:4000/books pass it to the bookRouter
app.use('/admin',adminRouter);  //if you get a request with localhost:4000/admin pass the request to adminRouter
app.use('/auth',authRouter);

app.get('/', (req, res) => {
  // res.sendFile(path.join(__dirname, 'views/index.html')); //rendering a plain html file
  res.render('index', { nav: [{title:'Books',link:'/books'}, {title:'Authors',link:'/authors'}], title: 'GAME OF BOOKS!' });
});

app.listen(port, () => {
  debug(`listening to port: ${chalk.red(port)}`);
});