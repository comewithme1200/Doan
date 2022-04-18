const initialValue = {
    ticketNumber: { 
        standard : 0,
        vip: 0
    },
    seatChoosen: {
        seatChoose: [],
        seatNumber: 0
    },
    premiereList: [],
    buyProcessObj: {
        movie_name: '',
        date: ''
    },
    premiereRoomInfo: {
        room_id: '',
        premiere_id: '',
        cinema_name: ''
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
        case "changeSeatChoosen":
            return {
                ...state,
                seatChoosen: action.payload
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
        case 'fillPremiereRoomInfo':
            return {
                ...state,
                premiereRoomInfo: action.payload
            }
        default:
            return state;

    }
};

export default rootReducer;