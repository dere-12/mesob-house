const description =
  "Review the Ethiopian dishes in your cart before continuing to checkout.";

export const metadata = {
  title: "Your Cart",
  description,
  alternates: {
    canonical: "/cart",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function CartLayout({ children }) {
  return children;
}
