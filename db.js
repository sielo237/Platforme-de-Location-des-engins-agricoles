const mongoose=require('mongoose');

mongoose.set('strictQuery', false);

 


module.exports=(async ()=>{
    const connectionParams={
        useNeUrlParser:true,
        useUnifiedTopology:true,
    };
    try{
        await mongoose.connect(process.env.DB);
        console.log("base de données connecté");
    }catch(error){
        console.log("erreur lors de la connexion à la base de données : "+error);
    }
})