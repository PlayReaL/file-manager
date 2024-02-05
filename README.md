# file-manager

## Notes for work

All functions check if any destination files/paths exists, and fails if any.

Arguments with spaces in names can be passed inside double quotes.
rn "ab cc.txt" tt.txt

Functions commpress and decompress uses explicit file extension.
compress 1.txt files\1.br
decompress files\1.br 1.txt
