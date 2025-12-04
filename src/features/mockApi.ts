import type { UserType } from "./auth/types";
import type { CommitActivity, SummaryStat } from "./dashboard/types";

const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

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

export const getFakeSummaryStats = (): Promise<SummaryStat[]> => {
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

const generateRandomProportionalData = (
  names: string[],
  minVal = 10,
  maxVal = 100
) => {
  return names.map((name: string) => ({
    name: name,
    value: getRandomInt(minVal, maxVal),
  }));
};

export const getFakeChartGraphsStats = () => {
  const doughnutChartData = {
    colors: ["#69c07f", "#a9d9b4"],
    data: generateRandomProportionalData(["Completed", "Pending"], 50, 150),
  };

  const pieChartData = {
    colors: ["#4e79a7", "#7fa7c7", "#a9d9e6", "#333333"],
    data: generateRandomProportionalData(
      ["Chrome", "Firefox", "Safari", "Edge"],
      20,
      120
    ),
  };

  return {
    doughnutChart: doughnutChartData,
    pieChart: pieChartData,
  };
};

export const getFakeLinearChartData = () => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const minPurchase = 100;
  const maxPurchase = 1500;

  let purchases = months.map((month) => {
    const randomValue = getRandomInt(minPurchase, maxPurchase);
    return { name: month, Purchases: randomValue };
  });

  let allCommitActivities: CommitActivity[] = [
    {
      avatarUrl: "https://avatar.iran.liara.run/public/41",
      name: "Ojong Clinton",
      commit: "Mobile responsive fixes",
      date: "May 6 2015",
    },
    {
      avatarUrl: "https://avatar.iran.liara.run/public/49",
      name: "Robald Bradley",
      commit: "Main structrue",
      date: "July 19 2015",
    },
    {
      avatarUrl: "https://avatar.iran.liara.run/public/43",
      name: "Takang brandon",
      commit: "Latest Footer fixes",
      date: "Dec. 2015",
    },
    {
      avatarUrl: "https://avatar.iran.liara.run/public/44",
      name: "Nji karlson",
      commit: "Peer programming",
      date: "July 22 2014",
    },
    {
      avatarUrl: "https://avatar.iran.liara.run/public/45",
      name: "Beverly Armstrong",
      commit: "Sidebar adjustments",
      date: "April 15 2018",
    },
    {
      avatarUrl: "https://avatar.iran.liara.run/public/46",
      name: "Russell Gibson",
      commit: "Initial commit",
      date: "May 6 2018",
    },
    {
      avatarUrl: "https://avatar.iran.liara.run/public/47",
      name: "Ronald Bradley",
      commit: "Main structure",
      date: "April 22 2018",
    },
    {
      avatarUrl: "https://avatar.iran.liara.run/public/48",
      name: "Jessica Smith",
      commit: "Updated endpoints",
      date: "June 10 2020",
    },
  ];

  const shuffledActivities = shuffleArray(allCommitActivities);
  const randomCount = getRandomInt(4, 6);
  let usersData = shuffledActivities.slice(0, randomCount);

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ points: purchases, usersData: usersData });
    }, 3000);
  });
};
