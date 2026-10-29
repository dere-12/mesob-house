const description = "Track the status of an order placed through Addis Eats.";

export const metadata = {
  title: "Order Status",
  description,
  robots: {
    index: false,
    follow: false,
  },
};

export default function OrderDetailLayout({ children }) {
  return children;
}
