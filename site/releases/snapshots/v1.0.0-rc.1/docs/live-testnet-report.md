# Live Testnet Report

Status: successful `1.0.0-rc.1` funded live harness run.

Generated: `2026-09-13T11:15:27.938Z`

Network: `kaspa:testnet-10`

Node: public TN10 websocket node with UTXO and selected-chain access.

Evidence-source boundary: the run trusted one configured public Testnet-10
source for acceptance, confirmation, UTXO, and selected-chain evidence. This is
funded prerelease test evidence, not independently corroborated or Byzantine-resilient
chain evidence, and it does not satisfy the mainnet gate.

Virtual DAA score at run start: `569394266`

Virtual DAA score at batch start: `569394853`

The proof used the NodeJS SDK built from reviewed `rusty-kaspa` commit
`c338d495bec29e4dc8b5149f99e8db6fa916ed4a`. The v1 RC1 covenant fixture was
compiled with official SilverScript v1.0.0 commit
`3ed973335b59269293564805cc2c58a14595ec03`; its compiled bytecode SHA-256
remained `49e6d7da1c59afc51949ba43c2682047aa0c487a586e143bc9addc62e08e3df3`,
and the resulting launch identity is
`863cbb4cb94e0e2458ee96a74a204de0508fa35e318438c85db018bc8f86c083`.
The payment runtime source matched commit
`ed9077f5223bbf6083d90fe169bccd2a2a0db456`; the live driver included the
release-evidence correction that rebases the refund timeout from authoritative
chain state immediately before the batch flow.
The run executed all 18 required v1 RC1 flows against fresh recovery state.
The raw report and signing material remain in an ignored owner-only local
directory; this file contains only sanitized public evidence.
Hosted-gateway evidence is tracked separately in `docs/testnet-gateway.md`.

## Controlled Funding Split

- Transaction id:
  `c11aa9383c57c83df6a383db0af6bccd47d707b6024b5190b4d5ad2b4b603e6a`
- Transaction version: `0` (`sdk-generated-transaction`)
- Requested controlled outputs: `16` at `500000000` sompi each

The split supplied independent funding inputs for conflict and recovery tests.
It did not disclose or copy wallet key material.

## Standard-Native Exact

### Tiny payment

- Transaction id:
  `8787128706e7b1d20fb548a83e814af580654a3a32bbfba89771dc9a4b1356af`
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
  `92874217a4359e5b0df7e52a2946fa7a60146539b0854ccc485e3eaab4cba4e0`
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

- `df22e5ff55b1e4fd728f8142cb1d3a63e9169ca9f3fedc6090d6e486b2cf121e:0`
- `bff98355fc7c03f0aacc91ec3e75974d9fb253c35502f7438c8e2cca0fcdeee0:0`

Each started at `100000000` sompi with a `10000000` sompi application
anti-churn threshold.

The primary additive payment proved:

- Transaction id:
  `6ac1bf82cf48ee6fcf9b010c7c4681d0a5a52c22c4cdae49c2a5509539ea9e19`
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
  `2074d89dffa9f32e0fa69d822d784704c59f49867f32d8da23b357b6be8ead97`
- Losing candidate:
  `b362a8b3472588ca5b129d26fd500923b6c185eb0fe480cf734187e4a48ee50d`

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
  `1b6a97548123fe3ba21c17fd926b17645bef4c409f8417ba703f159966eda0f7`
  was accepted by TN10 and then subjected to an injected post-broadcast runtime
  failure. A new server instance over preserved state reconciled it and ran the
  protected handler exactly once on retry.
- Transaction
  `b0ed35349178aa1771ff425868d4d6c7b371f1da7de439982bac5752ac4ea555`
  externally advanced a head. Trusted candidate evidence reconciled the
  durable head from version `1` to `2`; no address-only inference was used.

## KIP-20 Batch Lifecycle

Stable covenant ID:
`41e99ea044f1f2f9013dc9aa2f09516db34d5b03f3a71c4a64830ca667a11149`

### Singleton genesis and vouchers

- Deposit transaction:
  `f9a065595ad21653b9b21eab851dd1b158988f22249c4e9e863a3f780f08e861`
- Transaction version: `1`
- Singleton KIP-20 genesis independently verified: yes
- Funded covenant value after fee: `498000000` sompi
- Initial charge and signed lifetime ceiling: `100000000` sompi
- Voucher-only second charge and new lifetime ceiling: `200000000` sompi
- Finality: `accepted`

### Two partial claims against one voucher

- First claim transaction:
  `d08b0d79ad2a3bad07f980acec66eeffb42691beb0237482cc14399a75ac0701`
- First gross claim: `100000000` sompi
- First server output: `98000000` sompi
- First continuation value: `398000000` sompi
- Second claim transaction:
  `fe98066be01139e06fd51842bc95f212361a3b4743c99a2bdedade548375924a`
- Second gross claim: `50000000` sompi
- Second server output: `48000000` sompi
- Second continuation value: `348000000` sompi
- Lifetime gross claimed after both claims: `150000000` sompi
- Buyer-signed lifetime ceiling used for both claims: `200000000` sompi
- Claim fee per transaction: `2000000` sompi
- Finality: `confirmed` for both claims

Both claims preserved the covenant ID while advancing the active outpoint,
state script, and derived P2SH address. The second claim reused the same
cumulative voucher without exceeding its ceiling.

### Same-lineage top-up and restart reload

- Top-up transaction:
  `18a43fd9a823f5fac76924a931d6e8295f8e17ec5c10963b9cd4e7c1c95a0e86`
- Added value: `400000000` sompi
- Successor covenant value: `748000000` sompi
- Lifetime committed fixed charges and new signed ceiling: `498000000` sompi
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
  `f8bd41c289a043cefa9c992ea51947c580498ef55a573528c607349be309442e`
- Absolute refund DAA: `569396653`
- Refund lock time: `569396654`
- Observed DAA at submission: `569396851`
- Refund transaction:
  `91a21a522a48ec3745ec38d9fb1822309a99d538eb7be892a06329a76c6a5234`
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

The funding wallet retained `60459366700` sompi after the run.

## Mainnet Read-Only And Offline Check

The latest separate mainnet read-only check reported a synced Rusty Kaspa
`2.0.1` node with UTXO index enabled beyond the recorded Toccata activation
score. `npm run proof:mainnet:offline` constructs and signs deterministic
synthetic standard-native v0 and additive v1 shapes without real UTXOs, funds,
transaction submission, spend, or broadcast.

This is compatibility evidence, not a mainnet readiness claim. Mainnet remains
blocked by `docs/mainnet-readiness.md`.
