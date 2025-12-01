import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout/Layout";
import { SearchProvider } from "./context/SearchContext";

function App() {
    return (
        <BrowserRouter>
            <SearchProvider>
                <div className="App">
                    <Layout />
                </div>
            </SearchProvider>
        </BrowserRouter>
    );
}

export default App;
