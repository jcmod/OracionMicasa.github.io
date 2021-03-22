const express = require('express');
const router = express.Router();

const Note=require('../models/Note');

router.get('/peticiones/add', (req, res) => {
    res.render('peticiones/add');
});
router.post('/peticiones/add', async (req,res) =>{
    const {title,know,description}=req.body;
    const errors=[];
    if(!title){
        errors.push({text: 'Por favor ingrese su nombre'});
    }
    if(!description){
        errors.push({text: 'Por favor infrese descripción'})
    }
    if(!know){
        errors.push({text: 'Por favor infrese tipo'})
    }
    if(errors.length>0){
        res.render('peticiones/add',{
            errors,
            title,
            know,
            description,
        })
    }else{
        const newPeticion=new Note({title, know, description});
        await newPeticion.save();
        req.flash('succes_msg','Petición Guardada Satisfactoriamente');
        res.redirect('/peticiones');
    }
 
});
router.get('/peticiones', async (req, res) => {
    await Note.find()
      .then(documentos => {
        const contexto = {
            notes: documentos.map(documento => {
            return {
                id:documento.id,
                title: documento.title,
                know: documento.know,
                description: documento.description
            }
          })
        }
        res.render('peticiones/list', {
            notes: contexto.notes }) 
      })
});

router.get('/peticiones/edit/:id', async (req, res) => {
    await Note.findById(req.params.id)
    .then(datos => {
        const contexto = {
            id:datos.id,
            title: datos.title,
            know:datos.know,
            description: datos.description
        }
        res.render('peticiones/edit', {note: contexto})
    })
});
router.put('/peticiones/edit/:id',async(req,res)=>{
    const {title,tipo,description}=req.body;
    await Note.findByIdAndUpdate(req.params.id,{title,tipo,description});
    req.flash('succes_msg','Editado Satisfactoriamente');
    res.redirect('/peticiones');
});
router.delete('/peticiones/delete/:id', async(req,res)=>{
    await Note.findByIdAndDelete(req.params.id);
    req.flash('succes_msg','Eliminado Satisfactoriamente');
    res.redirect('/peticiones');
});



module.exports=router;

