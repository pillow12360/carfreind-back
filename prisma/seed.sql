-- 트랜잭션 시작
BEGIN;

-- CarBrand (브랜드) 데이터 삽입
INSERT INTO "CarBrand" (id, name, created_at) VALUES
                                                  (gen_random_uuid(), '현대', NOW()),
                                                  (gen_random_uuid(), '기아', NOW()),
                                                  (gen_random_uuid(), 'BMW', NOW()),
                                                  (gen_random_uuid(), '벤츠', NOW());

-- Customer (고객) 데이터 삽입
INSERT INTO "Customer" (id, name, email, phone_number, created_at) VALUES
                                                                       (gen_random_uuid(), '김철수', 'kim@example.com', '010-1234-5678', NOW()),
                                                                       (gen_random_uuid(), '이영희', 'lee@example.com', '010-2345-6789', NOW());

-- Car (차량) 데이터 삽입
-- 각 고객과 브랜드 ID를 매핑해서 차량 등록
INSERT INTO "Car" (id, customer_id, brand_id, model, number_plate, created_at)
SELECT
    gen_random_uuid(),
    c.id,
    b.id,
    CASE b.name
        WHEN '현대' THEN '쏘나타'
        WHEN '기아' THEN 'K5'
        WHEN 'BMW' THEN '320i'
        WHEN '벤츠' THEN 'E클래스'
        ELSE '기본모델'
        END,
    '서울' || ROW_NUMBER() OVER () || '가' || (1000 + ROW_NUMBER() OVER ()),
    NOW()
FROM
    (SELECT id FROM "Customer" LIMIT 2) c,
    (SELECT id, name FROM "CarBrand" LIMIT 2) b
    LIMIT 2;

-- 트랜잭션 종료
COMMIT;
