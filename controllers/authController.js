const Usuario = require('../models/Usuario.js');
const jwt = require('jsonwebtoken');

exports.registrarUsuario = async (req, res) => {
    const {nome, email, senha} = req.body;
 
    if (!nome || !email || !senha) {
        return res.status(400).json({ mensagem: 'Preencha nome, email e senha.' });
    } 
    const usuarioExistente = await Usuario.findOne({
        where: {
            email: email
        }
    });

    if (usuarioExistente) {
        return res.status(400).json({mensagem: 'Email já cadastrado.'})
    }
    
    const usuario = await Usuario.create(req.body);

    const {id} = usuario;

    return res.status(201).json({id, nome, email});
};

exports.loginUsuario = async (req, res) => {
    const {email, senha} = req.body;

    if (!email || !senha) {
        return res.status(400).json({mensagem: 'Preencha os campos de email e senha.'})
    }

    const usuario = await Usuario.findOne({
        where: {
            email: email
        }
    })
 
    if (!usuario) {
        return res.status(401).json({mensagem: 'Email ou senha inválidos'})
    }

    if (!(await usuario.checkPassword(senha))) {
        return res.status(401).json({mensagem: 'Email ou senha inválidos.'})
    }

    const {id, nome} = usuario;

    const token = jwt.sign(
        {id: id, email: email, nome: nome}, 'Seguro',
        {expiresIn: '1h'}
    ); 

    return res.status(200).json({
        mensagem: 'Login realizado com sucesso',
        token,
        nome: nome
});
};
