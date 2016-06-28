import * as path from 'path';
import {options} from '../config/options';

if (options['env']) process.env.NODE_ENV = options['env'];

export function getNodeEnv(): string {
  return process.env.NODE_ENV || 'development';
}

export function isMocha(): boolean {
  return process.argv.map(arg => path.basename(arg)).join(' ').toLowerCase().indexOf('mocha') !== -1;
}