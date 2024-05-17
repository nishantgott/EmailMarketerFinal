import express from 'express';
import { addCampaignController, addMessageController, deleteCampaignController, getCampaigns } from '../controllers/campaignControllers.js';

const router = express.Router();

router.post('/add-campaign', addCampaignController);

router.delete('/delete-campaign', deleteCampaignController);

router.get('/get-campaigns', getCampaigns);

router.post('/add-message', addMessageController);

export default router;