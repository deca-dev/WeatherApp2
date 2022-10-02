import React from 'react'

function TopButtons({setQuery}) {

    const cities = [
        {
            id: 1,
            title: 'London'
        },
        {
            id: 2,
            title: 'Sydney'
        },
        {
            id: 3,
            title: 'Tokyo'
        },
        {
            id: 4,
            title: 'Toronto'
        },
        {
            id: 5,
            title: 'Paris'
        }
    ]

    return (
        <div className='flex flex-wrap sm:flex-nowrap items-center justify-center sm:justify-around my-6'>
            {cities.map((city) => (
                <button key={city.id} className='text-white text-lg font-medium p-5 sm:p-0 transition ease-out hover:scale-125 hover:text-amber-500 active:text-zinc-600' onClick={()=>setQuery({q: city.title})}>{city.title}</button>
            ))}
        </div>
    )
}

export default TopButtons;