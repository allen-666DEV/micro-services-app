function Dashboard({ setPage }) {

    return (
        <div>

            <section className="hero">

                <div>
                    <p className="small-title">
                        ENTERPRISE STORE
                    </p>

                    <h1>
                        Manage your business
                        <br />
                        from one place.
                    </h1>

                    <p className="hero-text">
                        Manage products, check inventory,
                        and create orders using your
                        microservices application.
                    </p>

                    <button
                        className="primary-btn"
                        onClick={() => setPage("products")}
                    >
                        View Products →
                    </button>
                </div>

            </section>

            <section className="dashboard-cards">

                <div
                    className="dashboard-card"
                    onClick={() => setPage("products")}
                >
                    <div className="card-icon">
                        📦
                    </div>

                    <h3>Products</h3>

                    <p>
                        View available products and prices.
                    </p>

                    <span>
                        View Products →
                    </span>
                </div>

                <div
                    className="dashboard-card"
                    onClick={() => setPage("inventory")}
                >
                    <div className="card-icon">
                        📊
                    </div>

                    <h3>Inventory</h3>

                    <p>
                        Check stock availability for products.
                    </p>

                    <span>
                        Check Inventory →
                    </span>
                </div>

                <div
                    className="dashboard-card"
                    onClick={() => setPage("orders")}
                >
                    <div className="card-icon">
                        🛒
                    </div>

                    <h3>Orders</h3>

                    <p>
                        View and manage customer orders.
                    </p>0

                    <span>
                        View Orders →
                    </span>
                </div>

            </section>

        </div>
    );
}

export default Dashboard;