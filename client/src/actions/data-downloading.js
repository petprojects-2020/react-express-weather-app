export const setData = (arr) => {
    return {
        type: "SET_DATA",
        payload: arr
    };
};

export const setDataFailed = () => {
    return {
        type: "SET_DATA_FAILED"
    };
};

