const restaurantController= require('../controllers/restaurant.controller');

module.exports= function(app){

    app.post('/api/restaurant/add',restaurantController.addRestaurant);

    app.get('/api/restaurant/',restaurantController.findAllRest);

    app.get('/api/restaurant/categories/',restaurantController.findAllCategory);

    app.get('/api/restaurant/categories/:category',restaurantController.findByCategory);

    app.get('/api/restaurant/:_id',restaurantController.findRestById);

    app.get('/api/restaurant/rating/:rating',restaurantController.findByRating);

    app.put('/api/restaurant/:_id',restaurantController.updateRest);

    app.delete('/api/restaurant/:_id',restaurantController.deleteRest);

    app.delete('/api/restaurant/',restaurantController.deleteAllRest);




    


    
}