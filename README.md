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
- `styles.css` — loader for the retained base visual system plus the publication brand layer
- `script.js` — loader for the retained bilingual flow runtime plus direct-link behavior
- `brand.css` — formal public brand treatment and auth-specific hero composition
- `deeplinks.js` — shareable state for individual interactive flow steps

English is the default public language. Japanese can be switched in-place without navigating to a second page.

### Formal public mark

The public identity uses a central control point surrounded by two intersecting trust orbits and three proof nodes. The mark is intended to suggest durable human control, multiple proof families, and deliberate trust boundaries rather than a conventional lock/shield security logo.

Source assets:

- `favicon.svg` — square favicon source
- `assets/auth-symbol.svg` — transparent symbol for UI use
- `assets/auth-mark.svg` — square presentation mark
- `assets/og-card.svg` — Open Graph / social preview source artwork

For ChatGPT Sites, render the OG source to the platform's preferred raster social-card format if required by the publishing surface, while preserving the composition and mark geometry.

### Interactive examples

The site currently includes five stateful walkthroughs:

1. normal sign-in
2. post-signup provider linking
3. account recovery through a restricted session
4. attempted removal of the final usable sign-in method
5. destructive account deletion with A2 assurance

Each walkthrough keeps session kind, assurance, intent, policy result, and the active invariant visible while the user moves through the flow.

### Direct links

Interactive flow state is addressable with stable query parameters:

```text
?flow=recovery&step=4&lang=en#flows
?flow=last-method&step=3&lang=ja#flows
```

Supported flow slugs are `signin`, `link`, `recovery`, `last-method`, and `delete`. `step` is one-based and clamped to the valid range. The Flow Explorer also injects a bilingual “Copy flow link” action so a specific state can be shared without asking another reader to reproduce the clicks manually.

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
- the formal orbit mark and editorial hero hierarchy
- the separation between principles and implementation details
- visible A0 / A1 / A2 state
- interactive flow progression and direct-link state
- restricted-recovery semantics
- shared-policy / isolated-failure-domain messaging
- mobile usability and reduced-motion behavior

## License

See `LICENSE`.
