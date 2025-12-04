import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { useAppSelector } from "../app/hooks";
import type { SummaryStat } from "../features/dashboard/types";
import { classNames, formatNumber, percentageChange } from "../helpers";
import { IoReload } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { dashboardSummaryStatsRequest } from "../features/dashboard/dashboardSlice";

const DashboardStatsSummaries = () => {
  const allSummaryStats = useAppSelector(
    (state) => state.dashboard.summaryStats.data
  );

  const isLoading = useAppSelector(
    (state) => state.dashboard.summaryStats.loading
  );
  const dispatch = useDispatch();
  const new_tickets: SummaryStat = allSummaryStats.find(
    (s: SummaryStat) => s.code === "new_tickets"
  );
  const closed_today: SummaryStat = allSummaryStats.find(
    (s: SummaryStat) => s.code === "closed_today"
  );
  const new_replies: SummaryStat = allSummaryStats.find(
    (s: SummaryStat) => s.code === "new_replies"
  );
  const followers: SummaryStat = allSummaryStats.find(
    (s: SummaryStat) => s.code === "followers"
  );
  const daily_earnings = allSummaryStats.find(
    (s: SummaryStat) => s.code === "daily_earnings"
  );
  const products: SummaryStat = allSummaryStats.find(
    (s: SummaryStat) => s.code === "products"
  );

  const handleRefreshClick = () => {
    if (isLoading) return;
    dispatch(dashboardSummaryStatsRequest());
  };

  return (
    <div className="px-4">
      <div className="flex justify-between items-center">
        <p className="my-5">Dashboard</p>
        <div
          onClick={handleRefreshClick}
          className="cursor-pointer hover:bg-gray-100 rounded-full"
        >
          <IoReload
            size={20}
            className={classNames(isLoading ? "animate-spin" : "")}
          />
        </div>
      </div>
      {!isLoading && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {new_tickets && (
            <SingleSummaryCard
              code={new_tickets.code}
              name={new_tickets.name}
              previous={new_tickets.previous}
              newValue={new_tickets.newValue}
            />
          )}
          {closed_today && (
            <SingleSummaryCard
              code={closed_today.code}
              name={closed_today.name}
              previous={closed_today.previous}
              newValue={closed_today.newValue}
            />
          )}
          {new_replies && (
            <SingleSummaryCard
              code={new_replies.code}
              name={new_replies.name}
              previous={new_replies.previous}
              newValue={new_replies.newValue}
            />
          )}
          {followers && (
            <SingleSummaryCard
              code={followers.code}
              name={followers.name}
              previous={followers.previous}
              newValue={followers.newValue}
            />
          )}
          {daily_earnings && (
            <SingleSummaryCard
              code={daily_earnings.code}
              name={daily_earnings.name}
              previous={daily_earnings.previous}
              newValue={daily_earnings.newValue}
            />
          )}
          {products && (
            <SingleSummaryCard
              code={products.code}
              name={products.name}
              previous={products.previous}
              newValue={products.newValue}
            />
          )}
        </div>
      )}
      {isLoading && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-white p-3 border border-gray-200 animate-pulse"
            >
              <div className="flex justify-between">
                <p></p>
                <div className="h-3 w-10 bg-gray-200 rounded"></div>
              </div>
              <div className="flex flex-col items-center p-3 mt-2">
                <div className="h-6 w-16 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 w-20 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const SingleSummaryCard = ({
  name,
  previous,
  newValue,
  code,
}: {
  name: string;
  previous: number;
  newValue: number;
  code: string;
}) => {
  return (
    <div className="bg-white p-3 border border-gray-200">
      <div className="flex justify-between">
        <p></p>
        <p
          className={classNames(
            "text-xs flex items-center",
            newValue > previous
              ? "text-green-600"
              : previous > newValue
              ? "text-red-700"
              : "text-gray-500"
          )}
        >
          {percentageChange(previous, newValue)}
          {newValue > previous ? (
            <MdKeyboardArrowUp />
          ) : previous > newValue ? (
            <MdKeyboardArrowDown />
          ) : (
            ""
          )}
        </p>
      </div>
      <div className="flex flex-col items-center p-3">
        <p className="font-semibold text-xl text-gray-600">
          {formatNumber(newValue, {
            prefix: code === "daily_earnings" ? "$" : "",
          })}
        </p>

        <p className="text-xs text-gray-500">{name}</p>
      </div>
    </div>
  );
};

export default DashboardStatsSummaries;
