const express = require('express');
const router = express.Router();
const clothesController = require('../controllers/catalogControllers')


const rateLimit = require('express-rate-limit');
const productLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, 
  max: 15 ,
  message: 'Terlalu banyak permintaan dari IP ini, coba lagi nanti.'
}); 

router.get('/', clothesController.showClothesCatalog);
router.get('/product/:slug', productLimiter,clothesController.getClothesBySlug);
router.get('/catalog', clothesController.getForCatalog)
router.get('/offers',clothesController.getForOffers)

module.exports = router;