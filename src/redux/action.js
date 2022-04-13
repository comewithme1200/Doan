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