const express = require('express');
const { Op } = require('sequelize');
const cors = require('cors');
const app = express();


const Extrato = require('./models/Extrato');

app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type, Authorization");
    app.use(cors());
    next();

})

app.get('/listar/:month/:year', async (req, res) => {
    var month = new Number(req.params.month);
    var year = new Number(req.params.year);

    const date = new Date(year + '-' + month);

    //esse if é por causa que quando colocado mes 10, ele retorna o mes 9, 11 retorna o 10, e 12 retorna o 11
    if (month >= 10) {
        var primaryday = new Date(date.getFullYear(), date.getMonth() + 1, 1); //primeiro dia do mes
        var lastday = new Date(date.getFullYear(), date.getMonth() + 2, 0); //ultimo dia do mes
    } else {
        var primaryday = new Date(date.getFullYear(), date.getMonth(), 1); //primeiro dia do mes
        var lastday = new Date(date.getFullYear(), date.getMonth() + 1, 0); //ultimo dia do mes
    }


    const extratos = await Extrato.findAll({
        order: [['payday', 'ASC']],
        where: {
            "payday": { [Op.between]: [primaryday, lastday] }
        }
    });

    //valor de todos os pagamentos do mes
    const payments = await Extrato.sum('value', {
        //quando for pago
        where: {
            type: '1',
            "payday": { [Op.between]: [primaryday, lastday] }

        }
    })

    //valor dos extratos recebidos
    const received = await Extrato.sum('value', {
        //quando for pago
        where: {
            type: '2',
            "payday": { [Op.between]: [primaryday, lastday] }

        }
    })

    //valor saldo final 
    const balance = new Number(received) - new Number(payments);

    return res.json({
        error: false,
        extratos,
        payments,
        received,
        balance
    });

});

app.get('/view/:id', async (req, res) => {
    await Extrato.findByPk(req.params.id).then(extrato => {
        return res.json({
            error: false,
            extrato
        });
    }).catch(function () {
        return res.status(400).json({
            error: true,
            message: "ERRO: Extrato não encontrado."
        });

    });
});

app.post('/cadastrar', async (req, res) => {
    await Extrato.create(req.body).then(function () {
        return res.json({
            error: false,
            message: "Extrato cadastrado com sucesso!"
        });
    }).catch(function () {
        return res.status(400).json({
            error: true,
            message: "ERRO: Extrato não cadastrado com sucesso."
        });
    });
});

app.put('/edit', async (req, res) => {
    var data = req.body;
    await Extrato.update(data, { where: { id: data.id } }).then(function () {
        return res.json({
            error: false,
            message: "Extrato editado com sucesso!"
        });
    }).catch(function () {
        return res.status(400).json({
            error: true,
            message: "ERRO: Extrato não editado com sucesso."
        });
    });
});

app.delete('/delete/:id', async (req, res) => {
    await Extrato.destroy({ where: { id: req.params.id } }).then(function () {
        return res.json({
            error: false,
            message: "Extrato deletado com sucesso!"
        });
    }).catch(function () {
        return res.status(400).json({
            error: true,
            message: "ERRO: Extrato não deletado com sucesso."
        });
    });
});

app.listen(8081, function () {
    console.log("Servidor iniciado na porta 8081: http://localhost:8081");
});