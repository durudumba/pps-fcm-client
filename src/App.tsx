import './style/style.css';
import './App.css'

import {Routes, Route, BrowserRouter} from "react-router-dom";
import AlarmRegist from "./pages/AlarmRegist";
import AlarmHistory from "./pages/AlarmHistory";
import {pagePaths} from "./comm/pagePaths";

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path={pagePaths.regist.path} element={<AlarmRegist/>}/>
                <Route path={pagePaths.history.path} element={<AlarmHistory/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App;