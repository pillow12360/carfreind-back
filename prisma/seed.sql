-- 트랜잭션 시작
BEGIN;

-- CarBrand 테이블에 데이터 추가
INSERT INTO "car_brands" (id, name, created_at) VALUES
                                                    (gen_random_uuid(), '현대', NOW()),
                                                    (gen_random_uuid(), '기아', NOW()),
                                                    (gen_random_uuid(), 'BMW', NOW()),
                                                    (gen_random_uuid(), '벤츠', NOW()),
                                                    (gen_random_uuid(), '아우디', NOW()),
                                                    (gen_random_uuid(), '토요타', NOW()),
                                                    (gen_random_uuid(), '혼다', NOW()),
                                                    (gen_random_uuid(), '폭스바겐', NOW()),
                                                    (gen_random_uuid(), '쉐보레', NOW()),
                                                    (gen_random_uuid(), '르노', NOW());

-- Customer 테이블에 데이터 추가
INSERT INTO "customers" (id, name, email, phone_number, verification_code, code_expiry, created_at) VALUES
                                                                                                        (gen_random_uuid(), '김철수', 'kim@example.com', '010-1234-5678', 'ABC123', NOW() + INTERVAL '30 days', NOW()),
                                                                                                        (gen_random_uuid(), '이영희', 'lee@example.com', '010-2345-6789', 'DEF456', NOW() + INTERVAL '30 days', NOW()),
                                                                                                        (gen_random_uuid(), '박지민', 'park@example.com', '010-3456-7890', 'GHI789', NOW() + INTERVAL '30 days', NOW()),
                                                                                                        (gen_random_uuid(), '정수민', 'jung@example.com', '010-4567-8901', 'JKL012', NOW() + INTERVAL '30 days', NOW()),
                                                                                                        (gen_random_uuid(), '최동훈', 'choi@example.com', '010-5678-9012', 'MNO345', NOW() + INTERVAL '30 days', NOW()),
                                                                                                        (gen_random_uuid(), '강민지', 'kang@example.com', '010-6789-0123', 'PQR678', NOW() + INTERVAL '30 days', NOW()),
                                                                                                        (gen_random_uuid(), '윤서연', 'yoon@example.com', '010-7890-1234', 'STU901', NOW() + INTERVAL '30 days', NOW()),
                                                                                                        (gen_random_uuid(), '장현우', 'jang@example.com', '010-8901-2345', 'VWX234', NOW() + INTERVAL '30 days', NOW()),
                                                                                                        (gen_random_uuid(), '한지영', 'han@example.com', '010-9012-3456', 'YZA567', NOW() + INTERVAL '30 days', NOW()),
                                                                                                        (gen_random_uuid(), '송태호', 'song@example.com', '010-0123-4567', 'BCD890', NOW() + INTERVAL '30 days', NOW());

-- Car 테이블에 데이터 추가 (Customer와 CarBrand 테이블의 ID 참조 필요)
INSERT INTO "cars" (id, customer_id, brand_id, model, number_plate, created_at)
SELECT
    gen_random_uuid(),
    c.id,
    b.id,
    CASE WHEN b.name = '현대' THEN '쏘나타'
         WHEN b.name = '기아' THEN 'K5'
         WHEN b.name = 'BMW' THEN '320i'
         WHEN b.name = '벤츠' THEN 'E클래스'
         WHEN b.name = '아우디' THEN 'A4'
         WHEN b.name = '토요타' THEN '캠리'
         WHEN b.name = '혼다' THEN '어코드'
         WHEN b.name = '폭스바겐' THEN '파사트'
         WHEN b.name = '쉐보레' THEN '말리부'
         WHEN b.name = '르노' THEN 'SM6'
         ELSE '소나타' END,
    '서울' || (ROW_NUMBER() OVER ()) || '가' || (1000 + ROW_NUMBER() OVER ()),
    NOW() - (INTERVAL '1 day' * ROW_NUMBER() OVER ())
FROM
    "customers" c
        JOIN "car_brands" b ON TRUE
    LIMIT 10;

-- QuoteRequest 테이블에 데이터 추가 (Car와 Customer 테이블의 ID 참조 필요)
INSERT INTO "quote_requests" (
    id, customer_id, car_id, issue_cause, current_state, repair_description,
    visit_date, status, estimated_completion_date, special_notes, created_at, updated_at
)
SELECT
    gen_random_uuid(),
    c.customer_id,
    c.id,
    CASE (ROW_NUMBER() OVER ()) % 5
    WHEN 0 THEN '엔진 소음'
    WHEN 1 THEN '브레이크 이상'
    WHEN 2 THEN '에어컨 고장'
    WHEN 3 THEN '타이어 교체 필요'
    WHEN 4 THEN '배터리 교체 필요'
