# stacks-dump

![Stacks Dump Logo](https://github.com/psq/stacks-dump/raw/master/stacks-dump-truck-dark.png)

Dump information from `stacks-node` storage for the [Stacks blockchain](https://github.com/blockstack/stacks-blockchain).

## Prerequisites

- Git distributed version control system
  (see [install page](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) for your OS)
- Node 14.x, or newer
  (older versions of NodeJS do not support the `import` syntax)
- Yarn package manager
  (use `npm install -g yarn`, the yarn command in the `cmdtest` package is not the right one)

## Installation

```bash
git clone git@github.com:psq/stacks-dump.git
cd stacks-dump
yarn
```

*Note: If you do not have SSH configured with git, then use the HTTPS link when cloning.*

### Using Docker

To build the docker image, run:

```bash
docker build . --tag blockdaemon/stacks-dump:latest
```

To use, make sure that the stacks data directory is mounted into the container:

```bash
docker run -v /tmp/stacks-testnet-5c87e24790411516:/data -ti stacks-dump:latest /data
```

## Usage

Run the script using the current working directory for `stacks-node`, generally found in the `/tmp` folder unless specified via the config file.

In the commands below, an example folder of `/tmp/stacks-testnet-5c87e24790411516` will be used.

### Default

By default, the output will contain the block details, miner statistics, and total statistics.

```bash
node report /tmp/stacks-testnet-5c87e24790411516
```

### Options

There are several options to modify the behavior and output of stacks-dump, and multiple options can be combined depending on your use case.

#### Output stats sorted alpha

`-a` or `--alpha` - sort by STX address

```bash
node report -a /tmp/stacks-testnet-5c87e24790411516
```

#### Skip output of block data

`-b` or `--no-blocks` - do not display individual block data

```bash
node report -b /tmp/stacks-testnet-5c87e24790411516
```

#### Output stats in CSV format

`-c` or `--csv` - display miner statistics in CSV format

```bash
node report -c /tmp/stacks-testnet-5c87e24790411516
```

*Note: only shows miner statistics, implies `-b` and `-g`*

#### Output block commit distances

`-d` or `--distances` - display block commit distance to latest btc block

```bash
node report -d /tmp/stacks-testnet-5c87e24790411516
```

#### End block

`-e BURN_BLOCK_HEIGHT` or `--end-block BURN_BLOCK_HEIGHT` - rather than dump all blocks, will stop at `BURN_BLOCK_HEIGHT - 1`

```bash
node report -e 667300 /tmp/stacks-testnet-5c87e24790411516
```

#### Skip output of totals

`-g` or `--no-totals` - do not display total statistics

```bash
node report -g /tmp/stacks-testnet-5c87e24790411516
```

#### Dump `krypton` instead of `mainnet`

`-k` or `--krypton` - the internal structure for `krypton` requires this option

```bash
node report -k /tmp/stacks-testnet-5c87e24790411516
```

#### Skip output of stacks-dump logo

`-l` or `--no-logo` - do not display the stacks-dump logo

```bash
node report -l /tmp/stacks-testnet-5c87e24790411516
```

#### Dump `mainnet` data, now the default if not included

`-m` or `--mainnet` - the internal structure for `mainnet` requires this option

```bash
node report -m /tmp/stacks-testnet-5c87e24790411516
```

#### List all known stacks-nodes

`-n` or `--nodes` - display list of nodes

```bash
node report -n /tmp/stacks-testnet-5c87e24790411516
```

#### Dump `mocknet` instead of `mainnet`

`-o` or `--mocknet` - the internal structure for `mocknet` requires this option

```bash
node report -o /tmp/stacks-testnet-5c87e24790411516
```

#### Show paths

`-p` or `--show-paths` - show the paths to the burnchain, sortition, vm, and staging databases

```bash
node report -p /tmp/stacks-testnet-5c87e24790411516
```

#### Show leader key registrations

`-r` or `--key-registration` - show leader key registrations

```bash
node report -r /tmp/stacks-testnet-5c87e24790411516
```

#### Show all miners
`--show-all-miners` - show all miners rather than only those who won a reward

#### Start block

`-s BURN_BLOCK_HEIGHT` or `--start-block BURN_BLOCK_HEIGHT` - rather than dump all blocks, will start at `BURN_BLOCK_HEIGHT`

```bash
node report -s 665250 /tmp/stacks-testnet-5c87e24790411516
```

#### Show transactions

`-t` or `--tx-log` - display transactions for each block (if `stacks-node` is compiled with `--features tx_log`)

```bash
cargo build --workspace  --features tx_log --bin stacks-node

node report -t /tmp/stacks-testnet-5c87e24790411516
```

#### Dump `xenon` instead of `mainnet`

`-x` or `--xenon` - the internal structure for `xenon` requires this option

```bash
node report -x /tmp/stacks-testnet-5c87e24790411516
```

## Block information

Here's an exerpt from the log

```none
666492 1 666491 331> 2,466.40 796,802 br22 s:372efd817c p:37918dba03 c:9540306731 i:8c1bceab65 b:000000000000000000094fa90 @+ [e165a5521a,fc9efa1345,5fbc3c4fbd,461b0ed448,2045ac7b9c,589d5f2ec3,24936e221d,c1d247ce0f,53e1e56919,859c1ae7a7,ba9a5a8ff7,45d1e8b59e] [10.0]SP25Y6NQXB [12.6]SP32SQ2729 [2.5]SP270Y0ZEB [2.5]SP4F3EX8B7 [2.8]SP3F0CDFN2 [25.1]SP1RJH1641 [3.7]SPY1PP2KZ6 [31.4]SP137NZXD0*[9.4]SP334VW9T9 
666493 1 666492 332> 2,466.40 946,802 br22 s:9c996f05a4 p:372efd817c c:fa02bfafe3 i:3e89a91656 b:000000000000000000077d8bb @+ [b9c9963e2c,0cbfddb722,d2b5a98101,15ecacc154,b05e520101,5b76498b68,dae355b11f,a742702c09,5c189343c0,b0363a71db,c03cd8df2a,33ed0f5b05,ce4c046ed2,8d71c99955,a0fd611841,2822effe34,d7e97e28d6,cabd74ccb8,09722ba9b3,c87e8040ab,784bf6f6f0,be1e106b10,0d07dc3d66,3bf64e5df9,5fde28a809,c0ba62cf56,cfb2b86c05,5feac45aac,0c9cc378c2,4c456e8e01] [10.6]SP32SQ2729 [15.8]SP3S9C931D [2.1]SP270Y0ZEB [2.1]SP4F3EX8B7 [2.4]SP3F0CDFN2 [21.1]SP1RJH1641 [26.4]SP137NZXD0*[3.1]SPY1PP2KZ6 [7.9]SP334VW9T9 [8.4]SP25Y6NQXB 
666494 1 666493 333> 2,466.40 981,802 br22 s:9ab9e0f400 p:9c996f05a4 c:e8f489ea44 i:9ca751586b b:0000000000000000000884ff9 @@ [ce6cfffe98,6800b32da4,f162a5d633,aac2b9891e,8dcf07b80f,8023578292,b55b9e9a0e,7df0552fdc,8ec83386f7,4c451ea5ed,5dbe98f10e,7127ec4717,a26cc7794f,f68f5a86f3,dd800f7158,2b32868d86,4eea54c511,ccd4622880,f248ecea02,bc74b31beb,34a5c0c5ac,0ce4c102e9,bf09d4d5c9,cfe5c93658,03a79973fb,56371b357d,084aa20561,5d68099a09,4a2dee75cf,82362793e7,8c0ed0f7bc,94035f48df,b06cc67c99,9cc5456dad,15e772717c,c2bdb31f5a,b48694139b,5289251255,8d8a7837a9,7f365653c0] [10.2]SP32SQ2729 [15.3]SP3S9C931D [2.0]SP270Y0ZEB [2.0]SP4F3EX8B7 [2.3]SP3F0CDFN2*[20.4]SP1RJH1641 [25.5]SP137NZXD0 [3.0]SPY1PP2KZ6 [3.6]SP1NQA8H6P [7.6]SP334VW9T9 [8.1]SP25Y6NQXB 
666495 2 666493 333  2,466.40 400,000 br28 s:e9f6d32507 p:9c996f05a4 c:101f15c6d4 i:f46bb19d8d b:00000000000000000004b4d75    [5a18c106ea,4c451ea5ed,2b32868d86,4eea54c511,ccd4622880,34a5c0c5ac,c2bdb31f5a,b48694139b,5289251255,7f365653c0,74c9631015,d424fb3477,fb2dd21c6a,8023578292,8dcf07b80f,6800b32da4] [18.8]SP334VW9T9 [5.0]SP270Y0ZEB*[5.0]SP4F3EX8B7 [62.5]SP137NZXD0 [8.8]SP1NQA8H6P 
666496 57 666439   731,802   - - -  -     [10.2]SP334VW9T9 [10.9]SP25Y6NQXB [2.7]SP270Y0ZEB [2.7]SP4F3EX8B7*[27.3]SP1RJH1641 [3.1]SP3F0CDFN2 [34.2]SP137NZXD0 [4.0]SPY1PP2KZ6 [4.8]SP1NQA8H6P 
666497 3 666494 334> 2,466.40 881,802 br22 s:f0d28b0a26 p:9ab9e0f400 c:d5372711df i:1af732f802 b:00000000000000000009b2bd6    [dcf8834be3,bebc074c3a,f59d9cea1d,b34c710065,f3a4b71002,303995926d,fb2dd21c6a,180a112fbb,35611f10c0,d424fb3477] [17.0]SP3S9C931D [2.3]SP270Y0ZEB [2.3]SP4F3EX8B7 [2.6]SP3F0CDFN2 [22.7]SP1RJH1641 [28.4]SP137NZXD0 [3.3]SPY1PP2KZ6 [4.0]SP1NQA8H6P [8.5]SP334VW9T9*[9.1]SP25Y6NQXB 
```

Looking at the second line, value by value

#### → 666493

the btc block height

#### → 1

the distance from parent block as specified by the miner

#### → 666492

the height of the parent btc block that contains the parent stacks block

#### → 332>

the stacks block height, if `>` is added, this stacks block is on the canonical fork, or the fork with the most blocks

#### → 2,466.40

the block reward, in STX

#### → 946,802

the total amount of satoshiss committed by miners which commit was accepted (there are many commits that get rejected because the commit did not go into the intended btc block)

#### → br22

the branch name (starts with `br1`, helps track possibly long forks)

#### → s:9c996f05a4

the hash of the stacks block (first 10 characters, to save space, usually enough to make it unique, but not directly usable in [the Stacks Explorer](https://explorer.stacks.co/) (hint, hint!), btc hash uses 20 because the current difficulty will require most leading digits (hexgits anyone?) to be zeros)

#### → p:372efd817c

the hash of the parent stacks block

#### → c:fa02bfafe3

the consensus block hash (this is guaranteed to be unique, only helpful to devs)

#### → i:3e89a91656

the index block hash (this is the hash of the block hash and consensus hash of the burn block that selected it, and is guaranteed to be globally unique (across all Stacks forks and across all PoX forks). index_block_hash is the block hash fed into the MARF index.  This is only helpful to devs)

#### → b:000000000000000000077d8bb

the hash of the btc block

#### → @+

- `  `: this block is not a child of the previous block
- `@@`: this block is a child of the previous block
- `@+`: this block is a child of the previous block, by the same miner

#### → [b9c9963e2c,0cbfddb722,d2b5a98101,15ecacc154,b05e520101,5b76498b68,dae355b11f,a742702c09,5c189343c0,b0363a71db,c03cd8df2a,33ed0f5b05,ce4c046ed2,8d71c99955,a0fd611841,2822effe34,d7e97e28d6,cabd74ccb8,09722ba9b3,c87e8040ab,784bf6f6f0,be1e10

6b10,0d07dc3d66,3bf64e5df9,5fde28a809,c0ba62cf56,cfb2b86c05,5feac45aac,0c9cc378c2,4c456e8e01]
the transaction hashes included in the block (using `-t` flag)

#### → [10.6]SP32SQ2729 [15.8]SP3S9C931D [2.1]SP270Y0ZEB [2.1]SP4F3EX8B7 [2.4]SP3F0CDFN2 [21.1]SP1RJH1641 [26.4]SP137NZXD0*[3.1]SPY1PP2KZ6 [7.9]SP334VW9T9 [8.4]SP25Y6NQXB

the list of miner with an accepted commit, number between square bracket is the raw probability of winning (excluding 6 block median smoothing), followed by the first 10 characters of the STX address of the miner, followed by either ` ` or `*`.  A `*` shows the miner that won the block.

### Notes

you can see that there are 2 blocks for Stacks block 333, at btc block `666494` and `666495`, both based on the same parent.  As the miners subsequently chose to build from `666494`, the block from `666495` gets orphaned, and will not receive the coinbase reward.

block `666496` contains an incorrect block.  That miner seems to be mining its own fork, and using a parent far back into the past (`666439`), and will never get a reward, most likely due to a miner misconfiguration, or possibly a bug.

a row like:

```none
666503 ? undefined   0   - - -  -
```

shows that there were no valid miner commit in the btc block, most likely because the block too soon after the previous btc block

## Support for older versions of Krypton

i.e. for version 24.0.x.x or 23.x.x.x, use `report-24.0.x.x` instead of `report`.  This will become obsolete very soon, but will be useful for some running the mining challenge on krypton

Note: one way to tell you need this version is if you get an error with `no such table: staging_blocks`
