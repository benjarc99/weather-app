import React from 'react';
import { IForecast } from '../../models/IForecast';
import DayWeather from '../DayWeather/DayWeather';

interface IProps {
    forecasts: IForecast[];
}

const Forecast = ({forecasts, ...props}: IProps) => {
    return (
        <div className="grid  grid-cols-1 sm:grid-cols-2 xl:grid-cols-7 gap-4 m-5 p-5 rounded shadow bg-white">
            {forecasts?.map( (forecast: IForecast) => {
                return (
                    <DayWeather key={forecast.number} day={forecast} />
                )
            })}
        </div>
    )
};

export default Forecast;