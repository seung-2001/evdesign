import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout/Layout";
import { SearchProvider } from "./context/SearchContext";
import { AuthProvider } from "./context/AuthContext";

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <SearchProvider>
                    <div className="App">
                        <Layout />
                     </div>
                </SearchProvider>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
