import React, { useState } from 'react'
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { saveBrechos } from '../services/Firebase';
import { useHistory } from "react-router-dom";
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Collapse from '@mui/material/Collapse';

import Geocode from "react-geocode";
Geocode.setApiKey("AIzaSyDZ6FmN2ATxJ44iuXR4yHIUKRgEGMsqmlQ");

export default function Brechos() {
    let history = useHistory();
    const [nome, setNome] = useState("")
    const [endereco, setEndereco] = useState("")
    const [descricao, setDescricao] = useState("")
    const [msg, setMsg] = useState("")
    const [open, setOpen] = React.useState(false);

    const save = async () => {

        let objeto = {
            nome: nome,
            endereco: endereco,
            descricao: descricao
        }
        try {
            await saveBrechos(objeto, Geocode)
            history.push("/brechoslista")
        } catch (error) {
            setMsg(error)
            setOpen(true)
        }
    }

    return (
        <div>
            <h1>Cadastro de Brechós</h1>
            <Grid container spacing={1}>
                <Grid item xs={4}></Grid>
                <Grid item xs={4}>
                    <Collapse in={open}>
                        <Alert
                            severity="error"
                            action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                        setOpen(false);
                                    }}
                                >
                                    <CloseIcon fontSize="inherit" />
                                </IconButton>
                            }
                            sx={{ mb: 2 }}
                        >
                            {msg}
                        </Alert>
                    </Collapse>
                </Grid>
                <Grid item xs={4}></Grid>
                <Grid item xs={6}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <TextField
                                type="text"
                                id="outlined-basic"
                                label="Nome"
                                variant="outlined"
                                value={nome}
                                size="small"
                                fullWidth
                                onChange={(e) => setNome(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                type="text"
                                id="outlined-basic"
                                label="Endereço"
                                variant="outlined"
                                value={endereco}
                                size="small"
                                fullWidth
                                onChange={(e) => setEndereco(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                type="text"
                                id="outlined-basic"
                                label="Descricão"
                                variant="outlined"
                                value={descricao}
                                size="small"
                                fullWidth
                                multiline
                                rows={4}
                                onChange={(e) => setDescricao(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" size="small" onClick={save}>
                                Salvar Registro
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>

            </Grid>
        </div>
    )
}
