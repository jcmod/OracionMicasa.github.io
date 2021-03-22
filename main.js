var express= require('express');
var app=express();
var path=require('path');
var expressHbs=require('express-handlebars');
var bodyparser=require('body-parser');
var PORT=process.env.PORT || 4000;
const methodOverride=require('method-override');
const session=require('express-session');
const flash=require('connect-flash');

require('./database');


app.engine('hbs', expressHbs({
    defaultLayout: 'base',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'    
}));

app.set('view engine','.hbs');
app.set('views', path.join(__dirname,'views'));
app.set('public', path.join(__dirname,'public'));

//Middlewares
app.use(flash());
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
    secret:'misecretapp',
    resave:true,
    saveUninitianlized: true
}));
//Static Files
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyparser.json());

//Global
app.use((req,res,next)=>{
    res.locals.succes_msg=req.flash('succes_msg');
    res.locals.error_msg=req.flash('error_msg');
    next();
})

//enrutadores
var indexRouter=require('./routes/index');
var usersRouter=require('./routes/users');
var peticionesRouter=require('./routes/peticiones');
app.use(indexRouter);
app.use(usersRouter);
app.use(peticionesRouter);



app.listen(PORT, () =>{
    console.log(`Server is runing on port ${PORT}`);
});


