const Tarefa = require('../models/Tarefa.js');

exports.criarTarefa = async (req, res) => {
    const {titulo, descricao, usuario_id} = req.body;

    if (!titulo || !descricao) {
        return res.status(400).json({ mensagem: 'Título e descrição são obrigatórios.' });
    }
    
    const tarefa = await Tarefa.create(req.body);

    res.status(201).json({ mensagem: 'Tarefa criada com sucesso.', tarefa});
};

exports.listarTarefas = async (req, res) => {
    const tarefasDoUsuario = await Tarefa.findAll({
        attributes: {exclude: ['UsuarioId']},
    }); 
    res.json(tarefasDoUsuario);
};

exports.editarTarefa = async (req, res) => {
    const id = req.params.id;
    const{titulo, descricao, status} = req.body;

    const tarefa = await Tarefa.findByPk(id, {
        attributes: {exclude: ['UsuarioId']}
    });
    
    if (!tarefa) {
        return res.status(404).json({mensagem: 'Tarefa não encontrada ou não autorizada.'});
    }

    await tarefa.update({titulo, descricao, status});

    res.json({mensagem: 'Tarefa atualizada com sucesso.', tarefa});
};

exports.deletarTarefa = async (req, res) => {
    const id = req.params.id;

    const tarefa = await Tarefa.findByPk(id, {
        attributes: {exclude: ['UsuarioId']}
    });
    
    if (!tarefa) {
        return res.status(404).json({mensagem: 'Tarefa não encontrada.'});
    }

    await tarefa.destroy(); 

    res.status(204).json({mensagem: 'Tarefa excluída com êxito.', tarefa});
};
