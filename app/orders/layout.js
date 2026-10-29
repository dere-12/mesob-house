const description =
  "View the status and details of orders placed through your Mesob House account.";

export const metadata = {
  title: "My Orders",
  description,
  robots: {
    index: false,
    follow: false,
  },
};

export default function OrdersLayout({ children }) {
  return children;
}