END,
  CASE (ROW_NUMBER() OVER ()) % 5
    WHEN 0 THEN '시동시 딸깍거리는 소리가 납니다'
    WHEN 1 THEN '브레이크 페달이 끝까지 밟혀요'
    WHEN 2 THEN '에어컨에서 찬 바람이 안 나와요'
    WHEN 3 THEN '타이어 마모가 심합니다'
    WHEN 4 THEN '시동이 잘 안 걸려요'
END,
  CASE (ROW_NUMBER() OVER ()) % 5
    WHEN 0 THEN '엔진 점검 및 수리 희망'
    WHEN 1 THEN '브레이크 패드 교체 희망'
    WHEN 2 THEN '에어컨 가스 충전 희망'
    WHEN 3 THEN '타이어 4개 교체 희망'
    WHEN 4 THEN '배터리 교체 희망'
END,
  CURRENT_DATE + ((ROW_NUMBER() OVER ()) % 10 - 2) * INTERVAL '1 day',
  CASE (ROW_NUMBER() OVER ()) % 5
    WHEN 0 THEN 'pending'
    WHEN 1 THEN 'confirmed'
    WHEN 2 THEN 'waiting'
    WHEN 3 THEN 'in_progress'
    WHEN 4 THEN 'completed'
END,
  CASE WHEN (ROW_NUMBER() OVER ()) % 5 IN (1, 2, 3, 4) THEN CURRENT_DATE + ((ROW_NUMBER() OVER ()) % 10) * INTERVAL '1 day' ELSE NULL END,
  CASE (ROW_NUMBER() OVER ()) % 5
    WHEN 0 THEN '빠른 수리 부탁드립니다'
    WHEN 1 THEN '오전에 방문 예정입니다'
    WHEN 2 THEN '견적 먼저 알려주세요'
    WHEN 3 THEN '품질 좋은 부품으로 교체 원합니다'
    WHEN 4 THEN '차량 인도 시 연락 부탁드립니다'
END,
  NOW() - ((ROW_NUMBER() OVER ()) % 30) * INTERVAL '1 day',
  NOW() - ((ROW_NUMBER() OVER ()) % 30 - 1) * INTERVAL '1 day'
FROM
  "cars" c
LIMIT 10;

-- CarImage 테이블에 데이터 추가 (QuoteRequest 테이블의 ID 참조 필요)
INSERT INTO "car_images" (id, quote_request_id, storage_path, created_at)
SELECT
    gen_random_uuid(),
    qr.id,
    'car-images/' || CASE (ROW_NUMBER() OVER ()) % 5
    WHEN 0 THEN 'engine-problem-'
    WHEN 1 THEN 'brake-issue-'
    WHEN 2 THEN 'ac-problem-'
    WHEN 3 THEN 'tire-change-'
    WHEN 4 THEN 'battery-issue-'
END || (ROW_NUMBER() OVER ()) || '.jpg',
  qr.created_at
FROM
  "quote_requests" qr
  CROSS JOIN LATERAL generate_series(1, 2) AS s(i)
LIMIT 10;

-- 관리자 계정 생성 (필요한 경우)
DO $$
DECLARE
admin_id UUID;
BEGIN
INSERT INTO "users" (id, email, role)
VALUES (gen_random_uuid(), 'admin@carefriend.com', 'ADMIN')
    RETURNING id INTO admin_id;

-- Quote 테이블에 데이터 추가 (QuoteRequest 테이블과 Admin의 ID 참조 필요)
INSERT INTO "quotes" (id, quote_request_id, estimated_price, description, admin_id, created_at)
SELECT
    gen_random_uuid(),
    qr.id,
    CASE (ROW_NUMBER() OVER ()) % 5
    WHEN 0 THEN 150000
        WHEN 1 THEN 80000
        WHEN 2 THEN 50000
        WHEN 3 THEN 400000
        WHEN 4 THEN 100000
END,
      CASE (ROW_NUMBER() OVER ()) % 5
        WHEN 0 THEN '엔진 점검 및 벨트 교체 필요'
        WHEN 1 THEN '브레이크 패드 및 디스크 교체'
        WHEN 2 THEN '에어컨 가스 충전 및 필터 교체'
        WHEN 3 THEN '타이어 4개 교체 (금호타이어 사용)'
        WHEN 4 THEN '배터리 교체 및 전기 시스템 점검'
