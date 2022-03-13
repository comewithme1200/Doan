const initialValue = {
    toggleScreen: { 
        screen: 'main'
    }
};

const rootReducer = (state = initialValue, action) => {
    console.log({state, action});
    switch (action.type){
        case "login":
            return {
                ...state,
                toggleScreen: {
                    screen: 'login'
                }
            };
        case "buy":
            return {
                ...state,
                toggleScreen: {
                    screen: 'buy'
                }
            };
        case "main":
            return {
                ...state,
                toggleScreen: {
                    screen: 'main'
                }
            };
        default:
            return state;

    }
};

export default rootReducer;