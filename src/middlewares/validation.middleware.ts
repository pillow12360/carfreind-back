// src/middlewares/validation.middleware.ts

import { Request, Response, NextFunction } from 'express';
import { CustomerCreateInput } from '../types/customer.types';

/**
 * 이메일 형식 검증 정규식
 */
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

/**
 * 전화번호 형식 검증 정규식 (한국 형식)
 */
const PHONE_REGEX = /^(01[016789])-?([0-9]{3,4})-?([0-9]{4})$/;

/**
 * 고객 생성/수정 데이터의 유효성을 검사하는 미들웨어
 *
 * @param {Request} req - Express 요청 객체
 * @param {Response} res - Express 응답 객체
 * @param {NextFunction} next - Express 다음 미들웨어 함수
 * @returns {void}
 */
export const validateCustomerData = (req: Request, res: Response, next: NextFunction): void => {
    const { name, email, phone_number } = req.body as Partial<CustomerCreateInput>;
    const errors: string[] = [];

    // POST 요청 시에는 모든 필드가 필수, PUT 요청 시에는 필드가 있는 경우만 검사
    const isCreate = req.method === 'POST';

    // 이름 검사
    if (isCreate && !name) {
        errors.push('이름은 필수 항목입니다.');
    } else if (name && (typeof name !== 'string' || name.trim().length < 2)) {
        errors.push('이름은 최소 2자 이상이어야 합니다.');
    }

    // 이메일 검사
    if (isCreate && !email) {
        errors.push('이메일은 필수 항목입니다.');
    } else if (email && (typeof email !== 'string' || !EMAIL_REGEX.test(email))) {
        errors.push('유효한 이메일 형식이 아닙니다.');
    }

    // 전화번호 검사
    if (isCreate && !phone_number) {
        errors.push('전화번호는 필수 항목입니다.');
    } else if (phone_number && (typeof phone_number !== 'string' || !PHONE_REGEX.test(phone_number))) {
        errors.push('유효한 전화번호 형식이 아닙니다. (예: 010-1234-5678)');
    }

    // 오류가 있으면 응답 반환, 없으면 다음 미들웨어로 진행
    if (errors.length > 0) {
        res.status(400).json({ error: errors.join(' ') });
    } else {
        next();
    }
};
