import * as http from 'http';
import * as mongoose from 'mongoose';
import * as request from 'supertest';
import {config} from '../config/express-config';

/**
 * General utility functions
 */
export function clearDatabase(model: mongoose.Model<any>) {
  return new Promise((resolve, reject) => {
    model.remove({}, err => err ? reject(err) : resolve());
  });
}

/**
 * For restarting the server on each test suite
 */
// require caches modules after loading them. Deletes the
// cache to get a fresh loading of the module.
export function deleteRequireCache(path: string) {
  delete require.cache[require.resolve(path)];
}

export function startServer(): http.Server {
  const serverPath = `${config.root}/server`;
  console.log(serverPath);
  deleteRequireCache(serverPath);
  return require(serverPath);
}

export function closeServer(server: http.Server, done: Function) {
  deleteRequireCache('../config/express-config');
  mongoose.connection.close();
  server.close(done);
}

/**
 * HTTP promises
 */
export interface RequestOptions {
  headers?: any;
  data?: any;
}

export function getPromise(server: http.Server, url: string, options: RequestOptions = {}) {
  return new Promise(function (
    resolve: (res: request.Response) => any,
    reject: (err: request.Response) => any
  ) {
    const headers = options.headers || {};

    request(server)
      .get(url)
      .set(headers)
      .end((err: any, res: any) => err ? reject(err) : resolve(res));
  });
}

export function postPromise(server: http.Server, url: string, options: RequestOptions = {}) {
  return new Promise(function (
    resolve: (res: request.Response) => any,
    reject: (err: request.Response) => any
  ) {
    const headers = options.headers || {};
    const data = options.data || {};

    request(server)
      .post(url)
      .set(headers)
      .send(data)
      .end((err: any, res: any) => err ? reject(err) : resolve(res));
  });
}

export function putPromise(server: http.Server, url: string, options: RequestOptions = {}) {
  return postPromise(server, url + '?_method=put', options);
}

export function deletePromise(server: http.Server, url: string, options: RequestOptions = {}) {
  return postPromise(server, url + '?_method=delete', options);
}