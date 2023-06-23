const express=require('express');
const Admin=require('../models/admin');
const Loueur=require('../models/loueur');
const Location=require('../models/location');
const Engin=require('../models/engins');
const Categorie=require('../models/categorie');
const path=require('path');
const authentification=require('../middlewares/authentification');
const emailService=require('../services/email');
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



// Middleware pour vérifier l'authentification et le rôle d'administrateur
//router.use('/admin/', authentification);

// ajouter une catégorie
router.post('/admin/categorie',authentification, async(req,res)=>{
  const cat= new Categorie(req.body);
  try {
    const saveCat= await Categorie.create(cat);
    res.status(201).send(saveCat);
    } catch (error) {
      res.status(400).send(error);
    }


});


//afficher toutes les location
router.get('/admin/location',authentification,async(req, res)=>{
try {
    const users=await Location.find({});
    res.send(users);
} catch (error) {
    res.status(500).send(error);
    
}

});

//afficher toutes les location validé ou non 
router.get('/admin/location',authentification,async(req, res)=>{
  try {
      const location=await Location.find().populate('loueur');
      res.send(location);
  } catch (error) {
      res.status(500).send(error);
      
  }
  
  });


  

 
//afficher tous les loueurs
router.get('/admin/loueurs',authentification,async(req, res)=>{
    try {
        const loueurs=await Loueur.find({});
        res.send(loueurs);
    } catch (error) {
        res.status(500).send(error);
        
    }
    
    });

    //afficher tous les loueurs dont le compte n'est pas validé
router.get('/admin/loueur/valide',authentification,async(req, res)=>{
    try {
        const loueurs=await Loueur.find({statut: "en attente"});
        res.send(loueurs);
    } catch (error) {
        res.status(500).send(error);
        
    }
    
    });

//afficher son profil
router.get('/admins/me',authentification,async(req, res)=>{
    
        
        res.send(req.user);
    
    
    });



