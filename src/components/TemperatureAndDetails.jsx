import React from 'react'
import {
    UilTemperature,
    UilTear,
    UilWind,
    UilSun,
    UilSunset,
  } from "@iconscout/react-unicons";
import { formatToLocalTime, iconUrlFromCode } from '../services/weatherServices';

function TemperatureAndDetails({weather: {
    details, icon, temp, temp_min, temp_max, sunrise, sunset, speed, humidity, feels_like, timezone
}, units}) 

{
    return (
        <div className=''>
            <div className='flex items-center justify-center py-2 md:py-6 text-s md:text-4xl text-cyan-300'>
                <p>{details}</p>
            </div>

            <div className='flex flex-row items-center justify-between text-white md:py-3'>
                <img src={iconUrlFromCode(icon)} alt="" className='w-12 md:w-20'/>
                <p className='text-s md:text-5xl'>{`${temp.toFixed()} °${units=='metric'?'C':'F'}`}
                </p>
                <div className='flex flex-col space-y-2'>
                    <div className='flex font-light text-xs sm:text-sm items-center justify-center'>
                        <UilTemperature size={18} className="mr-1"/>
                        Real fell:
                        <span className='font-medium ml-1'>{`${feels_like.toFixed()}°`}</span>
                    </div>

                    <div className='flex font-light text-xs sm:text-sm items-center justify-center'>
                        <UilTear size={18} className="mr-1"/>
                        Humidity:
                        <span className='font-medium ml-1'>{`${humidity.toFixed()}%`}</span>
                    </div>

                    <div className='flex font-light text-xs sm:text-sm items-center justify-center'>
                        <UilWind size={18} className="mr-1"/>
                        Wind:
                        <span className='font-medium ml-1'>{`${temp.toFixed()} ${units=='metric'?'km/h':'mph'}`}</span>
                    </div>
                </div>
            </div>

        <div className='flex flex-row items-center justify-center space-x-2 text-white text-xs sm:text-sm py-3'>
            <UilSun/>
            <p className='font-light'>Rise: <span className='font-medium ml-1'>{formatToLocalTime(sunrise, timezone, 'hh:mm a')}</span>
            </p>
            <p className='font-light'>|</p>

            <UilSunset/>
            <p className='font-light'>Set: <span className='font-medium ml-1'>{formatToLocalTime(sunset, timezone, 'hh:mm a')}</span>
            </p>
            <p className='font-light'>|</p>

            <UilSun/>
            <p className='font-light'>High: <span className='font-medium ml-1'>{`${temp_max.toFixed()}°`}</span>
            </p>
            <p className='font-light'>|</p>

            <UilSun/>
            <p className='font-light'>Low: <span className='font-medium ml-1'>{`${temp_min.toFixed()}°`}</span>
            </p>
        </div>

        </div>
    )
}

export default TemperatureAndDetails