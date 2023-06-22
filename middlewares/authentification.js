const jwt = require('jsonwebtoken');
const User = require('../models/location');
const Loueur = require('../models/loueur');
const Admin = require('../models/admin');
require('dotenv').config();

const authentification = async (req, res, next) => {
  try {
    const authToken = req.header('Authorization').replace('Bearer ', '');
    //console.log(authToken);
    const decodedToken = jwt.verify(authToken, process.env.CLE);
    console.log(process.env.CLE);

    let user;
    if (decodedToken.role === 'agriculteur') {
      user = await User.findOne({ _id: decodedToken._id, 'authTokens.authToken': authToken });
    }
    if (!user && decodedToken.role === 'Loueur') {
      user = await Loueur.findOne({ _id: decodedToken._id, 'authTokens.authToken': authToken });
    }

    if (!user && decodedToken.role === 'Administrateur') {
      user = await Admin.findOne({ _id: decodedToken._id, 'authTokens.authToken': authToken });
    }

    if (!user) throw new Error();
    
    req.authToken = authToken; // on accède au token actuel de l'utilisateur
    req.user = user; // on stocke les infos de l'utilisateur  pour pouvoir utiliser sur une nouvelle route
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send('Veuillez vous authentifier');
  }
};

module.exports = authentification;

