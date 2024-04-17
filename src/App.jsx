import "./App.css";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

function App() {
  const key = "7a1618a9d1115240826c4d17de6465c8"; //7a1618a9d1115240826c4d17de6465c8

  const [city, setCity] = useState("");
  const [citys, setCitys] = useState("Surakarta");
  const [cityss, setCityss] = useState("");
  const [main, setMain] = useState([]);
  const [weather, setWeather] = useState([]);
  const [loading, setLoading] = useState(true);
  const [time, setTime] = useState();
  const [ampm, setAmpm] = useState();
  const [hour, setHour] = useState();
  const date = new Date();

  useEffect(() => {
    const res = async () => {
      await axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${citys}&appid=${key}&units=metric`
        )
        .then((response) => {
          setCity(response.data.name);
          setMain(response.data.main);
          setWeather(response.data.weather[0]);
          setLoading(false);
        })
        .catch((e) => e.message);
    };
    res();
  }, [citys]);

  useEffect(() => {
    const dateTimeformat = () => {
      let hours = date.getHours();
      let minutes = date.getMinutes();
      let x = hours >= 12 ? "pm" : "am";
      hours = hours % 12;
      hours = hours ? hours : 12;
      minutes = minutes.toString().padStart(2, "0");
      let mergeTime = hours + ":" + minutes + " " + x;
      setAmpm(x);
      setHour(hours);
      setTime(mergeTime);
    };
    dateTimeformat();
  }, [60000]);

  function handlerclick(e) {
    setLoading(true);
    e.preventDefault();
    setCitys(cityss);
    setLoading(false);
  }

  return (
    <div
      className={`App ${
        ampm == "am" && hour >= 6
          ? "bg-sky-100"
          : ampm == "pm" && hour <= 6
          ? "bg-sky-100"
          : "bg-neutral-500"
      }`}
    >
      {loading ? (
        <div className="text-center align-middle my-auto self-auto">
          Loading...
        </div>
      ) : (
        <div className="flex w-full h-full">
          <div className="mx-auto my-auto bg-white rounded-lg p-5 shadow-md">
            <center>
              <div className="search">
                <input
                  placeholder="City"
                  type="text"
                  className="bg-white py-1 px-1 border-2 border-slate-200 rounded-md"
                  onChange={(e) => setCityss(e.target.value)}
                />
                <button
                  type="button"
                  className="bg-neutral-100 py-2 px-4 ml-2 rounded-md"
                  onClick={(e) => handlerclick(e)}
                >
                  Search
                </button>
              </div>
            </center>
            <div className="justify-between flex">
              <img
                src={`http://openweathermap.org/img/w/${weather.icon}.png`}
                className="w-20"
              />
              <div className="temp-sub font-black text-3xl my-auto">
                {Math.round(main.temp).toFixed(0)}&deg;C
              </div>
            </div>
            <div className="font-black">{city}</div>
            <div className="weather-head">{weather.main}</div>
            <div className="weather-sub">{weather.description}</div>
            <div className="flex hum">
              <div className="hum-head">Humidity :</div>
              <div className="hum-sub ml-1">{main.humidity}</div>
            </div>
            {time}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
