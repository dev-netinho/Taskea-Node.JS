const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.headers['authorization']; 
    const token = authHeader && authHeader.split(' ')[1];

    if(!token)
        return res.status(401).json({mensagem: 'Token não fornecido.'})


    jwt.verify(token, 'Seguro', (err, usuario) => {
        if (err) {
            return res.status(403).json({mensagem: 'Token inválido ou expirado.'})
    }
    
    req.usuario = usuario;
    next();

    });
}