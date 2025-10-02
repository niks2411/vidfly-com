const router = require('express').Router();
const { createOrder, getOrderById, updateStatus } = require('../controllers/order.controller');
const auth = require('../middleware/authMiddleware');

/**
 * @openapi
 * /api/orders:
 *   post:
 *     summary: Create new order
 */
router.post('/', createOrder);

/**
 * @openapi
 * /api/orders/{orderId}:
 *   get:
 *     summary: Get order by ID (customer tracking)
 */
router.get('/:orderId', getOrderById);

/**
 * @openapi
 * /api/orders/{orderId}/status:
 *   put:
 *     summary: Admin updates order status
 */
router.put('/:orderId/status', auth, updateStatus);

module.exports = router;


