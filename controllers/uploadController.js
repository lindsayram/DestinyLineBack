const sharp = require('sharp')
const path = require('path')
const fs = require('fs/promises')
const Upload = require('../controllers/situationController')


exports.updateSituationImage = async (req, res) => {
    try {

        const { id } = req.params

        if (!req.file) {
            return res.status(400).json({message: 'Image not found'})}

        // On récupère le parc
        const result = await Upload.getSituation(id)

        if (result === 0) {
            return res.status(404).json({message: 'Situation not found'})
        }

        // const park = result.rows[0]

        // dossier upload
        const uploadFolder = path.join(
            process.cwd(),
            'upload',
            'situation'
        )

        await fs.mkdir(uploadFolder, {
            recursive: true
        })

        // Noms des nouvelles images
        const safeId = id.replace(/[^a-zA-Z0-9-_]/g, '')

        const timestamp = Date.now()

        const backgroundFilename = `${safeId}-${timestamp}-background.webp`

        const backgroundPath = path.join(uploadFolder, backgroundFilename)


        // Création de l'image background
        await sharp(req.file.buffer)
            .rotate()
            .resize({
                width: 1920,
                height: 1080,
                fit: 'cover'
            })
            .webp({
                quality: 85
            })
            .toFile(backgroundPath)

        // URL enregistrées en BDD
        const backgroundImageUrl = `/upload/situation/${backgroundFilename}`

        // mise à jour BDD
        const updatedSituation = await Upload.updateSituation( backgroundImageUrl, id)

        // 8. Suppression des anciennes images
        const oldImages = [
            situation.image
        ]

        for (const oldImage of oldImages) {

            if (!oldImage) continue

            const oldImagePath = path.join(
                process.cwd(),
                oldImage.replace(/^\/+/, '')
            )

            try {
                await fs.unlink(oldImagePath)
            } catch (err) {

                if (err.code !== 'ENOENT') {
                    throw err
                }
            }
        }

        return res.status(200).json({message: 'Situation image updated', situation: updatedSituation})

    } catch (err) {
        console.error('ERREUR UPLOAD :', err)

        return res.status(500).json({message: 'Error while modifying the image', error: err.message})
    }
}

