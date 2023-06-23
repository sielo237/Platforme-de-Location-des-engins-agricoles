const mongoose= require('mongoose');
const validator= require('validator');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const moment=require('moment');
const Location=require('./location');
require('dotenv').config();

//modèle du loueur qui seront enregistré  en Bd
const loueurSchema=new mongoose.Schema({
    nom:{
		type:String,
		required:true,
        
	},

    prenom:{
		type:String,
		required:true,
        
	},

    email:{
		type:String,
        unique:true,
        lowercase:true,
        trim:true,
		required:true,
        validate(v){
            if(!validator.isEmail(v)) throw new Error ("Email non valide");
          
        }
	},

    numeroTel:{
		type:String, 
		required:true,
        validate(v){
            if(!validator.isNumeric(v)) throw new Error ("veuillez entrez un numéro correcte");
           
        }
        
    },
        

    password:{
		type:String,
		required:true,
        validate(v){
            if(!validator.isLength(v, {min: 6, max: 100})) throw new Error("Mot de passe doit avoir au minimum 6 caractères");
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

    adresse:{
        type:String,
        required:true,
        
    },


    noteTotale: {
        type: Number,
        default: 0,
      },
      
    nombreAvis: {
        type: Number,
        default: 0,
      },

    role:{
        type:String,
        default:"Loueur"
        
        
    },
    /*
    document:{
        type:String,
        required: true
        
        
    },
*/
    statut:{
        type:String,
        default:"en attente"
        
        
    },
    date:{
        type:Date,
        default: Date.now
    },



    authTokens:[{

        authToken:{
        type:String,
        required:true
    
    }
    }]


});


// fonction pour générer un token d'authentification et sauvegarder le loueur

loueurSchema.methods.generateAuthToken= async function (){
    const authToken= jwt.sign({_id:this._id.toString(), role: this.role}, process.env.CLE);
    //envoi du tokens de l'utilisateur dans le tableau de token
    this.authTokens.push({authToken, role: this.role}) ;
    await this.save();
    return authToken; 
}



//creation de la fonction pour verifier les infos pour se logger
loueurSchema.statics.findLoueur=async(email,password)=>{
    const loueur= await Loueur.findOne({email});
    if(!loueur) throw new Error("ce compte n'existe pas" )
    const isPasswordValid= await bcrypt.compare(password, loueur.password);
    if(!isPasswordValid) throw new Error('mot de passe incorrect');
    return loueur;
}



// hasher le mot de pass avant d'envoyer en bd
loueurSchema.pre('save', async function(){
    if( this.isModified('password')) this.password= await bcrypt.hash(this.password,8);

});

loueurSchema.methods.getNombreCommandes = async function() {
    const nombreCommandes = await Location.countDocuments({ loueur: this._id });
    return nombreCommandes;
  };
  

const Loueur= new mongoose.model('Loueur',loueurSchema)
    

module.exports=Loueur;