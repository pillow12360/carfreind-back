// src/types/errors.types.ts

/**
 * 기본 애플리케이션 오류 클래스
 * 모든 사용자 정의 오류는 이 클래스를 상속받습니다.
 */
export class AppError extends Error {
    /**
     * HTTP 상태 코드
     */
    statusCode: number;

    /**
     * 오류 생성자
     *
     * @param message 오류 메시지
     * @param statusCode HTTP 상태 코드 (기본값: 500)
     */
    constructor(message: string, statusCode = 500) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}

/**
 * 리소스를 찾을 수 없을 때 발생하는 오류
 * HTTP 상태 코드: 404 (Not Found)
 */
export class NotFoundError extends AppError {
    constructor(message: string) {
        super(message, 404);
    }
}

/**
 * 중복 데이터가 있을 때 발생하는 오류
 * HTTP 상태 코드: 409 (Conflict)
 */
export class ConflictError extends AppError {
    constructor(message: string) {
        super(message, 409);
    }
}

/**
 * 유효하지 않은 입력값에 대한 오류
 * HTTP 상태 코드: 400 (Bad Request)
 */
export class ValidationError extends AppError {
    /**
     * 유효성 검사 오류 상세 정보
     */
    errors?: Record<string, string>;

    /**
     * 오류 생성자
     *
     * @param message 오류 메시지
     * @param errors 유효성 검사 오류 상세 정보 (선택적)
     */
    constructor(message: string, errors?: Record<string, string>) {
        super(message, 400);
        this.errors = errors;
    }
}

/**
 * 권한이 없을 때 발생하는 오류
 * HTTP 상태 코드: 403 (Forbidden)
 */
export class ForbiddenError extends AppError {
    constructor(message: string) {
        super(message, 403);
    }
}

/**
 * 인증 실패 시 발생하는 오류
 * HTTP 상태 코드: 401 (Unauthorized)
 */
export class UnauthorizedError extends AppError {
    constructor(message: string) {
        super(message, 401);
    }
}

/**
 * 서버 내부 오류
 * HTTP 상태 코드: 500 (Internal Server Error)
 */
export class InternalServerError extends AppError {
    constructor(message: string) {
        super(message, 500);
    }
}
