// src/repositories/customer.repository.ts

import prisma from '../prisma';
import { Customer } from '@prisma/client';
import { CustomerCreateInput, CustomerUpdateInput, CustomerWithCars } from '../types/customer.types';

export class CustomerRepository {
    /**
     * 모든 고객 목록을 조회합니다.
     *
     * @returns {Promise<Customer[]>} 고객 목록
     */
    async findAll(): Promise<Customer[]> {
        return prisma.customer.findMany({
            orderBy: { created_at: 'desc' }
        });
    }

    /**
     * 차량 정보가 포함된 모든 고객 목록을 조회합니다.
     *
     * @returns {Promise<CustomerWithCars[]>} 차량 정보가 포함된 고객 목록
     */
    async findAllWithCars(): Promise<CustomerWithCars[]> {
        return prisma.customer.findMany({
            include: { cars: true },
            orderBy: { created_at: 'desc' }
        }) as Promise<CustomerWithCars[]>;
    }

    /**
     * ID로 특정 고객을 조회합니다.
     *
     * @param {string} id - 조회할 고객 ID (UUID)
     * @returns {Promise<Customer | null>} 찾은 고객 정보 또는, 없을 경우 null
     */
    async findById(id: string): Promise<Customer | null> {
        return prisma.customer.findUnique({
            where: { id }
        });
    }

    /**
     * ID로 차량 정보가 포함된 특정 고객을 조회합니다.
     *
     * @param {string} id - 조회할 고객 ID (UUID)
     * @returns {Promise<CustomerWithCars | null>} 차량 정보가 포함된 고객 정보 또는, 없을 경우 null
     */
    async findByIdWithCars(id: string): Promise<CustomerWithCars | null> {
        return prisma.customer.findUnique({
            where: { id },
            include: { cars: true }
        }) as Promise<CustomerWithCars | null>;
    }

    /**
     * 이메일로 특정 고객을 조회합니다. 주로 중복 확인에 사용됩니다.
     *
     * @param {string} email - 조회할 고객 이메일
     * @returns {Promise<Customer | null>} 찾은 고객 정보 또는, 없을 경우 null
     */
    async findByEmail(email: string): Promise<Customer | null> {
        return prisma.customer.findUnique({
            where: { email }
        });
    }

    /**
     * 새로운 고객을 생성합니다.
     *
     * @param {CustomerCreateInput} data - 생성할 고객 데이터
     * @returns {Promise<Customer>} 생성된 고객 정보
     */
    async create(data: CustomerCreateInput): Promise<Customer> {
        return prisma.customer.create({
            data
        });
    }

    /**
     * 기존 고객 정보를 수정합니다.
     *
     * @param {string} id - 수정할 고객 ID (UUID)
     * @param {CustomerUpdateInput} data - 수정할 고객 데이터
     * @returns {Promise<Customer>} 수정된 고객 정보
     */
    async update(id: string, data: CustomerUpdateInput): Promise<Customer> {
        return prisma.customer.update({
            where: { id },
            data
        });
    }

    /**
     * 고객을 삭제합니다.
     *
     * @param {string} id - 삭제할 고객 ID (UUID)
     * @returns {Promise<Customer>} 삭제된 고객 정보
     */
    async delete(id: string): Promise<Customer> {
        return prisma.customer.delete({
            where: { id }
        });
    }
}

// 싱글톤 인스턴스 내보내기
export const customerRepository = new CustomerRepository();
