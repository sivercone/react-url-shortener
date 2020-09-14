// 2:14
const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, response, next) => {
   // OPTIONS - метод http, используется для описания параметров соединения с ресурсом.
   if (req.method === 'OPTIONS') {
      return next();
   }

   try {
      const token = req.headers.authorization.split(' ')[1];

      if (!token) {
         return response.status(401).json({ message: 'Отсутсвует авторизация' });
      }

      const decoded = jwt.verify(token, config.get('jwtSecret'));
      req.user = decoded;

      next();
   } catch (e) {
      response.status(401).json({ message: 'Отсутсвует авторизация' });
   }
};
