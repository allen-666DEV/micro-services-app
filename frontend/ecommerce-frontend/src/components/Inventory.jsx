import { useState } from "react";
import api from "../services/api";

function Inventory() {

    const [productId, setProductId] = useState("");
    const [inventory, setInventory] = useState(null);

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const checkInventory = async () => {

        if (!productId) {
            setMessage("Please enter a Product ID.");
            setInventory(null);
            return;
        }

        try {

            setLoading(true);
            setMessage("");
            setInventory(null);

            const response =
                await api.get(`/inventory/${productId}`);

            setInventory(response.data);

        } catch (error) {

            console.log(error);

            setMessage(
                "Inventory not found for this product."
            );

        } finally {

            setLoading(false);

        }
    };

    return (
        <div>

            <div className="page-header">

                <div>
                    <p className="small-title">
                        STOCK MANAGEMENT
                    </p>

                    <h1>Inventory</h1>

                    <p>
                        Check the current stock of a product.
                    </p>
                </div>

            </div>

            <div className="inventory-container">

                <div className="inventory-search">

                    <h2>Check Stock</h2>

                    <p>
                        Enter a product ID to see its
                        current inventory.
                    </p>

                    <div className="search-row">

                        <input
                            type="number"
                            placeholder="Product ID"
                            value={productId}
                            onChange={(e) =>
                                setProductId(e.target.value)
                            }
                        />

                        <button
                            className="primary-btn"
                            onClick={checkInventory}
                        >
                            Check Stock
                        </button>

                    </div>

                </div>

                {loading && (
                    <div className="message">
                        Checking inventory...
                    </div>
                )}

                {message && (
                    <div className="error-message">
                        {message}
                    </div>
                )}

                {inventory && (

                    <div className="inventory-result">

                        <div className="inventory-icon">
                            📦
                        </div>

                        <div>

                            <span>
                                PRODUCT #{inventory.productId}
                            </span>

                            <h2>
                                Available Stock
                            </h2>

                            <strong className="quantity">
                                {inventory.quantity}
                            </strong>

                            <p>units available</p>

                        </div>

                    </div>

                )}

            </div>

        </div>
    );
}

export default Inventory;