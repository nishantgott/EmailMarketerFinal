import express from 'express';
import { getCampaignAndTemplatesController, getCampaignTemplateClickController, getCampaignTemplateOpenController, getCampaignTemplatesController, getClickController, getOpenController, getTotalController } from '../controllers/analyticsController.js';

const router = express.Router();

router.post('/get-total', getTotalController);

router.post('/get-open', getOpenController);

router.post('/get-click', getClickController);

router.post('/get-campaign-templates', getCampaignTemplatesController);

router.post('/get-campaign-template-open', getCampaignTemplateOpenController);

router.post('/get-campaign-template-click', getCampaignTemplateClickController);

router.post('/get-using-campaign-template', getCampaignAndTemplatesController);

export default router;