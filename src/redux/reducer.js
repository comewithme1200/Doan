const initialValue = {
    ticketNumber: { 
        standard : 0,
        vip: 0
    }
};

const rootReducer = (state = initialValue, action) => {
    console.log({state, action});
    switch (action.type){
        case 'changeStandardTicketNumber':
            return {
                ...state,
                ticketNumber: {
                    ...state.ticketNumber,
                    standard: action.payload
                }
            }
        case 'changeVipTicketNumber':
            return {
                ...state,
                ticketNumber: {
                    ...state.ticketNumber,
                    vip: action.payload
                }
            }
        default:
            return state;

    }
};

export default rootReducer;