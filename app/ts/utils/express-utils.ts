export function getNodeEnv(): string {
  return process.env.NODE_ENV || 'development';
}

export function printObject(obj: any): void {
  for (let property of Object.keys(obj)) {
    let value: string = obj[property];
    if (typeof value === 'object') {
      value = JSON.stringify(value, null, ' ');
    }
    console.log(`${property}: ${value}`);
  }
}