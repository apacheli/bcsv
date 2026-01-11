const u64 = (int, arr = []) => {
  for (let i = 7; i >= 0; i--) {
    arr.push(Number(int >> BigInt(i * 8) & 255n));
  }
  return arr;
};

const u32 = (int, arr = []) => {
  for (let i = 3; i >= 0; i--) {
    arr.push(int >> (i * 8) & 255);
  }
  return arr;
};

const u16 = (int, arr = []) => {
  for (let i = 1; i >= 0; i--) {
    arr.push(int >> (i * 8) & 255);
  }
  return arr;
};

const u8 = (int, arr = []) => {
  arr.push(int & 255);
  return arr;
};

// deno-fmt-ignore
const BcsvType = {
  str_8:   0x10,
  str_16:  0x11,
  str_32:  0x12,
  str_64:  0x13,

  uint_8:  0x20,
  uint_16: 0x21,
  uint_32: 0x22,
  uint_64: 0x23,

  int_8:   0x30,
  int_16:  0x31,
  int_32:  0x32,
  int_64:  0x33,
};

class BSCVEncoder {
  encoder = new TextEncoder();
  rows = [];

  constructor(headers) {
    this.headers = headers;
  }

  addRow(values) {
    this.rows.push(values);
  }

  serialize() {
    // deno-fmt-ignore
    const arr = [
      0x42, 0x43, 0x53, 0x56,
      0x02,
      this.headers.length,
    ];
    u64(BigInt(this.rows.length), arr);

    for (const header of this.headers) {
      arr.push(
        header.type,
        header.label.length,
        ...this.encoder.encode(header.label),
      );
    }

    for (const row of this.rows) {
      for (let i = 0; i < this.headers.length; i++) {
        const header = this.headers[i];
        const value = row[i];

        switch (header.type) {
          case BcsvType.str_8: {
            const e = this.encoder.encode(value);
            u8(e.byteLength, arr);
            arr.push(...e);
            break;
          }

          case BcsvType.str_16: {
            const e = this.encoder.encode(value);
            u16(e.byteLength, arr);
            arr.push(...e);
            break;
          }

          case BcsvType.str_32: {
            const e = this.encoder.encode(value);
            u32(e.byteLength, arr);
            arr.push(...e);
            break;
          }

          case BcsvType.str_64: {
            const e = this.encoder.encode(value);
            u64(e.byteLength, arr);
            arr.push(...e);
            break;
          }

          case BcsvType.uint_8:
          case BcsvType.int_8: {
            u8(value, arr);
            break;
          }

          case BcsvType.uint_16:
          case BcsvType.int_16: {
            u16(value, arr);
            break;
          }

          case BcsvType.uint_32:
          case BcsvType.int_32: {
            u32(value, arr);
            break;
          }

          case BcsvType.uint_64:
          case BcsvType.int_64: {
            u32(value, arr);
            break;
          }
        }
      }
    }

    return new Uint8Array(arr);
  }
}

export {
  BcsvType,
  BSCVEncoder,
};
