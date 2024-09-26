const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  // Obtener el token del header de la solicitud
  const token = req.header('x-auth-token');

  // Verificar si el token existe
  if (!token) return res.status(401).json({ msg: 'No autenticado' });

  try {
    // Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded.usuario;
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token inválido' });
  }
};