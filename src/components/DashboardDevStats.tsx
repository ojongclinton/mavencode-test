import { FiInbox, FiTrash } from "react-icons/fi";
import { useAppSelector } from "../app/hooks";
import TablerMinimalLineChart from "../features/dashboard/LineChart";
import type { CommitActivity } from "../features/dashboard/types";
import InitialsAvatar from "./InitialsAvatar";
import DoughnutChart from "../features/dashboard/DoughnutChart";
import PieChart from "../features/dashboard/PieChart";
import { IoReload } from "react-icons/io5";
import { useDispatch } from "react-redux";
import {
  dashboardLineChartRequest,
  dashboardSetActivityUserList,
} from "../features/dashboard/dashboardSlice";
import { classNames } from "../helpers";

export const DevelopmentActivity = () => {
  const lineChartData = useAppSelector(
    (state) => state.dashboard.lineChart.data.points
  );
  const commitUsers = useAppSelector(
    (state) => state.dashboard.lineChart.data.usersData
  );
  const dispatch = useDispatch();
  const isLoading = useAppSelector(
    (state) => state.dashboard.lineChart.loading
  );

  const handleDelete = (name: string) => {
    dispatch(
      dashboardSetActivityUserList(commitUsers.filter((c) => c.name !== name))
    );
  };

  const handleRefreshClick = () => {
    if (isLoading) return;
    dispatch(dashboardLineChartRequest());
  };
  return (
    <div className="bg-white border border-gray-200">
      <div className="border-b border-gray-200 p-4 text-gray-600 flex justify-between items-center">
        <p>Development Activity</p>
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
      <div>
        <TablerMinimalLineChart chartData={lineChartData} />
      </div>
      <div className="w-full">
        {!isLoading && commitUsers.length > 0 && (
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="text-sm font-normal text-left py-2 text-gray-500 px-4">
                  USER
                </th>
                <th className="text-sm font-normal text-left py-2 text-gray-500 hidden md:block">
                  COMMIT
                </th>
                <th className="text-sm font-normal text-left py-2 text-gray-500">
                  DATE
                </th>
                <th className="text-sm font-normal text-left py-2 px-4 hidden md:block"></th>
              </tr>
            </thead>

            <tbody>
              {commitUsers.map((u: CommitActivity) => {
                return (
                  <tr className="border-b border-gray-300">
                    <td className="py-4 px-4">
                      <div className="flex gap-4 items-center">
                        <InitialsAvatar
                          fullName={u.name}
                          avatarUrl={u.avatarUrl}
                        />
                        <p className="text-gray-600">{u.name}</p>
                      </div>
                    </td>
                    <td className="py-2 text-gray-600 hidden md:block">
                      {u.commit}
                    </td>
                    <td className="py-2 text-gray-600">{u.date}</td>
                    <td className="mt-5 px-4 hidden md:block cursor-pointer ">
                      <FiTrash
                        className="text-gray-400 hover:text-red-300"
                        onClick={() => {
                          handleDelete(u.name);
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        {!isLoading && commitUsers.length === 0 && (
          <div className="w-full flex flex-col items-center justify-center py-10 text-center text-gray-500">
            <div className="p-4 bg-gray-100 rounded-full mb-4">
              <FiInbox size={28} className="text-gray-400" />
            </div>
            <p className="font-semibold text-gray-600">No records found</p>
            <p className="text-sm text-gray-400 mt-1">
              There’s nothing to display here yet
            </p>
          </div>
        )}

        {isLoading && (
          <table className="w-full border-collapse animate-pulse">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="text-sm font-normal text-left py-2 text-gray-500 px-4">
                  USER
                </th>
                <th className="text-sm font-normal text-left py-2 text-gray-500 hidden md:visible">
                  COMMIT
                </th>
                <th className="text-sm font-normal text-left py-2 text-gray-500">
                  DATE
                </th>
                <th className="text-sm font-normal text-left py-2 px-4 hidden md:visible"></th>
              </tr>
            </thead>

            <tbody>
              {[...Array(5)].map((_, i) => (
                <tr key={i} className="border-b border-gray-300">
                  <td className="py-4 px-4">
                    <div className="flex gap-4 items-center">
                      <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
                      <div className="h-4 w-24 bg-gray-200 rounded"></div>
                    </div>
                  </td>

                  <td className="py-4 hidden md:visible">
                    <div className="h-4 w-32 bg-gray-200 rounded"></div>
                  </td>

                  <td className="py-4">
                    <div className="h-4 w-20 bg-gray-200 rounded"></div>
                  </td>

                  <td className="px-4 py-4 hidden md:visible">
                    <div className="h-4 w-4 bg-gray-200 rounded"></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export const PieCharts = () => {
  const doughnutChartData = useAppSelector(
    (state) => state.dashboard.graphsStats.data.doughnutChart
  );
  const pieChartData = useAppSelector(
    (state) => state.dashboard.graphsStats.data.pieChart
  );
  return (
    <div>
      <div className="bg-blue-200 p-4 border border-gray-200">
        <p className="text-blue-700">
          <span className="font-semibold">Read our documentation</span> with
          code samples
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 my-3 gap-5">
        <div className="bg-white border border-gray-200">
          <div className="border-b border-gray-200 p-3">
            <p>Chart Title</p>
          </div>
          {doughnutChartData && (
            <div>
              <DoughnutChart chartData={doughnutChartData} />
            </div>
          )}
        </div>
        <div className="bg-white border border-gray-200">
          <div className="border-b border-gray-200 p-3">
            <p>Chart Title</p>
          </div>

          {pieChartData && (
            <div>
              <PieChart chartData={pieChartData} />
            </div>
          )}
        </div>
        <div className="bg-white border border-gray-200">
          <div className="border-b border-gray-200 p-3">
            <p>Chart Title</p>
          </div>
          {pieChartData && (
            <div>
              <PieChart chartData={pieChartData} />
            </div>
          )}
        </div>
        <div className="bg-white border border-gray-200">
          <div className="border-b border-gray-200 p-3">
            <p>Chart Title</p>
          </div>
          {doughnutChartData && (
            <div>
              <DoughnutChart chartData={doughnutChartData} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
