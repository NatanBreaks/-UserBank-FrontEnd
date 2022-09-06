import React, { useState, useEffect } from "react";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material/';
import api from '../../services/api';
import { Avatar, Button } from "@mui/material";
import { useNavigate } from "react-router";
import { MainContainer, Botoes } from "./style";

const goToCadastro = (navigate) => {
    navigate('/')
}


const columns = [
    { id: 'avatar_url', label: 'Avatar', minWidth: 15 },
    { id: 'nome', label: 'Nome', minWidth: 200 },
    { id: 'cpf', label: 'CPF', minWidth: 100 },
    { id: 'limite', label: 'Limite', minWidth: 30, align: 'right' },
];

function createData(avatar, nome, cpf, limite) {
    const avatar_url = <img src={avatar} />
    return { avatar_url, nome, cpf, limite };
}

// c

export default function StickyHeadTable() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(7);
    const [users, setUsers] = useState([]);
    const navigate = useNavigate()

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };



    const BuscaLista = async () => {

        try {
            const response = await api.get(`usuarios`)
            console.log(response)
            setUsers(response.data.Detalhes)
        } catch (error) {
            console.log(error.response);
        }
    }

    const deletarUsuario = async (cpf) => {

        try {
            await api.delete(`usuarios/${cpf}`)
            BuscaLista()
        } catch (error) {
            console.log(error.response);
        }
    }

    const editar = (user) => {
        window.localStorage.setItem("user", JSON.stringify(user))
        goToCadastro(navigate)
    }



    useEffect(() => {
        BuscaLista()
    }, [])

    return (
        <MainContainer>

            <Paper sx={{ width: '100%', overflow: 'hidden', alignSelf: "center" }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {users
                                .map((user) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={user.code}>
                                            {/* <Avatar src={user.avatar_url} 
                                            sx={{ display: "flex", ml: "20%"}}
                                            /> */}
                                            {columns.map((column) => {
                                                return (
                                                    <TableCell>
                                                        {column.id === "avatar_url" ? <Avatar src={user.avatar_url}
                                                            sx={{ display: "flex", ml: "20%" }}
                                                        /> :
                                                            user[column.id]}
                                                    </TableCell>
                                                );
                                            })}
                                            <Botoes>
                                                <Button
                                                    onClick={() => editar(user)} sx={{ backgroundColor: "#fcdf38", color: "black", pl: "15px", pr: "15px", mt: "2px", mb: "2px" }} > Editar </Button>
                                                <Button
                                                    onClick={() => deletarUsuario(user.cpf)}
                                                    sx={{ backgroundColor: "red", color: "black", mb: "2px", mt: "2px" }}
                                                > Deletar
                                                </Button>
                                            </Botoes>
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>

                <TablePagination
                    labelRowsPerPage=""
                    rowsPerPageOptions={[]}
                    count={users.length}
                    rowsPerPage={rowsPerPage}
                    component="div"
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </MainContainer>
    );
}
