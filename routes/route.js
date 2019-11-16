var express = require('express');
var router = express.Router();
const pug = require('pug');
var path = require('path');
var fs = require('fs');
const Router = require('express-promise-router')

const getRecipes = require('../apiModules/getRecipes')

const recipesURL = 'https://kesko.azure-api.net/v1/search/recipes'
const body = {
  "filters": {
    "specialDiet": "2",
    "preparationTime": {
      "minTime": 30,
      "maxTime": 60
    }
  },
  "view": {
    "limit": 1
  }
}


router.get("/search", async (req, res) => {
  const recipesList = await getRecipes(10)
  res.render("views/search/search.pug", { recipes: recipesList });

})



router.post("/check", function(req,res){
  console.log(req.body.specialDiet)
  res.send({ status: 'SUCCESS' });
});


// router.get("/cerco", (req, res) => {
//   getRecipes(recipesURL, body).then(recipesList => {
//     res.send(pug.renderFile("view/search/search.pug", { recipes: recipesList }));
//   })
// })

//quando riceve una richiesta e ricarica la pagina con i risultati
//ricerca un annuncio per materia e zona (con filtro distanza)
//SE non viene specificata la materia, visualizza tutti gli annunci nella zona selezionata (tenendo conto del filtro distanza)
//SE non viene specificata la zona, visualizza tutti gli annunci con la materia specificata
// router.post("/cerco", function (req, res) {
//   isLoggedIn(req, res, function (logged) {

//     var lat = req.body.latitudine;
//     var lng = req.body.longitudine;

//     var subject = req.body.subject;
//     if (subject == "Tutte") subject = "";
//     var maxDistance = req.body.distance;

//     Corso.findPosts(subject, function (error, post) {
//       if (error || post.length === 0) {
//         console.log("nessun risultato dalla query");
//         res.send(pug.renderFile("views/cerco.pug", { values: [], logged: logged }));
//       } else {
//         //console.log("query success: subject=" + subject + ", post=" + post);
//         if (lat == "" || maxDistance == "unl")
//           res.send(pug.renderFile("views/cerco.pug", { values: post, logged: logged }));
//         else {
//           var post2 = [];
//           var a = 0;

//           for (var i = 0, len = post.length; i < len; i++) {
//             var distance = geolib.getDistance(
//               { latitude: lat, longitude: lng },
//               { latitude: post[i].location.latitude, longitude: post[i].location.longitude }
//             );
//             if (distance <= maxDistance) {
//               post2[a] = post[i];
//               a++;
//             }
//           }
//           res.send(pug.renderFile("views/cerco.pug", { values: post2, logged: logged }));
//         }
//       }
//     });
//   });
// });

module.exports = router;
