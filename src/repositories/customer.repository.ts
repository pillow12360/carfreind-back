import { PrismaClient, Customer } from "@prisma/client";

const prisma = new PrismaClient();

export class CustomerRepository {
    // 모든 고객 조회
    async findAll(): Promise<Customer[]> {
        return prisma.customer.findMany();
    }

    // ID로 고객 단일 조회
    async findById(id: string): Promise<Customer | null> {
        return prisma.customer.findUnique({
            where: { id },
        });
    }

    // 고객 생성
    async create(data: {
        name: string;
        email: string;
        phone_number: string;
    }): Promise<Customer> {
        return prisma.customer.create({
            data,
        });
    }

    // 고객 삭제
    async deleteById(id: string): Promise<Customer> {
        return prisma.customer.delete({
            where: { id },
        });
    }
}
