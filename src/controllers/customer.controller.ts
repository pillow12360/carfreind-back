// src/controllers/customer.controller.ts

import { Request, Response } from 'express';
import { customerService } from '../services/customer.service';
import { CustomerCreateInput, CustomerUpdateInput } from '../types/customer.types';

export class CustomerController {
    /**
     * 모든 고객 목록을 조회합니다.
     * GET /api/customers
     *
     * @param {Request} req - Express 요청 객체
     * @param {Response} res - Express 응답 객체
     * @returns {Promise<void>} void
     */
    async getAllCustomers(req: Request, res: Response): Promise<void> {
        try {
            const includeCars = req.query.includeCars === 'true';
            const customers = includeCars
                ? await customerService.getAllCustomersWithCars()
                : await customerService.getAllCustomers();

            res.status(200).json(customers);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.';
            res.status(500).json({ error: errorMessage });
        }
    }

    /**
     * ID로 특정 고객을 조회합니다.
     * GET /api/customers/:id
     *
     * @param {Request} req - Express 요청 객체
     * @param {Response} res - Express 응답 객체
     * @returns {Promise<void>} void
     */
    async getCustomerById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const includeCars = req.query.includeCars === 'true';

            const customer = includeCars
                ? await customerService.getCustomerWithCarsById(id)
                : await customerService.getCustomerById(id);

            res.status(200).json(customer);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.';

            // 고객을 찾을 수 없는 경우 404 반환
            const statusCode = error instanceof Error && error.message.includes('찾을 수 없습니다') ? 404 : 500;
            res.status(statusCode).json({ error: errorMessage });
        }
    }

    /**
     * 새로운 고객을 생성합니다.
     * POST /api/customers
     *
     * @param {Request} req - Express 요청 객체, body에 CustomerCreateInput 타입 데이터가 포함되어야 함
     * @param {Response} res - Express 응답 객체
     * @returns {Promise<void>} void
     */
    async createCustomer(req: Request, res: Response): Promise<void> {
        try {
            const customerData: CustomerCreateInput = req.body;
            const newCustomer = await customerService.createCustomer(customerData);

            res.status(201).json(newCustomer);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.';
            res.status(400).json({ error: errorMessage });
        }
    }

    /**
     * 기존 고객 정보를 수정합니다.
     * PUT /api/customers/:id
     *
     * @param {Request} req - Express 요청 객체, body에 CustomerUpdateInput 타입 데이터가 포함되어야 함
     * @param {Response} res - Express 응답 객체
     * @returns {Promise<void>} void
     */
    async updateCustomer(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const customerData: CustomerUpdateInput = req.body;

            const updatedCustomer = await customerService.updateCustomer(id, customerData);

            res.status(200).json(updatedCustomer);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.';

            // 고객을 찾을 수 없는 경우 404 반환
            const statusCode = error instanceof Error && error.message.includes('찾을 수 없습니다') ? 404 : 400;
            res.status(statusCode).json({ error: errorMessage });
        }
    }

    /**
     * 고객을 삭제합니다.
     * DELETE /api/customers/:id
     *
     * @param {Request} req - Express 요청 객체
     * @param {Response} res - Express 응답 객체
     * @returns {Promise<void>} void
     */
    async deleteCustomer(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            await customerService.deleteCustomer(id);

            // 데이터 없이 204 상태 코드 반환
            res.status(204).end();
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.';

            // 고객을 찾을 수 없는 경우 404 반환
            const statusCode = error instanceof Error && error.message.includes('찾을 수 없습니다') ? 404 : 500;
            res.status(statusCode).json({ error: errorMessage });
        }
    }
}

// 싱글톤 인스턴스 내보내기
export const customerController = new CustomerController();
