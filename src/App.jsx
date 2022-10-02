
import UilReact from '@iconscout/react-unicons/icons/uil-react'
import TopButtons from './components/TopButtons'
import Inputs from './components/Inputs'
import TimeAndLocation from './components/TimeAndLocation'
import TemperatureAndDetails from './components/TemperatureAndDetails'
import Forecast from './components/Forecast'
import getWeatherData from './services/weatherServices'
import getFormattedWeatherData from './services/weatherServices'
import formatCurrentWeather from './services/weatherServices'
import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [query, setQuery] = useState({ q: "berlin" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);
  const [icon, setIcon] = useState("")

  useEffect(() => {
    const fetchWeather = async () => {

      await getFormattedWeatherData({ ...query, units }).then((data) => {
        setWeather(data);
      });
    };

    fetchWeather();
  }, [query, units]);

  useEffect(() => {
    const fetchIcon = async () => {

      await formatCurrentWeather({ ...query, icon }).then((data) => {
        setIcon(data.icon)
      })
    }
    fetchIcon()
  }, [query])



  const formatBackground = () => {
    if (!weather) return "from-cyan-700 to-blue-700";
    const threshold = units === "metric" ? 20 : 60;
    if (weather.temp <= threshold) return "from-cyan-700 to-blue-700";

    return "from-yellow-700 to-orange-700";
  };

  const formatGeneralBackground = () => {
    let backgroundImg = ''
    switch (icon) {
      case '01d':
        backgroundImg = 'https://cdn.pixabay.com/photo/2018/08/06/22/55/sun-3588618_960_720.jpg'
        break;
      case '01n':
        backgroundImg = 'https://cdn.pixabay.com/photo/2020/04/12/09/26/universe-5033471_960_720.jpg'
        break;
      case '02d':
        backgroundImg = 'https://cdn.pixabay.com/photo/2018/06/21/13/57/clouds-3488632_960_720.jpg'
        break;
      case '02n':
        backgroundImg = 'https://cdn.pixabay.com/photo/2020/05/26/20/38/moon-5224745_960_720.jpg'
        break;
      case '03d':
        backgroundImg = 'https://cdn.pixabay.com/photo/2014/09/12/18/41/white-clouds-443166_960_720.jpg'
        break;
      case '03n':
        backgroundImg = 'https://cdn.pixabay.com/photo/2016/02/05/03/58/moon-1180345_960_720.jpg'
        break;
      case '04d':
        backgroundImg = 'https://cdn.pixabay.com/photo/2014/09/12/18/41/white-clouds-443166_960_720.jpg'
        break;
      case '04n':
        backgroundImg = 'https://cdn.pixabay.com/photo/2016/02/05/03/58/moon-1180345_960_720.jpg'
        break;
      case '09d':
        backgroundImg = 'https://cdn.pixabay.com/photo/2018/10/24/13/07/rain-3770216_960_720.jpg'
        break;
      case '09n':
        backgroundImg = 'https://cdn.pixabay.com/photo/2017/03/27/18/38/rain-2179933_960_720.jpg'
        break;
      case '10d':
        backgroundImg = 'https://cdn.pixabay.com/photo/2018/10/24/13/07/rain-3770216_960_720.jpg'
        break;
      case '10n':
        backgroundImg = 'https://cdn.pixabay.com/photo/2017/03/27/18/38/rain-2179933_960_720.jpg'
        break;
      case '11d':
        backgroundImg = 'https://cdn.pixabay.com/photo/2018/10/24/13/07/rain-3770216_960_720.jpg'
        break;
      case '11n':
        backgroundImg = 'https://cdn.pixabay.com/photo/2017/10/19/16/54/night-2868370_960_720.jpg'
        break;
      case '13d':
        backgroundImg = 'https://cdn.pixabay.com/photo/2019/12/30/20/34/road-4730553_960_720.jpg'
        break;
      case '13n':
        backgroundImg = 'https://cdn.pixabay.com/photo/2016/12/18/14/51/midnight-snow-1915907_960_720.jpg'
        break;
      case '13d':
        backgroundImg = 'https://cdn.pixabay.com/photo/2019/09/03/12/25/sea-4449326_960_720.jpg'
        break;
      case '13n':
        backgroundImg = 'https://cdn.pixabay.com/photo/2020/01/23/12/37/mist-4787610_960_720.jpg'
        break;
    }
    return backgroundImg
  }

  return (
    <div style={{ backgroundImage: `url(${formatGeneralBackground()})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', minHeight: '100vh' }} >
      <div
        className={`mx-auto max-h-screen-md max-w-screen-md mt-0 py-5 px-10 sm:px-32 bg-gradient-to-br h-fit shadow-lg shadow-gray-600 opacity-80 ${formatBackground()}`}
      >
        <TopButtons setQuery={setQuery} />
        <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />

        {weather && (
          <div>
            <TimeAndLocation weather={weather} />
            <TemperatureAndDetails weather={weather} units={units} />

            <Forecast title="hourly forecast" items={weather.hourly} />
            <Forecast title="daily forecast" items={weather.daily} />
          </div>
        )}


      </div>
    </div>
  );
}

export default App;