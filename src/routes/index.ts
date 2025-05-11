// src/routes/index.ts
import { Router } from 'express';
import { customerRoutes } from './customer.routes';

const router = Router();

// API 경로 설정
router.use('/customers', customerRoutes);

export default router;
