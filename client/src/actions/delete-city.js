export const deleteCity = (city) => {
    return {
        type: "DELETE_CITY",
        payload: city
    };
};