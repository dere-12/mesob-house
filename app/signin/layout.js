const description =
  "Sign in to Addis Eats to manage your orders and continue to checkout.";

export const metadata = {
  title: "Sign In",
  description,
  alternates: {
    canonical: "/signin",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function SignInLayout({ children }) {
  return children;
}
