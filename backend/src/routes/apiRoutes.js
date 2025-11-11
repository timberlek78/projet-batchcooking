import express from 'express';

const router = express.Router();

router.get('/hello', async (req, res) => {
  try {
    res.json({ message: 'Bonjour tous le monde' });
  } catch (error) {
    res.status(500).json({ status: '❌ Erreur de connexion', error: error.message });
  }
});

export default router;
