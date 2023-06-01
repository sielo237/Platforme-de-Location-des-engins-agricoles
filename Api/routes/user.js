const express=require('express');
const User=require('../models/user');
const authentification=require('../middlewares/authentification');
const router= new express.Router();




//endpoint pour créer un compte
router.post('/singup', async(req,res)=>{
    const user= new User(req.body);

    try {
        /* 
        //pour se connecter directement apres avoir créer un compte
        const authToken= await user.generateAuthToken();
        res.status(201).send({user,authToken});
        */
        const saveUser= await user.save();
        res.status(201).send(saveUser);
        
    } catch (error) {
        res.status(400).send(error);
    }
  
});


//afficher tous les clients
router.get('/users',authentification,async(req, res)=>{
try {
    const users=await User.find({});
    res.send(users);
} catch (error) {
    res.status(500).send(error);
    
}

});

//afficher son profil
router.get('/users/me',authentification,async(req, res)=>{
    
        
        res.send(req.user);
    
    
    });



//endpoint pour rechercher un client
router.get('/singin/:id', authentification, async(req, res)=>{

    const userI = req.params.id; 
    try {
        const user= await User.findById(userI);
        res.send(user);
       
    } catch (error) {
        res.status(500).send(error);
        
    }
});


// route pour se connecter
router.post('/login', async(req, res)=>{
    try {
        const user=await  User.findUser(req.body.email, req.body.password);
        const authToken= await user.generateAuthToken();
        res.send({user, authToken });
    } catch (error) {
        res.status(400).send(error);
        
    }

});

// route pour se deconnecter
router.post('/logout',authentification , async(req, res)=>{
    try {
        req.user.authTokens=req.user.authTokens.filter((authToken)=>{//on accède a tous les tokens et on filtre le token en cours d'utilisation
            return authToken.authToken!==req.authToken;


        });
       await  req.user.save();
       res.send();
    } catch (error) {
        res.status(500).send(error);
        
    }

});

// route pour se deconnecter sur tous les appareils
router.post('/logout/all',authentification , async(req, res)=>{
    try {
        req.user.authTokens=[]; // on met un tableau vide ppur supprimer tous les tokens
        await req.user.save();
       res.send();
    } catch (error) {
        res.status(500).send(error);
        
    }

});


module.exports=router;