var express, app, cors, bodyParser;
cors = require("cors");
express = require("express");
bodyParser = require("body-parser");
app = express();

var skierTerms = [
    {
        term: "Rip",
        defined: "To move at a high rate of speed"
    },
    {
        term: "Huck",
        defined: "To throw your body off of something, usually a natural feature like a cliff"
    },
    {
        term: "Chowder",
        defined: "Powder after it has been sufficiently skied"
    }
];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function(request, response, next) {
	console.log(`${request.method} request for '${request.url}' - ${JSON.stringify(request.body)}`);
	next();
});

app.use(express.static("./public"));

app.use(cors());

app.get("/dictionary-api", function(request, response) {
	response.json(skierTerms);
});

app.post("/dictionary-api", function(request, response) {
	skierTerms.push(request.body);
	response.json(skierTerms);
});

app.delete("/dictionary-api/:term", function(request, response) {
	skierTerms = skierTerms.filter(function(definition) {
		return definition.term.toLowerCase() !== request.params.term.toLowerCase();
	});
	response.json(skierTerms);
});

app.listen(3000);

console.log("Express app running on port 3000");

module.exports = app;


