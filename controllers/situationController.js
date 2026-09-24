// Import models
const Situation = require('../models/situationModel')

// Display situation
exports.getSituation = async (req, res) => {
    try {
        // Situation exists?
        const isExistingSituation = await Situation.findById(req.params.idSituation)
        if(!isExistingSituation) {
            res.status(404).json({message : "Votre situation n'existe pas."})
        }

        // Response
        res.status(200).json({message : "Voici votre situation :"})
    } catch (err) {
        res.status(500).json({message : "Erreur serveur durant l'affichage des données", error: err.message})
    }    
}