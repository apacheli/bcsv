# Binary CSV (`.bcsv`)

> [!WARNING]
> This format is not intended to used in production. It exists solely as a proof
> of concept in computer science.

It's like CSV but in binary.

- :x: Not readable by humans.
- :x: Difficult to edit with common text editors such as Notepad.
- :x: Relatively unpopular format.

## Types

| Name   | Byte   |
| ------ | ------ |
| str_8  | `0x10` |
| str_16 | `0x11` |
| int_8  | `0x20` |
| int_16 | `0x21` |

### str Types (str_8, str_16)

Used to define strings.

### int Types (int_8, int_16)

Used to define integers.

## Example

A hexadecimal representation of Binary CSV sample data:

```
42 43 53 56 02 01 00 00 00 00 00 00 00 01 10 04 6E 61 6D 65 00 04 4A 6F 68 6E
```

```
42 43 53 56               # BCSV File Signature
02                        # BCSV Version
01                        # HEADER_COUNT=1
00 00 00 00 00 00 00 01   # ROW_COUNT=1
10 04 6E 61 6D 65         # str_8 len=4 "name"
04 4A 6F 68 6E            # len=4 "John"
```

## Reference

- BSCV supports a maximum of 255 headers.
- A header supports a maximum of 255 characters.
