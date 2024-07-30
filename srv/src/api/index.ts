import express from 'express';
import MessageResponse from '../interfaces/MessageResponse';

const router = express.Router();

router.get<Record<string, never>, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

//router.use('/users', users);

export default router;
