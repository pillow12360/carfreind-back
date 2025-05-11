// src/routes/customer.routes.ts

import { Router } from 'express';
import { customerController } from '../controllers/customer.controller';
import { validateCustomerData } from '../middlewares/validation.middleware';

/**
 * 고객 관련 라우팅을 처리하는 라우터
 */
const router = Router();

/**
 * 모든 고객 목록을 조회합니다.
 * GET /api/customers
 * Query Parameters:
 *   - includeCars (optional): 차량 정보를 포함할지 여부 (true/false)
 */
router.get('/', customerController.getAllCustomers.bind(customerController));

/**
 * ID로 특정 고객을 조회합니다.
 * GET /api/customers/:id
 * URL Parameters:
 *   - id: 조회할 고객 ID (UUID)
 * Query Parameters:
 *   - includeCars (optional): 차량 정보를 포함할지 여부 (true/false)
 */
router.get('/:id', customerController.getCustomerById.bind(customerController));

/**
 * 새로운 고객을 생성합니다.
 * POST /api/customers
 * Request Body: CustomerCreateInput
 */
router.post('/', validateCustomerData, customerController.createCustomer.bind(customerController));

/**
 * 기존 고객 정보를 수정합니다.
 * PUT /api/customers/:id
 * URL Parameters:
 *   - id: 수정할 고객 ID (UUID)
 * Request Body: CustomerUpdateInput
 */
router.put('/:id', validateCustomerData, customerController.updateCustomer.bind(customerController));

/**
 * 고객을 삭제합니다.
 * DELETE /api/customers/:id
 * URL Parameters:
 *   - id: 삭제할 고객 ID (UUID)
 */
router.delete('/:id', customerController.deleteCustomer.bind(customerController));

export { router as customerRoutes };
