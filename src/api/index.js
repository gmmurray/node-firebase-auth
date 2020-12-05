import { router } from 'express';

import verifyAdminToken from '../firebase-admin/verification';
import adminController from './admin/controller';

router.use('/admin', verifyAdminToken, adminController);

export default router;
