const description =
  "Complete your Mesob House order with your delivery and contact details.";

export const metadata = {
  title: "Checkout",
  description,
  alternates: {
    canonical: "/checkout",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function CheckoutLayout({ children }) {
  return children;
}
