import jsonp from 'jsonp';
import {commonParams} from "@/configs";
import Vue from 'vue';
const isServer = Vue.prototype.isServer
export default function myJsonp (url: string, cbName: string, params: Object): Promise<any> {
  if (isServer) {
    console.log('isServer :', isServer);
    return;
  }
  const trueParams = { ...params, ...commonParams };
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(trueParams);
  return new Promise((resolve, reject) => {
    jsonp(url, { name: cbName }, function (err, res) {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
}

function param(data: Object): string {
  let url = '';
  for (const k in data) {
    const value = data[k] ? data[k] : '';
    url += '&' + k + '=' + encodeURIComponent(value);
  }
  return url ? url.substring(1) : '';
}
