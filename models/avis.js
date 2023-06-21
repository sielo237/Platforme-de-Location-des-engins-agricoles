const mongoose=require('mongoose');
const validator= require('validator');



const AvisSchema= mongoose.Schema({

    email:{
        type: String,
        required: true,
        lowercase:true,
        trim:true,
		required:true,
        validate(v){
            if(!validator.isEmail(v)) throw new Error ("Email non valide");
          
        }
    },

    loueurId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Loueur',
        required: true
    },

    commentaire : {
        type:String,
        required: true
    
    },

    note:{
        type:Number,
        required: true
    },


    dateAvis: {
        type: String,
        default:Date.now()
    }

});

const Avis=mongoose.model( 'Avis',AvisSchema);

module.exports=Avis;