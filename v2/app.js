const express = require("express"),
	  app = express(),
	  bodyParser = require("body-parser"),
	  mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/yelp_camp",{useNewUrlParser: true, useUnifiedTopology: true });

//INICIO Instalacion de Base de datos
// mongoose.connect("mongodb+srv://devsrpout:mypassword9495@cluster0-wp1kg.mongodb.net/test?retryWrites=true&w=majority",{
// 	useNewUrlParser: true,
// 	useCreateIndex: true,
// 	useUnifiedTopology: true,
// }).then(()=> {
// 	console.log("Connected to DB Gohardo")
// }).catch(err =>{
// 	console.log("Error", err.message);
// });
//FIN Instalacion de Base de datos


//SCHEMA SET UP
var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String
});

//compiling the schema into a model.
var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create({
// 	name: "Granite Hill", 
// 	image: "https://images.unsplash.com/photo-1534685157449-86b12aed151e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
// 	description: "I recommend it. It was amazing beeing there. So beautiful everything."
// }, function(err, campground){
// 	if(err){
// 		console.log(err);
// 	} else {
// 		console.log("Nuevo campamento creado")
// 		console.log(campground);
// 	}
// })
//compiling the schema into a model.


app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");


app.get("/", function(req, res){
	res.render("landing")
});


// INDEX -- Show all campgrounds
app.get("/campgrounds", function(req, res){
	//Get all campgrounds from DB
	Campground.find({}, function(err, allCampgrounds){
		if(err){
			console.log(err);
		} else {
			res.render("index", {campgrounds: allCampgrounds});

		}
	})
});

//CREATE -- add new campgrounds to Database (DB)
app.post("/campgrounds", function(req, res){
	//get data from form and add to campground array
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;

	var newCampground = {name: name, image: image, description: desc}
	//create a new campground and save it to DB
	Campground.create(newCampground, function(err, newlyCreated){
	if(err){
		console.log(err)
	}	else{
		//redirect back to campgrounds page
		res.redirect("/campgrounds");
	}
	})
});

//NEW -- show form to create new campground
app.get("/campgrounds/new", function(req, res){
   res.render("new.ejs"); 
});

//SHOW -- shows more info about 1 campground
app.get("/campgrounds/:id", function(req, res){
	//find the campground  with provided id
	Campground.findById(req.params.id, function(err, foundCampground){
		if(err){
			console.log(err)
		} else{
	//render show template with that campground
			res.render("show", {campground: foundCampground});	
		}
	} )

});

app.listen(3000, function(){
	console.log("Listening to port 3000");
});