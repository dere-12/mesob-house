# Mesob House — Server / Client Boundary

## Principle

Use Server Components by default. Add `"use client"` only where browser state, event handlers, client-side navigation state, SWR, charts, maps, or other browser APIs are required. Keep each client boundary as close as practical to the interactive element.

## Shared Layout and Navigation

| File / component                  | Side   | Reason                                                                                        |
| --------------------------------- | ------ | --------------------------------------------------------------------------------------------- |
| `app/layout.js`                   | Server | Defines the document, fonts, metadata, providers, and shared layout composition.              |
| `components/Header.jsx`           | Server | Renders branding and static header structure.                                                 |
| `components/HeaderNavigation.jsx` | Client | Uses `usePathname()` to determine and display the active navigation tab.                      |
| `components/HeaderCart.jsx`       | Client | Reads Zustand cart state and displays the total item-quantity badge.                          |
| `components/HeaderAuth.jsx`       | Client | Uses SWR to display non-sensitive session information and supports sign-out interaction.      |
| `components/Footer.jsx`           | Server | Renders static footer content and links.                                                      |
| `app/providers.jsx`               | Client | Initializes client-side providers and rehydrates persisted Zustand cart state after mounting. |

## Public Landing and Menu

| File / component                    | Side   | Reason                                                                                          |
| ----------------------------------- | ------ | ----------------------------------------------------------------------------------------------- |
| `app/page.js`                       | Server | Renders the public landing page and metadata; no client state is required for its main content. |
| `app/menu/layout.js`                | Server | Provides the shared menu route layout without interactive state.                                |
| `app/menu/page.js`                  | Server | Fetches the menu data and supplies initial data to the interactive menu components.             |
| `app/menu/FilterShell.jsx`          | Client | Holds selected category state and coordinates the category filter UI.                           |
| `app/menu/SearchBox.jsx`            | Client | Handles search input, debounce, SWR requests, and client-side filtering.                        |
| `app/menu/DishList.jsx`             | Client | Handles Add to Cart button events and reads the Zustand cart action.                            |
| `app/menu/[id]/page.js`             | Server | Fetches a dish by slug, generates metadata and structured data, and renders the detail page.    |
| `app/menu/[id]/AddToCartButton.jsx` | Client | Handles the detail-page Add to Cart interaction.                                                |
| `app/menu/[id]/opengraph-image.jsx` | Server | Generates the dish social preview image using server-side dish data.                            |
| `app/menu/not-found.js`             | Server | Renders the separate Dish Not Found state.                                                      |

## Cart and Checkout

| File / component                | Side   | Reason                                                                                     |
| ------------------------------- | ------ | ------------------------------------------------------------------------------------------ |
| `app/cart/page.js`              | Client | Reads and updates the Zustand cart and handles quantity/removal/clear actions.             |
| `app/checkout/page.js`          | Server | Reads and verifies the authenticated session before providing the checkout page.           |
| `app/checkout/CheckoutForm.jsx` | Client | Handles form interaction, pending state, field feedback, and the Server Action submission. |
| `app/checkout/layout.js`        | Server | Provides route metadata and layout composition.                                            |

## Authentication and Orders

| File / component                    | Side   | Reason                                                                                    |
| ----------------------------------- | ------ | ----------------------------------------------------------------------------------------- |
| `app/signin/page.js`                | Server | Provides the sign-in route and any server-side session redirect logic.                    |
| `app/signin/SignInForm.jsx`         | Client | Handles form interaction and displays Server Action state.                                |
| `app/orders/page.js`                | Server | Reads the session and retrieves only the signed-in user's orders.                         |
| `app/orders/OrderTable.jsx`         | Server | Renders accessible order table markup and URL-based sorting/pagination links.             |
| `app/orders/ExportOrdersButton.jsx` | Client | Creates and downloads a CSV file using browser `File`, `Blob`, and object URL APIs.       |
| `app/orders/[id]/page.js`           | Server | Reads the session, retrieves the order, and checks ownership before rendering.            |
| `app/orders/[id]/OrderStatus.jsx`   | Client | Uses SWR to poll the order-status Route Handler.                                          |
| `app/orders/[id]/MapPanel.jsx`      | Client | Loads the browser-only Leaflet map dynamically and presents its related location details. |
| `app/orders/[id]/DeliveryMap.jsx`   | Client | Uses Leaflet/React Leaflet browser map components, markers, and map effects.              |

## Staff Pages and Data Visualization

| File / component                 | Side   | Reason                                                                        |
| -------------------------------- | ------ | ----------------------------------------------------------------------------- |
| `app/kitchen/page.js`            | Server | Verifies the staff session and reads the in-memory order list.                |
| `app/dashboard/page.js`          | Server | Verifies staff access, reads orders, and calculates summary/chart/table data. |
| `app/dashboard/RevenueChart.jsx` | Client | Renders the interactive Recharts visualization.                               |

## Server-Only Responsibilities

| File / area           | Responsibility                                                                                                                                |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `lib/menu.js`         | Fetches and normalizes the external menu API data. Use from server code unless a documented client-safe export exists.                        |
| `lib/session.js`      | Reads, verifies, creates, and clears the signed HTTP-only session cookie. Server-only.                                                        |
| `lib/auth.js`         | Verifies the configured demo credentials. Server-only.                                                                                        |
| `lib/db.js`           | Owns the in-memory mock order data and server-side order operations. Server-only.                                                             |
| `lib/schema.js`       | Defines validation schemas shared as appropriate; server actions and Route Handlers must perform server-side validation.                      |
| `app/actions.js`      | Server Actions for sign-in, sign-out, placing orders, and cancellation. These are server entry points and must authenticate/authorize writes. |
| `app/api/**/route.js` | Route Handlers for HTTP callers; validate input and authenticate/authorize protected operations.                                              |
| `proxy.js`            | Request-level redirects for protected route groups. It is an early gate, not the final session or ownership check.                            |

## Error Boundaries and Special Files

| File                                     | Side                     | Reason                                                                                 |
| ---------------------------------------- | ------------------------ | -------------------------------------------------------------------------------------- |
| `app/loading.js` and route loading files | Server-rendered fallback | Provide route loading UI while route content is pending.                               |
| `app/error.js` and route error files     | Client                   | Next.js error boundaries require a Client Component and an interactive reset callback. |
| `app/not-found.js`                       | Server                   | Renders the global unknown-route state.                                                |
| `app/menu/not-found.js`                  | Server                   | Renders the missing-dish state separately from the global 404.                         |
