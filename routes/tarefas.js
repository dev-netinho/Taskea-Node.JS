const express  = require('express');
const router = express.Router();
const autenticacao = require('../middlewares/authMiddleware');
const tarefaController = require('../controllers/tarefaController')

router.get('/hello', autenticacao, (req, res) => {
    res.json({mensagem: `Bem vindo ${req.usuario.nome}! Aqui estão suas tarefas disponíveis.`})
});

router.post('/', autenticacao, tarefaController.criarTarefa)

router.get('/', autenticacao, tarefaController.listarTarefas)

router.put('/:id', autenticacao, tarefaController.editarTarefa)

router.delete('/:id', autenticacao, tarefaController.deletarTarefa)


module.exports = router;
