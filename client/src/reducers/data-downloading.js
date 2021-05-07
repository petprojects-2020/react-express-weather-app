const initialState = {
    citiesList: [],
    error: false,
    isReady: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'SET_DATA':
            const currentId = action.payload.id;
            const currentIndex = state.citiesList.findIndex(({id}) => id === currentId);
            if(currentIndex === -1) {
                return {
                    ...state,
                    citiesList: [...state.citiesList, action.payload],
                    error: false,
                    isReady: true
                };
            } else {
                return state;
            }

        case 'ADD_CITY':
            return {
                ...state,
                citiesList: [...state.citiesList, action.payload],
                error: false
            };
        case 'DELETE_CITY':
            return {
                ...state,
                citiesList: state.citiesList.filter(city => city.name !== action.payload),
                error: false
            };
        case 'SET_DATA_FAILED':
            return {
                ...state,
                error: true
            };
        case 'ADD_CITY_FAILED':
            return {
                ...state,
                error: true
            };
        default: 
            return state;
    }
}
