const mongoose= require('mongoose');
const validator= require('validator');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const moment=require('moment');
require('dotenv').config();

//modèle du client qui seront enregistré  en Bd
const userSchema=new mongoose.Schema({
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

    TypedeCompte:{
        type:String,
        default:"Agriculteur"
        
        
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

userSchema.methods.generateAuthToken= async function (){
    const authToken= jwt.sign({_id:this._id.toString()}, process.env.CLE);
    //envoi du tokens de l'utilisateur dans le tableau de token
    this.authTokens.push({authToken}) ;
    await this.save();
    return authToken; 
}



//creation de la fonction pour verifier les infos pour se logger
userSchema.statics.findUser=async(email,password)=>{
    const user= await User.findOne({email});
    if(!user) throw new Error('email ou mot de passe incorrect');
    const isPasswordValid= await bcrypt.compare(password, user.password);
    if(!isPasswordValid) throw new Error('email ou mot de passe incorrect');
    return user;
}



// hasher le mot de pass avant d'envoyer en bd
userSchema.pre('save', async function(){
    if( this.isModified('password')) this.password= await bcrypt.hash(this.password,8);

});



const User= new mongoose.model('User',userSchema)
    

module.exports=User;