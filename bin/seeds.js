const mongoose = require("mongoose");
const Celebrity = require("../models/celebrity");

const dbtitle = 'mongoose-movies';
mongoose.connect(`mongodb://localhost/${dbtitle}`);

const celebrities = [
  {
    name: "Brad Pitt", occupation: "Actor", catchPhrase: "My best catch phrase"
  },
  { name: "Adriano Celentano", occupation: "Singer", catchPhrase: "It rocks" 
  },
  { name: "Marlon Brando", occupation: "Actor", catchPhrase: "Your best catch phrase"
  }
];

Celebrity.insertMany(celebrities).then(documents => {
    console.log(documents)
  })
  
  .catch(err => console.log(err))


