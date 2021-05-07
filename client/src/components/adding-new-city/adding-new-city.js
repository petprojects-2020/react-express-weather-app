import React, { Component } from 'react';
import './adding-new-city.css';
import { connect } from 'react-redux';
import * as actions from '../../actions/add-city';
import axios from 'axios';

class AddingNewCity extends Component {

    state = {
        cityName: '',
        isReady: null
    }

    handleEnteredData = (e) => {
        let enteredCityName = e.target.value;
        this.setState({cityName: enteredCityName});
    }

    handleAddBtn = () => {
        axios.get(`/api/cities/?cityName=${this.state.cityName}`)
        .then(response => {
        const data = Object.values(response.data);
        const arr = data.pop();
        if(arr.length === 0) {
            this.props.addCityFailed();
        } else {
            const obj = arr[0];
            this.props.addCity(obj);
        }
        })
        .catch(() => this.props.addCityFailed());
        this.setState({cityName: ''});
    }

    render() {
        return (
            <section className="row justify-content-center">
                <div className="my-5 p-5 shadow-lg col-11 col-md-9 col-lg-6 bg-white border
                                addingcity__container text-center">
                    <div className="d-flex flex-column flex-sm-row justify-content-center align-items-center">
                        <input onChange={(e) => this.handleEnteredData(e)} className="form-control w-100 w-sm-75 w-lg-25 mb-2" type="text"
                                value={this.state.cityName} placeholder="Enter city name"/>
                        <button onClick={this.handleAddBtn} 
                                className="btn btn-lg btn-success ml-2">SEARCH</button>
                    </div>
                    <div className="mt-3 city__examples text-secondary">Ex.: Poltava, Milan, Sumy, Paris, London</div>
                </div>
            </section>
        );
    }
}

const mapStateToProps = (state) => ({
    citiesItems: state.datadownloading.citiesList,
    isError: state.datadownloading.error,
});

const mapDispatchToProps = dispatch => ({
    addCity: (city) => dispatch(actions.addCity(city)),
    addCityFailed: (error) => dispatch(actions.addCityFailed(error))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddingNewCity);

