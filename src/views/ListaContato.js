import React, { useState, useLayoutEffect } from 'react'
import Grid from '@mui/material/Grid';
import { getBrechos, getContatos } from '../services/Firebase';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function ListaContato() {

    const [brechos, setBrechos] = useState([])

    const [contatos, setContatos] = useState([])

    useLayoutEffect(() => {
        pegarBrechos()
    }, [])

    const pegarBrechos = async () => {
        let dados = await getBrechos()
        setBrechos(dados)
    }

    useLayoutEffect(() => {
        pegarContatos()
    }, [])

    const pegarContatos = async () => {
        let dados = await getContatos()
        setContatos(dados)
    }

    return (
        <div>
            <h1>Lista de Brechós</h1>
            <Grid container spacing={1}>
                <Grid item xs={12}>

                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">Nome</TableCell>
                                    <TableCell align="left">Endereço</TableCell>
                                    <TableCell align="left">Descrição</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {brechos.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align="left">{row.nome}</TableCell>
                                        <TableCell align="left">{row.endereco}</TableCell>
                                        <TableCell align="left">{row.descricao}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <h1>Contatos</h1>

                    <Grid container spacing={1}>



                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left">Assunto</TableCell>
                                        <TableCell align="left">Mensagem</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {contatos.map((row) => (
                                        <TableRow
                                            key={row.id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell align="left">{row.assunto}</TableCell>
                                            <TableCell align="left">{row.mensagem}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}
