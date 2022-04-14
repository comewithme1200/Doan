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

export const changeSeatQuantity = (number) => {
    return {
        type: 'changeSeatQuantity',
        payload: number
    }
}
export const fillPremiereList = (premiereList) => {
    return {
        type: 'fillPremiereList',
        payload: premiereList
    }
}