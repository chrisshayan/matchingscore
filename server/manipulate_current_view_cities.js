insertCurrentViewCity = function(city){
	curDate = new Date();
	curDate.setMinutes(curDate.getMinutes() + 10);
	return CurrentViewCities.insert({
		cityId: city,
		expiredOn: curDate
	});
};

extendCurrentViewCity = function(city){
	curDate = new Date();
	curDate.setMinutes(curDate.getMinutes() + 10);
	return CurrentViewCities.update(
		{cityId: city},
		{
			$set: {
				expiredOn: curDate
			}
		}
	);
};