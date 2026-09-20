---
name: cityplay-maintainer
description: Add or update CityPlay places, events, routes, city configuration, and source verification fields in this repository.
---

# CityPlay Maintainer

1. Read `city.config.ts` and the active city data file before editing.
2. Keep permanent places separate from time-bound events.
3. Events require `start`, `end`, place, area, and a concise name.
4. Places require a stable id, category, area, note, duration, seasons, tags, map URL, and approximate map x/y coordinates from 0 to 100.
5. Prefer official sources for reservations, opening status, and offers. Do not present unverified time-sensitive facts as current.
6. Avoid new dependencies for ordinary content updates.
7. Run `npm run build` after structural or component changes.
