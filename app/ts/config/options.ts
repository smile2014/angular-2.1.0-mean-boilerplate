import * as minimist from 'minimist';

export let options: any = {};

export function parseOptions(): void {
  const args: any = minimist(process.argv.slice(2));
}