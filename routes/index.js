const express = require("express");
const router = express.Router();
const Celebrity = require("../models/celebrity.js");

/* get HOME */
router.get("/", (req, res, next) => {
  res.render("index");
});

/* get CELEBRITIES */
router.get("/celebrities", (req, res, next) => {
  Celebrity.find()

    .then(allTheCelebritiesFromDb => {
      console.log("Retrieved celebrities from DB:", allTheCelebritiesFromDb);
      res.render("celebrities/index", { celebrities: allTheCelebritiesFromDb });
    })
    .catch(error => {
      console.log("Error while getting the celebrities from the DB: ", error);
    });
});

/* get DETAILS */
router.get('/celebrities/:id', (req, res) => {
  Celebrity.findById(req.params.id)
    .then(celebrityFromDb => {
      res.render('celebrities/show', { Celebrity: celebrityFromDb });
    })
    .catch(error => {
      console.log('Error while retrieving book details: ', error);
    })
});

/* get NEW */
router.get('/new', (req, res) => {
      res.render('new');
});

/* POST NEW */
router.post('/new', (req, res) => {
  // const { name, occupation, catchPhrase } = req.body    // Create an object with keys for name, occupation, and catchPhrase
  // const newCelebrity = new Celebrity( { name, occupation, catchPhrase} ) // create an instance of the Celebrity model
  // newCelebrity.save()       // call the save method to save the new celebrity in the db 
  Celebrity.create(req.body)
  .then(() => {
    debugger
    res.redirect('/celebrities');   // redirect to celebrities page 
  })
  .catch((error) => {
    console.log(error);
  })
});

/* POST DELETE */
router.post('/celebrities/:id/delete', (req, res) => {
  Celebrity.findByIdAndRemove(req.params.id)
    .then(() => {
      res.redirect('/celebrities')
    })
    .catch((error) => {
      console.log(error);
    })
});

/** get EDIT  */
router.get('/celebrities/:id/edit', (req, res) => {
  Celebrity.findById(req.params.id)
    .then(celebrityFromDb => {
      res.render('celebrities/edit', { celebrity: celebrityFromDb } );
    })
    .catch(error => {
      console.log('Error while retrieving celebrity details: ', error);
    })
});

/** POST EDIT  */
router.post('/celebrities/:id', (req, res) => {
  
  // const { name, occupation, catchPhrase } = req.body;
  // Celebrity.update( {_id: req.query.celebrity_id }, { $set: { name, occupation, catchPhrase } }, { new: true } )
  Celebrity.update({ _id: req.body.id }, { $set : { name: req.body.name }}, { new: true })
  .then((celebrity) => {
    res.redirect('/celebrities');    
  })
  .catch((error) => {
    console.log(error);
  })


  //Celebrity.findOneAndUpdate( { _id: req.body.id }, { $set: { name: req.body.name } }  )
   
  // .then((celebrity) => {
  //   res.redirect('/celebrities');     //  redirect 
  // })
  // .catch((error) => {
  //   console.log(error);
  // })

});




module.exports = router;
