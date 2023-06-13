const mongoose=require("mongoose");



const CatSchema= mongoose.Schema({
    nom:{
        type: String,
        required: true
    },

    description:{
        type: String,
         
    }



});


const Categorie= mongoose.model('Categorie', CatSchema);
module.exports=Categorie;
