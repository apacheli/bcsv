# Binary CSV (`.bcsv`)

> [!WARNING]
> This format is not intended to used in production. It exists solely as a proof
> of concept in computer science.

It's like CSV but in binary.

- :x: Not readable by humans.
- :x: Difficult to edit with common text editors such as Notepad.
- :x: Relatively unpopular format.

## Example

A hexadecimal representation of Binary CSV sample data:

```
42 43 53 56 02 01 00 00 00 00 00 00 00 01 10 04 6E 61 6D 65 00 04 4A 6F 68 6E
```

```
[42 43 53 56]               # [BCSV File Signature]
[02]                        # [BCSV Version]
[01]                        # [HEADER_COUNT=1]
[00 00 00 00 00 00 00 01]   # [ROW_COUNT=1]
[10] [04] [6E 61 6D 65]     # [str_8] [len=4] ["name"]
[04] [4A 6F 68 6E]          # [len=4] ["John"]
```

## Reference

- BSCV supports a maximum of 255 headers.
- A header supports a maximum of 255 characters.

## Types

| Name    | Byte   |
| ------- | ------ |
| str_8   | `0x10` |
| str_16  | `0x11` |
| str_32  | `0x12` |
| str_64  | `0x13` |
| uint_8  | `0x20` |
| uint_16 | `0x21` |
| uint_32 | `0x22` |
| uint_64 | `0x23` |
| int_8   | `0x30` |
| int_16  | `0x31` |
| int_32  | `0x32` |
| int_64  | `0x33` |
| bool    | `0x40` |

### str Types (str_8, str_16, str_32, str_64)

Used to define strings. Each *str* type is used to define different maximum lengths.

- *str_8* uses 1 byte (0-255 characters)
- *str_16* uses 2 bytes (0-65,336 characters)
- *str_32* uses 4 bytes (0-4,294,967,296 characters)
- *str_64* uses 8 bytes (0-18,446,744,073,709,551,616 characters)

### uint Types (uint_8, uint_16, uint_32, uint_64)

Used to define unsigned integers.

- *uint_8* uses 1 byte (0-255)
- *uint_16* uses 2 bytes (0-65,336)
- *uint_32* uses 4 bytes (0-4,294,967,296)
- *uint_64* uses 8 bytes (0-18,446,744,073,709,551,616)

### int Types (int_8, int_16, int_32, int_64)

Used to define signed integers.

- *int_8* uses 1 byte (-128-127)
- *int_16* uses 2 bytes (-32,768-32,767)
- *int_32* uses 4 bytes (-2,147,483,648-2,147,483,647)
- *int_64* uses 8 bytes (-9,223,372,036,854,775,808-9,223,372,036,854,775,807)

### bool Type

Used to define a boolean.

- `0` is `false`
- `1` is `true`
