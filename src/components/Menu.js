import React from 'react'
import Grid from '@mui/material/Grid';
import { useHistory } from "react-router-dom";
import { logoff } from '../services/Firebase'
import Button from '@mui/material/Button';

export default function Menu() {
    let history = useHistory();
    const efetuarLogoff = () => {
        logoff()
            .then(() => history.push("/"))
    }

    return (
        <Grid container spacing={1}>
            <Grid item xs={2}>
                <Button
                    onClick={() => history.push("/home")}
                    fullWidth variant="outlined">Home</Button>
            </Grid>

            <Grid item xs={2}>
                <Button
                    onClick={() => history.push("/brechos")}
                    fullWidth variant="outlined">Cadastro de Brechós</Button>
            </Grid>

            <Grid item xs={2}>
                <Button
                    onClick={() => history.push("/brechoslista")}
                    fullWidth variant="outlined">Visualizar Brechós</Button>
            </Grid>

            <Grid item xs={2} className="nav-item mx-0 mx-lg-1">
                <Button
                    onClick={() => history.push("/recados")}
                    fullWidth variant="outlined">Ver os Recados</Button>
            </Grid>

            <Grid item xs={2} className="nav-item mx-0 mx-lg-1">
                <Button
                    onClick={() => history.push("/listacontato")}
                    fullWidth variant="outlined">Lista de Contatos</Button>
            </Grid>

            <Grid item xs={2}>
                <Button fullWidth variant="outlined" onClick={efetuarLogoff}>Logoff</Button>
            </Grid>
        </Grid>

    )
}
