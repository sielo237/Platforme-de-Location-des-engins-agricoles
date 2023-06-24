const express = require('express');
const router = new express.Router();
const Loueur = require('../models/loueur');
const Location = require('../models/location');
const Engin = require('../models/engins');

// Fonction pour normaliser une matrice de comparaisons
function normalizeMatrix(matrix) {
  const numCriteria = matrix.length;
  const normalizedMatrix = [];

  for (let i = 0; i < numCriteria; i++) {
    const row = matrix[i];
    const sum = row.reduce((acc, val) => acc + val, 0);
    const normalizedRow = row.map((val) => val / sum);
    normalizedMatrix.push(normalizedRow);
  }

  return normalizedMatrix;
}

// Fonction pour calculer le vecteur de priorité
function calculatePriorityVector(matrix) {
  const numCriteria = matrix.length;
  const priorityVector = [];

  for (let i = 0; i < numCriteria; i++) {
    const row = matrix[i];
    const sum = row.reduce((acc, val) => acc + val, 0);
    const average = sum / numCriteria;
    priorityVector.push(average);
  }

  return priorityVector;
}

// Fonction pour calculer l'indice de cohérence CR
function calculateCR(comparisons, weights) {
  const numCriteria = comparisons.length;
  const numAlternatives = comparisons[0].length;

  const sumRows = new Array(numCriteria).fill(0);
  const sumColumns = new Array(numAlternatives).fill(0);

  for (let i = 0; i < numCriteria; i++) {
    for (let j = 0; j < numAlternatives; j++) {
      sumRows[i] += comparisons[i][j];
      sumColumns[j] += comparisons[i][j] * weights[i];
    }
  }

  const lambdaMax = sumColumns.reduce((acc, val) => acc + val, 0) / numAlternatives;
  const consistencyIndex = (lambdaMax - numCriteria) / (numCriteria - 1);
  const randomIndex = 0.58; // Valeur de référence pour N = 3
  const consistencyRatio = consistencyIndex / randomIndex;

  return consistencyRatio;
}

// Fonction pour calculer les poids des critères
function calculateWeights(comparisons) {
  const normalizedMatrix = normalizeMatrix(comparisons);
  const weights = calculatePriorityVector(normalizedMatrix);
  const cr = calculateCR(comparisons, weights);

  if (cr > 0.1) {
    throw new Error("La matrice de comparaisons n'est pas cohérente. Veuillez vérifier les valeurs des comparaisons.");
  }

  return weights;
}

// Fonction pour obtenir le nombre de commandes d'un loueur
async function getNombreCommandes(loueurId) {
  const nombreCommandes = await Location.countDocuments({ loueur: loueurId });
  return nombreCommandes;
}


// Endpoint pour le processus AHP
// Endpoint pour le processus AHP
router.post('/api/ahp', async (req, res) => {
  try {
    const criteria = ['prix', 'note', 'commandes'];
    const comparisons = req.body.comparisons;
    const engins = await Engin.find({}).populate('loueur');

    const weights = calculateWeights(comparisons);

    // Synthèse des résultats
    const synthesizedResults = [];

    for (const engin of engins) {
      const result = {};
      result._id = engin.loueur._id; 
      result.name = engin.loueur.nom;
      result.prix = engin.prix;
      result.note = engin.loueur.noteTotale;

      // Requête pour compter le nombre de commandes du loueur à partir de la collection "location"
      const nombreCommandes = await getNombreCommandes(engin.loueur._id);
      result.commandes = nombreCommandes;

      // Utilisez le poids correspondant à l'index de l'engin
      const enginIndex = engins.findIndex((e) => e._id.toString() === engin._id.toString());
      result.weight = weights[enginIndex];

      synthesizedResults.push(result);
    }

    res.json(synthesizedResults);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;



