/** fetchWeather
 *  Fetches and returns weather from Norwegian Meteorological Institute
 *  Fetches only the weather from Oslo
 * @returns {object}
 */
export async function fetchWeather(){
    const url = 'https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=59.91&lon=10.75';
    const response = await fetch(url);
    const result = await response.json();
    const thisHour = new Date().getHours();
    const forecast = result.properties.timeseries.find(element => element.time.includes(`${thisHour}:00`));
    const weather = forecast.data;

    return {
        temperature: weather.instant.details.air_temperature,
        wind: weather.instant.details.wind_speed,
        rain: weather.next_1_hours.details.precipitation_amount
    }
}