function change_number_format(phone_number) {
    if (phone_number.length === 10) {
        phone_number = '8' + phone_number
    }
    else if (phone_number[0] === '+') {
        phone_number = '8' + phone_number.slice(2)
    } else if (phone_number[0] === '7') {
        phone_number = '8' + phone_number.slice(1)
    }
    return phone_number
}
module.exports = change_number_format