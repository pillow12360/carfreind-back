import express, { Application, Request, Response, NextFunction } from 'express';

// Express 앱 생성
const app: Application = express();

// 미들웨어 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 기본 라우트
app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript 서버가 실행 중입니다!');
});

// 에러 핸들링 미들웨어
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('서버 오류가 발생했습니다.');
});

export default app;
