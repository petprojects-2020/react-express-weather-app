import React, { Component } from 'react';
import './city-in-detail.css';
import { Link, Redirect } from 'react-router-dom';
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Label } from 'recharts';
import { connect } from 'react-redux';
import axios from 'axios';
import moment from 'moment'; 

class CityInDetail extends Component {

    state = {
        arr: [],
        imageUrl: '',
        cityData: {}
    }

    async componentDidMount() {
        let {id} = this.props;
        let currentCity = this.props.citiesItems.find(item => item.id === +id);
        if(!currentCity) {
            return <Redirect to="/" />;
        }
        let {lat, lon} = currentCity.coord;
        const [firstResponse, secondResponse] = await Promise.all([
            axios.get(`/api/cityCoord/?cityLat=${lat}&cityLon=${lon}`),
            axios.get(`/api/cityId/?cityId=${id}`)
        ]);
        const dataForHoursForecast = Object.values(firstResponse.data);
        this.setState({cityData: {
            sunRiseTime: dataForHoursForecast[4].sunrise,
            sunSetTime: dataForHoursForecast[4].sunset,
            visibility: dataForHoursForecast[4].visibility
        }})
        const dataArr = dataForHoursForecast.pop();
        this.displayData(dataArr);

        const dataForIcon = Object.values(secondResponse.data);
        const dataObj = dataForIcon[1][0];

        this.setState({imageUrl: `http://openweathermap.org/img/wn/${dataObj.icon}.png`})
    }

    displayData = (arr) => {
        let arrHoursTemp = [];
        arr.forEach(item => {
            let time = (new Date( item.dt * 1000 )).getHours();
            let temperature = item.temp;
            arrHoursTemp.push({time, temperature})
        })
        let inx = arrHoursTemp.findIndex(item => item.time === 0);
        let currentDayData = [];
        for(let i = 0; i <= inx; i++) {
            currentDayData.push(arrHoursTemp[i])
        }
        this.setState({arr: currentDayData})
    }

    render() {
        let {id} = this.props;
        let currentCity = this.props.citiesItems.find(item => item.id === +id);
        const {cityData} = this.state;
        if(!currentCity) {
            return <Redirect to="/" />;
        }
        const renderLineChart = (
            <ResponsiveContainer width={"100%"} height={400}>
                <LineChart data={this.state.arr} margin={{ top: 10, right: 30, left: 30, bottom: 30 }}>
                    <Line type="monotone" dataKey="temperature" stroke="#8884d8" />
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <XAxis dataKey="time">
                        <Label
                            value={"Time"}
                            position="bottom"
                            style={{ textAnchor: "middle" }}
                        />
                    </XAxis>
                    <YAxis>
                        <Label
                            value={"Temperature (°C)"}
                            position="left"
                            angle={-90}
                            style={{ textAnchor: "middle" }}
                        />
                    </YAxis>
                    <Tooltip />
                </LineChart>
            </ResponsiveContainer>
        );
        let today = new Date().toLocaleDateString().slice(0,-5);         
        return(
            <div className="text-center">
                <div className="row mt-4 ml-4 align-items-center"> 
                    <Link to="/"><button className="btn btn-success">HOME</button></Link>
                    <span className="ml-2">/ {currentCity.name}</span>
                </div>
                <div className="row">
                    <h1 className="mt-2 ml-4 p-3"> 
                        <span className="city-detailed__title">{currentCity.name}</span>
                        <span className="city-detailed__date"> ({today})</span> 
                    </h1>
                </div>
                <div className="row mt-2 justify-content-center row-eq-height">
                    <div className="p-3 d-flex flex-column m-2 col-11 col-sm-6 col-lg-3 bg-white shadow-lg text-center city-detailed__card">
                        <div className="city-detailed__card-header">
                            Temperature
                        </div>
                        <div className="my-2"><strong>{currentCity.main.temp}&#176;</strong></div>
                        <div>feels like {currentCity.main.feels_like}</div>
                    </div>
                    <div className="p-3 d-flex flex-column m-2 col-11 col-sm-6 col-lg-3 bg-white shadow-lg text-center city-detailed__card">
                        <div className="city-detailed__card-header">
                            Wind
                        </div>
                        <div className="my-2"><strong>{currentCity.wind.speed} m/sec</strong></div>
                    </div>
                    <div className="p-3 d-flex flex-column m-2 col-11 col-sm-6 col-lg-3 bg-white shadow-lg text-center city-detailed__card">
                        <div className="city-detailed__card-header">
                            {currentCity.weather[0].description}
                        </div>
                        <div>
                            <img src={this.state.imageUrl} alt=""/>
                        </div>
                    </div>
                    <div className="p-3 d-flex flex-column m-2 col-11 col-sm-6 col-lg-3 bg-white shadow-lg text-center city-detailed__card">
                        <div className="city-detailed__card-header">
                            Sunrise/Sunset
                        </div>
                        <div className="mt-2"><strong>{cityData.sunRiseTime ? moment.unix(cityData.sunRiseTime).format('LT') : "Uploading data"}</strong></div>
                        <div><strong>{cityData.sunSetTime ? moment.unix(cityData.sunSetTime).format('LT') : "Uploading data"}</strong></div>
                    </div>
                    <div className="p-3 d-flex flex-column m-2 col-11 col-sm-6 col-lg-3 bg-white shadow-lg text-center city-detailed__card">
                        <div className="city-detailed__card-header">
                            Visibility
                        </div>
                        <div className="mt-2"><strong>{cityData.visibility} met</strong></div>
                    </div>
                    <div className="p-3 d-flex flex-column m-2 col-11 col-sm-6 col-lg-3 bg-white shadow-lg text-center city-detailed__card">
                        <div className="city-detailed__card-header">
                            Humidity
                        </div>
                        <div className="mt-2"><strong>{currentCity.main.humidity}%</strong></div>
                    </div>
                </div>
                <div className="row m-4 justify-content-center border shadow-lg rounded bg-white">
                        <h2 className="my-3">Hourly forecast</h2>
                        {renderLineChart}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    citiesItems: state.datadownloading.citiesList
});

export default connect(mapStateToProps)(CityInDetail);