// Endpoint pour rechercher un compte (Loueur ou Utilisateur) par e-mail
router.get('/admin/accounts/search',authentification, async (req, res) => {
    const email = req.query.email;
  
    try {
      let account;
  
      account = await Loueur.findOne({ email });
  
      if (!account) {
        account = await Location.findOne({ email });
  
        if (!account) {
          return res.status(404).send('Aucun compte trouvé');
        }
      }
      res.send(account);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
// afficher les engins en attente
  router.get('/admin/engins/attente',authentification, async (req, res) => {
    

try {
  const enginsEnAttente = await Engin.find({ statut: 'en attente de confirmation' })
    .populate('loueur')
    .populate('categorie');

  const enginsAValider = enginsEnAttente.map((engin) => {
    const photosUrl = engin.photos.map((photo) => {
      const photoUrl = `${req.protocol}://${req.get('host')}/${photo}`;
      return photoUrl.split(path.sep).join('/');
    });

    const documentUrl = `${req.protocol}://${req.get('host')}/${engin.document}`;
    const documentUrlFormatted = documentUrl.split(path.sep).join('/');

        return {
          _id: engin._id,
          nom: engin.nom,
          description: engin.description,
          loueur: engin.loueur,
          prix: engin.prix,
          disponibilite: engin.disponibilite,
          statut: engin.statut,
          categorie: engin.categorie.nom,
          photos: photosUrl,
          document: documentUrlFormatted,
        };
      });
  
      res.send(enginsAValider);
    } catch (error) {
      res.status(500).send(error);
    }
  });

 

  // afficher tous les engins
  router.get('/admin/engins/All',authentification, async (req, res) => {
    

    try {
      const enginsEnAttente = await Engin.find()
        .populate('loueur')
        .populate('categorie');
    
      const enginsAValider = enginsEnAttente.map((engin) => {
        const photosUrl = engin.photos.map((photo) => {
          const photoUrl = `${req.protocol}://${req.get('host')}/${photo}`;
          return photoUrl.split(path.sep).join('/');
        });
    
        const documentUrl = `${req.protocol}://${req.get('host')}/${engin.document}`;
        const documentUrlFormatted = documentUrl.split(path.sep).join('/');
    
            return {
              _id: engin._id,
              nom: engin.nom,
              description: engin.description,
              loueur: engin.loueur,
              prix: engin.prix,
              disponibilite: engin.disponibilite,
              statut: engin.statut,
              categorie: engin.categorie.nom,
              photos: photosUrl,
              document: documentUrlFormatted,
            };
          });
      
          res.send(enginsAValider);
        } catch (error) {
          res.status(500).send(error);
        }
      });

  // afficher les publication mise a jour et dont on doit valider
  router.get('/admin/engins/maj',authentification, async (req, res) => {
    

    try {
      const enginsEnAttente = await Engin.find({ statut: 'Mise a jour' })
        .populate('loueur')
        .populate('categorie');
    
      const enginsAValider = enginsEnAttente.map((engin) => {
        const photosUrl = engin.photos.map((photo) => {
          const photoUrl = `${req.protocol}://${req.get('host')}/public/photo/${photo}`;
          return photoUrl.split(path.sep).join('/');
        });
    
        const documentUrl = `${req.protocol}://${req.get('host')}/public/document/${engin.document}`;
        const documentUrlFormatted = documentUrl.split(path.sep).join('/');
    
      /*  
        try {
          const enginsEnAttente = await Engin.find({ statut: 'en attente de confirmation' }).populate('loueur').populate('categorie');
      
          const enginsAValider = enginsEnAttente.map((engin) => {
            
            const photosUrl = engin.photos.map((photo) => `${req.protocol}://${req.get('host')}/public/photo/${photo}`);
      
            
            const documentUrl = `${req.protocol}://${req.get('host')}/public/document/${engin.document}`;
            */
            return {
              _id: engin._id,
              nom: engin.nom,
              description: engin.description,
              loueur: engin.loueur,
              prix: engin.prix,
              categorie: engin.categorie.nom,
              photos: photosUrl,
              document: documentUrlFormatted,
            };
          });
      
          res.send(enginsAValider);
        } catch (error) {
          res.status(500).send(error);
        }
      });

      
 // valider ou refuser une publication d'engin
router.put('/admin/validation/:enginId', authentification, async (req, res) => {
  const enginId = req.params.enginId;
  const { statut, commentaire } = req.body;

  try {
    const engin = await Engin.findById(enginId);
    if (!engin) {
      return res.status(404).send("L'engin spécifié n'existe pas");
    }

    // Mettre à jour le statut de l'engin
    engin.statut = statut;
    engin.commentaire = commentaire;
    await engin.save();

    // Envoi d'un e-mail au loueur
    const loueur = await Loueur.findById(engin.loueur);
    if (!loueur) {
      return res.status(404).send("Le loueur associé à l'engin n'existe pas");
    }

    const message = (statut === 'validé') ? `Votre publication concernant l'engin "${engin.nom}" a été validée. Vous pouvez dès à présent le consulter sur notre platforme.` : `Votre publication concernant l'engin "${engin.nom}" a été refusée.`;
    const subject = (statut === 'validé') ? "Publication d'engin validée" : "Publication d'engin refusée";
    const emailContent = `${message}\n\nCommentaire : ${commentaire}`;

    await emailService.sendEmail(loueur.email, subject, emailContent);

    res.send(engin);
  } catch (error) {
    res.status(500).send(error);
  }
});


  /*
  // Endpoint pour mettre à jour le statut d'un compte loueur à partir de son email
  router.patch('/admin/loueur/:email',authentification, async (req, res) => {
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
  */


// route pour se deconnecter
router.post('/admin/logout' ,authentification, async(req, res)=>{
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
router.post('/admin/logout/all' ,authentification, async(req, res)=>{
    try {
        req.admin.authTokens=[]; // on met un tableau vide ppur supprimer tous les tokens
        await req.admin.save();
       res.send();
    } catch (error) {
        res.status(500).send(error);
        
    }

});


module.exports=router;