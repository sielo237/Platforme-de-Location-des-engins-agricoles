const express=require('express');
const Admin=require('../models/admin');
const Loueur=require('../models/loueur');
const User=require('../models/user');
const authentification=require('../middlewares/authentification');
const router= new express.Router();



//endpoint pour créer un compte
router.post('/admin/singup', async(req,res)=>{
    const admin= new Admin (req.body);

    try {
         
        //pour se connecter directement apres avoir créer un compte
        const authToken= await admin.generateAuthToken();
        res.status(201).send({admin,authToken});
        
       //pour se logger apres avoir créer un compte
       /* 
        const saveUser= await user.save();
        res.status(201).send(saveUser);
        */
        
    } catch (error) {
        res.status(400).send(error);
    }
  
});


// Middleware pour vérifier l'authentification et le rôle d'administrateur
router.use('/admin', (req, res, next) => {
    if (req.user.role !== 'Administrateur') {
      return res.status(403).send('Accès refusé');
    }
    next();
  });


//afficher tous les clients
router.get('/admin/users',async(req, res)=>{
try {
    const users=await User.find({});
    res.send(users);
} catch (error) {
    res.status(500).send(error);
    
}

});

//afficher tous les loueurs
router.get('/admin/loueurs',async(req, res)=>{
    try {
        const loueurs=await Loueur.find({});
        res.send(loueurs);
    } catch (error) {
        res.status(500).send(error);
        
    }
    
    });

    //afficher tous les loueurs dont le compte n'est pas validé
router.get('/admin/loueur/valide',async(req, res)=>{
    try {
        const loueurs=await Loueur.find({statut: "en attente"});
        res.send(loueurs);
    } catch (error) {
        res.status(500).send(error);
        
    }
    
    });

//afficher son profil
router.get('/admins/me',async(req, res)=>{
    
        
        res.send(req.user);
    
    
    });



// Endpoint pour rechercher un compte (Loueur ou Utilisateur) par e-mail
router.get('/admin/accounts/search', async (req, res) => {
    const email = req.query.email;
  
    try {
      let account;
  
      account = await Loueur.findOne({ email });
  
      if (!account) {
        account = await User.findOne({ email });
  
        if (!account) {
          return res.status(404).send('Aucun compte trouvé');
        }
      }
      res.send(account);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  // Endpoint pour mettre à jour le statut d'un compte loueur à partir de son email
  router.patch('/admin/loueur/:email', async (req, res) => {
    const email = req.params.email;
    const statut = req.body.statut;
  
    try {
      const loueur = await Loueur.findOneAndUpdate({ email }, { statut }, { new: true });
  
      if (!loueur) {
        // Si le compte n'est pas trouvé, renvoyer une réponse avec un message approprié
        return res.status(404).send("Aucun compte pour cet email");
      }
  
      res.send(loueur);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  

// route pour se connecter
router.post('/admin/login', async(req, res)=>{
    try {
        const admin=await  Admin.findAdmin(req.body.email, req.body.password);
        const authToken= await admin.generateAuthToken();
        res.send({admin, authToken });
    } catch (error) {
        res.status(400).send(error);
        
    }

});

// route pour se deconnecter
router.post('/admin/logout' , async(req, res)=>{
    try {
        req.admin.authTokens=req.admin.authTokens.filter((authToken)=>{//on accède a tous les tokens et on filtre le token en cours d'utilisation
            return authToken.authToken!==req.authToken;


        });
       await  req.admin.save();
       res.send();
    } catch (error) {
        res.status(500).send(error);
        
    }

});

// route pour se deconnecter sur tous les appareils
router.post('/admin/logout/all' , async(req, res)=>{
    try {
        req.admin.authTokens=[]; // on met un tableau vide ppur supprimer tous les tokens
        await req.admin.save();
       res.send();
    } catch (error) {
        res.status(500).send(error);
        
    }

});


module.exports=router;