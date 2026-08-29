# auth

Public design guide for human-centered authentication and account security.

This repository publishes the principles, assurance model, recovery rules, session model, and implementation boundaries behind a family of products. It intentionally does **not** publish the private shared runtime or product-specific authentication internals.

## What this is

A compact, implementation-independent reference for designing authentication systems that are understandable to users and resistant to account takeover.

The guide focuses on the hard parts that usually appear after the first login button ships:

- account linking without unsafe email merging
- Passkey lifecycle and last-credential protection
- step-up authentication for sensitive actions
- recovery without turning email into a master key
- temporary/shared-device sessions
- active-session revocation and security history
- native and web parity
- keeping shared policy reusable without centralizing every product into one identity provider

## What this is not

- an authentication SDK
- an identity provider
- a promise that copying these rules makes a system secure
- a replacement for product-specific threat modeling, testing, review, or incident response

## Site

The repository includes a dependency-free static site in `index.html` + `styles.css`, designed to be portable to ChatGPT Sites or another static host.

## Documents

- [`docs/principles.md`](docs/principles.md) — core design principles
- [`docs/assurance-and-actions.md`](docs/assurance-and-actions.md) — A0/A1/A2 and sensitive-action matrix
- [`docs/recovery-sessions.md`](docs/recovery-sessions.md) — recovery and session rules
- [`docs/architecture-boundary.md`](docs/architecture-boundary.md) — what to share and what to isolate

## Relationship to private implementation

The public guide describes the security contract at a conceptual level. The private implementation remains separate, with product-specific databases, OAuth clients, secrets, Passkey RP configuration, session keys, and migrations isolated per product.

## License

See `LICENSE`.
