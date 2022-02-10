import axios from 'axios'

exports.doGetLatLong = async (request, response) => {
  axios.get('http://www.mapquestapi.com/geocoding/v1/address', { params: { key: process.env.MAPQUEST_KEY, location: request.body.location } }).then(coordinates => {
    response.status(200).json(coordinates.data.results.shift().locations.shift())
  }).catch(error => {
    console.log(error)
    response.status(400).json(error)
  })
}
