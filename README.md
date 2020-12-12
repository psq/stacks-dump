# stacks-dump

Dump information from `stacks-node` storage

## Usage

Run the script using the current working directory for `stacks-node`, generally found in the `/tmp` folder unless specified via the config file.

### Default

```
node report /tmp/stacks-testnet-5c87e24790411516
```

### Options

#### Output stats as CSV
`-c` or `--csv` - display transactions in CSV format

```
node report -c /tmp/stacks-testnet-5c87e24790411516
```

#### Show transactions
`-t` or `--tx-log` - display transactions for each block (if `stacks-node` is compiled with `--features tx-log`)

```
cargo build --workspace  --features tx_log --bin stacks-node

node report -t /tmp/stacks-testnet-5c87e24790411516
```

#### Dump `xenon` instead of `krypton`
`-x` or `--xenon` - the internal structure for `xenon` requires this option

```
node report -x /tmp/stacks-testnet-5c87e24790411516
```
