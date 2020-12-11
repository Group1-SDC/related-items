import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  duration: '1m',
  vus: 100,
  // iterations: 60000, iterations can be run instead of duration, seemingly not together though
  rps: 1000,
  ext: {
    loadimpact: {
      distribution: {
        'amazon:us:portland': { loadZone: 'amazon:us:portland', percent: 100 },
      },
    },
  },
};


//Try with Amazon server? Sent by Andrew

// Alternate
// export let options = {
//   stages: [
//     {duration: '1m', target: 10},
//     {duration: '2m', target: 100},
//     {duration: '2m', target: 1000}
//   ]
// }

export default function () {
  const BASE_URL = 'http://localhost:3003/api/data/' + Math.ceil(Math.random() * 10000000);

  let responses = http.get(BASE_URL)
  // check(responses, {
  //   'status is 200': (r) => r.status === 200
  // })
  sleep(1)
};