const mongoose= require('mongoose');
const validator= require('validator');
const Loueur=require('./loueur');
const Categorie=require('./categorie');



const EnginSchema= new mongoose.Schema({
    nom:{ 
        type: String,
        required: true
    },

    description:{
        type: String,
        required: true
    },

    categorie:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categorie',
        required: true
    },

    photos:[{
        type: String,
        required: true
    }],

    document:[{
        type: String,
        required: true
    }],

    statut:{
        type: String,
        default: "en attente de confirmation"
    },

    disponibilite:{
        type: Boolean,
        default: true

    },

    prix:{
        type: Number,
        required: true
    },

    commentaire:{
        type: String,
        default:''

    },

    loueur:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Loueur',
        required:true
    },

    date:{
        type: Date,
        default: Date.now
    }


});





const Engin= mongoose.model('Engin', EnginSchema);

module.exports=Engin;