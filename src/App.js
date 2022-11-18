import { useState } from "react";
import "./App.css";

function App() {
    const [city, setCity] = useState("");
    const [info, setInfo] = useState({});
    const imageurl =
        city &&
        `https://images.unsplash.com/photo-1553901753-215db344677a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80`;

    const getData = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_WEATHER_API}`
            );
            const data = await response.json();
            if (city && data.cod !== "404") {
                setInfo({
                    sky: data.weather[0].main,
                    temp: data.main.temp,
                });

                setTimeout(() => {
                    setInfo({});
                    setCity("");
                }, 8000);
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div
            className="container"
            style={{ backgroundImage: `url(${imageurl})` }}
        >
            <form method="POST" onSubmit={getData}>
                <input
                    className="inputCity"
                    type="text"
                    name="city"
                    placeholder="Enter city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
            </form>
            {info.temp && (
                <div className="tempinfo">
                    <h1>{info.sky}</h1>
                    <h2>{info.temp} °C</h2>
                </div>
            )}
        </div>
    );
}

export default App;
