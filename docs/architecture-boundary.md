# Architecture boundary

The goal is to share enough authentication logic to improve correctness without turning every product into one failure domain.

## Good candidates to share

- credential/provider semantics
- OAuth `login | link | reauth` intent model
- OAuth state-envelope validation
- step-up assurance policy
- Passkey lifecycle invariants
- recovery-token lifecycle helpers
- session-kind semantics
- security-event vocabulary
- privacy-minimal device parsing
- transport-neutral policy fixtures
- native/web conformance rules

## Keep isolated by product

- account database
- session database or namespace
- OAuth client IDs and secrets
- provider private keys
- Passkey RP ID/origin configuration
- session-signing and encryption keys
- recovery-token signing material where applicable
- email-delivery credentials
- cookie domains
- product migrations
- product-specific profile or identity rows
- rate-limit namespaces where cross-product coupling would enlarge blast radius

## Why not five unrelated implementations?

Independent implementations isolate bugs, but they also create policy drift. Security fixes can land in one product and remain missing in another. Small differences in account linking, recovery, credential removal, and session invalidation can become account-takeover paths.

A shared contract and well-tested stable helpers reduce that drift.

## Why not one central identity provider by default?

Central SSO can be appropriate when the product model truly needs one account across services. It also creates a larger availability and compromise blast radius. If products are meant to remain independently operable, share the contract and selected runtime helpers while retaining separate account stores, secrets, sessions, OAuth registrations, and relying-party configuration.

## Extraction rule

Prefer contract-first reuse. Extract runtime code only after the same implementation boundary has proven stable in at least two products. This prevents a premature abstraction from forcing unrelated products into the same storage or deployment model.

## Conformance examples

A reusable policy test suite should be able to express rules such as:

- stale proof does not satisfy A1
- a temporary shared-device session cannot add a Passkey
- the final usable credential cannot be deleted
- two eligible independent providers can satisfy A2
- two Passkeys do not automatically satisfy A2 independence
- recovery email alone never satisfies A2
- native transport does not weaken the action matrix

The public guide intentionally stops at these behavioral contracts. Production code, secrets, deployment topology, product-specific exceptions, and operational controls remain private concerns.
