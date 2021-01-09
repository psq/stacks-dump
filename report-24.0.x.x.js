// const Database = require('better-sqlite3')
import sha512 from 'js-sha512'
import Database from 'better-sqlite3'
import stacks_transactions from '@blockstack/stacks-transactions'
const { getAddressFromPublicKey, TransactionVersion } = stacks_transactions
import secp256k1 from 'secp256k1'
import c32 from 'c32check'

function numberWithCommas(x) {
    return x.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

function adjustSpace(miner_key) {
  if (miner_key.length + c32.c32ToB58(miner_key).length === 74) {
    return ' '
  }
  return ''
}


// const root = '/Users/psq/src/perso/stacks-blockchain/.stack.1'
// const root = '/Users/psq/src/perso/stacks-blockchain/.stack.2' // week 27
// const root = '/Users/psq/src/perso/stacks-blockchain/.stack.3' // week 28
// const root = '/Users/psq/src/perso/stacks-blockchain/.stack.4'  // week29 1st run
// const root = '/Users/psq/src/perso/stacks-blockchain/.stack.5'  // week29 2nd run
// const root = '/Users/psq/src/perso/stacks-blockchain/.stack.phillip'
// const root = '/Users/psq/src/perso/stacks-blockchain/.stack'
// const root = '/Users/psq/src/perso/stacks-blockchain/.stackf'
// const root = '/Users/psq/src/perso/stacks-blockchain/.stackm'
// const root = '/Users/psq/src/perso/stacks-blockchain/.stackmp'

// const root = '/Users/psq/src/perso/stacks-blockchain/'
// const root = '/tmp/'
const root = ''

// TODO(psq): no longer used
// const burnchain_db_path = 'burnchain/db/bitcoin/regtest/sortition.db/data.db'
// CREATE TABLE burnchain_db_block_headers (
//     block_height INTEGER NOT NULL,
//     block_hash TEXT UNIQUE NOT NULL,
//     parent_block_hash TEXT NOT NULL,
//     num_txs INTEGER NOT NULL,
//     timestamp INTEGER NOT NULL,

//     PRIMARY KEY(block_hash)
// );
// CREATE TABLE burnchain_db_block_ops (
//     block_hash TEXT NOT NULL,
//     op TEXT NOT NULL,

//     FOREIGN KEY(block_hash) REFERENCES burnchain_db_block_headers(block_hash)
// );



// CREATE TABLE marf_data (
//    block_id INTEGER PRIMARY KEY, 
//    block_hash TEXT UNIQUE NOT NULL,
//    data BLOB NOT NULL,
//    unconfirmed INTEGER NOT NULL
// );
// CREATE INDEX block_hash_marf_data ON marf_data(block_hash);
// CREATE INDEX unconfirmed_marf_data ON marf_data(unconfirmed);
// CREATE TABLE mined_blocks (
//    block_id INTEGER PRIMARY KEY, 
//    block_hash TEXT UNIQUE NOT NULL,
//    data BLOB NOT NULL
// );
// CREATE INDEX block_hash_mined_blocks ON mined_blocks(block_hash);
// CREATE TABLE block_extension_locks (block_hash TEXT PRIMARY KEY);
// CREATE TABLE snapshots(
//         block_height INTEGER NOT NULL,
//         burn_header_hash TEXT NOT NULL,
//         sortition_id TEXT UNIQUE NOT NULL,
//         burn_header_timestamp INT NOT NULL,
//         burn_header_received_timestamp INT NOT NULL,
//         parent_burn_header_hash TEXT NOT NULL,
//         consensus_hash TEXT UNIQUE NOT NULL,
//         ops_hash TEXT NOT NULL,
//         total_burn TEXT NOT NULL,
//         sortition INTEGER NOT NULL,
//         sortition_hash TEXT NOT NULL,
//         winning_block_txid TEXT NOT NULL,
//         winning_stacks_block_hash TEXT NOT NULL,
//         index_root TEXT UNIQUE NOT NULL,

//         num_sortitions INTEGER NOT NULL,

//         stacks_block_accepted INTEGER NOT NULL,        -- set to 1 if we fetched and processed this Stacks block
//         stacks_block_height INTEGER NOT NULL,           -- set to the height of the stacks block, once it's processed
//         arrival_index INTEGER NOT NULL,                 -- (global) order in which this Stacks block was processed

//         canonical_stacks_tip_height INTEGER NOT NULL,   -- height of highest known Stacks fork in this burn chain fork
//         canonical_stacks_tip_hash TEXT NOT NULL,        -- hash of highest known Stacks fork's tip block in this burn chain fork
//         canonical_stacks_tip_consensus_hash TEXT NOT NULL,   -- burn hash of highest known Stacks fork's tip block in this burn chain fork

//         pox_valid INTEGER NOT NULL,

//         PRIMARY KEY(sortition_id)
//     );
// CREATE UNIQUE INDEX snapshots_block_hashes ON snapshots(block_height,index_root,winning_stacks_block_hash);
// CREATE TABLE snapshot_transition_ops(
//       sortition_id TEXT PRIMARY KEY,
//       accepted_ops TEXT NOT NULL,
//       consumed_keys TEXT NOT NULL
//     );
// CREATE TABLE leader_keys(
//         txid TEXT NOT NULL,
//         vtxindex INTEGER NOT NULL,
//         block_height INTEGER NOT NULL,
//         burn_header_hash TEXT NOT NULL,
//         sortition_id TEXT NOT NULL,
        
//         consensus_hash TEXT NOT NULL,
//         public_key TEXT NOT NULL,
//         memo TEXT,
//         address TEXT NOT NULL,

//         PRIMARY KEY(txid,sortition_id),
//         FOREIGN KEY(sortition_id) REFERENCES snapshots(sortition_id)
//     );
// CREATE TABLE block_commits(
//         txid TEXT NOT NULL,
//         vtxindex INTEGER NOT NULL,
//         block_height INTEGER NOT NULL,
//         burn_header_hash TEXT NOT NULL,
//         sortition_id TEXT NOT NULL,

//         block_header_hash TEXT NOT NULL,
//         new_seed TEXT NOT NULL,
//         parent_block_ptr INTEGER NOT NULL,
//         parent_vtxindex INTEGER NOT NULL,
//         key_block_ptr INTEGER NOT NULL,
//         key_vtxindex INTEGER NOT NULL,
//         memo TEXT,
//         commit_outs TEXT,
//         burn_fee TEXT NOT NULL,     -- use text to encode really big numbers
//         input TEXT NOT NULL,        -- must match `address` in leader_keys

//         PRIMARY KEY(txid,sortition_id),
//         FOREIGN KEY(sortition_id) REFERENCES snapshots(sortition_id)
//     );
// CREATE TABLE user_burn_support(
//         txid TEXT NOT NULL,
//         vtxindex INTEGER NOT NULL,
//         block_height INTEGER NOT NULL,
//         burn_header_hash TEXT NOT NULL,
//         sortition_id TEXT NOT NULL,

//         address TEXT NOT NULL,
//         consensus_hash TEXT NOT NULL,
//         public_key TEXT NOT NULL,
//         key_block_ptr INTEGER NOT NULL,
//         key_vtxindex INTEGER NOT NULL,
//         block_header_hash_160 TEXT NOT NULL,

//         burn_fee TEXT NOT NULL,

//         PRIMARY KEY(txid,sortition_id),
//         FOREIGN KEY(sortition_id) REFERENCES snapshots(sortition_id)
//     );
// CREATE TABLE canonical_accepted_stacks_blocks(
//         tip_consensus_hash TEXT NOT NULL,
//         consensus_hash TEXT NOT NULL,
//         stacks_block_hash TEXT NOT NULL,
//         block_height INTEGER NOT NULL,
//         PRIMARY KEY(consensus_hash, stacks_block_hash)
//     );
// CREATE TABLE db_config(
//         version TEXT NOT NULL
//     );
// CREATE TABLE __fork_storage(
//             value_hash TEXT NOT NULL,
//             value TEXT NOT NULL,

//             PRIMARY KEY(value_hash)
//         );

// CREATE TABLE marf_data (
//    block_id INTEGER PRIMARY KEY, 
//    block_hash TEXT UNIQUE NOT NULL,
//    data BLOB NOT NULL,
//    unconfirmed INTEGER NOT NULL
// );
// CREATE INDEX block_hash_marf_data ON marf_data(block_hash);
// CREATE INDEX unconfirmed_marf_data ON marf_data(unconfirmed);
// CREATE TABLE mined_blocks (
//    block_id INTEGER PRIMARY KEY, 
//    block_hash TEXT UNIQUE NOT NULL,
//    data BLOB NOT NULL
// );
// CREATE INDEX block_hash_mined_blocks ON mined_blocks(block_hash);
// CREATE TABLE block_extension_locks (block_hash TEXT PRIMARY KEY);
// CREATE TABLE block_headers(
//         version INTEGER NOT NULL,
//         total_burn TEXT NOT NULL,       -- converted to/from u64
//         total_work TEXT NOT NULL,       -- converted to/from u64 -- TODO: rename to total_length
//         proof TEXT NOT NULL,
//         parent_block TEXT NOT NULL,             -- hash of parent Stacks block
//         parent_microblock TEXT NOT NULL,
//         parent_microblock_sequence INTEGER NOT NULL,
//         tx_merkle_root TEXT NOT NULL,
//         state_index_root TEXT NOT NULL,
//         microblock_pubkey_hash TEXT NOT NULL,
        
//         block_hash TEXT NOT NULL,                   -- NOTE: this is *not* unique, since two burn chain forks can commit to the same Stacks block.
//         index_block_hash TEXT UNIQUE NOT NULL,      -- NOTE: this is the hash of the block hash and consensus hash of the burn block that selected it, 
//                                                     -- and is guaranteed to be globally unique (across all Stacks forks and across all PoX forks).
//                                                     -- index_block_hash is the block hash fed into the MARF index.

//         -- internal use only
//         block_height INTEGER NOT NULL,
//         index_root TEXT NOT NULL,                    -- root hash of the internal, not-consensus-critical MARF that allows us to track chainstate /fork metadata
//         consensus_hash TEXT UNIQUE NOT NULL,         -- all consensus hashes are guaranteed to be unique
//         burn_header_hash TEXT NOT NULL,              -- burn header hash corresponding to the consensus hash (NOT guaranteed to be unique, since we can have 2+ blocks per burn block if there's a PoX fork)
//         burn_header_height INT NOT NULL,             -- height of the burnchain block header that generated this consensus hash
//         burn_header_timestamp INT NOT NULL,          -- timestamp from burnchain block header that generated this consensus hash
//         total_liquid_ustx TEXT NOT NULL,             -- string representation of the u128 that encodes the total number of liquid uSTX (i.e. that exist and aren't locked in the .lockup contract)
//         parent_block_id TEXT NOT NULL,        -- NOTE: this is the parent index_block_hash

//         cost TEXT NOT NULL,

//         PRIMARY KEY(consensus_hash,block_hash)
//     );
// CREATE INDEX block_headers_hash_index ON block_headers(block_hash,block_height);
// CREATE TABLE payments(
//         address TEXT NOT NULL,              -- miner that produced this block and microblock stream
//         block_hash TEXT NOT NULL,
//         consensus_hash TEXT NOT NULL,
//         parent_block_hash TEXT NOT NULL,
//         parent_consensus_hash TEXT NOT NULL,
//         coinbase TEXT NOT NULL,             -- encodes u128
//         tx_fees_anchored TEXT NOT NULL,     -- encodes u128
//         tx_fees_streamed TEXT NOT NULL,     -- encodes u128
//         stx_burns TEXT NOT NULL,            -- encodes u128
//         burnchain_commit_burn INT NOT NULL,
//         burnchain_sortition_burn INT NOT NULL,
//         fill TEXT NOT NULL,                 -- encodes u64 
//         miner INT NOT NULL,
        
//         -- internal use
//         stacks_block_height INTEGER NOT NULL,
//         index_block_hash TEXT NOT NULL,     -- NOTE: can't enforce UNIQUE here, because there will be multiple entries per block
//         vtxindex INT NOT NULL               -- user burn support vtxindex
//     );
// CREATE TABLE user_supporters(
//         address TEXT NOT NULL,
//         support_burn INT NOT NULL,
//         block_hash TEXT NOT NULL,
//         consensus_hash TEXT NOT NULL,

//         PRIMARY KEY(address,block_hash,consensus_hash)
//     );
// CREATE TABLE db_config(
//         version TEXT NOT NULL,
//         mainnet INTEGER NOT NULL,
//         chain_id INTEGER NOT NULL
//     );
// CREATE TABLE __fork_storage(
//             value_hash TEXT NOT NULL,
//             value TEXT NOT NULL,

//             PRIMARY KEY(value_hash)
//         );

// CREATE TABLE transactions(
//         id INTEGER PRIMARY KEY,
//         txid TEXT NOT NULL,
//         index_block_hash TEXT NOT NULL,
//         tx_hex TEXT NOT NULL,
//         result TEXT NOT NULL,
//         UNIQUE (txid,index_block_hash)
//     );


// this was merged into vm_db_path (?)
// const headers_db_path = 'chainstate/chain-00000080-testnet/vm/headers.db'


// CREATE TABLE staging_microblocks(anchored_block_hash TEXT NOT NULL,     -- this is the hash of the parent anchored block
//                                      consensus_hash TEXT NOT NULL,        -- this is the hash of the burn chain block that holds the parent anchored block's block-commit
//                                      index_block_hash TEXT NOT NULL,        -- this is the anchored block's index hash
//                                      microblock_hash TEXT NOT NULL,
//                                      sequence INT NOT NULL,
//                                      processed INT NOT NULL,
//                                      orphaned INT NOT NULL,
//                                      PRIMARY KEY(anchored_block_hash,consensus_hash,microblock_hash)
//     );
// CREATE TABLE staging_microblocks_data(block_hash TEXT NOT NULL,
//                                           block_data BLOB NOT NULL,
//                                           PRIMARY KEY(block_hash)
//     );
// CREATE TABLE staging_blocks(anchored_block_hash TEXT NOT NULL,
//                                 parent_anchored_block_hash TEXT NOT NULL,
//                                 consensus_hash TEXT NOT NULL,
//      -- parent_consensus_hash is the consensus hash of the parent sortition of the sortition that chose this block
//                                 parent_consensus_hash TEXT NOT NULL,
//                                 parent_microblock_hash TEXT NOT NULL,
//                                 parent_microblock_seq INT NOT NULL,
//                                 microblock_pubkey_hash TEXT NOT NULL,
//                                 height INT NOT NULL,
//                                 attachable INT NOT NULL,           -- set to 1 if this block's parent is processed; 0 if not
//                                 orphaned INT NOT NULL,              -- set to 1 if this block can never be attached
//                                 processed INT NOT NULL,
//                                 commit_burn INT NOT NULL,
//                                 sortition_burn INT NOT NULL,
//                                 index_block_hash TEXT NOT NULL,        -- used internally; hash of burn header and block header
//                                 PRIMARY KEY(anchored_block_hash,consensus_hash)
//     );
// CREATE TABLE staging_user_burn_support(anchored_block_hash TEXT NOT NULL,
//                                            consensus_hash TEXT NOT NULL,
//                                            address TEXT NOT NULL,
//                                            burn_amount INT NOT NULL,
//                                            vtxindex INT NOT NULL
//     );

// const data_root_path = `${root}${process.argv[3] || process.argv[2]}`
// const use_txs = process.argv[2] === '-t'

let target = 'krypton'
let use_txs = false
let use_csv = false
let show_distances = false
let start_block = 0
let end_block = 2000000000 // probably high enough
let data_root_path = ''
const my_args = process.argv.slice(2)
// console.log('my_args: ', my_args);

// iterate through included options
for (let j = 0; j < my_args.length; j++) {
  // console.log(j, ': ', my_args[j])
  switch (my_args[j]) {
    case '-c':
    case '--csv':
      use_csv = true
      break
    case '-d':
    case '--distances':
      show_distances = true
      break
    case '-t':
    case '--tx-log':
      use_txs = true
      break
    case '-x':
    case '--xenon':
      target = 'xenon'
      break
    case '--start-block':
    case '-s':
      j++
      start_block = parseInt(my_args[j])
      break
    case '--end-block':
    case '-e':
      j++
      end_block = parseInt(my_args[j])
      break
    default:
      // assuming last argument is root path
      data_root_path = `${root}${my_args[j]}`
      break
  }
}
// console.log('data root path: ', data_root_path)

const burnchain_db_path = `burnchain/db/bitcoin/${target === 'xenon' ? 'testnet' : 'regtest'}/burnchain.db`
const sortition_db_path = `burnchain/db/bitcoin/${target === 'xenon' ? 'testnet' : 'regtest'}/sortition.db/marf`
const vm_db_path = "chainstate/chain-00000080-testnet/vm/index"
const staging_db_path = "chainstate/chain-00000080-testnet/blocks/staging.db";

const burnchain_db = new Database(`${data_root_path}/${burnchain_db_path}`, {
  readonly: true,
  fileMustExist: true,
})

const sortition_db = new Database(`${data_root_path}/${sortition_db_path}`, {
  readonly: true,
  fileMustExist: true,
})

// const headers_db = new Database(`${data_root_path}/${headers_db_path}`, {
const headers_db = new Database(`${data_root_path}/${vm_db_path}`, {
  readonly: true,
  fileMustExist: true,
})

const staging_db = new Database(`${data_root_path}/${staging_db_path}`, {
  readonly: true,
  fileMustExist: true,
})

// burnchain queries
const stmt_all_burnchain_headers = burnchain_db.prepare('SELECT * FROM burnchain_db_block_headers order by block_height asc')
const stmt_all_burnchain_ops = burnchain_db.prepare('SELECT * FROM burnchain_db_block_ops')

// sortition queries
const stmt_all_blocks = sortition_db.prepare('SELECT * FROM snapshots order by block_height desc')
const stmt_all_block_commits = sortition_db.prepare('SELECT * FROM block_commits ')
const stmt_all_leader_keys = sortition_db.prepare('SELECT * FROM leader_keys')

// header queries
const stmt_all_payments = headers_db.prepare('SELECT * FROM payments')
const stmt_all_block_headers = headers_db.prepare('SELECT * FROM block_headers')

// staging queries
const stmt_all_staging_blocks = staging_db.prepare('SELECT * FROM staging_blocks')

// transactions query
const stmt_all_transactions = use_txs ? headers_db.prepare('SELECT * FROM transactions') : null

let transaction_count = 0
const burn_blocks_by_height = []
const burn_blocks_by_burn_header_hash = {}
const burn_blocks_by_consensus_hash = {}
const stacks_blocks_by_stacks_block_hash = {}
const transactions_by_stacks_block_id = {}
const burnchain_blocks_by_burn_hash = {}
const burnchain_ops_by_burn_hash = {}

const block_commits_parent_distances = []
let block_commits_parent_distance_count = 0

const burn_orphans = []
const miners = {}
let win_total = 0
let actual_win_total = 0

const branches = [
  {
    tip: '0000000000000000000000000000000000000000000000000000000000000000',
    name: 'br1',
    index: 1,
    height_created: 0,
    seen: 0,
    last_seen: '',
    depth: 0,
  },
]

function branch_from_parent(block_hash, parent_hash) {
  const branch_info = branches.find(b => b.tip === parent_hash)
  if (branch_info) {
    branch_info.tip = block_hash
    branch_info.last_seen = stacks_blocks_by_stacks_block_hash[block_hash].block_height
    branch_info.seen++
    branch_info.depth++
    return branch_info
  }
  const current_height = stacks_blocks_by_stacks_block_hash[parent_hash] ? stacks_blocks_by_stacks_block_hash[parent_hash].block_height : 1
  const new_branch_info = {
    tip: block_hash,
    name: `br${branches.length + 1}`,
    index: branches.length + 1,
    height_created: current_height,
    seen: 1,
    last_seen: stacks_blocks_by_stacks_block_hash[block_hash].block_height,
    depth: current_height + 1,
  }
  branches.push(new_branch_info)
  // console.log("create branch", `p:${parent_hash}`, new_branch_info.name, new_branch_info.height_created)
  return new_branch_info
}


function find_leader_key(block_height, vtxindex) {
  const block = burn_blocks_by_height[block_height]
  const leader_key = block.leader_keys.find(lk => lk.vtxindex === vtxindex)
  if (!leader_key) {
    console.log("leader_key not found", block_height, vtxindex)
  }
  return leader_key
}

function post_process_block_commits() {
  for (let block of burn_blocks_by_height) {
    if (block) {
      for (let block_commit of block.block_commits) {
        block_commit.leader_key = find_leader_key(block_commit.key_block_ptr, block_commit.key_vtxindex)
        block_commit.leader_key_address = block_commit.leader_key.address
      }
    }
  }
}

function post_process_miner_stats() {
  let total_burn_prev = 0
  for (let block of burn_blocks_by_height) {
    if (block) {
      const total_burn = parseInt(block.total_burn) - total_burn_prev
      block.actual_burn = total_burn
      total_burn_prev = parseInt(block.total_burn)
      // console.log(block.block_height, total_burn)
      for (let block_commit of block.block_commits) {
        if (!miners[block_commit.leader_key_address]) {
          miners[block_commit.leader_key_address] = {
            mined: 0,
            won: 0,
            burned: 0,
            total_burn: 0,
            paid: 0,
            actual_win: 0,
          }
        }
        const miner = miners[block_commit.leader_key_address]
        miner.mined++
        miner.burned += parseInt(block_commit.burn_fee)
        miner.total_burn += total_burn
        if (block_commit.txid === block.winning_block_txid) {
          miner.won++
          win_total++
        }
      }
    }
  }
}

function process_snapshots() {
  const result = stmt_all_blocks.all()
  // console.log("tip", result[0])
  const tip_height = result[0].block_height

  if (result[1].block_height === tip_height) {
    console.log("tip is not unique")
    process.exit()  // TODO(psq): this is a bit too drastic... but what's the alternative?
  }

  let parent = undefined

  for (let row of result) {
    if (row.pox_valid === 0) {
      console.log("pox invalid", row.block_height, row.burn_header_hash, parent.parent_burn_header_hash)
    }
    else if (!parent || row.burn_header_hash === parent.parent_burn_header_hash) {
      burn_blocks_by_height[row.block_height] = row
      burn_blocks_by_burn_header_hash[row.burn_header_hash] = row
      burn_blocks_by_consensus_hash[row.consensus_hash] = row
      row.block_commits = []
      row.leader_keys = []
      row.payments = []
      row.staging_blocks = []
      row.block_headers = []
      parent = row
    } else {
      console.log("no match", row.block_height, row.burn_header_hash, parent.parent_burn_header_hash)
    }
  }
  // console.log(burn_blocks_by_height.map(b => b.block_height))
  if (burn_blocks_by_height.filter(b => !b).length !== 0) {
    console.log("missing blocks", burn_blocks_by_height.filter(b => !b))
    process.exit()
  }
  // console.log("burn_blocks_by_height", JSON.stringify(burn_blocks_by_height, null, 2))
}

function process_leader_keys() {
  const result = stmt_all_leader_keys.all()
  // console.log("leader_keys", result)
  // console.log("process_leader_keys.length", result.length)
  for (let row of result) {
    if (burn_blocks_by_burn_header_hash[row.burn_header_hash]) {
      burn_blocks_by_burn_header_hash[row.burn_header_hash].leader_keys.push(row)    
    }
  }
}

function process_block_commits() {
  const result = stmt_all_block_commits.all()
  // console.log("block_commits", result)
  // console.log("process_block_commits.length", result.length)
  for (let row of result) {
    const block_parent_distance = row.block_height - row.parent_block_ptr
    if (!block_commits_parent_distances[block_parent_distance]) {
      block_commits_parent_distances[block_parent_distance] = 1
    } else {
      block_commits_parent_distances[block_parent_distance]++
    }
    block_commits_parent_distance_count++

    if (burn_blocks_by_burn_header_hash[row.burn_header_hash]) {
      burn_blocks_by_burn_header_hash[row.burn_header_hash].block_commits.push(row)      
    }
  }
}

function process_payments() {
  const result = stmt_all_payments.all()
  // console.log("payments", result)
  // console.log("payments.length", result.length)
  // console.log("burn_blocks_by_consensus_hash", burn_blocks_by_consensus_hash)
  for (let row of result) {
    // console.log(row.burn_header_hash, row)
    if (burn_blocks_by_consensus_hash[row.consensus_hash]) {
      burn_blocks_by_consensus_hash[row.consensus_hash].payments.push(row)     
    } else {
      console.log("missing consensus hash", row.consensus_hash)
    }
  }
}

function process_staging_blocks() {
  const result = stmt_all_staging_blocks.all()
  // console.log("staging_blocks", result)
  // console.log("staging_blocks.length", result.length)
  // console.log("burn_blocks_by_consensus_hash", burn_blocks_by_consensus_hash)
        for (let row of result) {
          // console.log(row.consensus_hash, row)
          if (burn_blocks_by_consensus_hash[row.consensus_hash]) {
            burn_blocks_by_consensus_hash[row.consensus_hash].staging_blocks.push(row)            
          } else {
            console.log("missing consensus hash", row.consensus_hash)            
          }
        }
}

function process_block_headers() {
  const result = stmt_all_block_headers.all()
  // console.log("stmt_all_block_headers", result)
  // console.log("stmt_all_block_headers.length", result.length)
  for (let row of result) {
    if (burn_blocks_by_burn_header_hash[row.burn_header_hash]) {
      burn_blocks_by_burn_header_hash[row.burn_header_hash].block_headers.push(row)
      stacks_blocks_by_stacks_block_hash[row.block_hash] = row
    }
  }
}

function post_process_winning_fork() {
  const sorted_branches = branches.sort((a, b) => a.depth - b.depth)
  const highest_branch = sorted_branches[sorted_branches.length - 1]
  // console.log(highest_branch)
  let current_tip = highest_branch.tip
  while (current_tip !== '0000000000000000000000000000000000000000000000000000000000000000') {
    const stacks_block = stacks_blocks_by_stacks_block_hash[current_tip]
    const burn_block = burn_blocks_by_burn_header_hash[stacks_block.burn_header_hash]
    burn_block.on_winning_fork = true
    burn_block.branch_info.winning_fork = true
    const winning_block_txid = burn_block.winning_block_txid
    const winner = burn_block.block_commits.find(bc => bc.txid === burn_block.winning_block_txid)
    const winning_miner = miners[winner.leader_key_address]
    winning_miner.actual_win++
    actual_win_total++
    // console.log(stacks_block.block_height)
    current_tip = stacks_block.parent_block
  }
}

function post_process_branches() {
  for (let block of burn_blocks_by_height) {
    if (block && block.block_headers.length) {
      block.branch_info = branch_from_parent(block.block_headers[0].block_hash, block.block_headers[0].parent_block)
    }
  }
}

function Sha512Trunc256Sum(block_hash, consensus_hash) {
  return sha512.sha512_256(Buffer.concat([block_hash, consensus_hash]))
}

function process_transactions() {
  const result = stmt_all_transactions.all()
  // console.log("transactions", result)
  // console.log("staging_blocks.length", result.length)
  // console.log("burn_blocks_by_consensus_hash", burn_blocks_by_consensus_hash)
  for (let row of result) {
    // console.log(row.consensus_hash, row)
    if (!transactions_by_stacks_block_id[row.index_block_hash]) {
      transactions_by_stacks_block_id[row.index_block_hash] = []
    }
    transactions_by_stacks_block_id[row.index_block_hash].push(row)  // TODO(psq): only txid enough?
  }
  // console.log("transactions_by_stacks_block_id", transactions_by_stacks_block_id)
  for (let key of Object.keys(transactions_by_stacks_block_id)) {
    transaction_count += transactions_by_stacks_block_id[key].length - 1
  }
}


// CREATE TABLE burnchain_db_block_headers (
//     block_height INTEGER NOT NULL,
//     block_hash TEXT UNIQUE NOT NULL,
//     parent_block_hash TEXT NOT NULL,
//     num_txs INTEGER NOT NULL,
//     timestamp INTEGER NOT NULL,
function process_burnchain_blocks() {
  const result = stmt_all_burnchain_headers.all()
  // console.log("process_burnchain_blocks", result)
  for (let burn_block of result) {
    burn_block
  }

}

// CREATE TABLE burnchain_db_block_ops (
//     block_hash TEXT NOT NULL,
//     op TEXT NOT NULL,
function process_burnchain_ops() {
  const result = stmt_all_burnchain_ops.all()
  // console.log("process_burnchain_ops", result)
  console.log("========================================================================================================================")
  console.log("Leader key registrations")
  for (let row of result) {
    if (!burnchain_ops_by_burn_hash[row.block_hash]) {
      burnchain_ops_by_burn_hash[row.block_hash] = []
    }
    const op = JSON.parse(row.op)
    if (op.LeaderBlockCommit && op.LeaderBlockCommit.apparent_sender) {
      op.LeaderBlockCommit.burn_header_hash_hex = Buffer.from(op.LeaderBlockCommit.burn_header_hash).toString('hex')
      op.LeaderBlockCommit.public_key = secp256k1.publicKeyConvert(Buffer.from(op.LeaderBlockCommit.apparent_sender.public_keys[0].key, 'hex'), op.LeaderBlockCommit.apparent_sender.public_keys[0].compressed).toString('hex')
      op.LeaderBlockCommit.stacks_address = getAddressFromPublicKey(op.LeaderBlockCommit.public_key, TransactionVersion.Testnet)
      op.LeaderBlockCommit.btc_address = c32.c32ToB58(op.LeaderBlockCommit.stacks_address)
    } else if (op.LeaderKeyRegister) {
      op.LeaderKeyRegister.stacks_address = c32.c32address(op.LeaderKeyRegister.address.version, op.LeaderKeyRegister.address.bytes)
      if (op.LeaderKeyRegister.block_height >= start_block && op.LeaderKeyRegister.block_height < end_block) {
        console.log(op.LeaderKeyRegister.block_height, op.LeaderKeyRegister.vtxindex, op.LeaderKeyRegister.stacks_address, )
      }
    }
    burnchain_ops_by_burn_hash[row.block_hash].push(op)
  }
  // console.log("burnchain_ops_by_burn_hash", JSON.stringify(burnchain_ops_by_burn_hash, null, 2))
  console.log("========================================================================================================================")
}


(async () => {
  process_burnchain_blocks()
  process_burnchain_ops()
  // process.exit()
  process_snapshots()
  process_leader_keys()
  process_block_commits()
  process_payments()
  process_staging_blocks()
  process_block_headers()

  if (use_txs) {
    process_transactions()   
  }

  post_process_block_commits()
  post_process_miner_stats()
  post_process_branches()
  post_process_winning_fork()

  // console.log("burn_blocks_by_height", burn_blocks_by_height)
  // console.log("burn_blocks_by_burn_header_hash", burn_blocks_by_burn_header_hash)

  // for (let key of Object.keys(burn_blocks_by_burn_header_hash)) {
  //   console.log(burn_blocks_by_burn_header_hash[key])
  // }


  const block_parent_distances = []
  let block_parent_distance_count = 0

  let stacks_block_height_max = 0
  let parent_hash = null
  let parent_winner_block = null
  let blocks = 0
  for (let block of burn_blocks_by_height) {
    if (!block) {
      continue
    }
    if (block.block_height < start_block) {
      continue
    }
    if (block.block_height >= end_block) {
      break
    }
    blocks++
    let at_tip = ' '
    if (block.payments.length && block.payments[0].stacks_block_height > stacks_block_height_max) {
      stacks_block_height_max = block.payments[0].stacks_block_height
      at_tip = '>'
    }
    const current_winner_block = block.block_commits.find(bc => bc.txid === block.winning_block_txid)
    const block_parent_distance = current_winner_block ? (block.block_height - current_winner_block.parent_block_ptr) : -1
    if (block_parent_distance !== -1) {
      if (!block_parent_distances[block_parent_distance]) {
        block_parent_distances[block_parent_distance] = 1
      } else {
        block_parent_distances[block_parent_distance]++
      }
      block_parent_distance_count++
    }

    const stacks_block_id = block.block_headers.length ? Sha512Trunc256Sum(Buffer.from(block.block_headers[0].block_hash, 'hex'), Buffer.from(block.block_headers[0].consensus_hash, 'hex')) : '-'
    const txids = block.block_headers.length && use_txs ? `[${transactions_by_stacks_block_id[stacks_block_id].map(tx => tx.txid.substring(0, 10)).join(',')}]` : ''

    console.log(block.block_height,
      // block.block_commits.map(bc => `${bc.leader_key_address.substring(0, 10)}${bc.txid === block.winning_block_txid ? '*' : ' '}(${bc.key_block_ptr})`).sort((a, b) => a.localeCompare(b)).join(' '),
      block.block_commits.map(bc => `${bc.leader_key_address.substring(0, 10)}${bc.txid === block.winning_block_txid ? '*' : ' '}`).sort((a, b) => a.localeCompare(b)).join(''),
      // block.payments.length,
      // block.staging_blocks.length,
      // block.stacks_block_height,
      block.payments.length ? `${block.payments[0].stacks_block_height}${at_tip}` : '',
      block.block_headers.length ? `${block.block_headers[0].block_height}` : '-',
      block.branch_info ? `${block.branch_info.name}${block.on_winning_fork ? '$' : ' '}` : ' ',
      // block.branch_info ? block.branch_info.height_created : '-',
      block.block_headers.length ? `s:${block.block_headers[0].block_hash.substring(0, 10)}` : '-',
      block.block_headers.length ? `p:${block.block_headers[0].parent_block.substring(0, 10)}` : '-',
      block.block_headers.length ? `c:${block.block_headers[0].consensus_hash.substring(0, 10)}` : '-',
      stacks_block_id !== '-' ? `i:${stacks_block_id.substring(0, 10)}` : '',
      block.block_headers.length ? `b:${block.block_headers[0].burn_header_hash.substring(0, 10)}` : '-',

      block.block_headers.length ? `${block.block_headers[0].parent_block === parent_hash ? ((parent_winner_block ? parent_winner_block.leader_key_address : null) === (current_winner_block ? current_winner_block.leader_key_address : null) ? '@+' : '@@') : '  '}` : '  ',
      block.actual_burn,
      txids,
      // (is_argon_or_psq || block.block_headers.length === 0) ? '' : `<================================= ${current_winner_block ? current_winner_block.leader_key_address : 'no winner'}`

      // block.payments.length ? block.payments[0].index_block_hash : '',
    )
    parent_winner_block = current_winner_block
    parent_hash = block.block_headers.length ? block.block_headers[0].block_hash : null
  }

  // console.log("no leaders", burn_blocks_by_height.filter(b => b.leader_keys.length === 0).map(b => b.block_height))
  // console.log("no commits", burn_blocks_by_height.filter(b => b.block_commits.length === 0).map(b => b.block_height))

  // console.log()
  // console.log("fork list, by height")
  // console.log("fork name - # used - last seen - height - forked_from")
  // const sorted_branches_by_height = branches.sort((a, b) => a.depth - b.depth)
  // for (let branch_info of sorted_branches_by_height) {
  //   console.log(`${branch_info.name}${branch_info.winning_fork ? '$' : ''}`, branch_info.seen, branch_info.last_seen,  branch_info.depth, branch_info.height_created)
  // }

  // console.log()
  // console.log("fork list, by length, longer than 5")
  // const sorted_branches_by_length = branches.sort((a, b) => a.seen - b.seen).filter(b => b.seen > 5)
  // for (let branch_info of sorted_branches_by_length) {
  //   console.log(`${branch_info.name}${branch_info.winning_fork ? '$' : ''}`, branch_info.seen, branch_info.last_seen,  branch_info.depth, branch_info.height_created)
  // }


  // const all_branches_by_stacks_block_height = []
  // console.log()
  // console.log("forks by stacks block")
  // for (let stacks_block of Object.keys(stacks_blocks_by_stacks_block_hash).map(k => stacks_blocks_by_stacks_block_hash[k])) {
  //   if (!all_branches_by_stacks_block_height[stacks_block.block_height]) {
  //     all_branches_by_stacks_block_height[stacks_block.block_height] = []
  //   }
  //   all_branches_by_stacks_block_height[stacks_block.block_height].push(stacks_block)
  // }
  // // console.log(all_branches_by_stacks_block_height)
  // for (let height_data of all_branches_by_stacks_block_height) {
  //   if (height_data) {
  //     // console.log(height_data)
  //     const burn_blocks = height_data.map(b => burn_blocks_by_burn_header_hash[b.burn_header_hash]).sort((a, b) => {
  //       if (a.on_winning_fork) {
  //         return -1
  //       }
  //       if (b.on_winning_fork) {
  //         return 1
  //       }
  //       return a.branch_info.index - b.branch_info.index
  //     })
  //     // console.log(burn_blocks)
  //     console.log(height_data[0].block_height, burn_blocks.map(b => `${b.branch_info.name}${b.on_winning_fork ? '$' : ''}`).join(', '))
  //   }
  // }




  if (use_txs) {
    console.log("========================================================================================================================")
    console.log("total transactions (excl coinbase)", transaction_count)
  }
  if (use_csv){
    // display CSV output
    console.log("========================================================================================================================")
    console.log("STX address,BTC address,actual wins,total wins,total mined,%actual wins,%won,paid satoshis,theoritical win%,avg paid")
    for (let miner_key of Object.keys(miners).sort()) {
      const miner = miners[miner_key]
      console.log(`${miner_key},${c32.c32ToB58(miner_key)},${miner.actual_win},${miner.won},${miner.mined},${(miner.actual_win / actual_win_total * 100).toFixed(2)}%,${(miner.won / miner.mined * 100).toFixed(2)}%,${miner.burned},${(miner.burned / miner.total_burn * 100).toFixed(2)}%,${miner.burned / miner.mined}`)
      miner.average_burn = miner.burned / miner.mined
      miner.normalized_wins = miner.won / miner.average_burn
    }
  } else {
    // display console output
    console.log("STX address ========================================================================================================================")
    console.log("STX address/BTC address - actual wins/total wins/total mined %actual wins %won - paid satoshis Th[theoritical win%] (avg paid)")
    for (let miner_key of Object.keys(miners).sort()) {
      const miner = miners[miner_key]
      console.log(`${miner_key}/${c32.c32ToB58(miner_key)} ${adjustSpace(miner_key)} ${miner.actual_win}/${miner.won}/${miner.mined} ${(miner.actual_win / actual_win_total * 100).toFixed(2)}% ${(miner.won / miner.mined * 100).toFixed(2)}% - ${numberWithCommas(miner.burned)} - Th[${(miner.burned / miner.total_burn * 100).toFixed(2)}%] (${miner.burned / miner.mined})`)
      miner.average_burn = miner.burned / miner.mined
      miner.normalized_wins = miner.won / miner.average_burn
    }

    console.log("normalized wins========================================================================================================================")
    for (let miner_key of Object.keys(miners).sort((a, b) => (miners[b].normalized_wins - miners[a].normalized_wins))) {
      const miner = miners[miner_key]
      console.log(`${miner_key}/${c32.c32ToB58(miner_key)} ${adjustSpace(miner_key)} ${miner.actual_win}/${miner.won}/${miner.mined} ${(miner.actual_win / actual_win_total * 100).toFixed(2)}% ${(miner.won / miner.mined * 100).toFixed(2)}% - ${numberWithCommas(miner.burned)} - Th[${(miner.burned / miner.total_burn * 100).toFixed(2)}%] (${miner.burned / miner.mined}) ${miner.normalized_wins}`)
    }
    console.log("burned ========================================================================================================================")
    for (let miner_key of Object.keys(miners).sort((a, b) => (miners[b].burned - miners[a].burned))) {
      const miner = miners[miner_key]
      console.log(`${miner_key}/${c32.c32ToB58(miner_key)} ${adjustSpace(miner_key)} ${miner.actual_win}/${miner.won}/${miner.mined} ${(miner.actual_win / actual_win_total * 100).toFixed(2)}% ${(miner.won / miner.mined * 100).toFixed(2)}% - ${numberWithCommas(miner.burned)} - Th[${(miner.burned / miner.total_burn * 100).toFixed(2)}%] (${miner.burned / miner.mined})`)
    }
    console.log("wins ========================================================================================================================")
    for (let miner_key of Object.keys(miners).sort((a, b) => (miners[b].won - miners[a].won))) {
      const miner = miners[miner_key]
      console.log(`${miner_key}/${c32.c32ToB58(miner_key)} ${adjustSpace(miner_key)} ${miner.actual_win}/${miner.won}/${miner.mined} ${(miner.actual_win / actual_win_total * 100).toFixed(2)}% ${(miner.won / miner.mined * 100).toFixed(2)}% - ${numberWithCommas(miner.burned)} - Th[${(miner.burned / miner.total_burn * 100).toFixed(2)}%] (${miner.burned / miner.mined})`)
    }
    console.log("miner count ========================================================================================================================")
    console.log("miners:", Object.keys(miners).length)
    console.log("actual_win_total:", actual_win_total)
    console.log("blocks:", blocks)

    if (show_distances) {
      console.log("block_parent_distances")
      for (let index = 0; index < block_parent_distances.length; index++) {
        const block_parent_distance = block_parent_distances[index]
        if (block_parent_distance) {
          console.log(`${index} ${block_parent_distance} ${(block_parent_distance / block_parent_distance_count * 100).toFixed(2)}%`)
        }
      }
      console.log("block_commits_parent_distances")
      for (let index = 0; index < block_commits_parent_distances.length; index++) {
        const block_commits_parent_distance = block_commits_parent_distances[index]
        if (block_commits_parent_distance) {
          console.log(`${index} ${block_commits_parent_distance} ${(block_commits_parent_distance / block_commits_parent_distance_count * 100).toFixed(2)}%`)
        }
      }      
    }

  }

})()


// ST2Z840ZWSF54AFGB1QAEVJ8S8ME7H5BP81C6HJ19
