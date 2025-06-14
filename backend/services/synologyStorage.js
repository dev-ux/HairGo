require('dotenv').config();
const fs = require('fs');
const path = require('path');

const STORAGE_PATH = process.env.SYNOLOGY_STORAGE || '/SynologyDrive/hairgo/uploads';

const synologyStorage = {
  async uploadFile(file) {
    try {
      // Créer le dossier s'il n'existe pas
      const uploadDir = path.dirname(file.path);
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      // Écrire le fichier
      fs.writeFileSync(file.path, file.buffer);
      
      return { message: 'Fichier téléchargé avec succès', path: file.path };
    } catch (error) {
      console.error('Erreur lors de l\'upload:', error);
      throw error;
    }
  },

  async getFile(filePath) {
    try {
      if (!fs.existsSync(filePath)) {
        throw new Error('Fichier non trouvé');
      }
      return fs.readFileSync(filePath);
    } catch (error) {
      console.error('Erreur lors du téléchargement:', error);
      throw error;
    }
  },

  async deleteFile(filePath) {
    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      throw error;
    }
  }
};

module.exports = synologyStorage;
