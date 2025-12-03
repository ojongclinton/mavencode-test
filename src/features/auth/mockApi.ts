let authorisedUsers = [
  { email: "user123@gmail.com", password: "user123" },
  { email: "admin123@gmail.com", password: "admin123" },
  { email: "test123@gmail.com", password: "test123" },
];

export const fakeLoginApi = (
  username: string,
  password: string
): Promise<{ username: string }> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let theFoundUser = authorisedUsers.find(
        (user) => user.email === username && user.password === password
      );
      if (theFoundUser) {
        resolve({ username: theFoundUser.email });
      } else {
        reject(new Error("Invalid credentials"));
      }
    }, 4000);
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
