import React, { Component } from 'react';
import './city-card.css'
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import * as action from '../../actions/delete-city';

class CityCard extends Component {

    render() {
        let {name, id, main, weather} = this.props;
        return(
            <div className="p-3 m-2 col-11 col-sm-6 col-lg-3 bg-white shadow-lg text-center city__card">
                <div className="city__title mt-2">{name}</div>
                <div className="d-flex align-items-center">
                    <img src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`} alt=""/>
                    {weather[0].description}
                </div>
                <div className="my-1"><span className="city__temperature">{main.temp}&#176;</span></div>
                <div className="text-secondary" >feels like <span className="feels-like__temperature">{main.feels_like}&#176;</span></div>
                <div className="d-flex mt-4 flex-column align-items-center">
                    <button onClick={() => {this.props.history.push(`/cities/${id}`)}}
                        className="btn btn-lg btn-success text-white">more info</button>
                    <button onClick={() => this.props.deleteCity(name)}
                        className="btn btn-sm btn-outline-danger mt-4">delete</button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    citiesItems: state.datadownloading.citiesList
});

const mapDispatchToProps = dispatch => ({
    deleteCity: (city) => dispatch(action.deleteCity(city))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CityCard));

