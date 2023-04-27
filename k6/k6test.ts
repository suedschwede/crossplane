import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';
import { describe, expect } from 'https://jslib.k6.io/k6chaijs/4.3.4.2/index.js';
import { uuidv4 } from 'https://jslib.k6.io/k6-utils/1.4.0/index.js';

export const errorRate = new Rate('errors');

export const options = {
    discardResponseBodies: true,
    scenarios: {
      mic: {
        executor: 'constant-vus',
        vus: 100,
        duration: '20s',
      },
    },
  };

export default function () {
  const randomUUID = uuidv4();

  const params = {
    timeout: '120s',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  var url = 'http://172.21.122.249/';

  const ReqBody = `vote=Blue`;

  
  var response = http.post(url, ReqBody, params);



  check(response, {
    "status code should be 200": res => res.status === 200,
  });
}
