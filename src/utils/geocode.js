const request = require('postman-request')

const geoCode = (location, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=pk.eyJ1Ijoid2lsbG93b2FrcyIsImEiOiJja2xhd284M2sxMDlvMnZsYmoxZXNxZjBmIn0.QGg2OpPQcQvMxHH-WvamWA&limit=1`

    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback('unable to connect to location services',undefined)
        } else if (body.features.length === 0) {
            callback('Invalid input - please re-enter your location',undefined)
        } else {
            const data = body.features[0]
            const location = data.place_name
            // callback(undefined, `Location: ${location}, Long: ${longitude}, Lat: ${latitude}`)
            callback(undefined,{
                longitude: data.center[0],
                latitude: data.center[1],
                location: data.place_name
            })
        }
    })
}

module.exports = {
    geoCode: geoCode
}
