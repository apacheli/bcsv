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

const BcsvType = {
  str_8: 0x10,
  str_16: 0x11,
  int_8: 0x20,
  int_16: 0x21,
};

class BSCVEncoder {
  encoder = new TextEncoder();
  rows = [];

  constructor(...headers) {
    this.headers = headers;
  }

  addRow(...values) {
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

          case BcsvType.int_8: {
            u8(value, arr);
            break;
          }

          case BcsvType.int_8: {
            u16(value, arr);
            break;
          }
        }
      }
    }

    return new Uint8Array(arr);
  }
}
