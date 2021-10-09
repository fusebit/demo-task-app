import express from 'express';
import path from 'path';

// const config: Config = {};

const router = express.Router();

router.get('/static/:filename', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public', req.params.filename));
});
router.get('/client/:filename', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../dist', req.params.filename));
});
router.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../dist', 'index.html'));
});

export default router;
