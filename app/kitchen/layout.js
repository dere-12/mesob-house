const description =
  "Staff-only dashboard for viewing and preparing Mesob House orders.";

export const metadata = {
  title: "Kitchen Dashboard",
  description,
  robots: {
    index: false,
    follow: false,
  },
};

export default function KitchenLayout({ children }) {
  return children;
}
