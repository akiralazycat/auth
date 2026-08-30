# Principles

Authentication should be designed around durable human control, not around a collection of login buttons.

## 1. Identity is not email

An external account should be identified by the provider and its immutable subject identifier. Email is useful metadata, but it is not a safe automatic account-merge key.

Two credentials that happen to report the same email address are not automatically the same proof.

## 2. Login, linking, and reauthentication are different ceremonies

A provider callback must know why it exists. Normal sign-in, adding a provider to an existing account, and proving control again for a sensitive action should be represented as distinct intents with state bound to the expected session, provider, expiry, and safe return path.

## 3. Sensitive actions deserve stronger proof

Having an active session is not equivalent to recently proving control of the account. Adding or removing credentials, changing recovery configuration, and other security-sensitive actions should require fresh authentication. Destructive changes to the authentication root should require stronger assurance still.

## 4. Never let the user strand themselves

A mutation must not leave an account with zero usable sign-in methods. This invariant belongs on the server, not only in the interface.

## 5. Multiple Passkeys are valuable, but not necessarily independent proof families

Several Passkeys may share an upstream synchronization trust root. They improve availability, but should not automatically be counted as multiple independent proofs for the highest-risk actions.

## 6. Recovery is a constrained state transition

A recovery link should not mint an unrestricted normal session. Recovery should create a restricted session that can rebuild account access while preventing destructive changes until sufficient assurance has been restored.

## 7. Recovery email is not a master key

A recovery address is useful, but possession of that inbox alone should not silently satisfy the strongest account-security requirements. When no independent credential survives, use explicit restrictions and a security hold before destructive replacement of the authentication root.

## 8. Sessions have purpose

A normal personal-device session, a short shared-device session, a recovery session, and a native-app session are not interchangeable. Each should carry explicit capability and lifetime semantics.

## 9. Active sessions and security history are different data

“Active devices” answers what can access the account now. “Recent security activity” answers what happened before. Keep authoritative session state and historical audit events separate.

## 10. Security should be legible

Users should be able to understand which sign-in methods they have, which devices remain active, what changed recently, and why an action requires stronger proof. Routine healthy state should look calm; warnings should be reserved for conditions that deserve attention.

## 11. Web and native should share policy, not necessarily transport

Browser cookies and native bearer tokens differ operationally, but the account model, credential semantics, recovery restrictions, and assurance requirements should remain the same.

## 12. Share policy; isolate blast radius

Common policy and stable implementation helpers can reduce drift across products. Product databases, secrets, OAuth clients, Passkey RP configuration, session signing material, and migrations should stay isolated unless there is a deliberate reason to centralize them.
