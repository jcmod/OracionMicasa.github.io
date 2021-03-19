var express= require('express');
var app=express();
var path=require('path');
var expressHbs=require('express-handlebars');
var bodyparser=require('body-parser');
var PORT=process.env.PORT || 4500;

app.engine('hbs', expressHbs({defaultLayout: 'base', extname: 'hbs'}));
app.set('view engine','hbs');
app.set('views', path.join(__dirname,'views'));

//Middlewares

app.use(bodyparser.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));

//enrutadores
var indexRouter=require('./routes/index');

app.use('/index', indexRouter);


app.listen(PORT, () =>{
    console.log(`Server is runing on port ${PORT}`);
});


