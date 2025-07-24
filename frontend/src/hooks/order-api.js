import axios from "axios";

const API_URL = 'http://localhost:5004';

export const getOrderData = async (setData) => {
    try {
        const orders = await axios.get(`${API_URL}/manage/order/all`);
        console.log("API getOrderData:", orders.data.orders);
        setData(orders.data.orders); // Gọi setData để cập nhật state
    } catch (error) {
        console.log("Lỗi khi lấy dữ liệu đơn hàng:", error);
    }
};

export const getUnprocessedOrders = async (setData) => {
    try {
        const result = await axios.get(`${API_URL}/manage/order/unprocessed`);
        console.log("API getUnprocessedOrders:", result.data.orders);
        setData(result.data.orders); // Gọi setData để cập nhật state
    } catch (error) {
        console.log("Lỗi khi lấy đơn hàng chưa xử lý:", error);
    }
};

export const getOrderDetailsData = async (order_id, setData) => {
    try {
        const orderDetails = await axios.get(`${API_URL}/manage/order/details/all/${order_id}`);
        // console.log("API getOrderDetailsData:", orderDetails.data.details);

        const formatData = orderDetails.data.details.map((detail) => {
            const name = Object.keys(detail.product).find(
                key => key.endsWith('_name')
            ) || null;

            console.log('getting details')

            return {
                ...detail,
                name: detail.product[name],
                price: detail.product.price
            }
        })

        console.log("API getOrderDetailsData:", formatData);
        setData(formatData); // Gọi setData để cập nhật state
    } catch (error) {
        console.log("Lỗi khi lấy chi tiết đơn hàng:", error);
    }
};

export const getRejectedOrders = async (setData) => {
    try {
        const result = await axios.get(`${API_URL}/manage/order/rejected`);
        console.log(result.data.orders)
        setData(result.data.orders);
    } catch (error) {
        console.log(error);
    }
}

export const getProcessedOrders = async (setData) => {
    try {
        const result = await axios.get(`${API_URL}/manage/order/processed`);
        console.log("API getProcessedOrders:", result.data.orders);
        setData(result.data.orders); // Gọi setData để cập nhật state
    } catch (error) {
        console.log("Lỗi khi lấy đơn hàng đã xử lý:", error);
    }
};

export const getOrdersByAccountId = async (account_id, setProcessingOrders, setDeliveredOrders) => {
    try {
        const result = await axios.get(`${API_URL}/manage/order/my-orders/${account_id}`);
        const allOrders = result.data.orders;

        const delivered = allOrders.filter(order => order.status_id === 5);
        const processing = allOrders.filter(order => order.status_id !== 5);

        setDeliveredOrders(delivered);
        setProcessingOrders(processing);

    } catch (error) {
        console.log("Lỗi khi lấy đơn hàng:", error);
    }
};

export const getAllOrdersByAccountId = async (account_id, setOrders) => {
    try {
        const result = await axios.get(`${API_URL}/manage/order/my-orders/${account_id}`);
        const allOrders = result.data.orders;

        setOrders(allOrders)
    } catch (error) {
        console.log("Lỗi khi lấy đơn hàng:", error);
    }
};

export const updateOrderStatus = async (order_id, statusId) => {
    try {
        const result = await axios.put(`${API_URL}/manage/order/check/${order_id}`, { status_id: statusId });
        console.log("API updateOrderStatus:", result.data);
        return result.data; // Trả về dữ liệu đơn hàng đã cập nhật
    } catch (error) {
        console.log("Lỗi khi cập nhật trạng thái đơn hàng:", error);
        return null;
    }
};