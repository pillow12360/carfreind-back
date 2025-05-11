// src/prisma/index.ts

import { PrismaClient } from '@prisma/client';

/**
 * 애플리케이션 전체에서 사용할 Prisma 클라이언트 싱글톤 인스턴스
 * 개발 환경에서는 상세 로그를 출력하고, 프로덕션 환경에서는 에러만 출력
 */
const prisma = new PrismaClient({
    log: process.env.NODE_ENV === 'development'
        ? ['query', 'info', 'warn', 'error']
        : ['error'],
});

/**
 * Prisma 클라이언트 초기화 및 연결 테스트 함수
 * 애플리케이션 시작 시 한 번 호출하여 데이터베이스 연결을 확인
 *
 * @returns {Promise<boolean>} 연결 성공 여부
 */
export const initPrisma = async (): Promise<boolean> => {
    try {
        // 간단한 쿼리를 실행하여 연결 테스트
        await prisma.$queryRaw`SELECT 1`;
        console.log('📦 데이터베이스 연결 성공');
        return true;
    } catch (error) {
        console.error('❌ 데이터베이스 연결 실패:', error);
        return false;
    }
};

export default prisma;
