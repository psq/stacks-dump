# stacks-dump

Dump information from `stacks-node` storage

## Usage

### Default

```
node report-pox-krypton.js /tmp/stacks-testnet-5c87e24790411516
```

### Options

`-t` - display transactions for each block (if `stacks-node) is compiled with `--feature tx-log`

```
cargo build --workspace  --features tx_log --bin stacks-node

node report-pox-krypton.js -t /tmp/stacks-testnet-5c87e24790411516
```

`-csv` - display transactions in CSV format

```
node report-pox-krypton.js -csv /tmp/stacks-testnet-5c87e24790411516
```

