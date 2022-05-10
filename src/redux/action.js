export const changeStandardTicketNumber = (number) => {
    return {
        type: 'changeStandardTicketNumber',
        payload: number
    }
}

export const changeVipTicketNumber = (number) => {
    return {
        type: 'changeVipTicketNumber',
        payload: number
    }
}

export const changeSeatChoosen = (number) => {
    return {
        type: 'changeSeatChoosen',
        payload: number
    }
}
export const fillPremiereList = (premiereList) => {
    return {
        type: 'fillPremiereList',
        payload: premiereList
    }
}

export const fillBuyProcessObj = (buyProcessobj) => {
    return {
        type: 'fillBuyProcessObj',
        payload: buyProcessobj
    }
}

export const fillPremiereRoomInfo = (premiereRoomInfo) => {
    return {
        type: 'fillPremiereRoomInfo',
        payload: premiereRoomInfo
    }
}

export const fillUserInfo = (userInfo) => {
    return {
        type: 'fillUserInfo',
        payload: userInfo
    }
}

export const fillInvoiceInfo = (invoiceInfo) => {
    return {
        type: 'fillInvoiceInfo',
        payload: invoiceInfo
    }
}

export const fillBuyProcessStatus = (status) => {
    return {
        type: 'fillBuyProcessStatus',
        payload: status
    }
}