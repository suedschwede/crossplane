import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';
import { describe, expect } from 'https://jslib.k6.io/k6chaijs/4.3.4.2/index.js';

export const errorRate = new Rate('errors');

export const options = {
    discardResponseBodies: true,
    scenarios: {
      mic_demo: {
        executor: 'constant-vus',
        vus: 200,
        duration: '120s',
      },
    },
  };

export default function () {

  const params = {
    timeout: '120s',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  var url = 'http://20.4.139.130/';

  const ReqBody = `vote=Blue`;
  
  var response = http.post(url, ReqBody, params);

  check(response, {
    "status code should be 200": res => res.status === 200,
  });
}
