import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  duration: '1m',
  vus: 1000,
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
//     {duration: '20s', rps: 1, vus: 100},
//     {duration: '20s', rps: 10, vus: 100},
//     {duration: '20s', rps: 100, vus: 100}
//     {duration: '1m', rps: 1000, vus: 100},
//   ]
// }

export default function () {
  const BASE_URL = 'http://localhost:3003/api/data/' + Math.ceil(Math.random() * 10000000);

  let responses = http.get(BASE_URL)
  sleep(1)
};