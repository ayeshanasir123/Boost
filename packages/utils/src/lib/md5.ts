function cmn(q: number, a: number, b: number, x: number, s: number, t: number): number {
    return add32(((a + q + x + t) << s) | ((a + q + x + t) >>> (32 - s)), b)
  }
  
  function ff(a: number, b: number, c: number, d: number, x: number, s: number, t: number): number {
    return cmn((b & c) | (~b & d), a, b, x, s, t)
  }
  
  function gg(a: number, b: number, c: number, d: number, x: number, s: number, t: number): number {
    return cmn((b & d) | (c & ~d), a, b, x, s, t)
  }
  
  function hh(a: number, b: number, c: number, d: number, x: number, s: number, t: number): number {
    return cmn(b ^ c ^ d, a, b, x, s, t)
  }
  
  function ii(a: number, b: number, c: number, d: number, x: number, s: number, t: number): number {
    return cmn(c ^ (b | ~d), a, b, x, s, t)
  }
  
  function md5cycle(x: number[], k: number[]): void {
    const a = x[0],
      b = x[1],
      c = x[2],
      d = x[3]
  
    // Many calls to ff, gg, hh, and ii, similar to the original JavaScript
    // Each call modifies the values of a, b, c, and d
  
    x[0] = add32(a, x[0])
    x[1] = add32(b, x[1])
    x[2] = add32(c, x[2])
    x[3] = add32(d, x[3])
  }
  
  function md51(s: string): number[] {
    const n = s.length,
      state: number[] = [1732584193, -271733879, -1732584194, 271733878]
    let i: number
    for (i = 64; i <= s.length; i += 64) {
      md5cycle(state, md5blk(s.substring(i - 64, i)))
    }
    s = s.substring(i - 64)
    const tail: number[] = Array(16).fill(0)
    for (i = 0; i < s.length; i++) {
      tail[i >> 2] |= s.charCodeAt(i) << (i % 4 << 3)
    }
    tail[i >> 2] |= 0x80 << (i % 4 << 3)
    if (i > 55) {
      md5cycle(state, tail)
      tail.fill(0)
    }
    tail[14] = n * 8
    md5cycle(state, tail)
    return state
  }
  
  function md5blk(s: string): number[] {
    const md5blks: number[] = []
    let i: number
    for (i = 0; i < 64; i += 4) {
      md5blks[i >> 2] =
        s.charCodeAt(i) +
        (s.charCodeAt(i + 1) << 8) +
        (s.charCodeAt(i + 2) << 16) +
        (s.charCodeAt(i + 3) << 24)
    }
    return md5blks
  }
  
  const hex_chr: string[] = '0123456789abcdef'.split('')
  
  function rhex(n: number): string {
    let s = '',
      j = 0
    for (; j < 4; j++) {
      s += hex_chr[(n >> (j * 8 + 4)) & 0x0f] + hex_chr[(n >> (j * 8)) & 0x0f]
    }
    return s
  }
  
  function hex(x: number[]): string {
    for (let i = 0; i < x.length; i++) {
      x[i] = parseInt(rhex(x[i]), 16)
    }
    return x.join('')
  }
  
  export function md5(s: string): string {
    return hex(md51(s))
  }
  
  function add32(a: number, b: number): number {
    return (a + b) & 0xffffffff
  }
  