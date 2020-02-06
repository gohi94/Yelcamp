const express = require("express"),
	  mongoose = require("mongoose"),
	  bodyParser = require("body-parser"),
	  expressSanitizer = require("express-sanitizer"),
	  methodOverride = require("method-override"),
	  app = express();

mongoose.connect("mongodb://localhost:27017/restful_blog_app",{useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

//Creamos schema

var musicSchema = new mongoose.Schema ({
	name: String,
	image: String,
	content: String
});


var Music = mongoose.model("Music", musicSchema);


//RESTFUL APP

//INDEX ROUTE

app.get("/", function(req, res){
	res.redirect("/music")
})

app.get("/music", function(req, res){
	Music.find(function(err, music){
		if(err){
			console.log(err)
		} else{
			res.render("index", {music: music})	
		}
	});
});








app.listen(3000, function(){
	console.log("Listening to port 3000");
});