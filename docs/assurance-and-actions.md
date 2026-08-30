# Assurance and sensitive actions

A small assurance model makes security rules easier to review consistently across products.

## A0 — active session

An allowed active session is enough for low-risk account operations.

Typical example:

- revoke one other active device session

## A1 — fresh proof

Require one fresh credential proof. A practical baseline is a proof completed within the last 10 minutes, adjusted to product risk.

Typical examples:

- add a Passkey
- remove one Passkey
- link an external provider
- unlink one external provider
- change recovery email, plus verification of the new address
- revoke all other sessions

## A2 — independent proofs

Require two independent proof families for destructive changes to the authentication root.

Typical examples:

- remove all Passkeys
- delete the account
- release or transfer a scarce identity-root resource

Distinct eligible external providers can count as distinct proof families. Multiple Passkeys should normally count as one family for this purpose because synchronized credentials may share an upstream trust root.

A recovery-email proof alone should not count as an A2 proof.

## Suggested action matrix

| Action | Baseline | Additional invariant |
| --- | --- | --- |
| Normal sign-in | one usable credential | provider subject, not email, identifies external account |
| Revoke one other session | A0 | target session must belong to current account |
| Add Passkey | A1 | exception only for first signup or constrained recovery |
| Remove one Passkey | A1 | never remove final usable sign-in method |
| Link provider | A1 | explicit link intent bound to current account/session |
| Unlink provider | A1 | never remove final usable sign-in method |
| Change recovery email | A1 | independently verify new address |
| Revoke all other sessions | A1 | preserve or rotate current trusted session deliberately |
| Remove all Passkeys | A2 | invalidate stale step-up grants |
| Delete account | A2 | destructive confirmation and audit event |
| Recovery replacement | constrained recovery | security hold when no independent credential survives |

## Freshness and independence

“Fresh” and “independent” solve different problems. Freshness limits abuse of an old authenticated browser session. Independence limits failure of one upstream trust root. A strong design should reason about both explicitly rather than treating every successful login as equivalent.
