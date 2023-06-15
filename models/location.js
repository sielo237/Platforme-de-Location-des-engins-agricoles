const mongoose= require('mongoose');
const validator= require('validator');
const moment=require('moment');
const Engin=require('./engins')
require('dotenv').config();

//modèle du client qui seront enregistré  en Bd
const locationSchema=new mongoose.Schema({
    nom:{
		type:String,
		required:true,
        /*validate(v){
            if(!validator.isAlpha(v)) throw new Error("le nom doit etre des caractères alphanumérique");
        }*/
	},

    prenom:{
		type:String,
		required:true,
        // validate(v){
        //     if(!validator.isAlpha(v)) throw new Error("le nom doit etre des caractères alphanumérique");
        // }
	},

    email:{
		type:String,
        lowercase:true,
        trim:true,
		required:true,
        validate(v){
            if(!validator.isEmail(v)) throw new Error ("Email non valide");
            //throw new Error("Email non valide"); //renvoie une erreur si la données recu n'est pas une adresse email
        }
	},

    engin:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Engin',
        required:true
    },

    numeroTel:{
		type:String, 
		required:true,
        validate(v){
            if(!validator.isNumeric(v)) throw new Error ("veuillez entrez une date correcte");
            //throw new Error("Email non valide"); //renvoie une erreur si la données recu n'est pas une adresse email
        }
        
    },
    

    dateNaissance:{
        type:String,
        required:true,
        validate(v){ 
        if(!validator.isDate(v)) throw new Error("veuillez entrer une date correcte");
        }
    },


    pays:{
        type:String,
        required:true,
        default: "Cameroun"
        
    },

    adresseLivraison:{
        type:String,
        required:true,
        
    },

    role:{
        type:String,
        default:"Agriculteur"
        
        
    },

    loueur:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Loueur',
        required: true
    },

    dateDebut:{
        type:String,
        required:true,
        validate(v){ 
        if(!validator.isDate(v)) throw new Error("veuillez entrer une date correcte");
        }

    },

    dateFin:{
        type:String,
        required:true,
        validate(v){ 
        if(!validator.isDate(v)) throw new Error("veuillez entrer une date correcte");
        }

    },

    statut: {
        type: String,
        Default:"en attente"

    },

    prixTotal:{
        type: Number,
        required: true
    },



    date:{
        type:Date,
        default: Date.now
    },

    



});




const Location= new mongoose.model('Location',locationSchema)
    

module.exports=Location;