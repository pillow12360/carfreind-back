// src/types/customer.types.ts

import { Customer, Car } from '@prisma/client';

/**
 * 고객 생성 시 필요한 입력 데이터 타입
 * 'id'와 'created_at'은 서버에서 자동 생성되므로 입력에서 제외합니다.
 */
export type CustomerCreateInput = {
    /**
     * 고객 이름
     * 최소 2자 이상의 문자열이어야 합니다.
     */
    name: string;

    /**
     * 고객 이메일
     * 유효한 이메일 형식이어야 하며, 시스템 내에서 유일해야 합니다.
     */
    email: string;

    /**
     * 고객 전화번호
     * 한국 전화번호 형식(예: 010-1234-5678)이어야 합니다.
     * 하이픈(-)이 없는 형식도 허용되며, 내부적으로 하이픈이 포함된 형식으로 변환됩니다.
     */
    phone_number: string;
};

/**
 * 고객 정보 수정 시 필요한 입력 데이터 타입
 * CustomerCreateInput의 모든 필드가 선택적(optional)이 됩니다.
 */
export type CustomerUpdateInput = Partial<CustomerCreateInput>;

/**
 * 차량 정보가 포함된 고객 데이터 타입
 * Customer 타입을 확장하여 cars 속성을 추가합니다.
 */
export interface CustomerWithCars extends Customer {
    /**
     * 고객이 소유한 차량 목록
     */
    cars: Car[];
}

/**
 * 고객 필터링 조건 타입
 * 고객 목록 조회 시 필터링 조건으로 사용됩니다.
 */
export type CustomerFilter = {
    /**
     * 이름으로 검색 (부분 일치)
     */
    name?: string;

    /**
     * 이메일로 검색 (부분 일치)
     */
    email?: string;

    /**
     * 전화번호로 검색 (부분 일치)
     */
    phone_number?: string;
};

/**
 * 고객 정렬 옵션 타입
 * 고객 목록 조회 시 정렬 옵션으로 사용됩니다.
 */
export type CustomerSortOption = {
    /**
     * 정렬 기준 필드
     * 'name', 'email', 'phone_number', 'created_at' 중 하나
     */
    field: 'name' | 'email' | 'phone_number' | 'created_at';

    /**
     * 정렬 방향
     * 'asc'(오름차순) 또는 'desc'(내림차순)
     */
    direction: 'asc' | 'desc';
};

/**
 * 고객 페이지네이션 옵션 타입
 * 고객 목록 조회 시 페이지네이션 옵션으로 사용됩니다.
 */
export type CustomerPaginationOption = {
    /**
     * 페이지 번호 (1부터 시작)
     */
    page: number;

    /**
     * 페이지당 항목 수
     */
    limit: number;
};
