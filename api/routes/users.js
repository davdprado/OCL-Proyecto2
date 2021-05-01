var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({mensaje:'Conecta'});
});

router.post('/',function(req,res,next) {
  try {
    var nueva = req.body.informacion;
    console.log(nueva);
    res.json({respuesta:nueva});
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
