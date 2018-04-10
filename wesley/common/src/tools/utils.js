// @flow

export const generateFileDateStamp = () => {
    const d = new Date();
    const addLeadingZero = (val) => {
        if ( val < 10 ) {
            return `0${val}`
        }
        return val
    }
    return `${ d.getFullYear() }${ addLeadingZero(d.getMonth()+1) }${ addLeadingZero(d.getDate()) }`;
}