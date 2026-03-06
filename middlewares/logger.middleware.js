function logger(req, res, next) {
    const fecha = new Date().toISOString();
    console.log(`[${fecha}] ${req.method} ${req.url} - IP: ${req.ip}`);
    next();
}

module.exports = { logger };