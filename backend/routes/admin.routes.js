const router = require('express').Router();
const auth = require('../middleware/authMiddleware');
const { login, getOrders, getOrder, markRead } = require('../controllers/admin.controller');
const { updateStatus, deleteOrder } = require('../controllers/order.controller');

router.post('/login', login);
router.use(auth);
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

/**
 * @openapi
 * /api/admin/orders/{orderId}:
 *   delete:
 *     summary: Delete an order
 */
router.delete('/orders/:orderId', deleteOrder);

module.exports = router;