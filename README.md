# Dashboard Summary Stats -- Coding Challenge

This project is a small dashboard module built with **React**, **Redux
Toolkit**, and **Redux-Saga**.
It displays a set of summary statistics (new tickets, closed tickets,
replies, followers, products, earnings) and allows the user to refresh
the data with a loading indicator.

## 🚀 Tech Stack

-   React + TypeScript
-   Redux Toolkit
-   Redux-Saga
-   TailwindCSS
-   React Icons

## 🔧 Features

-   Global state management via Redux Toolkit slices
-   Async flows handled with sagas
-   Manual refresh with loading state
-   Percentage comparison between previous and current values
-   Clean UI built with TailwindCSS
-   Simple, extendable structure

## ▶️ Running Locally

``` bash
npm install
npm run dev
```

## 🔄 How the Data Flow Works

1.  The user clicks the refresh icon
2.  The component dispatches `dashboardSummaryStatsRequest()`
3.  `dashboardSaga` listens for the action
4.  Saga performs the API call
5.  The slice updates:
    -   `loading: true` → `loading: false`
    -   data replaced with fresh values
6.  React re-renders with the updated stats

## 🧪 Notes

-   Sagas were intentionally used to demonstrate scalable async control
    flow
-   The architecture allows easy extension for new dashboard widgets
-   Error handling can be extended (toasts, retries, fallback UI)

## 📸 Demo

![alt text](image.png)

## 🧑‍💻 Author

Built by **Ojong Clinton** as part of a coding challenge.
