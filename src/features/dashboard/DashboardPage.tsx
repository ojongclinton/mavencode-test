import { useEffect } from "react";
import TopAppBar from "../../components/TopAppBar";
import { classNames, formatNumber, percentageChange } from "../../helpers";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import { dahsboardAllRequest } from "./dashboardSlice";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../app/hooks";
import type { SummaryStat } from "./types";
import { FiTrash } from "react-icons/fi";
import InitialsAvatar from "../../components/InitialsAvatar";
import TablerLineChart from "./LineChart";
import DoughnutChartExample from "./DoughnutChart";
import FourSegmentPieChart from "./PieChart";

function DashboardPage() {
  const dashboardStuffs = useAppSelector((state) => state.dashboard);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(dahsboardAllRequest());
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      {dashboardStuffs.loading ? (
        <DashboardLoading />
      ) : (
        <>
          <TopAppBar />
          {/*Quick Stats summaries*/}
          <DashboardStatsSummaries />

          {/*Graphs sections*/}
          <div className="grid grid-cols-12 gap-2 my-10 p-4">
            <div className="col-span-6">
              <DevelopmentActivity />
            </div>
            <div className="col-span-6">
              <PieCharts />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default DashboardPage;

const DashboardStatsSummaries = () => {
  const allSummaryStats = useAppSelector(
    (state) => state.dashboard.summaryStats.data
  );
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
  return (
    <div className="px-4">
      <p className="my-5">Dashboard</p>
      <div className="grid grid-cols-6 gap-4">
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

const DashboardLoading = () => {
  return (
    <div>
      <div className="w-full h-20 bg-gray-100 animate-pulse border-b border-gray-200 p-3">
        <div className="flex justify-between">
          <div className="h-10 w-[200px] bg-gray-200 rounded-md"></div>
          <div className="flex gap-4">
            <div className="h-10 w-[50px] bg-gray-200 rounded-md"></div>
            <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
            <div className="h-10 w-[200px] bg-gray-200 rounded-md"></div>
          </div>
        </div>
      </div>
      <div className="w-full h-15 bg-gray-100 animate-pulse border-b border-gray-200"></div>
    </div>
  );
};

const DevelopmentActivity = () => {
  return (
    <div className="bg-white border border-gray-200">
      <div className="border-b border-gray-200 p-4 text-gray-600">
        <p>Development Activity</p>
      </div>
      <div>
        <TablerLineChart />
      </div>
      <div className="w-full">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-300">
              <th className="text-sm font-normal text-left py-2 text-gray-500 px-4">
                USER
              </th>
              <th className="text-sm font-normal text-left py-2 text-gray-500">
                COMMIT
              </th>
              <th className="text-sm font-normal text-left py-2 text-gray-500">
                DATE
              </th>
              <th className="text-sm font-normal text-left py-2 px-4"></th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-b border-gray-300">
              <td className="py-4 px-4">
                <div className="flex gap-4 items-center">
                  <InitialsAvatar fullName="William Clinton" />
                  <p className="text-gray-600">Ronald Bradley</p>
                </div>
              </td>
              <td className="py-2 text-gray-600">Initial commit</td>
              <td className="py-2 text-gray-600">May 6 2018</td>
              <td className="py-2 px-4">
                <FiTrash className="text-gray-400" />
              </td>
            </tr>
            <tr className="border-b border-gray-300">
              <td className="py-4 px-4">
                <div className="flex gap-4 items-center">
                  <InitialsAvatar fullName="William Clinton" />
                  <p className="text-gray-700">Russel Gibson</p>
                </div>
              </td>
              <td className="py-2 text-gray-600">Main Structure</td>
              <td className="py-2 text-gray-600">May 6 2018</td>
              <td className="py-2 px-4">
                <FiTrash className="text-gray-400" />
              </td>
            </tr>
            <tr className="border-b border-gray-300">
              <td className="py-4 px-4">
                <div className="flex gap-4 items-center">
                  <InitialsAvatar fullName="William Clinton" />
                  <p className="text-gray-600">Beverly Armstrong</p>
                </div>
              </td>
              <td className="py-2 text-gray-600">Left sidebar adjustments</td>
              <td className="py-2 text-gray-600">May 6 2018</td>
              <td className="py-2 px-4">
                <FiTrash className="text-gray-400" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

const PieCharts = () => {
  return (
    <div>
      <div className="bg-blue-200 p-4 border border-gray-200">
        <p className="text-blue-700">
          <span className="font-semibold ">Read our documentation</span> with
          code samples
        </p>
      </div>
      <div className="grid grid-cols-2 my-3 gap-5">
        <div className="bg-white border border-gray-200">
          <div className="border-b border-gray-200 p-3">
            <p>Chart Title</p>
          </div>
          <div>
            <DoughnutChartExample />
          </div>
        </div>
        <div className="bg-white border border-gray-200">
          <div className="border-b border-gray-200 p-3">
            <p>Chart Title</p>
          </div>
          <FourSegmentPieChart />
        </div>
        <div className="bg-white border border-gray-200">
          <div className="border-b border-gray-200 p-3">
            <p>Chart Title</p>
          </div>
          <FourSegmentPieChart />
        </div>
        <div className="bg-white border border-gray-200">
          <div className="border-b border-gray-200 p-3">
            <p>Chart Title</p>
          </div>
          <DoughnutChartExample />
        </div>
      </div>
    </div>
  );
};
