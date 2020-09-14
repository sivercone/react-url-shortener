const { Router, response } = require('express');
const router = Router();
const Links = require('../models/Links');

router.get('/:code', async (req, response) => {
   try {
      const link = await Links.findOne({ code: req.params.code });

      if (link) {
         link.clicks++;
         await link.save();
         return response.redirect(link.from);
      }

      response.status(404).json('Link not founded');
   } catch (e) {
      response.status(500).json({ message: 'ОТ ХАЛЕПА! При обробці вашого запиту сталася помилка.' });
   }
});

module.exports = router;
