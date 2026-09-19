import { useState } from "react";
import api from "../services/api";

function CreateOrder() {

    const [customerName, setCustomerName] = useState("");
    const [productId, setProductId] = useState("");
    const [quantity, setQuantity] = useState("");
    const [totalAmount, setTotalAmount] = useState("");

    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const createOrder = async (e) => {

        e.preventDefault();

        if (
            !customerName ||
            !productId ||
            !quantity ||
            !totalAmount
        ) {
            setSuccess(false);
            setMessage("Please fill all fields.");
            return;
        }

        try {

            setLoading(true);
            setMessage("");

            const order = {
                customerName: customerName,
                productId: Number(productId),
                quantity: Number(quantity),
                totalAmount: Number(totalAmount)
            };

            await api.post("/orders", order);

            setSuccess(true);
            setMessage("Order created successfully!");

            setCustomerName("");
            setProductId("");
            setQuantity("");
            setTotalAmount("");

        } catch (error) {

            console.log(error);

            setSuccess(false);

            if (error.response) {

                if (typeof error.response.data === "string") {
                    setMessage(error.response.data);
                } else {
                    setMessage("Unable to create order.");
                }

            } else {

                setMessage(
                    "Cannot connect to the server."
                );

            }

        } finally {

            setLoading(false);

        }
    };

    return (
        <div>

            <div className="page-header">

                <div>
                    <p className="small-title">
                        ORDER MANAGEMENT
                    </p>

                    <h1>Create Order</h1>

                    <p>
                        Create a new customer order.
                    </p>
                </div>

            </div>

            <div className="order-layout">

                <div className="order-form-card">

                    <h2>Order Details</h2>

                    <form onSubmit={createOrder}>

                        <label>
                            Customer Name
                        </label>

                        <input
                            type="text"
                            placeholder="Enter customer name"
                            value={customerName}
                            onChange={(e) =>
                                setCustomerName(e.target.value)
                            }
                        />

                        <label>
                            Product ID
                        </label>

                        <input
                            type="number"
                            placeholder="Enter product ID"
                            value={productId}
                            onChange={(e) =>
                                setProductId(e.target.value)
                            }
                        />

                        <label>
                            Quantity
                        </label>

                        <input
                            type="number"
                            min="1"
                            placeholder="Enter quantity"
                            value={quantity}
                            onChange={(e) =>
                                setQuantity(e.target.value)
                            }
                        />

                        <label>
                            Total Amount
                        </label>

                        <input
                            type="number"
                            step="0.01"
                            placeholder="Enter total amount"
                            value={totalAmount}
                            onChange={(e) =>
                                setTotalAmount(e.target.value)
                            }
                        />

                        {message && (
                            <div
                                className={
                                    success
                                        ? "success-message"
                                        : "error-message"
                                }
                            >
                                {message}
                            </div>
                        )}

                        <button
                            className="primary-btn full-btn"
                            type="submit"
                            disabled={loading}
                        >
                            {loading
                                ? "Creating..."
                                : "Place Order"}
                        </button>

                    </form>

                </div>

                <div className="order-info-card">

                    <div className="big-icon">
                        🛒
                    </div>

                    <h2>
                        Order Processing
                    </h2>

                    <p>
                        Your order will be checked against
                        the available inventory before it
                        is created.
                    </p>

                    <div className="process-step">
                        <span>1</span>
                        Check inventory
                    </div>

                    <div className="process-step">
                        <span>2</span>
                        Validate quantity
                    </div>

                    <div className="process-step">
                        <span>3</span>
                        Save order
                    </div>

                </div>

            </div>

        </div>
    );
}

export default CreateOrder;