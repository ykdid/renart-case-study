import { Router, Request, Response } from 'express';
import { GoldPriceService } from '../services/GoldPriceService';

const router = Router();
const goldPriceService = GoldPriceService.getInstance();

/**
 * GET /api/gold-price
 * Get current gold price per gram in USD
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const goldPricePerGram = await goldPriceService.getGoldPrice();
    const cachedPrice = goldPriceService.getCachedPrice();
    
    res.json({
      success: true,
      data: {
        price: goldPricePerGram,
        currency: 'USD',
        unit: 'gram',
        timestamp: cachedPrice?.timestamp || Date.now(),
        cached: cachedPrice ? true : false
      }
    });
  } catch (error) {
    console.error('Gold price route error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch gold price',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

/**
 * GET /api/gold-price/refresh
 * Force refresh gold price (bypass cache)
 */
router.get('/refresh', async (req: Request, res: Response) => {
  try {
    // Clear cache by setting it to null
    const goldPriceService = GoldPriceService.getInstance();
    (goldPriceService as any).cachedPrice = null;
    
    const goldPricePerGram = await goldPriceService.getGoldPrice();
    const cachedPrice = goldPriceService.getCachedPrice();
    
    res.json({
      success: true,
      message: 'Gold price refreshed',
      data: {
        price: goldPricePerGram,
        currency: 'USD',
        unit: 'gram',
        timestamp: cachedPrice?.timestamp || Date.now(),
        cached: false
      }
    });
  } catch (error) {
    console.error('Gold price refresh error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to refresh gold price',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router;