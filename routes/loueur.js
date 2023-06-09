const express=require('express');
const Loueur=require('../models/loueur');
const authentification=require('../middlewares/authentification');
const multer= require('multer');
const path=require('path');
const router= new express.Router();


const upload = multer({ dest: path.resolve(__dirname, '../public') });

//endpoint pour créer un compte
router.post('/loueur/singup', upload.single('document'), async(req,res)=>{
    const loueur= new Loueur(req.body);
    loueur.document=req.file ? req.file.path : '';
    if (!loueur.document) {
        return res.status(400).json({ error: "Veuillez fournir un document obligatoirement." });
      }
      
    try {
        /* 
        //pour se connecter directement apres avoir créer un compte
        const authToken= await user.generateAuthToken();
        res.status(201).send({user,authToken});
        */
        
        
        const saveLoueur= await loueur.save();
        res.status(201).send(saveLoueur);
        
    } catch (error) {
        res.status(400).send(error);
    }
  
});


//afficher tous les loueurs
router.get('/loueurs',authentification,async(req, res)=>{
try {
    const loueurs=await Loueur.find({});
    res.send(loueurs);
} catch (error) {
    res.status(500).send(error);
    
}

});

//afficher son profil
router.get('/loueur/me',authentification,async(req, res)=>{
    
        
        res.send(req.user);
    
    
    });



//endpoint pour rechercher un client
router.get('/loueur/singin/:id', authentification, async(req, res)=>{

    const loueurI = req.params.id; 
    try {
        const loueur= await Loueur.findById(loueurI);
        res.send(loueur);
       
    } catch (error) {
        res.status(500).send(error);
        
    }
});


// route pour se connecter
router.post('/loueur/login', async(req, res)=>{
    try {
        const loueur=await  Loueur.findLoueur(req.body.email, req.body.password);
        const authToken= await loueur.generateAuthToken();
        res.send({loueur, authToken });
    } catch (error) {
        res.status(400).send(error);
        
    }

});

// route pour se deconnecter
router.post('/loueur/logout',authentification , async(req, res)=>{
    try {
        req.loueur.authTokens=req.loueur.authTokens.filter((authToken)=>{//on accède a tous les tokens et on filtre le token en cours d'utilisation
            return authToken.authToken!==req.authToken;


        });
       await  req.loueur.save();
       res.send();
    } catch (error) {
        res.status(500).send(error);
        
    }

});

// route pour se deconnecter sur tous les appareils
router.post('/loueur/logout/all',authentification , async(req, res)=>{
    try {
        req.loueur.authTokens=[]; // on met un tableau vide ppur supprimer tous les tokens
        await req.loueur.save();
       res.send();
    } catch (error) {
        res.status(500).send(error);
        
    }

});


module.exports=router;