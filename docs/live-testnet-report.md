# Live Testnet Report

Status: successful `0.1.0-alpha.11` funded live harness run.

Generated: `2026-09-10T05:52:29.003Z`

Network: `kaspa:testnet-10`

Node: public TN10 websocket node with UTXO and selected-chain access.

Virtual DAA score at run start: `566608374`

The proof used the NodeJS SDK built from reviewed `rusty-kaspa` commit
`c338d495bec29e4dc8b5149f99e8db6fa916ed4a`. The Alpha.11 covenant fixture was
compiled with official SilverScript v1.0.0 commit
`3ed973335b59269293564805cc2c58a14595ec03`; its compiled bytecode SHA-256
remained `49e6d7da1c59afc51949ba43c2682047aa0c487a586e143bc9addc62e08e3df3`,
and the resulting launch identity is
`863cbb4cb94e0e2458ee96a74a204de0508fa35e318438c85db018bc8f86c083`.
The run executed all 18 required Alpha.11 flows against fresh recovery state.
The raw report and signing material remain in an ignored owner-only local
directory; this file contains only sanitized public evidence.
Hosted-gateway evidence is tracked separately in `docs/testnet-gateway.md`.

## Controlled Funding Split

- Transaction id:
  `281182e847e06580bf14b7f7a8c6dca5c01d1825115870f7afd111d0359b6381`
- Transaction version: `0` (`sdk-generated-transaction`)
- Requested controlled outputs: `16` at `500000000` sompi each

The split supplied independent funding inputs for conflict and recovery tests.
It did not disclose or copy wallet key material.

## Standard-Native Exact

### Tiny payment

- Transaction id:
  `0143322077d311f240acde3b10667d8a04845c450a7e64f069c82c34902e5e42`
- Transaction version: `0`
- Advertised amount and merchant gain: `10000000` sompi
- Paid fee: `2000000` sompi
- Payer cost: `12000000` sompi
- Calculated contextual mass: `100000`
- SDK policy fee calculation at the selected network profile: `10000000`
- Finality: `accepted`
- Duplicate identical request: HTTP `200`, cached response, handler executed
  once total
- Re-authorized cross-request replay: HTTP `409`,
  `invalid_transaction_state`

### Normal payment

- Transaction id:
  `1a0177ab2e7c6b3dd58a58c2d373f247f645293092ec2708743ca245ac59e4d5`
- Transaction version: `0`
- Advertised amount and merchant gain: `100000000` sompi
- Paid fee: `2000000` sompi
- Payer cost: `102000000` sompi
- Calculated contextual mass: `10000`
- SDK policy fee calculation: `1000000` sompi
- Finality: `accepted`
- Duplicate identical request: HTTP `200`, handler executed once total
- Re-authorized cross-request replay: HTTP `409`,
  `invalid_transaction_state`

In both cases the merchant output equalled the advertised amount exactly. The
tiny run records the accepted TN10 result and SDK policy calculation
separately; it does not claim a universal Kaspa minimum payment or fee.

## KIP-10 Additive Exact

Two independent head UTXOs were funded:

- `20b12e23563390492a5730da21b5bf5f2849ab0e39459f37b53d5b12fd53840b:0`
- `1216cefc758076db576cb84b8b23f692de84c8da90d38146d2cdfb87ef6a6c6d:0`

Each started at `100000000` sompi with a `10000000` sompi application
anti-churn threshold.

The primary additive payment proved:

- Transaction id:
  `2363806b1e3c0bbe6be12eb52714525e89a9221c4add7315efd13a76eee86c2c`
- Transaction version: `1`
- Prior head amount: `100000000` sompi
- Successor amount: `200000000` sompi
- Advertised amount and sole merchant gain: `100000000` sompi
- Paid fee: `2000000` sompi
- Payer cost: `102000000` sompi
- Calculated mass: `1286`
- Compute budgets: head input `10`, payer input `10`
- Finality: `accepted`
- Duplicate identical request: cached without rerunning the handler
- Re-authorized cross-request replay: HTTP `409`,
  `invalid_transaction_state`

There was no separate merchant payment output. The KIP-10 successor delta was
the payment.

## Concurrent Head Conflict And Retry

Two different signed transactions raced the same version-0 head:

- Winner:
  `8a23c56c495628c6a3d6a291a131f13142ce18a1113ed16e41ff6527786f3b4a`
- Losing candidate:
  `fe448ffa40de9efe11809ab60655201dcd86bbe0522363cdca29cf31ce397774`

Exactly one request returned `200`; the loser received a corrective `402` and
remained durably pending until authoritative reconciliation. No replacement
was admitted and protected work ran once.

## Verification And Recovery

- Mutated and expired request authorizations each returned a corrective `402`
  `invalid_payload`; protected work ran zero times and no transaction was
  broadcast.
- Public verify-only calls rejected valid but unobserved exact transactions at
  the authenticated finality gate before direct settlement.
