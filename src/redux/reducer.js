const initialValue = {
    ticketNumber: { 
        standard : 0,
        vip: 0
    },
    seatQuantity: 0,
    premiereList: [],
    buyProcessObj: {
        movie_name: '',
        date: ''
    }
};

const rootReducer = (state = initialValue, action) => {
    // console.log({state, action});
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
        case "changeSeatQuantity":
            return {
                ...state,
                seatQuantity: action.payload
            }
        case 'fillPremiereList':
            return {
                ...state,
                premiereList: action.payload
            }
        case 'fillBuyProcessObj':
            return {
                ...state,
                buyProcessObj: action.payload
            }
        default:
            return state;

    }
};

export default rootReducer;