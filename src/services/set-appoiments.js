export async function setAppointments(
    name,
    cel,
    date,
    hour,
    // tid: any
) {
    const uuid = require('uuid');
    const tid = uuid.v4()

    fetch('https://sheetdb.io/api/v1/v223jabyp41hi', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            data: [
                {
                    'nome': name,
                    'celular': cel,
                    'date': date,
                    'hour': hour,
                    'transactionId': tid
                }
            ]
        })
    })
        .then((response) => {
            return response.json()
        })
        .then((data) => console.log(data))
        .catch(error => console.log('ERROR'));
        return tid
}