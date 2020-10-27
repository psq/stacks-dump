# stacks-dump

Dump information from `stacks-node` storage

### Usage
```
node report-pox-krypton.js /tmp/stacks-testnet-5c87e24790411516
```

or if `stacks-node` is compiled with `--feature tx-log`, to display transactions for each block:
```
cargo build --workspace  --features tx_log --bin stacks-node

node report-pox-krypton.js -t /tmp/stacks-testnet-5c87e24790411516
```
