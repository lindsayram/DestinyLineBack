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
        // Situation exists?
        const situation = await Situation.findById(req.params.idSituation)
        if(situation == null)
            return res.status(404).json({message: "Situation non trouvé"})

        // Verify role
        // const userRole = req.user.role
        // if(userRole != admin){
        //     return res.status(401).json({message : "Vous n'êtes pas autorisé"})
        // }

        // Datas recovery
        const {title, description, image, heroChoice, villainChoice} = req.body

        // Values allocation
        if(title != null){
            situation.title = title
        }
        
        if(description != null){
            situation.description = description
        }

        if(image != null){
            situation.image = image
        }

        if(heroChoice != null){
            situation.heroChoice = heroChoice
        }

        if(villainChoice != null){
            situation.villainChoice = villainChoice
        }

        // Response
        const newSituation = await situation.save()
        res.status(200).json({
            message : 'Vous avez modifié votre situation',
            newSituation
        }) 
    } catch (err) {
        res.status(500).json({message : "Erreur serveur durant l'update", error: err.message})
    }    
}

