import React, { useEffect, useState } from 'react';
import api from '../../config/configApi';
import { Link } from 'react-router-dom';
import moment from 'moment';
import {
    ButtomPrimary,
    ButtomSuccess,
    ButtomAction,
    Extrato,
    Container,
    Titulo,
    AlertDanger,
    AlertSuccess,
    Form,
    Label,
    Input,
    Select,
} from '../../styles/styles';

export const Edit = (props) => {

    const [id] = useState(props.match.params.id);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const [extratoValue, setExtratoValue] = useState('');

    const convertReal = async (valueExtrato) => {

        var valueConverted = valueExtrato.toString().replace(/\D/g, "");
        valueConverted = valueConverted.replace(/(\d)(\d{2})$/, "$1,$2");
        valueConverted = valueConverted.replace(/(?=(\d{3})+(\D))\B/g, ".");

        setExtratoValue(valueConverted);

        // //valor no formato certo para salvar no BD
        var valueSave = await valueConverted.replace(".", "");
        valueSave = await valueSave.replace(",", ".");
        setValue(valueSave);
    }

    const [name, setName] = useState('');
    const [value, setValue] = useState('');
    const [type, setType] = useState('');
    const [situation, setSituation] = useState('');
    const [payday, setPayday] = useState('');

    const editExtrato = async e => {
        e.preventDefault();

        const headers = {
            'Content-Type': 'application/json'
        }

        await api.put('/edit', { id, name, value, type, situation, payday }, { headers })
            .then((response) => {
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
                        type: 'error',
                        message: "Tente novamente mais tarde"
                    });
                }
            });
    }


    useEffect(() => {
        const getExtrato = async () => {
            await api.get('/view/' + id)
                .then((response) => {
                    var extrato = response.data.extrato;
                    setName(extrato.name);
                    setValue(extrato.value);
                    convertReal(extrato.value);
                    setType(extrato.type);
                    setSituation(extrato.situation);
                    setPayday(moment(extrato.payday).utc().format('YYYY-MM-DD'));
                }).catch((err) => {
                    if (err.response) {
                        setStatus({
                            type: 'error',
                            message: err.response.data.message
                        });
                    } else {
                        setStatus({
                            type: 'error',
                            message: "Tente novamente mais tarde"
                        });
                    }
                })
        }
        getExtrato();

    }, [id]);
    return (
        <Container>
            <Titulo>Controle Financeiro Mensal</Titulo>
            <Extrato>

                {status.type === 'error' ? <AlertDanger>{status.message}</AlertDanger> : ""}
                {status.type === 'success' ? <AlertSuccess>{status.message}</AlertSuccess> : ""}

                <Form onSubmit={editExtrato}>
                    <Label>Nome: </Label>
                    <Input type="text" name="name" value={name} onChange={e => setName(e.target.value)} />

                    <Label>Valor: </Label>
                    <Input type="text" name="extratoValue" value={extratoValue} onChange={e => convertReal(e.target.value)} />

                    <Label>Tipo: </Label>
                    <Select name="type" value={type} onChange={e => setType(e.target.value)} >
                        <option value="1">Pagamento</option>
                        <option value="2">Recebido</option>
                    </Select>

                    <Label>Situação: </Label>
                    <Select name="situation" value={situation} onChange={e => setSituation(e.target.value)} >
                        <option value="1">Pago</option>
                        <option value="2">Pendente</option>
                        <option value="3">Recebido</option>
                        <option value="4">A Receber</option>
                    </Select>

                    <Label>Data de pagamento: </Label>
                    <Input type="date" name="payday" value={payday} onChange={e => setPayday(e.target.value)} />

                    <ButtomAction>
                        <Link to="/">
                            <ButtomPrimary>Voltar a lista</ButtomPrimary>
                        </Link>
                        <ButtomSuccess type="submit">Editar</ButtomSuccess>
                    </ButtomAction>
                </Form>
            </Extrato>
        </Container>
    )
}