END,
      admin_id,
      qr.created_at + INTERVAL '1 day'
    FROM
      "quote_requests" qr
    WHERE
      qr.status IN ('confirmed', 'waiting', 'in_progress', 'completed')
    LIMIT 10;
END $$;

-- Repair 테이블에 데이터 추가 (Quote 테이블의 ID 참조 필요)
INSERT INTO "repairs" (id, quote_id, actual_price, repair_date, repair_details, created_at)
SELECT
    gen_random_uuid(),
    q.id,
    q.estimated_price + (random() * 50000)::int,
            CURRENT_DATE - ((ROW_NUMBER() OVER ()) % 7) * INTERVAL '1 day',
  CASE (ROW_NUMBER() OVER ()) % 5
    WHEN 0 THEN '엔진 타이밍 벨트 교체 완료, 엔진 오일 교체 추가 작업'
    WHEN 1 THEN '브레이크 패드, 디스크 교체 완료, 브레이크 액 교체 추가 작업'
    WHEN 2 THEN '에어컨 가스 충전 및 필터 교체 완료, 에어컨 내부 세척 추가 작업'
    WHEN 3 THEN '타이어 4개 교체 완료, 휠 밸런스 및 얼라인먼트 추가 작업'
    WHEN 4 THEN '배터리 교체 완료, 발전기 점검 추가 작업'
END,
  q.created_at + INTERVAL '3 day'
FROM
  "quotes" q
  JOIN "quote_requests" qr ON q.quote_request_id = qr.id
WHERE
  qr.status = 'completed'
LIMIT 10;

-- StatusLog 테이블에 데이터 추가 (QuoteRequest 테이블의 ID 참조 필요)
INSERT INTO "status_logs" (id, quote_request_id, previous_status, new_status, notes, created_at)
SELECT
    gen_random_uuid(),
    qr.id,
    CASE (ROW_NUMBER() OVER ()) % 4
    WHEN 0 THEN 'pending'
    WHEN 1 THEN 'confirmed'
    WHEN 2 THEN 'waiting'
    WHEN 3 THEN 'in_progress'
END,
  CASE (ROW_NUMBER() OVER ()) % 4
    WHEN 0 THEN 'confirmed'
    WHEN 1 THEN 'waiting'
    WHEN 2 THEN 'in_progress'
    WHEN 3 THEN 'completed'
END,
  CASE (ROW_NUMBER() OVER ()) % 4
    WHEN 0 THEN '견적 확인 및 승인'
    WHEN 1 THEN '방문 일정 확정'
    WHEN 2 THEN '수리 작업 시작'
    WHEN 3 THEN '수리 완료'
END,
  qr.created_at + ((ROW_NUMBER() OVER ()) % 5) * INTERVAL '1 day'
FROM
  "quote_requests" qr
LIMIT 10;

-- Review 테이블에 데이터 추가 (Customer와 Repair 테이블의 ID 참조 필요)
INSERT INTO "reviews" (id, customer_id, repair_id, rating, comment, created_at)
SELECT
    gen_random_uuid(),
    c.customer_id,
    r.id,
    FLOOR(random() * 3) + 3, -- 3-5점 랜덤 평점
    CASE (ROW_NUMBER() OVER ()) % 5
    WHEN 0 THEN '친절하고 빠른 서비스에 만족합니다. 다음에도 이용할 게요!'
    WHEN 1 THEN '수리 품질이 좋고 견적 그대로 진행되어 신뢰가 갑니다.'
    WHEN 2 THEN '전문적인 상담과 정확한 진단이 좋았습니다. 추천합니다!'
    WHEN 3 THEN '가격 대비 서비스 품질이 훌륭합니다. 다른 분들께도 추천하고 싶어요.'
    WHEN 4 THEN '시간 약속을 잘 지켜주셔서 좋았습니다. 차 상태도 많이 좋아졌어요.'
END,
  r.created_at + INTERVAL '2 day'
FROM
  "repairs" r
  JOIN "quotes" q ON r.quote_id = q.id
  JOIN "quote_requests" qr ON q.quote_request_id = qr.id
  JOIN "cars" c ON qr.car_id = c.id
WHERE
  qr.status = 'completed'
LIMIT 10;

-- 트랜잭션 종료
COMMIT;
