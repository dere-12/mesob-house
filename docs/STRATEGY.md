# Mesob House — Rendering Strategy

## Purpose

This document records the intended rendering and data-fetching strategy for each route. It is a design record, not proof that a production build has verified every choice. Compare it with the output of `npm run build` and update it when the implementation changes.

## Page Routes

| Route          | Intended strategy                                                           | Reason                                                                                                                                                                                                                                     |
| -------------- | --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `/`            | Static / pre-rendered                                                       | The landing page uses local imagery and mostly static content. It does not need a user session to render.                                                                                                                                  |
| `/menu`        | Server-rendered with hourly revalidation (3600 seconds)                     | The menu comes from the external API. It is public data that changes occasionally, so hourly revalidation avoids a request on every visit. Client-side search and category selection are handled separately.                               |
| `/menu/[id]`   | Pre-render known slugs with `generateStaticParams`; use the menu data cache | The menu API supplies dish slugs. Known dishes can be generated in advance. A missing slug must use the dish-specific not-found UI, not the global 404. Confirm the final behavior with the production build and `dynamicParams` settings. |
| `/cart`        | Client-interactive page                                                     | Cart contents belong to the browser and are maintained by Zustand with localStorage persistence. Do not make the entire application client-rendered just for cart state.                                                                   |
| `/checkout`    | Dynamic, session-protected page                                             | Checkout reads the signed-in user's session and uses a Server Action to validate and create a mock order. It must not be statically rendered with private user data.                                                                       |
| `/signin`      | Public page with client form interactions                                   | Demo credentials are checked on the server. An already authenticated user may be redirected by the page/action flow.                                                                                                                       |
| `/orders`      | Dynamic, session-protected page                                             | The page reads the current session and fetches only orders belonging to that user from the in-memory store.                                                                                                                                |
| `/orders/[id]` | Dynamic, session- and ownership-protected page                              | The page reads the session, retrieves one order, and verifies that the order belongs to the current user. The client polls its status endpoint.                                                                                            |
| `/kitchen`     | Dynamic, staff-only page                                                    | The page reads the session, checks the staff role, and reads current in-memory orders.                                                                                                                                                     |
| `/dashboard`   | Dynamic, staff-only page                                                    | The page reads current in-memory orders and calculates dashboard totals, chart data, sorting, and pagination.                                                                                                                              |
| Unknown routes | Framework not-found handling                                                | Use `app/not-found.js` for unknown application URLs.                                                                                                                                                                                       |
| Missing dish   | Dish-specific not-found handling                                            | Use `app/menu/not-found.js` when a requested dish slug is not found.                                                                                                                                                                       |

## Data and API Routes

| Endpoint / resource           | Strategy                                                                | Reason                                                                                                                                             |
| ----------------------------- | ----------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| External `GET /menu/`         | Server fetch, revalidate every 3600 seconds                             | Shared public menu data; fetched directly by Server Components where possible.                                                                     |
| External `GET /menu/specials` | Server fetch when used by a page; apply an explicit revalidation policy | Specials are public API data. Do not build an internal proxy just to call the same API from a Server Component.                                    |
| `GET /api/dishes`             | Request-driven Route Handler                                            | Provides an HTTP endpoint for client-side search/SWR callers. It may filter the shared menu data by query.                                         |
| `GET /api/dishes/[id]`        | Request-driven Route Handler                                            | Returns one dish or an appropriate not-found/service error to HTTP callers.                                                                        |
| `GET /api/session`            | Dynamic, private/no-store Route Handler                                 | Returns only non-sensitive session display fields (such as name and role); it must not expose the signed cookie or token.                          |
| `POST /api/orders`            | Dynamic, authenticated Route Handler                                    | Validates untrusted request data on the server and associates the order with the authenticated user.                                               |
| `GET /api/orders/[id]`        | Dynamic, authenticated Route Handler                                    | Checks authentication and ownership before returning order status to the polling client.                                                           |
| Leaflet map tiles             | Client-loaded external tiles                                            | Leaflet runs in the browser; map tiles are supplied by OpenStreetMap. The locations in this project are demonstrations, not live courier GPS data. |

## Client Data Refresh

| Query / state          | Client key or source                           | Refresh rule                                                             | Reason                                                                                          |
| ---------------------- | ---------------------------------------------- | ------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------- |
| Menu search            | `/api/dishes?q={query}` through SWR            | Debounce input by 300 ms; SWR focus/reconnect revalidation applies       | Search is interactive and should avoid a hand-written request effect and race handling.         |
| Order status           | `/api/orders/{orderId}` through SWR            | Poll every 5 seconds                                                     | Demonstrates periodic status refresh for the order tracking page.                               |
| Header session display | `/api/session` through SWR                     | Revalidate on focus, reconnect, and route navigation                     | Keeps the displayed name/role current without reading the session cookie in a Client Component. |
| Cart                   | Zustand key `mesob-house-cart` in localStorage | Update immediately from cart actions; rehydrate after the browser mounts | Cart state is private to the browser and does not need a remote query before checkout.          |

## Writes and Mock Data

- `signIn` validates the configured demo credentials and creates the signed session cookie.
- `signOut` clears the session cookie.
- `placeOrder` validates submitted checkout data on the server, verifies the session, checks submitted dish slugs against the menu data, and creates an order in the mock store.
- `cancelOrder` verifies the session and order ownership before changing the order status.
- `POST /api/orders` is an HTTP alternative for callers that need an endpoint; it must enforce the same authentication and validation rules.

Orders are stored in a module-level in-memory data structure. They are not durable, and separate server instances do not share a guaranteed common store. This is suitable for a coursework demonstration, not production order storage.

## Dashboard

- `/dashboard` reads orders on the server and derives revenue, active-order counts, and neighbourhood aggregates from those records.
- `RevenueChart` receives prepared chart data as props; it does not independently fetch dashboard data.
- Order-table sorting and pagination are represented in URL search parameters.
