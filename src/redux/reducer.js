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
    movieInfo: {
        name: '',
        image_path: '',
        detail: '',
        trailer_link: ''
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
    buyProcessStatus: false,
    totalBill: 0,
    isPaid: false
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
        case 'fillTotalBill':
            return {
                ...state,
                totalBill: action.payload
            } 
        case 'fillMovieInfo':
            return {
                ...state,
                movieInfo: action.payload
            } 
        case 'changeIsPaid':
            return {
                ...state,
                isPaid: action.payload
            } 
            
        default:
            return state;

    }
};

export default rootReducer;