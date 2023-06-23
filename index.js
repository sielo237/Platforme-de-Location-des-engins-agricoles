require("dotenv").config();
const express=require('express');
const app=express();
const cors=require('cors');
const connection=require('./db');
const userRoutes=require('./routes/user');
const loueurRoutes=require('./routes/loueur');
const adminRoutes=require('./routes/admin');
const ahpRoutes=require('./routes/ahp');
require('dotenv').config();
const path=require('path');




//connexion  la base de données
connection();

app.use(express.json());
app.use(cors());
app.use(express.static('public'));
//app.use('/photos', express.static('public/photos'));
app.use('/images', express.static(path.join(__dirname, 'public/photos')));
app.use('/document', express.static(path.join(__dirname,'public/document')));

app.use(userRoutes);
app.use(loueurRoutes);
app.use(adminRoutes);
app.use(ahpRoutes);


// fonction pour générer une clé jwt
/*function generateJWTSecret(length){
    const charset='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789&éùàç';
    let secret='';
    for(let i=0;length>i;i++){
        const randomIndex=Math.floor(Math.random()*charset.length);
        secret+= charset[randomIndex];
    }
    return secret;
    
}
const cle=generateJWTSecret(64);


console.log(cle);
*/

const port= process.env.PORT || 3000;
app.listen(port,()=>console.log("serveur démarrer sur le port "+port));
