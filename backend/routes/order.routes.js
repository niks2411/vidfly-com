const router = require('express').Router();
const { createOrder, createCampaignOrder, getOrderById, updateStatus, getUserOrders } = require('../controllers/order.controller');
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
 * /api/orders/campaign:
 *   post:
 *     summary: Create order from campaign builder
 */
router.post('/campaign', createCampaignOrder);

/**
 * @openapi
 * /api/orders/user:
 *   get:
 *     summary: Get all orders for a user by email
 */
router.get('/user', getUserOrders);

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


