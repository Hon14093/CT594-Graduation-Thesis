import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAllBrands = async () => {
    const rawResult = await prisma.$queryRaw`
        SELECT
            b.brand_id,
            b.brand_name,
            b.slug,
            TO_CHAR(b.date_created, 'YYYY-MM-DD') AS date_created,
            COUNT(p.product_id) AS product_count
        FROM brand b
        LEFT JOIN product p ON p.brand_id = b.brand_id
        GROUP BY b.brand_id, b.brand_name
        ORDER BY b.brand_id;
    `;   

    // Convert BigInt to Number
    const result = rawResult.map((item) => ({
        brand_id: item.brand_id,
        brand_name: item.brand_name,
        date_created: item.date_created,
        slug: item.slug,
        product_count: Number(item.product_count), // Convert BigInt to Number
    }));

    return result;
}

export const createBrand = async (data) => {
    return await prisma.brand.create({ data });
}