describe('1st tests', () => {
  it('true is true', () => expect(true).toEqual(true));
  it('null does not equal undefined', () => {
    expect(null).not.toEqual(undefined);
  });
});