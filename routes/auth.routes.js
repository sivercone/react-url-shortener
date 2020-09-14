const { Router } = require('express');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const router = Router();

// api/auth/register
router.post(
   '/register',
   [check('email', 'Невірний Email').isEmail(), check('password', 'Мінімальна довжина пароля 6 символів').isLength({ min: 6 })],
   async (req, response) => {
      try {
         const errors = validationResult(req);

         // если есть ошибки то возвращаем на фронтенд
         if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array(), message: 'Дані некоректні' });
         }

         const { email, password } = req.body;

         // Ждать пока бд найдет соответсвующий мейл
         const canditate = await User.findOne({ email });
         // если нашёл то
         if (canditate) {
            return response.status(400).json({ message: 'Такий користувач вже існує!' });
         }
         // а если нет то
         const hashedPassword = await bcrypt.hash(password, 12);
         const user = new User({ email, password: hashedPassword });

         //ждем пока пользователь сохранится
         await user.save();

         response.status(201).json({ message: 'Вітаю, все пройшло успішно!' });
      } catch (e) {
         response.status(500).json({ message: 'ОТ ХАЛЕПА! При обробці вашого запиту сталася помилка.' });
      }
   },
);

// api/auth/login
router.post(
   '/login',
   [
      check('email', 'Невірний Email').normalizeEmail().isEmail(),
      check('password', 'Мінімальна довжина пароля 6 символів').exists(),
   ],
   async (req, response) => {
      try {
         const errors = validationResult(req);

         // если есть ошибки то возвращаем на фронтенд
         if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array(), message: 'Дані некоректні' });
         }

         const { email, password } = req.body;

         const user = await User.findOne({ email });
         if (!user) {
            return response.status(400).json({ message: 'Такого користувача немає' });
         }

         const isMatch = await bcrypt.compare(password, user.password);

         if (!isMatch) {
            return response.status(400).json({ message: 'Дані некоректні' });
         }

         const token = jwt.sign({ userId: user.id }, config.get('jwtSecret'), { expiresIn: '1h' });
         response.json({ token, userId: user.id });
      } catch (e) {
         response.status(500).json({ message: 'ОТ ХАЛЕПА! При обробці вашого запиту сталася помилка.' });
      }
   },
);

module.exports = router;
