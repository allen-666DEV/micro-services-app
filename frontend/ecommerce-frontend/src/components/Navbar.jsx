function Navbar({ page, setPage }) {

    return (
        <nav className="navbar">

            <div
                className="logo"
                onClick={() => setPage("dashboard")}
            >
                Enterprise Store
            </div>

            <div className="nav-links">

                <button
                    className={page === "dashboard" ? "active" : ""}
                    onClick={() => setPage("dashboard")}
                >
                    Dashboard
                </button>

                <button
                    className={page === "products" ? "active" : ""}
                    onClick={() => setPage("products")}
                >
                    Products
                </button>

                <button
                    className={page === "inventory" ? "active" : ""}
                    onClick={() => setPage("inventory")}
                >
                    Inventory
                </button>

                <button
                    className={page === "orders" ? "active" : ""}
                    onClick={() => setPage("orders")}
                >
                    Orders
                </button>

            </div>

            <div className="user-icon">
                👤
            </div>

        </nav>
    );
}

export default Navbar;