import jsonwebtoken from 'jsonwebtoken';

const { verify } = jsonwebtoken; // Desestrutura o método `verify`

function validateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ mensagem: 'Token não fornecido.' });
    }

    verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ mensagem: 'Token inválido ou expirado.' });
        }
        req.user = user; // Adiciona o usuário decodificado ao objeto `req`
        next();
    });
}

export default validateToken;