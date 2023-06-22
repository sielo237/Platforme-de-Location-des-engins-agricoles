const express=require('express');
const Location=require('../models/location');
const Engin=require('../models/engins');
const Loueur=require('../models/loueur');
const Avis=require('../models/avis');
const Categorie=require('../models/categorie');
const emailService=require('../services/email');
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
              categorie: engin.categorie.nom,
              prix: engin.prix,
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
    if (!engin) {
      return res.status(404).send("L'engin spécifié n'existe pas");
    }

    const loueur = await Loueur.findById(engin.loueur);
    if (!loueur) {
      return res.status(404).send("Le loueur associé à l'engin n'existe pas");
    }

    
    const nouvelleCommande = new Location({
      nom: req.body.nom,
      prenom: req.body.prenom,
      email: req.body.email,
      engin: enginId,
      loueur: loueur._id,
      numeroTel: req.body.numeroTel,
      dateNaissance: req.body.dateNaissance,
      pays: req.body.pays,
      adresseLivraison: req.body.adresseLivraison,
      dateDebut: req.body.dateDebut,
      dateFin: req.body.dateFin,
      prixTotal: req.body.prixTotal,
    });

    const locac = await nouvelleCommande.save();

    // Envoi d'un e-mail au locataire
    const locataireMessage = `Votre demande de location de l'engin "${engin.nom}" a été enregistrée et est en attente de confirmation.`;
    const locataireSubject = "Demande de location enregistrée";
    const locataireEmailContent = `${locataireMessage}`;

    await emailService.sendEmail(req.body.email, locataireSubject, locataireEmailContent);

    // Envoi d'un e-mail au loueur
    const loueurMessage = `Vous avez une demande de location pour votre engin "${engin.nom}".
      Informations du locataire :
      - Nom: ${req.body.nom}
      - Adresse e-mail: ${req.body.email}
      - Adresse de livraison: ${req.body.adresseLivraison}`;

    const loueurSubject = "Nouvelle demande de location";
    const loueurEmailContent = `${loueurMessage}`;
    //console.log(loueur.email);
    await emailService.sendEmail(loueur.email, loueurSubject, loueurEmailContent);

    res.send(locac);
  } catch (error) {
    res.status(500).send(error);
  }
});




//afficher les categories
router.get('/user/Getcategorie', async(req,res)=>{
  
  try {
    const cats= await Categorie.find({});
    res.send(cats)
    } catch (error) {
      res.status(500).send(error);

    }

});



// Route pour créer un avis
router.post('/user/avis', async (req, res) => {

      try {
        const { loueurId, commentaire, note, email } = req.body;
    
        const loueur = await Loueur.findById(loueurId);
    
        if (!loueur) {
          return res.status(404).send("Le loueur spécifié n'existe pas");
        }

        if (note>5 || 0> note ) {
          return res.status(400).send("La note ne dois pas dépasser 5");
        }

    
        // Calcule la nouvelle note totale
        const nouvelleNoteTotale = (loueur.noteTotale * loueur.nombreAvis + note) / (loueur.nombreAvis + 1);
    
        // MAJ du loueur avec la nouvelle note totale et le nombre d'avis
        loueur.noteTotale = nouvelleNoteTotale;
        loueur.nombreAvis = loueur.nombreAvis + 1;
    
        await loueur.save();
    
        // Crée un nouvel avis
        const nouvelAvis = new Avis({
          email,
          loueurId: loueurId,
          commentaire,
          note,
        });
    
        const avis = await nouvelAvis.save();
        res.status(201).send(avis);
      } catch (error) {
        res.status(500).send(error);
      }
    });
    

// Route pour obtenir tous les avis d'un loueur
router.get('/loueur/Avis/:loueurId', async (req, res) => {
  try {
    const loueurId = req.params.loueurId;
    const avis = await Avis.find({ loueurId: loueurId });

    res.status(200).send(avis);
  } catch (error) {
    res.status(500).send(error);
  }
});


// route pour afficher la note totale d'un loeur
router.get('/loueur/note/:loueurId', async (req, res) => {
  try {
    const loueurId = req.params.loueurId;

    const loueur = await Loueur.findById(loueurId);
    const noteTotale = loueur.noteTotale;

    res.status(200).send({ noteTotale });
  } catch (error) {
    res.status(500).send(error);
  }
});






module.exports=router;