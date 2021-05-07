import React from 'react';
import './default-cities.css';
import CityCard from '../city-card';
import { connect } from 'react-redux';

const DefaultCities = (props) => {
    let {citiesItems, isReady} = props;

    let getWeekday = (date) => {
        let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return days[date.getDay()];
    }
    let day = getWeekday(new Date());
    let today = new Date().toLocaleDateString().slice(0,-5); 
    let time = new Date().toLocaleTimeString().slice(0,-3);
    return(
        <section className="defaultcities__container text-left">
            <div className="row">
                <h2 className="ml-4 my-4 p-3"><span className="current__day">{day} ({today})</span>, <span className="current__time">{time}</span></h2>
            </div>
            <div className="row justify-content-around">
                {!isReady ? "Uploading data" : citiesItems.map((city) =>
                                <CityCard key={city.id} {...city} /> )} 
            </div>
        </section>
    );
}

const mapStateToProps = (state) => ({
    citiesItems: state.datadownloading.citiesList,
    isReady: state.datadownloading.isReady
});

export default connect(mapStateToProps)(DefaultCities);


