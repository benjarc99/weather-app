import React from 'react';
import { IForecast } from '../../models/IForecast';
import Tooltip from '@mui/material/Tooltip';
import AirIcon from '@mui/icons-material/Air';


interface IProps {
    day: IForecast;
}

const DayWeather = ({day, ...props}: IProps) => {
    return (
        <div className={day.isDaytime ? "bg-blue-300 xs-1/7 relative rounded" : "text-white bg-blue-900 relative rounded"}>
            <h1 className='font-sans text-center mt-3 p-1 text-xl font-bold'>{day.name}</h1>
            <img className='my-4 mx-auto' src={day.icon} alt={day.shortForecast} />
            <h2 className='text-center font-sans text-4xl'>{day.temperature}<span className='text-xl'>{day.temperatureUnit}</span></h2>
            <Tooltip title={day.detailedForecast}><p className='text-center px-1 my-5 text-sm mb-14'>{day.shortForecast}</p></Tooltip>
            <div className='w-full flex absolute bottom-1 border-t-2 pt-2'>
                <div className='w-20 text-right'><AirIcon /></div>
                <div className='w-80'>
                    <p className='text-center text-xs'>Direction: {day.windDirection}</p>
                    <p className='text-center text-xs'>Speed {day.windSpeed}</p>
                </div>
            </div>
            
        </div> 
    );
};

export default DayWeather;