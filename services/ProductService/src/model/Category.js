import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAllCategories = async () => {
    const rawResult = await prisma.$queryRaw`
        SELECT
            c.category_id,
            c.category_name,
            c.slug,
            TO_CHAR(c.date_created, 'YYYY-MM-DD') AS date_created,
            COUNT(p.product_id) AS product_count
        FROM category c
        LEFT JOIN product p ON p.category_id = c.category_id
        GROUP BY c.category_id, c.category_name
        ORDER BY c.category_id;
    `;   

    // Convert BigInt to Number
    const result = rawResult.map((item) => ({
        category_id: item.category_id,
        category_name: item.category_name,
        date_created: item.date_created,
        slug: item.slug,
        product_count: Number(item.product_count), // Convert BigInt to Number
    }));

    return result;
};


export const createCategories = async (data) => {
    return await prisma.category.create({ data });
}