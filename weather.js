const apiKey = 'GS2zBSjaAmBysuhkPIAaUCPpdHS8XpkS';

// Get Weather information
const getWeather = async (id) => {
  try {
    const baseUrl = 'http://dataservice.accuweather.com/currentconditions/v1/';
    const url = `${baseUrl}${id}?apikey=${apiKey}&details=True`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data[0];
  } catch (error) {
    throw new Error(`Error: ${error.message}`);
  }
};

// Get city key and information
const getCity = async (city) => {
  try {
    const baseUrl = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    const url = `${baseUrl}?apikey=${apiKey}&q=${city}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data[0];
  } catch (error) {
    throw new Error(`Error: ${error.message}`);
  }
};
