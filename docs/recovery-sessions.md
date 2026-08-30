# Recovery and sessions

Recovery and session design are where otherwise-solid authentication systems often become permissive.

## Recovery links

A recovery link should use a high-entropy opaque token, store only a cryptographic digest server-side, expire quickly, be single-use, and be consumed atomically. Request responses should resist account enumeration.

A useful baseline expiry is 15 minutes, but expiry is product policy rather than a universal constant.

## Restricted recovery session

Successful recovery-link consumption should create a restricted recovery session, not an unrestricted normal session.

A restricted recovery session may be allowed to:

- inspect current credential state
- add a replacement Passkey
- complete a provider reauthentication or linking flow
- continue an explicit recovery ceremony

It should not be allowed to:

- delete the account
- change the recovery address again
- remove all credentials
- perform another authentication-root destructive action

When recovery depends on email and no independent credential survives, use a security hold before destructive replacement of the previous authentication root. A 24-hour baseline is a reasonable starting point; higher-risk products may lengthen it.

## Session kinds

Explicit session kinds make capability easier to audit.

### Normal

A standard personal-device session. Security-sensitive actions can still require A1 or A2.

### Temporary shared device

A short, non-sliding session intended for a computer the user does not control long-term.

Recommended baseline:

- maximum lifetime around two hours
- no sliding extension
- no credential add/remove
- no provider link/unlink
- no recovery-address change
- no account deletion
- no elevation into a full security-settings session merely by stepping up inside the temporary session

### Recovery restricted

A narrow session used only to restore account access safely.

### Native

A native-app account session using platform-secure token storage and a versioned API contract. Native transport must not bypass the same A1/A2 rules used on the web.

## Session storage

Where a persistent session registry is used, store a digest of opaque bearer material rather than the bearer token itself.

Account-facing device metadata should be privacy-minimal. Coarse browser, OS, and device families are often enough. Precise location, raw IP, and raw User-Agent are not inherently necessary for a useful security dashboard.

## Revocation

- current-device sign-out: revoke the current session and clear local auth state
- revoke one other device: A0 baseline
- revoke all other devices: A1 baseline
- authentication-root changes should invalidate stale step-up grants
- credential removal should revoke sessions authenticated by that credential when provenance is known; when provenance is ambiguous, broader revocation is safer

## Security history

Historical events should be modeled independently from active sessions. Useful events include successful and failed sign-ins, Passkey add/remove, provider link/unlink, recovery start/completion, recovery-address change, and session revocation.
