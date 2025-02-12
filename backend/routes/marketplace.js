import express from 'express';
import {uploadToMarketplace} from "../controllers/MarketPlaceController.js";
const router = express.Router();


router.post('/upload', uploadToMarketplace);

export default router;