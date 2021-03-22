const mongoose=require('mongoose');

mongoose.connect('mongodb+srv://Alex143-01:Churumico2021@cluster0.udbmv.mongodb.net/Oracion', {
useCreateIndex:true,
usenewUrlParser:true,
useFindAndModify:false
})
    .then(db => console.log('DB is connected'))
    .catch(err=> console.error(err));
