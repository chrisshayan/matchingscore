Errors = new Mongo.Collection(null);

throwError = function(message, errorClass){
	Errors.insert({message: message, errorClass: errorClass});
}