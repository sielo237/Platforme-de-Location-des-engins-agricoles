const express=require('express');
const Location=require('../models/location');
const Engin=require('../models/engins');
const Loueur=require('../models/loueur');
const Categorie=require('../models/categorie');
const path=require('path');
const router= new express.Router();




// afficher les engins valide
router.get('/user/engins/valide', async (req, res) => {
    

    try {
      const enginsValide = await Engin.find({ statut: 'validé' })
        .populate('loueur')
        .populate('categorie');
      const enginsAValider = enginsValide.map((engin) => {
        
        const photosUrl = engin.photos.map((photo) => {
          const photoUrl = `${req.protocol}://${req.get('host')}/public/photo/${photo}`;
          
          return photoUrl.split(path.sep).join('/');
          
        });
        
        const documentUrl = `${req.protocol}://${req.get('host')}/public/document/${engin.document}`;
    const documentUrlFormatted = documentUrl.split(path.sep).join('/');
    
            return {
              _id: engin._id,
              nom: engin.nom,
              description: engin.description,
              loueur: engin.loueur,
              categorie: engin.categorie.nom,
              photos: photosUrl,
              disponibilite:engin.disponibilite,
              document: documentUrlFormatted,
            };
          });
      
          res.send(enginsAValider);
          
          console.log(enginsAValider);
        } catch (error) {
            console.log(error);
          res.status(500).send(error);
        }
      });



// route pour faire une location

router.post('/user/location', async (req, res) => {
  try {
    const enginId = req.body.enginId;
    
    const engin = await Engin.findById(enginId);
    //console.log(engin);
    if (!engin) {
      return res.status(404).send("L'engin spécifié n'existe pas");
    }

    const loueur = engin.loueur;
    const nouvelleCommande = new Location({
      nom: req.body.nom,
      prenom: req.body.prenom,
      email: req.body.email,
      engin: enginId,
      loueur: loueur,
      numeroTel: req.body.numeroTel,
      dateNaissance: req.body.dateNaissance,
      pays: req.body.pays,
      adresseLivraison: req.body.adresseLivraison,
      dateDebut: req.body.dateDebut,
      dateFin: req.body.dateFin,
      prixTotal:req.body.prixTotal,
    });

   
    const locac = await nouvelleCommande.save();
    res.send(locac);
  } catch (error) {
    res.status(500).send(error);
  }
});







/*
//endpoint pour créer un compte
router.post('/user/singup', async(req,res)=>{
    const user= new User(req.body);

    try {
        
        //pour se connecter directement apres avoir créer un compte
        const authToken= await user.generateAuthToken();
        res.status(201).send({user,authToken});
        /* 
        const saveUser= await user.save();
        res.status(201).send(saveUser);
        
    } catch (error) {
        res.status(400).send(error);
    }
  
});



//afficher son profil
router.get('/users/me',authentification,async(req, res)=>{
    
        
        res.send(req.user);
    
    
    });



// route pour se connecter
router.post('/user/login', async(req, res)=>{
    try {
        const user=await  User.findUser(req.body.email, req.body.password);
        const authToken= await user.generateAuthToken();
        res.send({user, authToken });
    } catch (error) {
        res.status(400).send(error);
        
    }

});

// route pour se deconnecter
router.post('/user/logout',authentification , async(req, res)=>{
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
router.post('/user/logout/all',authentification , async(req, res)=>{
    try {
        req.user.authTokens=[]; // on met un tableau vide ppur supprimer tous les tokens
        await req.user.save();
       res.send();
    } catch (error) {
        res.status(500).send(error);
        
    }

});
*/

module.exports=router;