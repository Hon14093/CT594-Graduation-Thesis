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
                    className="size-24 object-contain rounded mx-auto"
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


export const accountColumns = [
    { accessorKey: "username", header: "Tên tài khoản" },
    { accessorKey: "role.role_name", header: "Chức vụ" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "date_created", header: "Ngày tạo" },
    // { accessorKey: "slug", header: "Slug" },
]

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

export const orderColumns = [
    { accessorKey: "order_id", header: "ID Đơn Hàng" },
    { accessorKey: "order_date", header: "Ngày Đặt" },
    { accessorKey: "order_total", header: "Tổng Tiền" },
]

export const orderDetailsColumns = [
    { 
        accessorKey: "name", header: "Tên Sản Phẩm",
        cell: ({ row }) => (
            <div className="text-wrap">
                {row.getValue("name")}
            </div>
        )
    },
    { accessorKey: "product.product.brand.brand_name", header: "Thương hiệu" },
    { accessorKey: "price", header: "Giá" },
    { accessorKey: "quantity", header: "Số Lượng" },
    { accessorKey: "subtotal", header: "Thành Tiền" },
]

export const checkOrdersColumns = [
    { accessorKey: "order_id", header: "ID Đơn Hàng" },
    { accessorKey: "order_date", header: "Ngày Đặt" },
    { accessorKey: "order_total", header: "Tổng Tiền" },
    { accessorKey: "account.username", header: "Tài Khoản" },
]

const renderImageCell = (imageArray) => {
    const imageUrl = Array.isArray(imageArray) ? imageArray[0] : null;

    return imageUrl ? (
        <img
            src={imageUrl}
            className="size-24 object-contain rounded mx-auto"
            onError={(e) => {
                e.currentTarget.src = "https://cdn-icons-png.flaticon.com/512/6659/6659895.png"; 
            }}
        />
    ) : (
        <span>No image</span>
    );
}

export const laptopColumns = [
    {
        accessorKey: "image_url",
        header: "Hình ảnh",
        cell: ({ row }) => renderImageCell(row.getValue("image_url"))
    },
    { accessorKey: "laptop_name", header: "Tên laptop" },
    { accessorKey: "brand", header: "Thương hiệu" },
    { accessorKey: "laptop_price", header: "Giá bán" },
    { accessorKey: "qty_in_stock", header: "Số lượng " },
]

export const ramColumns = [
    {
        accessorKey: "image_url",
        header: "Hình ảnh",
        cell: ({ row }) => renderImageCell(row.getValue("image_url"))
    },
    { accessorKey: "ram_name", header: "Tên ram" },
    { accessorKey: "brand", header: "Thương hiệu" },
    { 
        accessorKey: "price", header: "Giá bán",
        cell: ({ row }) => <div>{row.original.price.toLocaleString()} vnđ</div>
    },
    { accessorKey: "qty_in_stock", header: "Số lượng " },
]

export const monitorColumns = [
    {
        accessorKey: "image_url",
        header: "Hình ảnh",
        cell: ({ row }) => renderImageCell(row.getValue("image_url"))
    },
    { accessorKey: "monitor_name", header: "Tên màn hình" },
    { accessorKey: "brand", header: "Thương hiệu" },
    { 
        accessorKey: "price", header: "Giá bán",
        cell: ({ row }) => <div>{row.original.price.toLocaleString()} vnđ</div>
    },
    { accessorKey: "qty_in_stock", header: "Số lượng " },
]

export const dockColumns = [
    {
        accessorKey: "image_url",
        header: "Hình ảnh",
        cell: ({ row }) => renderImageCell(row.getValue("image_url"))
    },
    { accessorKey: "dock_name", header: "Tên bộ dock" },
    { accessorKey: "brand", header: "Thương hiệu" },
    { 
        accessorKey: "price", header: "Giá bán",
        cell: ({ row }) => <div>{row.original.price.toLocaleString()} vnđ</div>
    },
    { accessorKey: "qty_in_stock", header: "Số lượng " },
]

export const cableColumns = [
    {
        accessorKey: "image_url",
        header: "Hình ảnh",
        cell: ({ row }) => renderImageCell(row.getValue("image_url"))
    },
    { accessorKey: "cable_name", header: "Tên dây cáp" },
    { accessorKey: "brand", header: "Thương hiệu" },
    { 
        accessorKey: "price", header: "Giá bán",
        cell: ({ row }) => <div>{row.original.price.toLocaleString()} vnđ</div>
    },
    { accessorKey: "qty_in_stock", header: "Số lượng " },
]

export const storageColumns = [
    {
        accessorKey: "image_url",
        header: "Hình ảnh",
        cell: ({ row }) => renderImageCell(row.getValue("image_url"))
    },
    { accessorKey: "storage_name", header: "Tên ổ cứng" },
    { accessorKey: "brand", header: "Thương hiệu" },
    { 
        accessorKey: "price", header: "Giá bán",
        cell: ({ row }) => <div>{row.original.price.toLocaleString()} vnđ</div>
    },
    { accessorKey: "qty_in_stock", header: "Số lượng " },
]

export const adapterColumns = [
    {
        accessorKey: "image_url",
        header: "Hình ảnh",
        cell: ({ row }) => renderImageCell(row.getValue("image_url"))
    },
    { accessorKey: "adapter_name", header: "Tên bộ chuyển đổi" },
    { accessorKey: "brand", header: "Thương hiệu" },
    { 
        accessorKey: "price", header: "Giá bán",
        cell: ({ row }) => <div>{row.original.price.toLocaleString()} vnđ</div>
    },
    { accessorKey: "qty_in_stock", header: "Số lượng " },
]