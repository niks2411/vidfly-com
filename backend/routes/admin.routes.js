const router = require('express').Router();
const auth = require('../middleware/authMiddleware');
const { login, getOrders, getOrder, markRead, getDashboardStats } = require('../controllers/admin.controller');
const { updateStatus, deleteOrder, updateStats } = require('../controllers/order.controller');

router.post('/login', login);
router.use(auth);
router.get('/dashboard/stats', getDashboardStats);
router.get('/orders', getOrders);
router.get('/orders/:orderId', getOrder);
router.put('/orders/:orderId/read', markRead);

/**
 * @openapi
 * /api/admin/orders/{orderId}/status:
 *   put:
 *     summary: Update order status
 */
router.put('/orders/:orderId/status', updateStatus);
router.put('/orders/:orderId/stats', updateStats);

/**
 * @openapi
 * /api/admin/orders/{orderId}:
 *   delete:
 *     summary: Delete an order
 */
router.delete('/orders/:orderId', deleteOrder);

module.exports = router;