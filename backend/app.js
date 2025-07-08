require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: ['http://localhost:19006', 'http://localhost:8081', 'http://169.254.21.159:19006', 'http://169.254.21.159:8081'],
  credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use('/uploads', express.static('uploads'));

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

const loadUsers = () => {
  try {
    const data = fs.readFileSync('data/users.json', 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const saveUsers = (users) => {
  try {
    fs.writeFileSync('data/users.json', JSON.stringify(users, null, 2));
  } catch (error) {
    console.error('Erreur lors de la sauvegarde:', error);
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads'; 
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

let users = loadUsers();

app.get('/api/barbers', verifyToken, async (req, res) => {
  try {
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

app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, nom, prenom, dateNaissance, telephone, indicatif, genre } = req.body;
    
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      return res.status(400).json({ message: 'Email déjà utilisé' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

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

    users.push(user);
    saveUsers(users);

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

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(400).json({ message: 'Email ou mot de passe incorrect' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
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
    if (!req.file) {
      return res.status(400).json({ message: 'Aucun fichier n\'a été téléchargé' });
    }

    const user = users.find(u => u.id === req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    user.avatar = `/uploads/${req.file.filename}`;
    saveUsers(users);

    res.json({
      message: 'Avatar mis à jour avec succès',
      avatar: user.avatar
    });
  } catch (error) {
    console.error('Erreur lors de l\'upload:', error);
    res.status(500).json({ message: 'Erreur lors de l\'upload de l\'avatar' });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
