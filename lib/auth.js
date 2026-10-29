const users = [
  {
    id: "user_customer_1",
    name: "Abel Dawit",
    email: process.env.DEMO_CUSTOMER_EMAIL,
    role: "customer",
    password: process.env.DEMO_CUSTOMER_PASSWORD,
  },
  {
    id: "user_staff_1",
    name: "Kitchen Staff",
    email: process.env.DEMO_STAFF_EMAIL,
    role: "staff",
    password: process.env.DEMO_STAFF_PASSWORD,
  },
];

export async function authenticateUser(email, password) {
  const normalizedEmail = String(email ?? "")
    .trim()
    .toLowerCase();

  const user = users.find(
    (item) => item.email?.toLowerCase() === normalizedEmail,
  );

  if (!user || !user.password) {
    return null;
  }

  const passwordIsValid = user.password === String(password ?? "");

  if (!passwordIsValid) {
    return null;
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
}
