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
        res.status(200).json({message : "Voici votre situation :", isExistingSituation})
    } catch (err) {
        res.status(500).json({message : "Erreur serveur durant l'affichage des données", error: err.message})
    }    
}

exports.deleteSituation = async (req, res) => {
    try {
        const situation = await Situation.findById(req.params.idSituation)
        if(situation == null)
            return res.status(404).json({message: "Situation non trouvé"})
        
        await situation.deleteOne()
        res.json({message: "La situation à été supprimé"})
    } catch (err) {
        res.status(500).json({message : "Erreur serveur durant la suppresion", error: err.message})
    }    
}

exports.updateSituation = async (req, res) => {
    try {
        
    } catch (err) {
        res.status(500).json({message : "Erreur serveur durant l'update", error: err.message})
    }    
}

