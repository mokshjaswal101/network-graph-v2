import { Country, State, City } from "country-state-city";
import zipcodes from "zipcodes";
import countries from "../data/countries";

const calcLatLng = (location) => {
  let { zipcode, city, state, country } = location;

  if (zipcode) {
    let res = zipcodes.lookup(zipcode);
    if (res?.latitude && res?.longitude)
      return { latitude: res.latitude, longitude: res.longitude };
  }
  if (city) {
    let res = City.getAllCities().find(
      (el) =>
        el.name.toLowerCase() == city.trim().toLowerCase() &&
        countries.includes(
          Country.getCountryByCode(el.countryCode).name.toLowerCase()
        )
    );
    if (res?.latitude && res?.longitude) {
      return { latitude: res.latitude, longitude: res.longitude };
    }
  }
  if (state) {
    let res = State.getAllStates().find(
      (el) => el.name?.toLowerCase() == state.toLowerCase()
    );
    if (res?.latitude && res?.longitude) {
      return {
        latitude: res.latitude + Math.random(),
        longitude: res.longitude + Math.random(),
      };
    }
  }
  if (country) {
    if (country == "USA" || country == "usa") country = "us";
    let res = Country.getAllCountries().find(
      (el) =>
        el.isoCode?.toLowerCase() == country.trim().toLowerCase() ||
        el.flag?.toLowerCase() == country.trim().toLowerCase() ||
        el.name?.toLowerCase() == country.trim().toLowerCase()
    );
    if (res?.latitude && res?.longitude) {
      {
        return {
          latitude: res.latitude + Math.random(),
          longitude: res.longitude + Math.random(),
        };
      }
    }
  }

  console.log(location);

  return { latitude: 0, longitude: 0 };
};

export default calcLatLng;
