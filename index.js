const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then((res) => {
    console.log("conection a la base de datos correcta, YAY!");

    return Recipe.create({
      title: 'Arroz con leche',
      level: 'Easy Peasy',
      ingredients: ['Arroz', 'Leche'],
      cuisine: 'French',
      dishType: 'main_course',
      image: 'https://images.media-allrecipes.com/images/75131.jpg',
      duration: 30,
      creator: 'Chef',
    })
  })

  .then((res) => {
    return Recipe.insertMany(data)
  })

  .then((response) => {
    // actualizar
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" }, // query
      { duration: 100 }, //valores nuevos
      { new: true } //Me devuelve Andrea ya actualizada
    );
  })

  .then((response) => {
    console.log(response);

    // borrar
    return Recipe.deleteOne(
      { title: "Carrot Cake" }
    );
  })

  .then((response) => {
    // borrar
    return Recipe.deleteOne(
      { title: "Carrot Cake" }
    );
  })

  .then((response) => {
    // cerrar conex
    console.log('Borrado con exito');
    mongoose.connection.close()
  })

  .then((response) => {
    // cerrar conex
    console.log('cerrado');
  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  });


