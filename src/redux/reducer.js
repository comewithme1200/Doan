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
        cinema_name: '',
        room_name: '',
        time: ''
    },
    userInfo: {
        name: '',
        level: '',
        token: ''
    },
    invoiceInfo: {
        invoiceId: '',
        status: 0,
        user_id: ''
    },
    buyProcessStatus: false
};

const rootReducer = (state = initialValue, action) => {
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
        case 'fillUserInfo':
            return {
                ...state,
                userInfo: action.payload
            }
        case 'fillInvoiceInfo':
            return {
                ...state,
                invoiceInfo: action.payload
            }    
        case 'fillBuyProcessStatus':
            return {
                ...state,
                buyProcessStatus: action.payload
            } 
        default:
            return state;

    }
};

export default rootReducer;