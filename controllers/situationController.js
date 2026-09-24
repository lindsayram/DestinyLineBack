
exports.getSituation = async (req, res) => {
    const { idUser } = req.user._id
    if(!idUser)
        return res.status(404).json({ message: "Utilisateur non trouvé"})
}