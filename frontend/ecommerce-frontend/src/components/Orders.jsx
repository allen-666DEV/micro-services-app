import { useEffect, useState } from "react";
import api from "../services/api";

export default function Orders() {

    const [orders, setOrders] = useState([]);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [cancelling, setCancelling] = useState(null);

    // Get all orders
    const getOrders = async () => {
        try {
            const response = await api.get("/orders");

            setOrders(response.data);
            setMessage("");

        } catch (error) {
            console.log(error);
            setMessage("Unable to load orders.");
        } finally {
            setLoading(false);
        }
    };

    // Load orders when page opens
    useEffect(() => {
        let cancelled = false;

        const fetchOrders = async () => {
            try {
                const response = await api.get("/orders");

                if (!cancelled) {
                    setOrders(response.data);
                    setMessage("");
                }

            } catch (error) {
                console.log(error);

                if (!cancelled) {
                    setMessage("Unable to load orders.");
                }

            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        fetchOrders();

        return () => {
            cancelled = true;
        };
    }, []);

    // Cancel order
    const cancelOrder = async (id) => {

        const confirmCancel = window.confirm(
            "Are you sure you want to cancel this order?"
        );

        if (!confirmCancel) {
            return;
        }

        try {
            setCancelling(id);
            setMessage("");

            await api.put(`/orders/${id}/cancel`);

            setMessage("Order cancelled successfully.");

            // Refresh orders after cancellation
            await getOrders();

        } catch (error) {
            console.log(error);

            if (error.response?.data) {
                setMessage(error.response.data);
            } else {
                setMessage("Unable to cancel order.");
            }

        } finally {
            setCancelling(null);
        }
    };

    return (
        <div className="orders-page">

            {/* Header */}
            <div className="page-header">

                <div>
                    <p className="small-title">
                        ORDER MANAGEMENT
                    </p>

                    <h1>
                        Orders
                    </h1>

                    <p>
                        View and manage customer orders
                    </p>
                </div>

                <button
                    className="refresh-btn"
                    onClick={getOrders}
                >
                    Refresh
                </button>

            </div>

            {/* Message */}
            {message && (
                <div className="message">
                    {message}
                </div>
            )}

            {/* Loading */}
            {loading && (
                <div className="loading">
                    Loading orders...
                </div>
            )}

            {/* No orders */}
            {!loading && orders.length === 0 && !message && (
                <div className="empty-state">
                    <h2>No orders found</h2>
                    <p>
                        There are currently no orders in the system.
                    </p>
                </div>
            )}

            {/* Orders */}
            {!loading && orders.length > 0 && (
                <div className="orders-container">

                    <div className="orders-table-wrapper">

                        <table className="orders-table">

                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Customer</th>
                                    <th>Product ID</th>
                                    <th>Quantity</th>
                                    <th>Total Amount</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>

                                {orders.map((order) => (

                                    <tr key={order.id}>

                                        <td>
                                            #{order.id}
                                        </td>

                                        <td>
                                            {order.customerName}
                                        </td>

                                        <td>
                                            {order.productId}
                                        </td>

                                        <td>
                                            {order.quantity}
                                        </td>

                                        <td>
                                            ₹{order.totalAmount}
                                        </td>

                                        <td>

                                            <span
                                                className={
                                                    order.status === "CANCELLED"
                                                        ? "status cancelled"
                                                        : "status created"
                                                }
                                            >
                                                {order.status}
                                            </span>

                                        </td>

                                        <td>

                                            {order.status === "CANCELLED" ? (

                                                <span className="cancelled-text">
                                                    Cancelled
                                                </span>

                                            ) : (

                                                <button
                                                    className="cancel-btn"
                                                    onClick={() =>
                                                        cancelOrder(order.id)
                                                    }
                                                    disabled={
                                                        cancelling === order.id
                                                    }
                                                >
                                                    {cancelling === order.id
                                                        ? "Cancelling..."
                                                        : "Cancel"}
                                                </button>

                                            )}

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                </div>
            )}

        </div>
    );
}