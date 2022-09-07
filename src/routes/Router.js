import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cadastro from "../pages/cadastro/Cadastro";
import Lista from "../pages/lista/Lista";


export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Cadastro/>} />
                <Route path="/lista" element={<Lista/>} />
                <Route path="/lista/:update" element={<Cadastro/>} />

            </Routes>
        </BrowserRouter>
    )
}

