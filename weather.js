 const key = 'knYA2B0n2ojJrDAWVAptaCxGuxUYvckj';

 // Get Weather information 
 const getWeather = async (id) => {

   const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
   const queryText = `${id}?apikey=${key}&details=True`;

   const response = await fetch(base + queryText);
   const data = await response.json();

   return data[0];
 };

 // Get city key and information 
 const getCity = async (city) => {

   const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
   const queryText = `?apikey=${key}&q=${city}`;

   const response = await fetch(base + queryText);
   const data = await response.json();

   return data[0];
 };