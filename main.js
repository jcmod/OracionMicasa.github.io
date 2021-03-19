var express= require('express');
var app=express();
var path=require('path');
var expressHbs=require('express-handlebars');
var bodyparser=require('body-parser');
var PORT=process.env.PORT || 4000;

app.engine('hbs', expressHbs({defaultLayout: 'base', extname: 'hbs'}));
app.set('view engine','hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname,'views'));
app.set('img', path.join(__dirname,'img'));

//Middlewares
app.use(bodyparser.json());
app.use(express.urlencoded({extended:false}));


//enrutadores
var indexRouter=require('./routes/index');


app.use(indexRouter);


app.listen(PORT, () =>{
    console.log(`Server is runing on port ${PORT}`);
});


