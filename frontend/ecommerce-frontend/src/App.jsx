import { useState } from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Products from "./components/Products";
import Inventory from "./components/Inventory";
import CreateOrder from "./components/CreateOrder";
import Orders from "./components/Orders";
import "./css/App.css";

function App() {

    const [page, setPage] = useState("dashboard");

    return (
        <div className="app">

            <Navbar
                page={page}
                setPage={setPage}
            />

            <main className="main-content">

                {page === "dashboard" && (
                    <Dashboard setPage={setPage} />
                )}

                {page === "products" && (
                    <Products setPage={setPage} />
                )}

                {page === "inventory" && (
                    <Inventory />
                )}

                {page === "create-order" && (
                    <CreateOrder setPage={setPage} />
                )}

                {page === "orders" && (
                    <Orders />
                )}

            </main>

        </div>
    );
}

export default App;