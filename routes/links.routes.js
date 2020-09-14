// данный роутер отвечает за генерацию ссылок

const { Router, response } = require('express');
const config = require('config');
const shortid = require('shortid');
const Links = require('../models/Links');
const auth = require('../middleware/auth.middleware');
const router = Router();

router.post('/generate', auth, async (req, response) => {
   try {
      const baseUrl = config.get('baseUrl');
      const { from } = req.body;

      const code = shortid.generate();

      const existing = await Links.findOne({ from });

      if (existing) {
         return response.json({ link: existing });
      }

      const to = baseUrl + '/t/' + code;

      const link = new Links({ code, to, from, owner: req.user.userId });

      await link.save(); // возвращает promise

      response.status(201).json({ link });
   } catch (e) {
      response.status(500).json({ message: 'ОТ ХАЛЕПА! При обробці вашого запиту сталася помилка.' });
   }
});

router.get('/', auth, async (req, response) => {
   try {
      const allLinks = await Links.find({ owner: req.user.userId });
      response.json(allLinks);
   } catch (e) {
      response.status(500).json({ message: 'ОТ ХАЛЕПА! При обробці вашого запиту сталася помилка.' });
   }
});

router.get('/:id', auth, async (req, response) => {
   try {
      const link = await Links.findById(req.params.id);
      response.json(link);
   } catch (e) {
      response.status(500).json({ message: 'ОТ ХАЛЕПА! При обробці вашого запиту сталася помилка.' });
   }
});

module.exports = router;
