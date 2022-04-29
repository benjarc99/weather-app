
import React, { useEffect, useState } from 'react';
import Header from './components/Header/Header';
import SearchComponent from './components/SearchComponent/SearchComponent';
import { ICityState, IForm } from './models/IForm';
import axios from 'axios';
import { IForecast } from './models/IForecast';
import Forecast from './components/Forecast/Forecast';
import loadingGif from './assets/img/googleweather.gif';



function App() {
  const [form, setForm] = useState<IForm>({
    streetAddress: '',
    city: '',
    state: '',
    postalCode: '',
    selectedCityState: {
      city: '',
      state: '',
    },
  })
  const [showNotFound, setShowNotFound] = useState<boolean>(false);
  const [forecasts, setForecasts] = useState<IForecast[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getWeatherSearch = async () => {
    setLoading(true);
      let params = {
          address: `${form.streetAddress.toString()},${form.city},${form.state},${form.postalCode}`,
          benchmark: 2020,
          format: 'json',
      }
      try {
        const {data} = await axios.get('https://geocoding.geo.census.gov/geocoder/locations/onelineaddress', {
            params: params
        })
        if(data.result.addressMatches.length ) {
            let x= data?.result?.addressMatches[0]?.coordinates?.x;
            let y= data?.result?.addressMatches[0]?.coordinates?.y;
           setShowNotFound(false)
           // call the Weather API
           let foreCastUrl = ''
           if(x && y) {
             let gridUrl = await axios.get(`https://api.weather.gov/points/${y},${x}`)
             foreCastUrl = gridUrl?.data?.properties?.forecast
           }
           // now call the Weather API URL privides in the last call
           if(foreCastUrl) {
            let {data} = await axios.get(foreCastUrl)
            if(data.properties.periods.length) {
              setForecasts(data.properties.periods)
              
            }
            
           }
           setLoading(false)
        } else {
           setShowNotFound(true)
           setLoading(false)
        }
      } catch (error) {
          console.log(error)
          setLoading(false)
      }

  }

  const handleCityChange = (object: ICityState) => {
    setForm({
      ...form,
      city: object?.city,
      state: object?.state,
      selectedCityState: object
    })
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setForecasts([])
    getWeatherSearch()
  }

  useEffect(() => {
    return () => {
      setForm({
        streetAddress: '',
        city: '',
        state: '',
        postalCode: '',
        selectedCityState: {
          city: '',
          state: ''
        }
      })
    }
  },[])

  return (
    <div className="App">
      <Header />
      <SearchComponent
        form={form}
        handleChange={handleChange} 
        handleSubmit={handleSubmit}
        handleCityChange={handleCityChange}
      />
      {showNotFound && <div className="text-center text-red-500">Address does not exist or not found, try a different one.</div>}
      {(!loading && forecasts?.length) ? <Forecast forecasts={forecasts} / > : loading ? <div className=" bg-white rounded shadow text-center mx-5 text-blue-500">
        <img className="w-80 text-center mx-auto" src={loadingGif} alt="loading" />
        <p className="text-center text-xl p-10">Searching Forecast...</p>
        </div> : null}
    </div>
  );
}

export default App;
