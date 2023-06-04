const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Loueur = require('../models/loueur');
require('dotenv').config();

const authentification = async (req, res, next) => {
  try {
    const authToken = req.header('Authorization').replace('Bearer ', '');
    console.log(authToken);
    const decodedToken = jwt.verify(authToken, process.env.CLE);
    console.log(process.env.CLE);

    let user;
    if (User) {
      user = await User.findOne({ _id: decodedToken._id, 'authTokens.authToken': authToken });
    }
    if (!user && Loueur) {
      user = await Loueur.findOne({ _id: decodedToken._id, 'authTokens.authToken': authToken });
    }

    if (!user) throw new Error();
    
    req.authToken = authToken;
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send('Veuillez vous authentifier');
  }
};

module.exports = authentification;


/*const jwt=require('jsonwebtoken');
const User=require('../models/user');  
require('dotenv').config();



// ce middleware permet à l'utilisateur de s'authentifier pour pouvoir accéder à une page
const authentification = async(req,res,next)=>{
    try {
        const authToken=req.header('Authorization').replace('Bearer ','');
        console.log(authToken);
        const decodedToken=jwt.verify(authToken, process.env.CLE);
        console.log(process.env.CLE);
        const user=await User.findOne({_id: decodedToken._id, 'authTokens.authToken':authToken}); //trouver l'id du client  correspondant en bd et verifi si le token existe
        
        if(!user) throw new Error();

        req.authToken= authToken ;// on accède au token actuel de l'utilisateur
        req.user=user; // on stocke les infos de l'utilisateur  pour pouvoir utiliser sur une nouvelle route
       next(); 
    } catch (error) {
        console.log(error);
        res.status(401).send('veuillez vous authentififié')
    }


}


module.exports=authentification;
*/