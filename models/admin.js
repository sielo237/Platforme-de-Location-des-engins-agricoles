const mongoose= require('mongoose');
const validator= require('validator');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const moment=require('moment');
require('dotenv').config();

//modèle du client qui seront enregistré  en Bd
const adminSchema=new mongoose.Schema({
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
        unique:true,
        lowercase:true,
        trim:true,
		required:true,
        validate(v){
            if(!validator.isEmail(v)) throw new Error ("Email non valide");
            //throw new Error("Email non valide"); //renvoie une erreur si la données recu n'est pas une adresse email
        }
	},

    numeroTel:{
		type:String, 
		required:true,
        validate(v){
            if(!validator.isNumeric(v)) throw new Error ("veuillez entrez une date correcte");
            //throw new Error("Email non valide"); //renvoie une erreur si la données recu n'est pas une adresse email
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

    role:{
        type:String,
        default:"Administrateur"
        
        
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


// fonction pour générer un token d'authentification et sauvegarder le client

adminSchema.methods.generateAuthToken= async function (){
    const authToken= jwt.sign({_id:this._id.toString(), role: this.role}, process.env.CLE);
    //envoi du tokens de l'utilisateur dans le tableau de token
    this.authTokens.push({authToken, role: this.role}) ;
    await this.save();
    return authToken; 
}



//creation de la fonction pour verifier les infos pour se logger
adminSchema.statics.findAdmin=async(email,password)=>{
    const admin= await Admin.findOne({email});
    if(!admin) throw new Error("vous n'etes pas autorisé ");
    const isPasswordValid= await bcrypt.compare(password, admin.password);
    if(!isPasswordValid) throw new Error('mot de passe incorrect');
    return admin;
}



// hasher le mot de pass avant d'envoyer en bd
adminSchema.pre('save', async function(){
    if( this.isModified('password')) this.password= await bcrypt.hash(this.password,8);

});



const Admin= new mongoose.model('Admin',adminSchema)
    

module.exports=Admin;