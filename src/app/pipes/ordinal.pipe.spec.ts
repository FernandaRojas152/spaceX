import { OrdinalPipe } from './ordinal.pipe';

describe('OrdinalPipe', () => {
  const pipe = new OrdinalPipe();
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });
  it('should add "st" to 1 index in the array', () => {
    const result = pipe.transform(0);
    expect(result).toBe('1st');
  });

  it('should add "nd" to 2 index in the array', () => {
    const result = pipe.transform(1);
    expect(result).toBe('2nd');
  });

  it('should add "rd" to 3 index in the array', () => {
    const result = pipe.transform(2);
    expect(result).toBe('3rd');
  });

  it('should add "th" to 14 index in the array', () => {
    const result = pipe.transform(13);
    expect(result).toBe('14th');
  });

  it('should add "nd" to 22 index in the array', () => {
    const result = pipe.transform(21);
    expect(result).toBe('22nd');
  });
});
