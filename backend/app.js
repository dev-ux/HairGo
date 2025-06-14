require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const synologyStorage = require('./services/synologyStorage');

const app = express();

// Fonction pour vérifier le JWT
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).json({ message: 'Aucun token fourni' });
  }
  try {
    const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token invalide' });
  }
};

// Fonction pour charger les utilisateurs depuis le fichier
const loadUsers = () => {
  try {
    const data = fs.readFileSync('data/users.json', 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

// Fonction pour sauvegarder les utilisateurs dans le fichier
const saveUsers = (users) => {
  try {
    fs.writeFileSync('data/users.json', JSON.stringify(users, null, 2));
  } catch (error) {
    console.error('Erreur lors de la sauvegarde:', error);
  }
};

// Configuration du stockage des fichiers
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = '/Volumes/HairGo/uploads'; // Chemin absolu vers le dossier monté
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Middleware
app.use(cors({
  origin: ['http://localhost:19006', 'http://localhost:8081', 'http://169.254.21.159:19006', 'http://169.254.21.159:8081'],
  credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static(process.env.SYNOLOGY_STORAGE));

// Charger les utilisateurs au démarrage
let users = loadUsers();

// Configuration du port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});

// Route pour lister les barbiers
app.get('/api/barbers', verifyToken, async (req, res) => {
  try {
    // Pour l\'instant, on simule les données avec des barbiers test
    const barbers = [
      {
        id: '1',
        nom: 'Dupont',
        prenom: 'Jean',
        specialite: 'Barbier expert en coupes modernes',
        ville: 'Paris',
        note_moyenne: 4.5,
        nb_avis: 123,
        avatar: 'https://via.placeholder.com/150',
        description: 'Barbier passionné avec plus de 10 ans d\'expérience',
        services: ['Coupe classique', 'Barbe', 'Dégradé'],
        prix_moyen: 35,
        horaires: {
          lundi: '9h-18h',
          mardi: '9h-18h',
          mercredi: '9h-18h',
          jeudi: '9h-18h',
          vendredi: '9h-18h',
          samedi: '9h-17h',
          dimanche: 'Fermé'
        }
      },
      {
        id: '2',
        nom: 'Martin',
        prenom: 'Pierre',
        specialite: 'Barbier spécialiste en barbes',
        ville: 'Lyon',
        note_moyenne: 4.8,
        nb_avis: 89,
        avatar: 'https://via.placeholder.com/150',
        description: 'Artisan barbier avec une approche artistique',
        services: ['Barbe artistique', 'Coupe moderne', 'Tondeuse'],
        prix_moyen: 40,
        horaires: {
          lundi: '10h-19h',
          mardi: '10h-19h',
          mercredi: '10h-19h',
          jeudi: '10h-19h',
          vendredi: '10h-19h',
          samedi: '10h-18h',
          dimanche: 'Fermé'
        }
      }
    ];

    res.json(barbers);
  } catch (error) {
    console.error('Erreur lors de la récupération des barbiers:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Route d'inscription
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, nom, prenom, dateNaissance, telephone, indicatif, genre } = req.body;
    
    // Vérifier si l'email existe déjà
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      return res.status(400).json({ message: 'Email déjà utilisé' });
    }

    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer l'utilisateur
    const user = {
      id: Date.now().toString(),
      email,
      password: hashedPassword,
      nom,
      prenom,
      dateNaissance,
      telephone: `${indicatif}${telephone}`,
      genre,
      avatar: null,
      createdAt: new Date()
    };

    // Sauvegarder l'utilisateur
    users.push(user);
    saveUsers(users);

    // Créer le token JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });

    res.status(201).json({
      token,
      user: {
        ...user,
        password: undefined
      }
    });
  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);
    res.status(500).json({ message: 'Erreur lors de l\'inscription' });
  }
});

// Route de connexion
app.post('/api/auth/login', async (req, res) => {
  try {
    console.log('Requête de connexion reçue:', req.body);
    const { email, password } = req.body;
    
    const user = users.find(u => u.email === email);
    if (!user) {
      console.log('Utilisateur non trouvé pour l\'email:', email);
      return res.status(400).json({ message: 'Email ou mot de passe incorrect' });
    }

    console.log('Utilisateur trouvé:', user.id, 'email:', user.email);
    const validPassword = await bcrypt.compare(password, user.password);
    console.log('Vérification du mot de passe:', validPassword);
    if (!validPassword) {
      console.log('Mot de passe incorrect pour l\'utilisateur:', user.id);
      return res.status(400).json({ message: 'Email ou mot de passe incorrect' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });

    res.json({
      token,
      user: {
        ...user,
        password: undefined
      }
    });
  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    res.status(500).json({ message: 'Erreur lors de la connexion' });
  }
});

app.post('/api/upload/avatar', verifyToken, upload.single('avatar'), async (req, res) => {
  try {
    console.log('Requête reçue avec token:', req.headers.authorization);
    console.log('Fichier reçu:', req.file);
    
    if (!req.file) {
      return res.status(400).json({ message: 'Aucun fichier n\'a été téléchargé' });
    }

    const user = users.find(u => u.id === req.user.id);
    if (!user) {
      console.error('Utilisateur non trouvé:', req.user.id);
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Mettre à jour l'avatar de l'utilisateur
    user.avatar = `/uploads/${req.file.filename}`;

    // Sauvegarder les changements
    saveUsers(users);

    // Uploader sur Synology
    const uploadPath = path.join('/Volumes/HairGo/uploads', req.file.filename);
    console.log('Chemin d\'upload:', uploadPath);
    
    await synologyStorage.uploadFile({
      path: uploadPath,
      buffer: fs.readFileSync(req.file.path)
    });

    res.json({ message: 'Avatar téléchargé avec succès', avatar: user.avatar });
  } catch (error) {
    console.error('Erreur lors de l\'upload:', error);
    res.status(500).json({ message: 'Erreur lors du téléchargement de l\'avatar', error: error.message });
  }
});

app.get('/api/users/profile', verifyToken, (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  if (!user) {
    console.error('Utilisateur non trouvé:', req.user.id);
    return res.status(404).json({ message: 'Utilisateur non trouvé' });
  }
  res.json({
    ...user,
    password: undefined
  });
});

app.get('/api/users', (req, res) => {
  res.json(users.map(user => ({
    ...user,
    password: undefined
  })));
});

// Configuration du port
