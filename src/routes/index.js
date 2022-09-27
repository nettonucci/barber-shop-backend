import express from 'express'

import healthController from '../controllers/healthController.js';

const router = express.Router();

router.get('/', healthController
    // #swagger.tags = ['Health']
    // #swagger.description = 'Endpoint to check if the API is running.'
)

router.get('/health', healthController
    // #swagger.tags = ['Health']
    // #swagger.description = 'Endpoint to check if the API is running.'
)


export default router;