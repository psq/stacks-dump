# stacks-dump

Dump information from `stacks-node` storage

## Usage

Run the script using the current working directory for `stacks-node`, generally found in the `/tmp` folder unless specified via the config file.

### Default

```
node report-pox-krypton.js /tmp/stacks-testnet-5c87e24790411516
```

### Options

`-t or --tx-log` - display transactions for each block (if `stacks-node` is compiled with `--feature tx-log`)

```
cargo build --workspace  --features tx_log --bin stacks-node

node report-pox-krypton.js -t /tmp/stacks-testnet-5c87e24790411516
```

`-c or --csv` - display transactions in CSV format

```
node report-pox-krypton.js -c /tmp/stacks-testnet-5c87e24790411516
```
