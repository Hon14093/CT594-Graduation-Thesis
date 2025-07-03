export const productColumns = [
    {
        accessorKey: "image_url",
        header: "Hình ảnh",
        cell: ({ row }) => {
            const imageArray = row.getValue("image_url"); // this should be an array
            const imageUrl = Array.isArray(imageArray) ? imageArray[0] : null;

            return imageUrl ? (
                <img
                    src={imageUrl}
                    alt="Product"
                    className="size-24 object-cover rounded mx-auto"
                    onError={(e) => {
                        e.currentTarget.src = "https://cdn-icons-png.flaticon.com/512/6659/6659895.png"; 
                    }}
                />
            ) : (
                <span>No image</span>
            );
        }
    },
    { accessorKey: "product_name", header: "Tên sản phẩm" },
    { accessorKey: "category.category_name", header: "Danh mục" },
    { accessorKey: "brand.brand_name", header: "Thương hiệu" },
];


export const categoryColumns = [
    { accessorKey: "category_id", header: "ID danh mục" },
    { accessorKey: "category_name", header: "Tên danh mục" },
    { accessorKey: "product_count", header: "Số sản phẩm" },
    { accessorKey: "date_created", header: "Ngày tạo" },
    { accessorKey: "slug", header: "Slug" },
];

export const brandColumns = [
    { accessorKey: "brand_id", header: "ID thương hiệu" },
    { accessorKey: "brand_name", header: "Tên thương hiệu" },
    { accessorKey: "product_count", header: "Số sản phẩm" },
    { accessorKey: "date_created", header: "Ngày tạo" },
    { accessorKey: "slug", header: "Slug" },
];
