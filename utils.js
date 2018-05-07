import { Request, Response } from 'express';

/**
 * Helper function that creates mongodb connection string. Defaults to `mongodb://localhost/test`
 * @param {string='mongodb://'} protocol Protocol to call DB. Local Mongo is usually: mongodb://
 * @param {string='localhost/test'} db Hostname and database to database you want to access. Ex: localhost/test
 * @param {string=''} user Username. Local is usually empty
 * @param {string=''} pw Password. Local is usually empty
 * @returns {string} String to be used for mongoose connection
 */
export const createMongoUrl = (
  protocol = 'mongodb//',
  db = 'localhost/test',
  user = '',
  pw = ''
) => `${protocol}${user}${user ? ':' : ''}${pw}${pw ? '@' : ''}${db}`;

/**
 * A wrapper function that resolves asynchronous function and applies an
 * error handler on error.
 * @param {Function} fn Asynchronouse function
 * @param {Function=console.error} errHandler Function that will handle errors in
 *  the ansynchronous function. Defaults to console.error
 */
export const asyncMiddWrapper = (fn, errHandler = console.error) =>
  /**
   * @param {Request} req
   * @param {Response} res
   * @returns {Promise<fn>}
   */
  (req, res) => Promise.resolve(fn(req, res)).catch(e => errHandler(e, res));
