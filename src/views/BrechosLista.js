import React, { useState, useLayoutEffect } from 'react'
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { deleteBrechos, getBrechos } from '../services/Firebase';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function BrechosLista() {

    const [brechos, setBrechos] = useState([])

    useLayoutEffect(() => {
        pegarBrechos()
    }, [])

    const pegarBrechos = async () => {
        let dados = await getBrechos()
        setBrechos(dados)
    }

    const deletar = async (id) => {
        await deleteBrechos(id)
        await pegarBrechos()
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
                                        <TableCell align="left">
                                            <Button onClick={() => deletar(row.id)}>Deletar</Button>

                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </div>
    )
}
