import { Alert, Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { EditImage, Header, Img1, Img2, Inputs, MainContainer } from "./style";
import mais from "../../img/mais.png"
import menos from "../../img/menos.png"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { cpfMask, dinheiroMask, cepMask } from 'masks-br';
import { goToLista } from "../../routes/navigate";
import { useNavigate, useParams } from "react-router";
import  moment  from "moment"



export default function Cadastro() {
    const params = useParams()
    const [nome, setNome] = useState('')
    const [cpf, setCpf] = useState('')
    const [data_nascimento, setData_nascimento] = useState("")
    const [saldo, setSaldo] = useState(Number)
    const [limite, setLimite] = useState(Number)
    const [cep, setCep] = useState('')
    const [logradouro, setLogradouro] = useState('')
    const [bairro, setBairro] = useState('')
    const [numero, setNumero] = useState('')
    const [cidade, setCidade] = useState('')
    const [uf, setUf] = useState('')
    const [avatar_url, setAvatar_url] = useState('')
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate()


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        alterarImg()
    };


    const nomeValue = (event) => {
        setNome(event.target.value)
    }
    const cpfValue = (event) => {
        setCpf(event.target.value)
    }
    const Data_nascimentoValue = (event) => {
        setData_nascimento(event.target.value)
    }
    const saldoValue = (event) => {
        setSaldo(event.target.value)
    }
    const limiteValue = (event) => {
        setLimite(event.target.value)
    }
    const cepValue = (event) => {
        setCep(event.target.value)
    }
    const logradouroValue = (event) => {
        setLogradouro(event.target.value)
    }
    const bairroValue = (event) => {
        setBairro(event.target.value)
    }
    const numeroValue = (event) => {
        setNumero(event.target.value)
    }
    const cidadeValue = (event) => {
        setCidade(event.target.value)
    }
    const ufValue = (event) => {
        setUf(event.target.value)
    }
    const avatar_urlValue = (event) => {
        setAvatar_url(event.target.value)
    }

    const criarCadastro = async () => {
        const body = {
            nome: nome,
            cpf: cpf,
            data_nascimento: moment(data_nascimento).format("YYYY-MM-DD"),
            saldo: saldo,
            limite: limite,
            cep: cep,
            logradouro: logradouro,
            bairro: bairro,
            numero: numero,
            cidade: cidade,
            uf: uf,
            avatar_url: avatar_url
        }
        console.log(data_nascimento)
        try {
            params.update === "editar" ? await api.put(`dados/update`, body) :
                await api.put(`dados`, body)
            alert('Cadastro criado com sucesso')


        } catch (error) {
            console.log(error);
            console.log("oi", params.update)
            alert(`Erro ao Atualizar/Criar cadastro do Usuario. ${params.update}`)
        }
    }

    const alterarImg = async () => {
        const body = {
            cpf: cpf,
            avatar_url: avatar_url
        }


        try {
            const response = await api.put(`dados/img`, body)
            alert('Tudo Certo. Avatar já Recebido com Sucesso')


        } catch (error) {
            console.log(error.response);
            console.log(`Erro ao alterar imagem. ${error.response.statusText}`)
        }
    }
    const removerImg = async () => {
        const url = "-";
        setAvatar_url(url)

        const body = {
            cpf: cpf,
            avatar_url: avatar_url
        }


        try {
            const response = await api.put(`dados/img`, body)
            alert('Avatar Removido com Sucesso')


        } catch (error) {
            console.log('Erro ao Remover Avatar do Usuario.', error.response);
        }
    }

    const BuscaCEP = async () => {
        const CEP = cep

        try {
            const response = await api.get(`dados/${CEP}`)
            console.log(response.data)
            setLogradouro(response.data.Bcep.logradouro)
            setBairro(response.data.Bcep.bairro)
            setNumero(response.data.Bcep.numero)
            setCidade(response.data.Bcep.localidade)
            setUf(response.data.Bcep.uf)
        } catch (error) {
            console.log(error.data.response);
            alert('Erro ao pegar Cep.')
        }
    }


    useEffect(() => {
        const user = JSON.parse(window.localStorage.getItem("user"))
        if (user) {
            setNome(user.nome)
            setCpf(user.cpf)
            setData_nascimento(user.data_nascimento)
            setSaldo(user.saldo)
            setLimite(user.limite)
            setCep(user.cep)
            setLogradouro(user.logradouro)
            setBairro(user.bairro)
            setNumero(user.numero)
            setCidade(user.cidade)
            setUf(user.uf)
            setAvatar_url(user.avatar_url)
        }
    }, [])

    return (
        <MainContainer>
            <Header>
                <h2>EDIÇÃO DE CLIENTE</h2>
                <Button onClick={() => { goToLista(navigate) }}>Acessar Lista De Usuarios</Button>
            </Header>
            <EditImage>
                <div>
                    <img onClick={handleClickOpen} src="https://cdn-icons-png.flaticon.com/512/18/18601.png" />
                </div>
                <Img1 src={menos} onClick={removerImg} />
                <Img2 src={mais} onClick={handleClickOpen} />
            </EditImage>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Adiciona Imagem</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Digite o cpf no campo "CPF" e logo apos digite o URL abaixo:
                    </DialogContentText>
                    <TextField
                        placeholder="https://www.exemplo.com/imagens/minhafoto/"
                        fullWidth
                        type={"text"}
                        value={avatar_url}
                        onChange={avatar_urlValue}
                        variant="standard"
                        maxLength='128'
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Voltar</Button>
                    <Button onClick={handleClose}>Salvar</Button>
                </DialogActions>
            </Dialog>
            <Inputs>
                <p>Nome</p>
                <TextField
                    sx={{ backgroundColor: "#edeff0", color: "#edeff0", width: "79.4vw", "input": { "&::placeholder": { padding: "4px" } } }}
                    placeholder=" Digite aqui..."
                    value={nome}
                    maxLength='32'
                    fullWidth
                    onChange={nomeValue} />
                <div>
                    <div>
                        <p>CPF</p>
                        <TextField
                            sx={{ backgroundColor: "#edeff0", color: "#edeff0", width: "39vw" }}
                            placeholder="000.000.00-00"
                            type={"text"}
                            value={cpfMask(cpf)}
                            maxLength='18'
                            onChange={cpfValue} />
                    </div>
                    <div>
                        <p>Nascimento</p>
                        <TextField
                            sx={{ backgroundColor: "#edeff0", color: "#edeff0", width: "40vw" }}
                            type={"date"}
                            placeholder="00/00/0000"
                            value={moment(data_nascimento).format("YYYY-MM-DD")}
                            onChange={Data_nascimentoValue} />
                    </div>
                </div>
                <div>
                    <div>
                        <p>Saldo</p>
                        <TextField
                            sx={{ backgroundColor: "#edeff0", color: "#edeff0", width: "39vw" }}
                            placeholder="R$ 0,00"
                            value={saldo}
                            onChange={saldoValue} />
                    </div>
                    <div>
                        <p>Limite</p>
                        <TextField
                            sx={{ backgroundColor: "#edeff0", color: "#edeff0", width: "40vw" }}
                            placeholder="R$ 0,00"
                            value={limite}
                            onChange={limiteValue} />
                    </div>
                </div>
                <div>
                    <div>
                        <label>Cep</label>
                        <TextField
                            sx={{ backgroundColor: "#edeff0", color: "#edeff0", width: "39vw" }}
                            placeholder="00.000-00"
                            value={cepMask(cep)}
                            max={10}
                            onChange={cepValue} />

                    </div>
                    <div>
                        <Button
                            sx={{ backgroundColor: "#26d9ed", color: "black", width: "20vw", height: "100%" }}
                            onClick={BuscaCEP}>Completar</Button>

                    </div>
                </div>

                <p>Logradouro</p>
                <TextField
                    sx={{ backgroundColor: "#edeff0", color: "#edeff0", width: "79.4vw" }}
                    placeholder="Endereço"
                    type={"text"}
                    value={logradouro}
                    maxLength='32'
                    onChange={logradouroValue} />

                <div>
                    <div>
                        <p>Bairro</p>
                        <TextField
                            sx={{ backgroundColor: "#edeff0", color: "#edeff0", width: "39vw" }}
                            placeholder="Endereço"
                            value={bairro}
                            maxLength='32'
                            onChange={bairroValue} />
                    </div>
                    <div>
                        <p>Número</p>
                        <TextField
                            sx={{ backgroundColor: "#edeff0", color: "#edeff0", width: "40vw" }}
                            placeholder="Endereço"
                            value={numero}
                            maxLength='6'
                            onChange={numeroValue} />
                    </div>
                </div>
                <div>
                    <div>
                        <p>Cidade</p>
                        <TextField
                            sx={{ backgroundColor: "#edeff0", color: "#edeff0", width: "39vw" }}
                            placeholder="Cidade"
                            value={cidade}
                            maxLength='32'
                            onChange={cidadeValue} />

                    </div>
                    <div>
                        <p>Uf</p>
                        <TextField
                            sx={{ backgroundColor: "#edeff0", color: "#edeff0", width: "40vw" }}
                            placeholder="Uf"
                            value={uf}
                            onChange={ufValue}
                            maxLength='2' />
                    </div>


                </div>
                <Button
                    sx={{ backgroundColor: "#36ba59", color: "white", mt: "15px", width: "80vw" }}
                    onClick={criarCadastro}
                    type={`submit`}>Salvar</Button>
            </Inputs>
        </MainContainer >
    )

}
