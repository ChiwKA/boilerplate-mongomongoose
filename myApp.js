require('dotenv').config();
const mongoose = require('mongoose');
const uri = process.env.MONGO_URI
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favoriteFoods: [String]
})

let Person = mongoose.model("Person", personSchema)

const createAndSavePerson = (done) => {
  const quan = new Person({
    name: "Quan",
    age: 18,
    favoriteFoods: ["com tam", "banh cuon", "mi tom"]
  })
  quan.save(function(err, data) {
    if (err) return console.error(err);
    done(null, data);
  })
};

const arrayOfPeople = [
  {
    name: "Long",
    age: 11,
    favoriteFoods: ["Tacos"]
  },
  {
    name: "Thinh",
    age: 12,
    favoriteFoods: ["hamburger"]
  }
]

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function(err, people) {
    if (err) return console.log(err);
    done(null, people);
  })
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, function(err, data) {
    if (err) return console.error(err);
    done(null, data);
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, function(err, data) {
    if (err) return console.error(err);
    done(null, data)
  })
};

const findPersonById = (personId, done) => {
  Person.findById({_id: personId}, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err, person) => {
    if (err) return console.error(err);
    person.favoriteFoods.push(foodToAdd)
    person.save((err, updatedPerson) => {
      if (err) return console.error(err);
      done(null, updatedPerson)
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, updatedDoc) => {
    if (err) return console.error(err);
    done(null, updatedDoc)
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, removedDoc) => {
    if (err) return console.error(err);
    done(null, removedDoc)
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (err, removedDoc) => {
    if (err) return console.error(err);
    done(null, removedDoc);
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods: foodToSearch}).sort({name: 1}).limit(2).select({age: 0}).exec((err, data) => {
    if (err) return console.error(err);
    done(null, data)
  })
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
