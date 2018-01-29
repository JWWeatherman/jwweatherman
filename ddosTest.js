/* eslint-disable no-new */
var axios = require('axios')

function test (responseCode, iterations) {
  if (responseCode === 0) console.log('ddos test started')
  axios.get('http://localhost:5000/api/getVideos')
    .then(function (res) {
      responseCode = res.status
      setImmediate(() => test(res.status, iterations + 1), 1000)
    })
    .catch(function (err) {
      console.log('ddos test finished ', err.response.status, iterations)
    })
}

test(0, 0)
