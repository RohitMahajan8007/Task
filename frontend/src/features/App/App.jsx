import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { router } from "./App.Route.jsx";
import { store } from "./App.store.js";
import "./App.css";


import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAuth } from "../Auth/Hooks/UseAuth.jsx";
import { setLoading } from "../Auth/Auth.slice.js";

function AppContent() {
    const { handleGetMe } = useAuth();
    const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            handleGetMe().catch((err) => {
                console.log("Session verification failed, logging out", err);
                localStorage.removeItem("token");
            });
        } else {
            dispatch(setLoading(false));
        }
    }, []);

    return <RouterProvider router={router} />;
}

function App() {
    return (
        <Provider store={store}>
            <AppContent />
        </Provider>
    );
}

export default App;