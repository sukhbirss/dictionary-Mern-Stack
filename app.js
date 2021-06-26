
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const Vocab = require('./models/vocabModel');
const AppError = require('./util/appError');
const {MONGOURL} = require('./config/keys');
const cors = require('cors');
const app =express();
const http = require("https");

const fetch = require("node-fetch")

// Body parser, reading data from body into req.body
app.use(express.json({limit: '10kb'}));
//
app.use(cors())
app.use(cookieParser());

//Middlewares.............
if(process.env.NODE_ENV === 'devlopment') {
	app.use(morgan('dev'));
}

//Middlewares.............
if(process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'))
	const path = require('path')

	app.get("*",(req,res) =>{
		res.sendFile(path.resolve(__dirname,'client','build','index.html'))
	})
}



app.use((req,res,next) => {
	console.log("hello from the middleware............................");


	next()
});

app.use((req,res,next) => {
	req.requestTime = new Date().toISOString();
		console.log(req.requestTime)

	next();
});

app.get("/word/:id", (req, res) => {

	

	const app_id = "76f2e22c"; // insert your APP Id
	const app_key = "e7f9acd6911f65034e27e1e4433469e3"; // insert your APP Key
	const wordId = req.params.id;
	const fields = "pronunciations";
	const strictMatch = "false";

	let url =`https://od-api.oxforddictionaries.com/api/v2/entries/en-gb/${wordId}`
	
	fetch(url,{
		method:"GET",
		mode:"no-cors",
		headers:{app_key,app_id}
	})
	.then((res)=>res.json())
	.then((data =>{ 
		res.send(data)
		console.log(data.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0])
		Vocab.create({
		    word: wordId,
		    meaning:data.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0]
		  });

					}))

  console.log("yo boi")

   
});

app.get("/getdata", async(req, res) => {

	  const vocab =  await Vocab.find()
	  console.log(Vocab)
	  res.status(200).json({
	    status:'success',
	    vocab
	  })
	   	
});

app.get("/worddetail/:word", async(req, res) => {

	const app_id = "76f2e22c"; // insert your APP Id
	const app_key = "e7f9acd6911f65034e27e1e4433469e3"; // insert your APP Key
	const wordId = req.params.word;
	const fields = "pronunciations";
	const strictMatch = "false";

	let url =`https://od-api.oxforddictionaries.com/api/v2/entries/en-gb/${wordId}`
	
	fetch(url,{
		method:"GET",
		mode:"no-cors",
		headers:{app_key,app_id}
	})
	.then((res)=>res.json())
	.then((data =>{ 
		res.send(data)
					}))

	   	
});

app.all('*',(req,res,next) => {

	next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
});


module.exports = app;