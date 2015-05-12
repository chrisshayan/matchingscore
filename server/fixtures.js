initializeMatchingScores = function(period){
	// Call function for pulling data from API
	// Get matching score base on city and period of applications

	// Get matching score for all locations
	var cityId = -1; // all cities
	pullMatchingScores(cityId, period);
	// Get matching cores for Ha Noi
	cityId = 24;
	pullMatchingScores(cityId, period);

	// Get matching cores for Ho Chi Minh
	cityId = 29;
	pullMatchingScores(cityId, period);
}