import { useEffect, useState } from "react";
import api from "../services/api";

export default function Products() {

    const [products, setProducts] = useState([]);

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");

    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);


    // Used by the Refresh Products button
    const getProducts = async () => {

        try {

            const response = await api.get("/products");

            setProducts(response.data);
            setMessage("");

        } catch (error) {

            console.log(error);

            setSuccess(false);
            setMessage("Unable to fetch products.");

        }
    };


    // Fetch products when the page loads
    useEffect(() => {

        const fetchProducts = async () => {

            try {

                const response = await api.get("/products");

                setProducts(response.data);
                setMessage("");

            } catch (error) {

                console.log(error);

                setSuccess(false);
                setMessage("Unable to fetch products.");

            }

        };

        fetchProducts();

    }, []);


    // Add Product
    const addProduct = async (e) => {

        e.preventDefault();

        if (!name || !price) {

            setSuccess(false);
            setMessage("Please fill all fields.");

            return;
        }


        try {

            setLoading(true);
            setMessage("");

            const product = {
                name: name,
                price: Number(price)
            };


            await api.post("/products", product);


            setSuccess(true);
            setMessage("Product added successfully!");


            // Clear form
            setName("");
            setPrice("");


            // Refresh product list
            getProducts();


        } catch (error) {

            console.log(error);

            setSuccess(false);


            if (error.response) {

                if (typeof error.response.data === "string") {

                    setMessage(error.response.data);

                } else {

                    setMessage("Unable to add product.");

                }

            } else {

                setMessage("Cannot connect to the server.");

            }

        } finally {

            setLoading(false);

        }

    };


    return (

        <div>


            {/* PAGE HEADER */}

            <div className="page-header">

                <div>

                    <p className="small-title">
                        PRODUCT MANAGEMENT
                    </p>

                    <h1>
                        Products
                    </h1>

                    <p>
                        Manage products and their prices.
                    </p>

                </div>

            </div>


            {/* ADD PRODUCT SECTION */}

            <div className="order-layout">


                {/* ADD PRODUCT FORM */}

                <div className="order-form-card">

                    <h2>
                        Add Product
                    </h2>


                    <form onSubmit={addProduct}>


                        {/* PRODUCT NAME */}

                        <label>
                            Product Name
                        </label>

                        <input
                            type="text"
                            placeholder="Enter product name"
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                        />


                        {/* PRICE */}

                        <label>
                            Price
                        </label>

                        <input
                            type="number"
                            step="0.01"
                            min="0"
                            placeholder="Enter product price"
                            value={price}
                            onChange={(e) =>
                                setPrice(e.target.value)
                            }
                        />


                        {/* MESSAGE */}

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


                        {/* ADD BUTTON */}

                        <button
                            className="primary-btn full-btn"
                            type="submit"
                            disabled={loading}
                        >

                            {loading
                                ? "Adding..."
                                : "Add Product"}

                        </button>


                    </form>

                </div>


                {/* INFORMATION CARD */}

                <div className="order-info-card">

                    <div className="big-icon">
                        📦
                    </div>


                    <h2>
                        Product Management
                    </h2>


                    <p>
                        Add products to the store.
                        Products can then be used when
                        creating customer orders.
                    </p>


                    <div className="process-step">

                        <span>
                            1
                        </span>

                        Enter product details

                    </div>


                    <div className="process-step">

                        <span>
                            2
                        </span>

                        Add product

                    </div>


                    <div className="process-step">

                        <span>
                            3
                        </span>

                        Product becomes available

                    </div>

                </div>


            </div>


            {/* PRODUCT LIST */}

            <div style={{ marginTop: "30px" }}>


                <div className="page-header">

                    <div>

                        <h2>
                            Available Products
                        </h2>

                        <p>
                            Products currently available
                            in the system.
                        </p>

                    </div>


                    <button onClick={getProducts}>
                        Refresh Products
                    </button>

                </div>


                {/* NO PRODUCTS */}

                {products.length === 0 && (

                    <p>
                        No products available.
                    </p>

                )}


                {/* PRODUCT CARDS */}

                <div className="cards">

                    {products.map((product) => (

                        <div
                            className="card"
                            key={product.id}
                        >

                            <h3>
                                {product.name}
                            </h3>


                            <p>
                                Product ID: {product.id}
                            </p>


                            <p>
                                Price: ₹{product.price}
                            </p>

                        </div>

                    ))}

                </div>


            </div>


        </div>

    );

}