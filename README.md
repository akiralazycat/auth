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

## Public site

The repository includes a dependency-free static site designed to be portable to ChatGPT Sites or another static host:

- `index.html` — content and semantic structure
- `styles.css` — responsive visual system and diagrams
- `script.js` — English/Japanese switching and interactive authentication-flow examples

English is the default public language. Japanese can be switched in-place without navigating to a second page.

### Interactive examples

The site currently includes five stateful walkthroughs:

1. normal sign-in
2. post-signup provider linking
3. account recovery through a restricted session
4. attempted removal of the final usable sign-in method
5. destructive account deletion with A2 assurance

Each walkthrough keeps session kind, assurance, intent, policy result, and the active invariant visible while the user moves through the flow.

### Diagrams

The first public version includes two implementation-independent diagrams:

- shared security contract → isolated product failure domains
- recovery link → restricted recovery → rebuilt proof / hold → normal session

They are intentionally schematic rather than infrastructure diagrams. The public repository describes behavior and boundaries, not private deployment topology.

## Documents

- [`docs/principles.md`](docs/principles.md) — core design principles
- [`docs/assurance-and-actions.md`](docs/assurance-and-actions.md) — A0/A1/A2 and sensitive-action matrix
- [`docs/recovery-sessions.md`](docs/recovery-sessions.md) — recovery and session rules
- [`docs/architecture-boundary.md`](docs/architecture-boundary.md) — what to share and what to isolate

## Relationship to private implementation

The public guide describes the security contract at a conceptual level. The private implementation remains separate, with product-specific databases, OAuth clients, secrets, Passkey RP configuration, session keys, and migrations isolated per product.

The public examples are explanatory models, not production authentication code.

## ChatGPT Sites direction

The static version is the source reference for the initial ChatGPT Sites presentation. When porting it, preserve:

- English-first / Japanese-switch behavior
- the separation between principles and implementation details
- visible A0 / A1 / A2 state
- interactive flow progression
- restricted-recovery semantics
- shared-policy / isolated-failure-domain messaging
- mobile usability and reduced-motion behavior

## License

See `LICENSE`.
