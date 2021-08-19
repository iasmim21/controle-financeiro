import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import api from '../../config/configApi';

import {
    Container,
    Titulo,
    ButtomSuccess,
    ButtomAction,
    AlertDanger,
    AlertSuccess,
    Form,
    Label,
    Input,
    Select,
    Extrato,
    ButtomPrimary
} from '../../styles/styles';

export const Register = () => {

    const [extrato, setExtrato] = useState({
        name: '',
        value: '',
        type: '',
        situation: '',
        payday: ''

    });

    const [extratoValue, setExtratoValue] = useState('');

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const valueInput = e => setExtrato({ ...extrato, [e.target.name]: e.target.value });

    const valueFormat = async e => {
        var valueExtrato = e.target.value;

        valueExtrato = valueExtrato.replace(/\D/g, "");
        valueExtrato = valueExtrato.replace(/(\d)(\d{2})$/, "$1,$2");
        valueExtrato = valueExtrato.replace(/(?=(\d{3})+(\D))\B/g, ".");

        setExtratoValue(valueExtrato);

        //valor no formato certo para salvar no BD
        var valueSave = await valueExtrato.replace(".", "");
        valueSave = await valueSave.replace(",", ".");

        setExtrato({ ...extrato, value: valueSave });
    }

    const cadExtrato = async e => {
        e.preventDefault(); //não recarrega a página

        const headers = {
            'Content-Type': 'application/json'
        }

        await api.post('/cadastrar', extrato, { headers })
            .then((response) => {
                console.log(response);
                setStatus({
                    type: 'success',
                    message: response.data.message
                });
            }).catch((err) => {
                if (err.response) {
                    setStatus({
                        type: 'error',
                        message: err.response.data.message
                    });

                } else {
                    setStatus({
                        type: 'success',
                        message: 'Erro: tente mais tarde novamente'
                    });

                }
                console.log(err.response);
            })
    }

    return (
        <Container>
            <Titulo>Controle Financeiro Mensal</Titulo>
            <Extrato>
                {status.type === 'error' ? <AlertDanger>{status.message}</AlertDanger> : ""}
                {status.type === 'success' ? <AlertSuccess>{status.message}</AlertSuccess> : ""}

                <Form onSubmit={cadExtrato}>
                    <Label>Nome: </Label>
                    <Input type="text" name="name" placeholder="Nome do Extrato" onChange={valueInput} />

                    <Label>Valor: </Label>
                    <Input type="text" name="value" placeholder="Valor do Extrato" value={extratoValue} onChange={valueFormat} />

                    <Label>Tipo: </Label>
                    <Select name="type" onChange={valueInput}>
                        <option value="">Selecione</option>
                        <option value="1">Pagamento</option>
                        <option value="2">Recebido</option>
                    </Select>

                    <Label>Situação: </Label>
                    <Select name="situation" onChange={valueInput}>
                        <option value="">Selecione</option>
                        <option value="1">Pago</option>
                        <option value="2">Pendente</option>
                        <option value="3">Recebido</option>
                        <option value="4">A Receber</option>
                    </Select>

                    <Label>Data de pagamento: </Label>
                    <Input type="date" name="payday" onChange={valueInput} />

                    <ButtomAction>
                        <Link to="/">
                            <ButtomPrimary>Voltar a lista</ButtomPrimary>
                        </Link>
                        <ButtomSuccess type="submit">Cadastrar</ButtomSuccess>
                    </ButtomAction>

                </Form>
            </Extrato>
        </Container>
    )
}