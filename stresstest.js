import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  duration: '30s',
  vus: 100,
  // iterations: 60000, iterations can be run instead of duration, seemingly not together though
  // Try adding more http requests
  // rps: 1000,
  // ext: {
  //   loadimpact: {
  //     distribution: {
  //       'amazon:us:portland': { loadZone: 'amazon:us:portland', percent: 100 },
  //     },
  //   },
  // },
};

export default function () {
  const n = Math.ceil(Math.random() * 10000000);
  const BASE_URL = `http://localhost:3003/api/data/${n}`;
  let response = http.get(BASE_URL);
  sleep(.1)
  // sleep(.05)
}

// export default function () {
//   const BASE_URL = 'http://localhost:3003/api/data/';

//   let responses = http.batch([
//     [
//       'GET',
//       "'" + BASE_URL + Math.ceil(Math.random() * 10000000) + "'"
//     ],
//     [
//       'GET',
//       "'" + BASE_URL + Math.ceil(Math.random() * 10000000) + "'"
//     ],
//     [
//       'GET',
//       BASE_URL + Math.ceil(Math.random() * 10000000)
//     ],
//     [
//       'GET',
//       BASE_URL + Math.ceil(Math.random() * 10000000)
//     ],
//     [
//       'GET',
//       BASE_URL + Math.ceil(Math.random() * 10000000)
//     ],
//     [
//       'GET',
//       BASE_URL + Math.ceil(Math.random() * 10000000)
//     ],
//     [
//       'GET',
//       BASE_URL + Math.ceil(Math.random() * 10000000)
//     ],
//     [
//       'GET',
//       BASE_URL + Math.ceil(Math.random() * 10000000)
//     ],
//     [
//       'GET',
//       BASE_URL + Math.ceil(Math.random() * 10000000)
//     ],
//     [
//       'GET',
//       BASE_URL + Math.ceil(Math.random() * 10000000)
//     ]
//   ])
//   sleep(1)
// }

// To check response code:
// check(responses, {
//   'status is 200': (r) => r.status === 200
// })