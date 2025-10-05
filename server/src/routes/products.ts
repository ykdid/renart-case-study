import express, { Request, Response } from 'express';
import { ProductService } from '../services';
import { FilterParams } from '../types';

const router = express.Router();
const productService = new ProductService();

router.get('/', async (req: Request, res: Response) => {
  try {
    const filters: FilterParams = {
      minPrice: req.query.minPrice ? parseFloat(req.query.minPrice as string) : undefined,
      maxPrice: req.query.maxPrice ? parseFloat(req.query.maxPrice as string) : undefined,
      minPopularity: req.query.minPopularity ? parseFloat(req.query.minPopularity as string) : undefined,
      maxPopularity: req.query.maxPopularity ? parseFloat(req.query.maxPopularity as string) : undefined,
      sortBy: req.query.sortBy as string || 'popularity',
      sortOrder: req.query.sortOrder as string || 'desc',
      search: req.query.search as string || undefined,
    };

    const products = await productService.getProducts(filters);
    
    res.json({
      success: true,
      data: products,
      count: products.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch products'
    });
  }
});

router.get('/gold-price', async (req: Request, res: Response) => {
  try {
    const goldPrice = await productService.getCurrentGoldPrice();
    
    res.json({
      success: true,
      data: goldPrice
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch gold price'
    });
  }
});

router.get('/stats', async (req: Request, res: Response) => {
  try {
    const stats = await productService.getProductStats();
    
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch product stats'
    });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id) || id < 0) {
      return res.status(400).json({
        success: false,
        error: 'Invalid product ID'
      });
    }

    const product = await productService.getProductById(id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }

    return res.json({
      success: true,
      data: product
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch product'
    });
  }
});

// GET /api/products/gold-price - Get current gold price
router.get('/gold-price', async (req: Request, res: Response) => {
  try {
    const goldPrice = await productService.getCurrentGoldPrice();
    
    res.json({
      success: true,
      data: goldPrice
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch gold price'
    });
  }
});

// GET /api/products/stats - Get product statistics
router.get('/stats', async (req: Request, res: Response) => {
  try {
    const stats = await productService.getProductStats();
    
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch product stats'
    });
  }
});

// GET /api/products/:id - Get product by index
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id) || id < 0) {
      return res.status(400).json({
        success: false,
        error: 'Invalid product ID'
      });
    }

    const product = await productService.getProductById(id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }

    return res.json({
      success: true,
      data: product
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch product'
    });
  }
});

export default router;