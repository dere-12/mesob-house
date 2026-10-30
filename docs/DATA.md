# Mesob House — Data Fetching & Refresh Strategy

## 1. External Menu Data

The external menu API is the source of truth for dish information.

| Resource | Source                                                  |
| -------- | ------------------------------------------------------- |
| Menu     | `https://addis-eats-backend.onrender.com/menu/`         |
| Specials | `https://addis-eats-backend.onrender.com/menu/specials` |

The current application uses the main menu endpoint for menu browsing
and dish details.

### Server-side menu fetching

| Location               | Side         | Key / Source                          | Refresh rule                     |
| ---------------------- | ------------ | ------------------------------------- | -------------------------------- |
| `/menu`                | Server       | Main menu API URL                     | Revalidate every 3600 seconds    |
| `/menu/[id]`           | Server       | Main menu API URL, then match by slug | Revalidate every 3600 seconds    |
| `generateStaticParams` | Build server | Main menu API URL                     | Used during static generation    |
| `generateMetadata`     | Server       | Main menu API URL, then match by slug | Uses the shared menu fetch cache |
| `sitemap.js`           | Server       | Main menu API URL                     | Sitemap revalidates hourly       |

Reason: Dish information is public and changes occasionally, so hourly
revalidation avoids fetching the full menu for every page request.

The shared function is `getDishes()` in `lib/menu.js`.

## 2. Client-side Queries with SWR

| Component     | Key                          | Refresh rule                                                         | Reason                                                                   |
| ------------- | ---------------------------- | -------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| `SearchBox`   | `/api/dishes?q={searchTerm}` | Search debounced by 300 ms; SWR default focus/reconnect revalidation | Search updates without manually managing request races and loading state |
| `OrderStatus` | `/api/orders/{orderId}`      | Every 5 seconds                                                      | Demonstrates order-status polling                                        |
| `HeaderAuth`  | `/api/session`               | Revalidate on focus, reconnect, and route navigation                 | Keeps the displayed user information current                             |

### Search behavior

- The menu initially receives data from the Server Component.
- The initial data is supplied to SWR as `fallbackData`.
- A query is sent after the user stops typing for 300 ms.
- Search checks the English and Amharic dish names.
- There is no fixed polling interval for menu search.

### Order status behavior

- The order page provides initial status data from the server.
- SWR uses that data as `fallbackData`.
- The client requests `/api/orders/{orderId}` every five seconds.
- The API checks authentication and order ownership on every request.

### Header session behavior

- The client requests `/api/session`.
- The endpoint reads the signed session cookie.
- Only the user's name and role are returned.
- The response uses `Cache-Control: private, no-store`.
- The query is refreshed on browser focus, reconnect, and navigation.

## 3. Cart State

| Location           | Side   | Key                                | Refresh rule                                                     |
| ------------------ | ------ | ---------------------------------- | ---------------------------------------------------------------- |
| Zustand cart store | Client | `mesob-house-cart` in localStorage | Updated immediately by cart actions; rehydrated once after mount |

Cart data is private to the browser and remains in client-side state.

It does not use SWR or a remote database query.

The checkout Server Action receives the cart submission, verifies the
signed-in session, checks the submitted dish slugs against the current
menu API, and reconstructs item names and prices from the server data.

The browser's stored prices are not treated as authoritative.

## 4. In-memory Order Queries

The project uses the mock order store in `lib/db.js`.

| Location               | Side           | Query                   | Refresh rule                  |
| ---------------------- | -------------- | ----------------------- | ----------------------------- |
| `/orders`              | Server         | `getOrdersFor(user.id)` | Read on each page request     |
| `/orders/[id]`         | Server         | `getOrder(orderId)`     | Read on each page request     |
| `/kitchen`             | Server         | `db.order.findMany()`   | Read on each page request     |
| `/dashboard`           | Server         | `db.order.findMany()`   | Read on each page request     |
| `GET /api/orders/[id]` | Server handler | `getOrder(orderId)`     | Read for each polling request |

Reason: Orders are stored in memory, so the application reads the current
mock records when a page or endpoint is requested. These queries are not
durably stored or shared across server instances.

The kitchen and dashboard pages do not currently poll automatically.

## 5. Server Actions and Writes

| Action             | Data operation                                                                           |
| ------------------ | ---------------------------------------------------------------------------------------- |
| `signIn`           | Reads the demo credentials from environment configuration and creates a session cookie   |
| `signOut`          | Deletes the session cookie                                                               |
| `placeOrder`       | Reads the current menu, validates submitted items, and writes an order to the mock store |
| `cancelOrder`      | Checks ownership and updates the order status in the mock store                          |
| `POST /api/orders` | Validates an HTTP request and creates an authenticated mock order                        |

These are writes or authentication operations, not SWR queries.

The checkout UI primarily uses the `placeOrder` Server Action.

## 6. Dashboard Data

The dashboard reads the mock orders on the server.

It calculates:

- Total revenue from non-cancelled orders.
- Number of non-cancelled orders.
- Revenue grouped by neighbourhood.
- Sorted and paginated order rows.

`RevenueChart` receives its completed data as props. It does not fetch
the dashboard data independently.

The order table uses URL search parameters for sorting and pagination.

CSV export uses the rows already delivered to the table; it does not
make another API request.

## 7. Map Data

The delivery map uses demo coordinates provided by `lib/demo-locations.js`.

OpenStreetMap tile images are loaded by Leaflet from:

`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`

There is no live courier GPS query, WebSocket connection, or real-time
delivery location service.

## 8. Important Data Limitations

- Menu data comes from the external API.
- Orders are stored in a module-level in-memory array.
- Cart state is stored in browser localStorage.
- There is no persistent database.
- In-memory orders can disappear when the server process restarts.
- SWR polling updates the displayed status but does not make the mock
  database durable.
