const router = require('express').Router();
const auth = require('../middleware/authMiddleware');
const { login, getOrders, getOrder } = require('../controllers/admin.controller');
const { updateStatus } = require('../controllers/order.controller');

/**
 * @openapi
 * /api/admin/login:
 *   post:
 *     summary: Admin login
 */
router.post('/login', login);

router.use(auth);

/**
 * @openapi
 * /api/admin/orders:
 *   get:
 *     summary: Get all orders
 */
router.get('/orders', getOrders);

/**
 * @openapi
 * /api/admin/orders/{orderId}:
 *   get:
 *     summary: Get a specific order
 */
router.get('/orders/:orderId', getOrder);

/**
 * @openapi
 * /api/admin/orders/{orderId}/status:
 *   put:
 *     summary: Update order status
 */
router.put('/orders/:orderId/status', updateStatus);

module.exports = router;