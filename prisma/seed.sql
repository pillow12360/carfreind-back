-- 트랜잭션 시작
BEGIN;

-- CarBrand (브랜드) 데이터 삽입
INSERT INTO "car_brands" (id, name, created_at) VALUES
                                                    (gen_random_uuid(), '현대', NOW()),
                                                    (gen_random_uuid(), '기아', NOW()),
                                                    (gen_random_uuid(), 'BMW', NOW()),
                                                    (gen_random_uuid(), '벤츠', NOW());

-- Customer (고객) 데이터 삽입
INSERT INTO "customers" (id, name, email, phone_number, created_at) VALUES
                                                                        (gen_random_uuid(), '김철수', 'kim@example.com', '010-1234-5678', NOW()),
                                                                        (gen_random_uuid(), '이영희', 'lee@example.com', '010-2345-6789', NOW());

-- Car (차량) 데이터 삽입
-- 각 고객과 브랜드 ID를 임의로 매핑해줘야 하므로, 서브쿼리 사용

INSERT INTO "cars" (id, customer_id, brand_id, model, number_plate, created_at)
SELECT
    gen_random_uuid(),
    c.id,
    b.id,
    CASE WHEN b.name = '현대' THEN '쏘나타'
         WHEN b.name = '기아' THEN 'K5'
         WHEN b.name = 'BMW' THEN '320i'
         WHEN b.name = '벤츠' THEN 'E클래스'
        END,
    '서울' || ROW_NUMBER() OVER () || '가' || (1000 + ROW_NUMBER() OVER ()),
    NOW()
FROM
    (SELECT id FROM "customers" LIMIT 2) c,
    (SELECT id, name FROM "car_brands" LIMIT 2) b
    LIMIT 2;

-- 트랜잭션 종료
COMMIT;
