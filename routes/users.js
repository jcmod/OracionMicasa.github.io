const { Router } = require('express');
const express=require('express');
const router=express.Router();

router.get('/users/signin', (req, res)=>{
    res.render('users/signin');
});

router.get('/users/signup', (req, res)=>{
    res.render('users/signup');
});

router.post('/users/signup', (req,res) => {
    const {name,email,password,confirmpassword} = req.body;
    const errors=[];

    if(password != confirmpassword){
        errors.push({text: 'Las claves no coinciden'});
    }
    if(password.length > 5){
        errors.push({text: 'Su Clave es debil'});
    }
    if(errors.length >0){
        res.render('users/signup', {errors,name, email, password, confirmpassword});
    }else{
        res.send('OK!');
    }

});


module.exports=router;
