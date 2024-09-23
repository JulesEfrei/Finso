import { eq } from "drizzle-orm";
import { client, db } from "./database";
import { users } from "../db/schema/user";
import bcrypt from "bcryptjs";
import { NewTransaction, transactions } from "../db/schema/transaction";

const transactionData = [
  {
    name: "Salary",
    amount: 3000,
    type: "income",
    category: "Income",
    date: "2024-09-01",
  },
  {
    name: "Rent",
    amount: 1200,
    type: "outcome",
    category: "Housing",
    date: "2024-09-05",
  },
  {
    name: "Groceries at Walmart",
    amount: 150,
    type: "outcome",
    category: "Groceries",
    date: "2024-09-07",
  },
  {
    name: "Dining at Italian Bistro",
    amount: 75,
    type: "outcome",
    category: "Dining",
    date: "2024-09-10",
  },
  {
    name: "Electricity Bill",
    amount: 100,
    type: "outcome",
    category: "Utilities",
    date: "2024-09-12",
  },
  {
    name: "Internet Bill",
    amount: 60,
    type: "outcome",
    category: "Utilities",
    date: "2024-09-15",
  },
  {
    name: "Freelance Income",
    amount: 500,
    type: "income",
    category: "Income",
    date: "2024-09-16",
  },
  {
    name: "Movie Night at Cinema",
    amount: 40,
    type: "outcome",
    category: "Entertainment",
    date: "2024-09-18",
  },
  {
    name: "Amazon Purchase",
    amount: 120,
    type: "outcome",
    category: "Shopping",
    date: "2024-09-20",
  },
  {
    name: "Fuel for Car",
    amount: 60,
    type: "outcome",
    category: "Transportation",
    date: "2024-09-22",
  },
  {
    name: "Gym Membership",
    amount: 50,
    type: "outcome",
    category: "Fitness",
    date: "2024-09-24",
  },
  {
    name: "Bonus Payment",
    amount: 700,
    type: "income",
    category: "Income",
    date: "2024-09-25",
  },
  {
    name: "Dinner at Sushi Place",
    amount: 85,
    type: "outcome",
    category: "Dining",
    date: "2024-09-27",
  },
  {
    name: "Spotify Subscription",
    amount: 10,
    type: "outcome",
    category: "Entertainment",
    date: "2024-09-28",
  },
  {
    name: "Water Bill",
    amount: 30,
    type: "outcome",
    category: "Utilities",
    date: "2024-09-29",
  },
  {
    name: "PayPal Refund",
    amount: 45,
    type: "income",
    category: "Refund",
    date: "2024-09-30",
  },
  {
    name: "Gift for Friend",
    amount: 100,
    type: "outcome",
    category: "Gifts",
    date: "2024-09-30",
  },
  {
    name: "Medical Checkup",
    amount: 200,
    type: "outcome",
    category: "Healthcare",
    date: "2024-10-01",
  },
  {
    name: "Groceries at Whole Foods",
    amount: 180,
    type: "outcome",
    category: "Groceries",
    date: "2024-10-03",
  },
  {
    name: "Bike Repair",
    amount: 55,
    type: "outcome",
    category: "Transportation",
    date: "2024-10-04",
  },
  {
    name: "Salary",
    amount: 3000,
    type: "income",
    category: "Income",
    date: "2024-10-01",
  },
  {
    name: "Coffee at Starbucks",
    amount: 6,
    type: "outcome",
    category: "Dining",
    date: "2024-10-06",
  },
  {
    name: "Taxi Ride",
    amount: 25,
    type: "outcome",
    category: "Transportation",
    date: "2024-10-07",
  },
  {
    name: "Books from Barnes & Noble",
    amount: 60,
    type: "outcome",
    category: "Shopping",
    date: "2024-10-09",
  },
  {
    name: "Gas Bill",
    amount: 40,
    type: "outcome",
    category: "Utilities",
    date: "2024-10-10",
  },
];

async function seedData() {
  console.log("Loading data fixtures...");

  // Check if the test user already exists
  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, "test@finso.com"))
    .limit(1);
  if (existingUser.length > 0) {
    console.log("Test user already exists, skipping seeding.");
    process.exit();
  }

  // Create a test user
  const hashedPassword = await bcrypt.hash("test", 15);
  const userId = await db
    .insert(users)
    .values({
      name: "Test User",
      email: "test@finso.com",
      password: hashedPassword,
    })
    .returning({ id: users.id });

  const td = transactionData.map((elm) => {
    return { ...elm, user: userId[0].id };
  });

  // Insert transactions into the database
  await db
    .insert(transactions)
    .values(td as NewTransaction[])
    .finally(() => client.end());

  console.log("Data Fixture has been successfully inserted.");
  console.log("You can log with 'test@finso.com' email and 'test' password");
}

await seedData();
