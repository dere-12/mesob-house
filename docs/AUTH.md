# Mesob House — Authentication & Authorization

## 1. How Authentication Works

This project uses demo customer and staff accounts stored in environment
variables. Registration and a real authentication provider are intentionally
not implemented.

After a successful sign-in:

1. The credentials are checked by `lib/auth.js`.
2. A signed session token is created by `lib/session.js`.
3. The token is stored in an HTTP-only cookie.
4. Protected pages verify the session before showing private content.

The cookie uses an HMAC-SHA256 signature, a seven-day expiry, HTTP-only,
SameSite=Lax, and Secure in production.

## 2. Protection Layers

| Layer                | File                              | What it proves                                                   |
| -------------------- | --------------------------------- | ---------------------------------------------------------------- |
| Request proxy        | `proxy.js`                        | Checks for a session cookie and redirects requests without one.  |
| Session verification | `lib/session.js`                  | Verifies the signature and expiry of the cookie.                 |
| Page authorization   | Individual protected pages        | Confirms the user is signed in and has the required role.        |
| Data ownership       | `lib/db.js` and protected actions | Ensures users access only their own orders.                      |
| Action validation    | `app/actions.js`                  | Rechecks the session and validates submitted data on the server. |
| API authorization    | `app/api/orders/`                 | Checks authentication and order ownership for HTTP requests.     |

Important: `proxy.js` checks only whether a cookie exists. It is a
convenience redirect layer, not proof that the cookie is valid. The actual
session verification happens through `getSession()`.

## 3. Private Routes

| Route          | Required access    | Server-side check                            |
| -------------- | ------------------ | -------------------------------------------- |
| `/checkout`    | Signed-in user     | `getSession()`; redirect if no valid session |
| `/orders`      | Signed-in customer | `getSession()` and `getOrdersFor(user.id)`   |
| `/orders/[id]` | Order owner        | Session check and `order.userId === user.id` |
| `/kitchen`     | Staff              | Session check and `user.role === "staff"`    |
| `/dashboard`   | Staff              | Session check and `user.role === "staff"`    |

The `/orders` proxy matcher also covers `/orders/[id]`.

## 4. Protected API Endpoints

| Endpoint               | Protection                                                                  |
| ---------------------- | --------------------------------------------------------------------------- |
| `GET /api/session`     | Reads the current session and returns only the user's name and role.        |
| `POST /api/orders`     | Verifies the session and validates the request with Zod.                    |
| `GET /api/orders/[id]` | Verifies the session, checks that the order exists, and verifies ownership. |

The order-status endpoint returns:

- `401` when the user is not authenticated.
- `404` when the order does not exist.
- `403` when the order belongs to another user.

## 5. Server Actions

| Action        | Protection                                                                                                             |
| ------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `signIn`      | Public action. Checks the configured demo credentials and creates a session.                                           |
| `signOut`     | Clears the session cookie.                                                                                             |
| `placeOrder`  | Requires a valid session, validates contact details, validates cart items, and checks dish slugs against the menu API. |
| `cancelOrder` | Requires a valid session, retrieves the order, checks ownership, and then cancels it.                                  |
