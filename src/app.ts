// src/app.ts
import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import routes from './routes';
import { initPrisma } from './prisma';

// Express 앱 생성
const app: Application = express();

// 데이터베이스 연결 초기화
initPrisma().then((connected) => {
    if (!connected) {
        console.error('❌ 데이터베이스 연결 실패. 애플리케이션이 제대로 작동하지 않을 수 있습니다.');
    }
});

// 미들웨어 설정
app.use(helmet()); // 보안 향상을 위한 헤더 설정
app.use(cors()); // CORS 활성화
app.use(morgan('dev')); // HTTP 요청 로깅
app.use(express.json()); // JSON 파싱
app.use(express.urlencoded({ extended: true })); // URL 인코딩

// API 라우트 등록
app.use('/api', routes);

// 기본 라우트
app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript 서버가 실행 중입니다!');
});

// 404 처리
app.use((req: Request, res: Response) => {
    res.status(404).json({ error: '요청한 리소스를 찾을 수 없습니다.' });
});

// 에러 핸들링 미들웨어
export default app;