- Transaction
  `ad3e2a6f9e399b60625d85c241dd3f1c522194479db66586a662d3dc2bd33f12`
  was accepted by TN10 and then subjected to an injected post-broadcast runtime
  failure. A new server instance over preserved state reconciled it and ran the
  protected handler exactly once on retry.
- Transaction
  `c0f0b5e1be2aa585f97f91b60c6714b11a8a47a1f39b0158800d9b7cd5f80319`
  externally advanced a head. Trusted candidate evidence reconciled the
  durable head from version `1` to `2`; no address-only inference was used.

## KIP-20 Batch Lifecycle

Stable covenant ID:
`db7299887cd5e9283186caac778e0afacf2bcb80c781b25f27e81181c8db6ba8`

### Singleton genesis and vouchers

- Deposit transaction:
  `1d57898f50d3b7921ac1e45819f416230cde38960f2109c0fac429b1c4d00de5`
- Transaction version: `1`
- Singleton KIP-20 genesis independently verified: yes
- Funded covenant value after fee: `498000000` sompi
- Initial charge and signed lifetime ceiling: `100000000` sompi
- Voucher-only second charge and new lifetime ceiling: `200000000` sompi
- Finality: `accepted`

### Two partial claims against one voucher

- First claim transaction:
  `c599760e678c672125ddd4794b5049410218c7ebc39fe4c517178f69fa60301c`
- First gross claim: `100000000` sompi
- First server output: `98000000` sompi
- First continuation value: `398000000` sompi
- Second claim transaction:
  `3c7b8cd516cc51b9411ae3928e080319f25f11bb969809c2b40e7bc206cb0516`
- Second gross claim: `50000000` sompi
- Second server output: `48000000` sompi
- Second continuation value: `348000000` sompi
- Lifetime gross claimed after both claims: `150000000` sompi
- Buyer-signed lifetime ceiling used for both claims: `200000000` sompi
- Claim fee per transaction: `2000000` sompi
- Finality: `accepted` for both claims

Both claims preserved the covenant ID while advancing the active outpoint,
state script, and derived P2SH address. The second claim reused the same
cumulative voucher without exceeding its ceiling.

### Same-lineage top-up and restart reload

- Top-up transaction:
  `26a9114238c268c85d00ab042c3a24892305946bccf071aa843544c21f6a27e5`
- Added value: `400000000` sompi
- Successor covenant value: `748000000` sompi
- Lifetime actual charge and new signed ceiling: `498000000` sompi
- Lifetime gross claimed remained: `150000000` sompi
- Finality: `accepted`

The top-up retained the same covenant ID, `S`, state script, and derived P2SH
address while advancing the outpoint and strictly increasing `V`. A fresh
client/server runtime reloaded the genesis evidence, top-up evidence, active
outpoint, channel state, and the exact pre-broadcast claim artifact. No open
claim attempt survived the accepted top-up.

### Stale-head rejection and terminal refund

- A stale claim transaction against the spent genesis outpoint was submitted
  to TN10 and definitively rejected while the current continuation remained
  present.
- Rejected stale-claim transaction:
  `df84892f65109254925771c119ef57fc0b60657c5ec4a39c763b2a03ad4fa7d5`
- Absolute refund DAA: `566611974`
- Refund lock time: `566611975`
- Observed DAA at submission: `566612121`
- Refund transaction:
  `623a4df66a1125fec9acae75271fa14aaaeb6be15c61488fb7222335adb59777`
- Refund input: `748000000` sompi
- Refund output: `746000000` sompi
- Refund fee: `2000000` sompi
- Finality: `confirmed`

The refund builder, persisted artifact, and broadcast transaction IDs matched.
Restart reconciliation reloaded the exact signed bytes and captured head,
applied the accepted attempt atomically, and did not rebroadcast.

The harness authenticated the version-1 batch transactions against selected
chain evidence and required the configured confirmation threshold before
reporting confirmed finality.

## Required Flow Status

All 18 required flows passed:

- exact settlement, additive-head conflict/retry, idempotency, invalid and
  expired authorization rejection, restart recovery, and external advancement;
- verified singleton KIP-20 genesis, deposit-voucher, and voucher-only reuse;
- two partial claims using one cumulative voucher, same-lineage top-up, and
  durable restart reload;
- stale-head and cross-scheme replay rejection;
- terminal post-timeout refund with deterministic artifact recovery.

The funding wallet retained `64686443100` sompi after the run.

## Mainnet Read-Only And Offline Check

The latest separate mainnet read-only check reported a synced Rusty Kaspa
`2.0.1` node with UTXO index enabled beyond the recorded Toccata activation
score. `npm run proof:mainnet:offline` constructs and signs deterministic
synthetic standard-native v0 and additive v1 shapes without real UTXOs, funds,
transaction submission, spend, or broadcast.

This is compatibility evidence, not a mainnet readiness claim. Mainnet remains
blocked by `docs/mainnet-readiness.md`.
