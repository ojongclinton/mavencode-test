import type { UserType } from "./auth/types";
import type { SummaryStat } from "./dashboard/types";

let authorisedUsers: UserType[] = [
  {
    email: "user123@gmail.com",
    password: "user123",
    age: 43,
    fullName: "Jane Peterson",
    role: "Adminstrator",
    avatar: "https://avatar.iran.liara.run/public/41",
  },
  {
    email: "admin123@gmail.com",
    password: "admin123",
    age: 43,
    fullName: "Jane Peterson",
    role: "Adminstrator",
    avatar: "https://avatar.iran.liara.run/public/42",
  },
  {
    email: "test123@gmail.com",
    password: "test123",
    age: 43,
    fullName: "Jane Peterson",
    role: "Adminstrator",
    avatar: "https://avatar.iran.liara.run/public/43",
  },
];

export const fakeLoginApi = (
  username: string,
  password: string
): Promise<{ email: string; password: string; age: number }> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let theFoundUser = authorisedUsers.find(
        (user) => user.email === username && user.password === password
      );
      if (theFoundUser) {
        localStorage.setItem(
          "LoggedInUser",
          JSON.stringify({
            ...theFoundUser,
            expireAt: new Date(Date.now() + 7 * 60 * 60 * 1000),
          })
        );
        resolve(theFoundUser);
      } else {
        reject(new Error("Invalid credentials"));
      }
    }, 1000);
  });
};

export const getFakeDashboardStats = (): Promise<{
  users: number;
  sales: number;
  performance: number;
}> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ users: 1500, sales: 3200, performance: 85 });
    }, 3000);
  });
};

export const getFakeSummaryStats = (): Promise<
  SummaryStat[]
> => {
  const statsTemplate = [
    { code: "new_tickets", name: "New Tickets", min: 100, max: 1000 },
    { code: "closed_today", name: "Closed Today", min: 100, max: 1000 },
    { code: "new_replies", name: "New Replies", min: 100, max: 1500 },
    { code: "followers", name: "Followers", min: 500, max: 1000 },
    { code: "daily_earnings", name: "Daily Earnings", min: 10000, max: 200000 },
    { code: "products", name: "Products", min: 500, max: 1000 },
  ];

  const getRandom = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  return new Promise((resolve) => {
    setTimeout(() => {
      const stats = statsTemplate.map((stat) => {
        const previous = getRandom(stat.min, stat.max);
        const newValue =
          previous +
          getRandom(-Math.floor(stat.max / 5), Math.floor(stat.max / 5));
        return {
          code: stat.code,
          name: stat.name,
          previous,
          newValue,
        };
      });
      resolve(stats);
    }, 3000);
  });
};
