const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const api = express();
const port = 3000;
const router = express.Router();

const portfolioRouter = require('./router/PortifolioRouter');

api.use(cors());

api.use(bodyparser.urlencoded({extended: true}));
api.use(bodyparser.json());

router.get("/", (Req, res) => res.json({
    mensagem: 'API online...'
}));

api.use('/', router);
api.use('/portfolio', portfolioRouter);

api.listen(port);
console.log('Api Express Rodando...');