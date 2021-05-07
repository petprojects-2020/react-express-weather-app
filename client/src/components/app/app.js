import React, { Component } from 'react';
import './app.css';
import DefaultCities from '../default-cities';
import AddingNewCity from '../adding-new-city';
import { connect } from 'react-redux';
import * as actions from '../../actions/data-downloading';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CityInDetail from '../city-in-detail';
import axios from 'axios'; 


class App extends Component {

  state = {
    defaultCitiesList: ["Kharkiv", "Kyiv", "Lviv"]
  }

  uploadingData = (arr) => {
    arr.forEach((city) => {
      axios.get(`/api/cities/?cityName=${city}`)
        .then(response => {
            const data = Object.values(response.data);
            const arr = data.pop();
            const obj = arr[0];
            this.props.onInit(obj);
        })
        .catch(() => (this.props.setDataFailed));
    })
  }

  componentDidMount() {
    let citiesListFromStorage = localStorage.getItem('citiesList');
    if(citiesListFromStorage) {
      let arrLocalStorage = citiesListFromStorage.split(',');
      this.uploadingData(arrLocalStorage);
    } else {
      this.uploadingData(this.state.defaultCitiesList);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.citiesItems !== this.props.citiesItems) {
      let updatedDefaultList = this.props.citiesItems.map(city => city.name);
      localStorage.setItem('citiesList', updatedDefaultList);
    }
  }

  render() {
      return(
        <div className="container border border-secondary rounded">
          <BrowserRouter>
              <Switch>
                <Route path="/" exact render={() => 
                      <main>
                          <DefaultCities />
                          <AddingNewCity />
                      </main>}
                />
                <Route path="/cities/:id" 
                        render={({match})=> { 
                            const { id } = match.params;
                            return <CityInDetail id={id}/>
                        }}/>
              </Switch>
          </BrowserRouter>
        </div>
      );      
  }
}

const mapStateToProps = (state) => ({
  citiesItems: state.datadownloading.citiesList
});

const mapDispatchToProps = dispatch => ({
    onInit: (arr) => dispatch(actions.setData(arr)),
    setDataFailed: () => dispatch(actions.setDataFailed)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
