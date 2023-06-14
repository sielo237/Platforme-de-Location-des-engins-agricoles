const express=require('express');
const Loueur=require('../models/loueur');
const Engin=require('../models/engins');
const Categorie=require('../models/categorie');
const authentification=require('../middlewares/authentification');
const multer= require('multer');
const path=require('path');
const router= new express.Router();


//const upload = multer({ dest: path.resolve(__dirname, '../public') });

// Configurer Multer pour gérer l'enregistrement des fichiers

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'photos') {
      cb(null, 'public/photos');
    } else if (file.fieldname === 'document') {
      cb(null, 'public/documents');
    } else {
      cb(new Error('Champ de fichier invalide'));
    }
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    cb(null, uniqueSuffix + extension);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // Limite la taille des fichiers à 10 Mo
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === 'image/jpeg' ||
      file.mimetype === 'image/png' ||
      file.mimetype === 'application/pdf'
    ) {
      cb(null, true);
    } else {
      cb(new Error('Type de fichier non supporté'));
    }
  },
});


 router.post('/loueur/singup', async(req,res)=>{
    const loueur= new Loueur (req.body);
    try {
        
        //pour se connecter directement apres avoir créer un compte
        const authToken= await loueur.generateAuthToken();
        res.status(201).send({loueur,authToken});
        
        // pour ne pas se connecter directement
        /* 
        const saveLoueur= await loueur.save();
        res.status(201).send(saveLoueur);
        */
        
    } catch (error) {
        res.status(400).send(error);
    }
  
});

// route pour faire une publication 
router.post('/loueur/engin', authentification, upload.fields([
  { name: 'photos', maxCount: 7 },
  { name: 'document', maxCount: 1 }
]), async (req, res) => {
  
  console.log(req.files);
  const { categorie, nom, description } = req.body;
  const loueurId = req.user._id;
  const photos = req.files['photos'].map(file => file.path.replace('public/', ''));
  const document = req.files['document'][0].path.replace('public/', '');

  try {
    // Vérifier si la catégorie existe 
    const existingCategorie = await Categorie.findOne({ nom: categorie });
    if (!existingCategorie) {
      return res.status(404).send("La catégorie spécifiée n'existe pas");
    }

    const engin = new Engin({
      nom,
      description,
      loueur: loueurId,
      categorie: existingCategorie._id,
      photos,
      document,
    });

    const saveEngin = await engin.save();
    res.status(201).send(saveEngin);
  } catch (error) {
    res.status(500).send(error);
  }
});



//afficher son profil
router.get('/loueur/me',authentification,async(req, res)=>{
    
        
        res.send(req.user);
    
    
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