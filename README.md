# Mesob House

Mesob House is a responsive Ethiopian food-ordering and order-management
application built with Next.js.

The project demonstrates Next.js App Router, server-side data fetching,
client-side data synchronization, authentication, authorization,
validation, data visualization, and mapping.

## Features

### Customer Features

- Browse Ethiopian dishes.
- Search dishes by English and Amharic names.
- Filter dishes by category.
- View individual dish details.
- Add dishes to a persistent shopping cart.
- Update quantities and remove cart items.
- Submit orders after signing in.
- View personal order history.
- Track order status with periodic updates.
- View demonstration delivery locations on a map.

### Staff Features

- Access a staff-only kitchen page.
- View all orders in the kitchen.
- View dashboard order statistics.
- Visualize revenue by neighbourhood.
- Sort and paginate order records.

### Application Features

- Responsive desktop and mobile layouts.
- Server and Client Components.
- File-based routing and dynamic routes.
- Server Actions and Route Handlers.
- Zod validation on the server.
- Signed HTTP-only session cookies.
- Protected routes and role-based access.
- Metadata, Open Graph images, sitemap and robots configuration.
- Ethiopian birr and date formatting.
- Accessible forms, tables and navigation.

## Technology Stack

| Technology     | Purpose                               |
| -------------- | ------------------------------------- |
| Next.js        | Full-stack React framework            |
| React          | User interfaces                       |
| JavaScript     | Application language                  |
| Tailwind CSS 4 | Styling and responsive layouts        |
| SWR            | Client-side data fetching and polling |
| Zustand        | Shared shopping-cart state            |
| Zod            | Server-side validation                |
| Recharts       | Dashboard charts                      |
| Leaflet        | Delivery map                          |
| React Leaflet  | React integration for Leaflet         |
| Next Image     | Image optimization                    |
| Next Font      | Font optimization                     |
| Node.js Crypto | Signed session tokens                 |

## Project Structure

```text
mesob-house/
├── app/
│   ├── actions.js
│   ├── api/
│   │   ├── dishes/
│   │   ├── orders/
│   │   └── session/
│   ├── cart/
│   ├── checkout/
│   ├── dashboard/
│   ├── kitchen/
│   ├── menu/
│   ├── orders/
│   ├── signin/
│   ├── globals.css
│   ├── layout.js
│   ├── page.js
│   ├── providers.jsx
│   ├── sitemap.js
│   └── robots.js
├── components/
│   ├── Header.jsx
│   ├── HeaderAuth.jsx
│   ├── HeaderCart.jsx
│   └── Footer.jsx
├── lib/
│   ├── auth.js
│   ├── cart-store.js
│   ├── db.js
│   ├── dish-images.js
│   ├── format.js
│   ├── menu.js
│   ├── schema.js
│   ├── session.js
│   └── ...
├── public/
│   └── images/
├── proxy.js
├── doc/
│   └── DATA.md
|   └── STRATEGY.md
|   └── BOUNDARY.md
|   └── AUTH.md
├── README.md
```

## Live Project

Visit the deployed application:

- **Live Demo:** [Mesob House](http://mesob-house-neon.vercel.app/)
- **GitHub Repository:** [Mesob House Repository](https://github.com/dere-12/mesob-house.git)

**Demo Access**

The application provides demo accounts for exploring customer and staff features.

| Role     | Email                      | Password |
| -------- | -------------------------- | -------- |
| Customer | `customer@addiseats.local` | `1234`   |
| Staff    | `staff@addiseats.local`    | `1234`   |

You can also select **Customer** or **Staff** on the sign-in page to fill in the corresponding demo credentials automatically.

## Installation and Setup

Follow these steps to run Mesob House locally.

### Prerequisites

- [Node.js](https://nodejs.org/) (a supported version for the Next.js version used by this project)
- npm
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/dere-12/mesob-house.git
```

Navigate to the project directory:

```bash
cd mesob-house
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the project root and add the environment variables required by the application.

### 4. Start the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production

To create a production build, run:

```bash
npm run build
```

To start the production server after building, run:

```bash
npm run start
```

## Acknowledgments & Credits

This project was developed as part of the Full Stack Software Development Curriculum at IBT College under Module 3 (Frontend: React and Next.js).
