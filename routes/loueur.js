const express=require('express');
const Loueur=require('../models/loueur');
const Engin=require('../models/engins');
const Categorie=require('../models/categorie');
const Location=require('../models/location');
const authentification=require('../middlewares/authentification');
const emailService=require('../services/email');
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

// route pour faire une publication d'engin
router.post('/loueur/engin', authentification, upload.fields([
  { name: 'photos', maxCount: 7 },
  { name: 'document', maxCount: 1 }
]), async (req, res) => {
  
  //console.log(req.files);
  const { categorie, nom, description, prix } = req.body;
  const loueurId = req.user._id;
  /*
  const photos = req.files['photos'].map(file => file.path.replace('public/', ''));
  const document = req.files['document'][0].path.replace('public/', '');
  */
  const photos = req.files['photos'].map(file => file.path.replace('public\\', '').split('\\').join('/'));
  const document = req.files['document'][0].path.replace('public\\', '').split('\\').join('/');
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
      prix,
    });

    const saveEngin = await engin.save();
    res.status(201).send(saveEngin);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Route pour mettre à jour les informations d'un engin
router.put('/loueur/engin/:id', authentification, upload.fields([
  { name: 'photos', maxCount: 7 },
  { name: 'document', maxCount: 1 }
]), async (req, res) => {
  const enginId = req.params.id;
  const { categorie, nom, description, prix } = req.body;
  const photos = req.files['photos'].map(file => file.path.replace('public\\', '').split('\\').join('/'));
  const document = req.files['document'][0].path.replace('public\\', '').split('\\').join('/');
  try {

    // Vérifier si l'engin existe
    const existE = await Engin.findById(enginId);
    if (!existE) {
      return res.status(404).send("L'engin spécifié n'existe pas");
    }

    const existC= await Categorie.findOne({ nom: categorie });
    if (!existC) {
      return res.status(404).send("La catégorie spécifiée n'existe pas");
    }

    // Mettre à jour les champs de l'engin
    existE.nom = nom;
    existE.description = description;
    existE.categorie = existC._id;
    existE.prix = prix;

    if (photos.length > 0) {
      existE.photos = photos;
    }

    if (document) {
      existE.document = document;
    }
    // Réinitialiser le statut de l'engin
    existE.statut = 'Mise a jour';

    const updatedEngin = await existE.save();
    res.status(200).send(updatedEngin);
  } catch (error) {
    res.status(500).send("impossible d'effectuer la MAJ "+error);
    
  }
});


// afficher ses demandes de location
router.get('/loueur/location',authentification, async (req, res) => {
  try {
   const loueurId = req.user._id;
    //console.log(loueurId) ;
    const demandesLocation = await Location.find({ loueur: loueurId }).populate('engin');
    //console.log(demandesLocation);
    res.send(demandesLocation);
  } catch (error) {
    res.status(500).send(error);
  }
});

// valider une location
router.put('/loueur/ValideLocation/:locationId/', authentification, async (req, res) => {
  try {
    const locationId = req.params.locationId;
    const location = await Location.findById(locationId).populate('engin');

    if (!location) {
      return res.status(404).send("Cette location n'existe pas");
    }

    const engin = location.engin;
    location.statut = 'validée';
    engin.disponibilite = false;
    await location.save();
    await engin.save();

    const locataireMessage = `Votre demande de location de l'engin "${engin.nom}" a été validée.\n\nInformations de la location :\n- Date de début : ${location.dateDebut}\n- Date de fin : ${location.dateFin}\n- Prix total : ${location.prixTotal}\n\nVous pouvez effectuer le paiement en utilisant le lien suivant : https:`;
    const locataireSubject = "Demande de location validée";
    const locataireEmailContent = `${locataireMessage}`;

    await emailService.sendEmail(location.email, locataireSubject, locataireEmailContent);

    res.send('La location a été validée');
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
});


// Refuser une location
router.put('/loueur/RefuseLocation/:locationId/', authentification, async (req, res) => {
    try {
    const locationId = req.params.locationId;
    const location = await Location.findById(locationId).populate('engin');

    if (!location) {
      return res.status(404).send("Cette location n'existe pas");
    }

    const engin = location.engin;
    location.statut = 'refusée';
    engin.disponibilite = false;
    await location.save();
    await engin.save();

    const locataireMessage = `Votre demande de location de l'engin "${engin.nom}" a été refusée.\n\nInformations de la location :\n- Date de début : ${location.dateDebut}\n- Date de fin : ${location.dateFin}\n- Prix total : ${location.prixTotal}\n\nVous pouvez effectuer une autre location sur notre platforme via : https:`;
    const locataireSubject = "Demande de location refusée";
    const locataireEmailContent = `${locataireMessage}`;

    await emailService.sendEmail(location.email, locataireSubject, locataireEmailContent);

    res.send('La location a été annulée');
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
});


// Afficher les locations refusées
router.get('/loueur/locationsRefusees', authentification, async (req, res) => {
  try {
    const refuse = await Location.find({ statut: 'refusée' }).populate('engin');
    res.send(refuse);
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
});

// Afficher les locations acceptées
router.get('/loueur/locationsAcceptees', authentification, async (req, res) => {
  try {
    const accept = await Location.find({ statut: 'validée' }).populate('engin');
    res.send(accept);
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
});



//afficher son profil
router.get('/loueur/me',authentification,async(req, res)=>{
    
        
        res.send(req.user);
    
    
    });

// route pour afficher ses engins
router.get('/loueur/engins', authentification, async (req, res) => {
  const loueurId = req.user._id;

  try {
    const engins = await Engin.find({ loueur: loueurId }).populate('categorie');
    res.send(engins);
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
router.post('/loueur/logout/all',authentification , async(req, res)=>{
    try {
        req.user.authTokens=[]; // on met un tableau vide ppur supprimer tous les tokens
        await req.user.save();
       res.send();
    } catch (error) {
        res.status(500).send(error);
        
    }

});


module.exports=router;