import * as minimist from 'minimist';

export let options: any = {};

export function parseOptions(): void {
  minimist(process.argv.slice(2));
}