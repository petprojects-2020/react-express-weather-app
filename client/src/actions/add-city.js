export const addCity = (obj) => {
    return {
        type: "ADD_CITY",
        payload: obj
    };
};

export const addCityFailed = () => {
    return {
        type: "ADD_CITY_FAILED"
    };
};

