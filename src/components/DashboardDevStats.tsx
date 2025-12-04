import { FiTrash } from "react-icons/fi";
import { useAppSelector } from "../app/hooks";
import TablerMinimalLineChart from "../features/dashboard/LineChart";
import type { CommitActivity } from "../features/dashboard/types";
import InitialsAvatar from "./InitialsAvatar";
import DoughnutChart from "../features/dashboard/DoughnutChart";
import PieChart from "../features/dashboard/PieChart";

export const DevelopmentActivity = () => {
  const lineChartData = useAppSelector(
    (state) => state.dashboard.lineChart.data.points
  );
  const commitUsers = useAppSelector(
    (state) => state.dashboard.lineChart.data.usersData
  );
  return (
    <div className="bg-white border border-gray-200">
      <div className="border-b border-gray-200 p-4 text-gray-600">
        <p>Development Activity</p>
      </div>
      <div>
        <TablerMinimalLineChart chartData={lineChartData} />
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
                  <td className="py-2 text-gray-600">{u.commit}</td>
                  <td className="py-2 text-gray-600">{u.date}</td>
                  <td className="py-2 px-4">
                    <FiTrash className="text-gray-400" />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
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
      <div className="grid grid-cols-2 my-3 gap-5">
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
