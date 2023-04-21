const Restaurant= require('../models/restaurant.model');


exports.addRestaurant= async (req,res)=>{

    const restBodyReq= {
        name: req.body.name,
        description:req.body.description,
        category: req.body.category,
        imageUrl: req.body.imageUrl,
        location: req.body.location,
        contactNumber: req.body.contactNumber,
        rating: req.body.rating
    }
    try{   
    const restaurant= await Restaurant.create(restBodyReq);
        res.status(200).send({
        name: restaurant.name,
        description:restaurant.description,
        category: restaurant.category,
        imageUrl: restaurant.imageUrl,
        location: restaurant.location,
        contactNumber: restaurant.contactNumber,
        rating: restaurant.rating
        })
    }catch(err){
        if(err){
            res.status(500).send({
                message: err.message
            })
        }else{
            res.status(500).send("Some error occured while creating the restaurant");
        }
    }


}



exports.findAllRest= async (req,res)=>{

  const restaurantsTotal= await Restaurant.find({});
  const restaurants= [];

  for(const restaurant of restaurantsTotal){
        restaurants.push(restaurant);
  }

  res.status(200).send({restaurants,message:"Restaurants fetched successfully"});
}

exports.findAllCategory= async (req,res)=>{

    try{
     const categories= [];

     const restaurants= await Restaurant.find({});

     for(const restaurant of restaurants){
        if(!categories.includes(restaurant.category)){
            categories.push(restaurant.category);
        }
     }
     res.status(200).send(categories);
    }catch(err){
        res.status(500).send("Some error occur while fetching category.")
    }
}


exports.findByCategory= async (req,res)=>{

    try{
    const categoryRequest= req.params.category;

    const restaurants= [];

    const restaurantsByCat= await Restaurant.find({category:categoryRequest});

    for(const restaurant of restaurantsByCat){
        restaurants.push(restaurant);
    }
    res.status(200).send(restaurants);
}catch(err){
    res.status(500).send("Some error occured while fetching the Restaurant.")
}
}


exports.findRestById= async (req,res)=>{
    const idReq= req.params._id;

    try{
        const restaurant= await Restaurant.findOne({_id:idReq});

        res.status(200).send(restaurant);

    }catch(err){
        res.status(404).send({
            message: "No restaurant find by given ID"
        });

    }
}


exports.findByRating= async (req,res)=>{
    const ratingReq= req.params.rating;
    try{

        const restaurants=[];
        const restaurantsByRatings= await Restaurant.find({rating:ratingReq});

        for(const restaurant of restaurantsByRatings){
            restaurants.push(restaurant)
        }
        
        res.status(200).send(restaurants);

    }catch(err){
           res.status(500).send("Some error occured while fetching the restaurant");
    }
}



exports.updateRest= async (req,res)=>{
    const idReq= req.params._id;

    try{

    const restaurant= await Restaurant.findOne({_id:idReq});

    if(!idReq){
        res.status(400).send("Restaurant data is required.")
    }

    if(!restaurant){
        res.status(200).send({
            message: "No restaurant found for given ID"
        })
    }

    restaurant.name= req.body.name?req.body.name:restaurant.name;
    restaurant.description= req.body.description?req.body.description:restaurant.description;
    restaurant.category= req.body.category?req.body.category:restaurant.category;
    restaurant.imageUrl= req.body.imageUrl?req.body.imageUrl:restaurant.imageUrl;
    restaurant.location= req.body.location?req.body.location:restaurant.location;
    restaurant.contactNumber= req.body.contactNumber?req.body.contactNumber:restaurant.contactNumber;
    restaurant.rating= req.body.rating?req.body.rating:restaurant.rating;

    const newRestaurant= await restaurant.save();

    const newRestBody= {
        name: newRestaurant.name,
        description: newRestaurant.description,
        category: newRestaurant.category,
        imageUrl: newRestaurant.imageUrl,
        location: newRestaurant.location,
        contactNumber: newRestaurant.contactNumber,
        rating: newRestaurant.rating
    }

    res.status(200).send({
        message: "Restaurant updated successfully."
    })

}catch{
    res.status(500).send("Some error occured while fetching the Restaurant.")
}
}


exports.deleteRest= async (req,res)=>{
   const idReq= req.params._id;

   try{
       const restaurant= await Restaurant.findOne({_id:idReq});
       const delRestaurant= await Restaurant.deleteOne({_id:idReq});


       if(!restaurant){
        res.status(200).send("No restaurant found for given ID")
       }

       if(restaurant.deletedCount===0){
        res.status(200).send({
            restaurant: null,
            message: "Restaurant deleted successfully."
        })
       }

       res.status(200).send({
        restaurant:restaurant, message: "Restaurant deleted successfully."
       })
   }catch{
    res.status(500).send("Some error occured while deleting the Restaurant.")

   }
}


exports.deleteAllRest= async (req,res)=>{
    

    try{
    const deleteResult= await Restaurant.deleteMany();

    if(deleteResult.deletedCount===0){
        res.status(200).send({
            restaurants:{
                acknowledged: deleteResult.acknowledged,
                deletedCount: deleteResult.deletedCount
            },
            message: "Restaurants deleted successfully"
        })
    }

    res.status(200).send({
        restaurants:{
             acknowledged: deleteResult.acknowledged,
             deletedCount: deleteResult.deletedCount
        },
        message: "Restaurants deleted successfully"
    })

}catch{
    res.status(500).send("Some error occured while deleting the Restaurant.")

}
}