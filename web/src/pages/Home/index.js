import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../config/configApi';
import moment from 'moment';
import {
    AlertDanger,
    AlertSuccess,
    BtnAntProx,
    BtnCad,
    ButtomPrimary,
    Container,
    Extrato,
    Span,
    Table,
    TextDanger,
    TextSuccess,
    Titulo
} from '../../styles/styles';

export const Home = () => {

    const [data, setData] = useState([]);
    const [balance, setBalance] = useState('');
    const [payments, setPayments] = useState('');
    const [received, setReceived] = useState('');

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });


    var dateAtt = new Date();
    var year = dateAtt.getFullYear();
    var month = dateAtt.getMonth() + 1;

    const [dateView, setDateView] = useState({
        year,
        month
    });

    function valueBR(value) {
        var valueBR = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
        return valueBR;
    }
    const anterior = async () => {
        if (dateView.month === 1) {
            year = dateView.year - 1;
            month = 12;
            setDateView({
                year,
                month
            });
            listarExtrato(month, year);
        } else {
            year = dateView.year;
            month = dateView.month - 1;
            setDateView({
                year,
                month
            });
            listarExtrato(month, year);
        }
    }

    const proximo = async () => {
        if (dateView.month === 12) {
            year = dateView.year + 1;
            month = 1;
            setDateView({
                year,
                month
            });
            listarExtrato(month, year);
        } else {
            year = dateView.year;
            month = dateView.month + 1;
            setDateView({
                year,
                month
            });
            listarExtrato(month, year);
        }
    }

    const listarExtrato = async (month, year) => {

        if ((month === undefined) && (year === undefined)) {
            var dateAtt = new Date();
            year = dateAtt.getFullYear();
            month = dateAtt.getMonth() + 1;
        }

        await api.get('listar/' + month + '/' + year)
            .then((response => {
                setData(response.data.extratos);
                setBalance(response.data.balance);
                setPayments(response.data.payments);
                setReceived(response.data.received);

            })).catch((err) => {
                if (err.response) {
                    setStatus({
                        type: 'erro',
                        message: err.response.data.message
                    });
                } else {
                    setStatus({
                        type: 'erro',
                        message: "Erro: Tente novamente mais tarde!"
                    });
                }
            });
    }

    const deleteExtrato = async (id) => {

        const headers = {
            'Content-Type': 'application/json'
        }

        await api.delete('/delete/' + id, { headers })
            .then((response) => {
                setStatus({
                    type: 'success',
                    message: response.data.message
                });
                listarExtrato();
            }).catch((err) => {
                if (err.response) {
                    setStatus({
                        type: 'erro',
                        message: err.response.data.message
                    });
                } else {
                    setStatus({
                        type: 'erro',
                        message: "Erro: Tente novamente mais tarde!"
                    });
                }
            })
    }

    useEffect(() => {
        listarExtrato();
    }, []);

    return (
        <Container>
            <Titulo>Controle Financeiro Mensal</Titulo>
            <Extrato>
                <div>
                    <BtnAntProx>
                        <ButtomPrimary type="button" onClick={() => anterior()}>Anterior</ButtomPrimary>
                        <Span>{dateView.month + "/" + dateView.year}</Span>
                        <ButtomPrimary type="button" onClick={() => proximo()}>Próximo</ButtomPrimary>
                    </BtnAntProx>

                    {status.type === 'erro' ? <AlertDanger>{status.message}</AlertDanger> : ""}
                    {status.type === 'success' ? <AlertSuccess>{status.message}</AlertSuccess> : ""}

                    <Table>
                        <thead>
                            <tr>
                                <th>Data</th>
                                <th>Nome</th>
                                <th>Tipo</th>
                                <th>Situação</th>
                                <th>Valor</th>
                                <th>Ações</th>

                            </tr>
                        </thead>
                        <tbody>
                            {data.map(item => (
                                <tr key={item.id}>
                                    <td>
                                        {moment(item.payday).utc().format('DD/MM/YYYY')}
                                    </td>
                                    <td>{item.name}</td>
                                    <td>{item.type === 1 ? "Pagamento" : "Recebido"}</td>
                                    <td>
                                        {item.situation === 1 ? <TextSuccess>Pago</TextSuccess> : ""}
                                        {item.situation === 2 ? <TextDanger>Pendente</TextDanger> : ""}
                                        {item.situation === 3 ? <TextSuccess>Recebido</TextSuccess> : ""}
                                        {item.situation === 4 ? <TextDanger>A Receber</TextDanger> : ""}
                                    </td>
                                    <td>{valueBR(item.value)}</td>
                                    <td>
                                        <Link to={"/edit/" + item.id}><ButtomPrimary>Editar</ButtomPrimary></Link>
                                        <Link to="#"><ButtomPrimary onClick={() => deleteExtrato(item.id)}>Apagar</ButtomPrimary></Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
                <div>
                    <Table>
                        <thead>
                            <tr>
                                <th>Recebido: {valueBR(received)}</th>
                                <th>Pago: {valueBR(payments)}</th>
                                <th>Saldo: {valueBR(balance)}</th>
                            </tr>
                        </thead>
                    </Table>
                    <BtnCad>
                        <Link to="/register">
                            <ButtomPrimary>Cadastrar</ButtomPrimary>
                        </Link>
                    </BtnCad>
                </div>
            </Extrato>
        </Container >
    )
}