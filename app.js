const express = require('express')
const app = express()
const cors = require('cors')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const port = 3000

//Utilisation des variables sur .env
require('dotenv').config()
//Connexion à MongoDB
require('./config/db')

// Import des routes
const authRoutes = require('./routes/authRoutes')


// Config
const corsOption = {
    origin: 'http://localhost:3000'
}
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    message: {status: 429, error: 'Trop de requête, réessayez plus tard.'}
})

app.use(express.json())
app.use(
    helmet ({
        contentSecurityPolicy: false,
        crossOriginResourcePolicy: { policy: "cross-origin"}
    })
)
app.use(cors(corsOption))
app.use(limiter)

// Montage des routes
app.use('/api/v1/auth', authRoutes)

//       URL
app.get('/', (req, res) =>{
    res.send('Bienvenue sur mon API RESTful !')
})

app.listen(port, () =>{
    // Ce console log s'affiche uniquement côté SERVEUR et non CLIENT
    console.log(`Serveur démarré sur http://localhost:${port}`)
})