export function errorHandler(err, req, res, next) {
    console.error('Erro:', err.stack || err.message || err);

    const statusCode = err.status || 500;
    const mensagem = err.message || 'Erro interno do servidor';

    res.status(statusCode).json({ mensagem });
}