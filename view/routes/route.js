var express = require('express');
var router = express.Router();
const pug = require('pug');
var path = require('path');
var fs = require('fs');

router.get("/cerco", async function => {
  recipe await getRecipes(recipesURL, body)
  res.send(pug.renderFile("view/search/search.pug", { recipes: body }));
});

//quando riceve una richiesta e ricarica la pagina con i risultati
//ricerca un annuncio per materia e zona (con filtro distanza)
//SE non viene specificata la materia, visualizza tutti gli annunci nella zona selezionata (tenendo conto del filtro distanza)
//SE non viene specificata la zona, visualizza tutti gli annunci con la materia specificata
router.post("/cerco", function (req, res) {
  isLoggedIn(req, res, function (logged) {

    var lat = req.body.latitudine;
    var lng = req.body.longitudine;

    var subject = req.body.subject;
    if (subject == "Tutte") subject = "";
    var maxDistance = req.body.distance;

    Corso.findPosts(subject, function (error, post) {
      if (error || post.length === 0) {
        console.log("nessun risultato dalla query");
        res.send(pug.renderFile("views/cerco.pug", { values: [], logged: logged }));
      } else {
        //console.log("query success: subject=" + subject + ", post=" + post);
        if (lat == "" || maxDistance == "unl")
          res.send(pug.renderFile("views/cerco.pug", { values: post, logged: logged }));
        else {
          var post2 = [];
          var a = 0;

          for (var i = 0, len = post.length; i < len; i++) {
            var distance = geolib.getDistance(
              { latitude: lat, longitude: lng },
              { latitude: post[i].location.latitude, longitude: post[i].location.longitude }
            );
            if (distance <= maxDistance) {
              post2[a] = post[i];
              a++;
            }
          }
          res.send(pug.renderFile("views/cerco.pug", { values: post2, logged: logged }));
        }
      }
    });
  });
});

module.exports = router;
