import { Country, State, City } from "country-state-city";
import zipcodes from "zipcodes";

const calcLatLng = (location, node, countriesOfInterest) => {
  let { zipcode, city, state, country } = location;

  if (location?.zipcodes) zipcode = location?.zipcodes;

 if (zipcode) {
    let res = zipcodes.lookup(zipcode);

    if (res?.latitude && res?.longitude) {
      return {
        latitude: res.latitude,
        longitude: res.longitude,
        state:
          State.getAllStates().find(
            (st) =>
              st.isoCode == res.state && (st.countryCode == res.country || st.countryCode == 'US'),
          )?.name || res.state,
        country: Country.getCountryByCode(res.country)?.name || res.country,
      };
    }
  }

  // calculate lat long based on city
  if (city) {
    let res = City.getAllCities(['name', 'countryCode']).find((el) => {
      if (
        el?.name.toLowerCase() == city.trim().toLowerCase() &&
        countriesOfInterest.includes(Country.getCountryByCode(el?.countryCode)?.name?.toLowerCase())
      )
        return true;
    });

    if (res?.latitude && res?.longitude) {
      return {
        latitude: res.latitude,
        longitude: res.longitude,
        state:
          State.getAllStates().find(
            (st) => st.isoCode == res.state && st.countryCode == res.countryCode,
          )?.name || res.state,
        country: Country.getCountryByCode(res.countryCode).name,
      };
    }
  }

  // calculate lat long based on state
  if (state) {
    let res = State.getAllStates().find((el) => el.name?.toLowerCase() == state.toLowerCase());

    if (res?.latitude && res?.longitude) {
      return {
        latitude: res.latitude + Math.random(),
        longitude: res.longitude + Math.random(),
        state:
          State.getAllStates().find(
            (st) => st.isoCode == res.state && st.countryCode == res.countryCode,
          ).name || res.state,
        country: Country.getCountryByCode(res.countryCode).name,
      };
    }

    res = State.getAllStates().find(
      (el) =>
        el.isoCode.toLowerCase() == state.trim().toLowerCase() &&
        countriesOfInterest.includes(Country.getCountryByCode(el.countryCode).name.toLowerCase()),
    );

    if (res?.latitude && res?.longitude) {
      return {
        latitude: res.latitude + Math.random(),
        longitude: res.longitude + Math.random(),
        state:
          State.getAllStates().find(
            (st) => st.isoCode == res.state && st.countryCode == res.countryCode,
          )?.name || res.state,
        country: Country.getCountryByCode(res.countryCode).name,
      };
    }
  }

  // calculate lat long based on country
  if (country) {
    //custom change country code accoring to lib
    if (country == 'USA' || country == 'usa') country = 'us';
    if (country == 'uk' || country == 'UK') country = 'gb';
    let res = Country.getAllCountries().find(
      (el) =>
        el.isoCode?.toLowerCase() == country.trim().toLowerCase() ||
        el.flag?.toLowerCase() == country.trim().toLowerCase() ||
        el.name?.toLowerCase() == country.trim().toLowerCase(),
    );
    if (res?.latitude && res?.longitude) {
      {
        return {
          latitude: res.latitude + Math.random(),
          longitude: res.longitude + Math.random(),
          state:
            State.getAllStates().find(
              (st) => st.countryCode == res.state && st.countryCode == res.countryCode,
            )?.name || res.state,
          country: res.name,
        };
      }
    }
  }

  //console node if not able to calculate lat/lng
 

  return { latitude: 0, longitude: 0 };
};

export default calcLatLng;
