// src/services/customer.service.ts

import { Customer } from '@prisma/client';
import { customerRepository } from '../repositories/customer.repository';
import { CustomerCreateInput, CustomerUpdateInput, CustomerWithCars } from '../types/customer.types';

export class CustomerService {
    /**
     * 모든 고객 목록을 조회합니다.
     *
     * @returns {Promise<Customer[]>} 고객 목록
     */
    async getAllCustomers(): Promise<Customer[]> {
        return customerRepository.findAll();
    }

    /**
     * 차량 정보가 포함된 모든 고객 목록을 조회합니다.
     *
     * @returns {Promise<CustomerWithCars[]>} 차량 정보가 포함된 고객 목록
     */
    async getAllCustomersWithCars(): Promise<CustomerWithCars[]> {
        return customerRepository.findAllWithCars();
    }

    /**
     * ID로 특정 고객을 조회합니다.
     *
     * @param {string} id - 조회할 고객 ID (UUID)
     * @returns {Promise<Customer>} 찾은 고객 정보
     * @throws {Error} 고객이 존재하지 않을 경우 에러를 발생시킵니다.
     */
    async getCustomerById(id: string): Promise<Customer> {
        const customer = await customerRepository.findById(id);
        if (!customer) {
            throw new Error(`ID ${id}인 고객을 찾을 수 없습니다.`);
        }
        return customer;
    }

    /**
     * ID로 차량 정보가 포함된 특정 고객을 조회합니다.
     *
     * @param {string} id - 조회할 고객 ID (UUID)
     * @returns {Promise<CustomerWithCars>} 차량 정보가 포함된 고객 정보
     * @throws {Error} 고객이 존재하지 않을 경우 에러를 발생시킵니다.
     */
    async getCustomerWithCarsById(id: string): Promise<CustomerWithCars> {
        const customer = await customerRepository.findByIdWithCars(id);
        if (!customer) {
            throw new Error(`ID ${id}인 고객을 찾을 수 없습니다.`);
        }
        return customer;
    }

    /**
     * 새로운 고객을 생성합니다.
     *
     * @param {CustomerCreateInput} customerData - 생성할 고객 데이터
     * @returns {Promise<Customer>} 생성된 고객 정보
     * @throws {Error} 이메일이 이미 존재할 경우 에러를 발생시킵니다.
     */
    async createCustomer(customerData: CustomerCreateInput): Promise<Customer> {
        // 이메일 중복 확인
        const existingCustomer = await customerRepository.findByEmail(customerData.email);
        if (existingCustomer) {
            throw new Error(`이메일 ${customerData.email}은(는) 이미 사용 중입니다.`);
        }

        // 전화번호 형식 통일 (하이픈 추가)
        const formattedPhoneNumber = this.formatPhoneNumber(customerData.phone_number);

        return customerRepository.create({
            ...customerData,
            phone_number: formattedPhoneNumber
        });
    }

    /**
     * 기존 고객 정보를 수정합니다.
     *
     * @param {string} id - 수정할 고객 ID (UUID)
     * @param {CustomerUpdateInput} customerData - 수정할 고객 데이터
     * @returns {Promise<Customer>} 수정된 고객 정보
     * @throws {Error} 고객이 존재하지 않을 경우 또는 이메일이 이미 존재할 경우 에러를 발생시킵니다.
     */
    async updateCustomer(id: string, customerData: CustomerUpdateInput): Promise<Customer> {
        // 고객 존재 확인
        const customer = await customerRepository.findById(id);
        if (!customer) {
            throw new Error(`ID ${id}인 고객을 찾을 수 없습니다.`);
        }

        // 이메일 변경 시 중복 확인
        if (customerData.email && customerData.email !== customer.email) {
            const existingCustomer = await customerRepository.findByEmail(customerData.email);
            if (existingCustomer) {
                throw new Error(`이메일 ${customerData.email}은(는) 이미 사용 중입니다.`);
            }
        }

        // 전화번호 형식 통일 (하이픈 추가)
        if (customerData.phone_number) {
            customerData.phone_number = this.formatPhoneNumber(customerData.phone_number);
        }

        return customerRepository.update(id, customerData);
    }

    /**
     * 고객을 삭제합니다.
     *
     * @param {string} id - 삭제할 고객 ID (UUID)
     * @returns {Promise<Customer>} 삭제된 고객 정보
     * @throws {Error} 고객이 존재하지 않을 경우 에러를 발생시킵니다.
     */
    async deleteCustomer(id: string): Promise<Customer> {
        // 고객 존재 확인
        const customer = await customerRepository.findById(id);
        if (!customer) {
            throw new Error(`ID ${id}인 고객을 찾을 수 없습니다.`);
        }

        return customerRepository.delete(id);
    }

    /**
     * 전화번호 형식을 통일합니다. (하이픈 추가)
     *
     * @param {string} phoneNumber - 원본 전화번호
     * @returns {string} 하이픈이 포함된 형식으로 변환된 전화번호
     * @private
     */
    private formatPhoneNumber(phoneNumber: string): string {
        // 모든 하이픈 제거 후 숫자만 추출
        const digits = phoneNumber.replace(/-/g, '');

        // 형식에 맞게 하이픈 추가 (010-1234-5678 형식)
        if (digits.length === 11 && digits.startsWith('010')) {
            return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7, 11)}`;
        }

        // 그 외 경우, 원래 값 반환
        return phoneNumber;
    }
}

// 싱글톤 인스턴스 내보내기
export const customerService = new CustomerService();
