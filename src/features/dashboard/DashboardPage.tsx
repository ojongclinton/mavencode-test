import { useEffect, useState } from "react";
import TopAppBar from "../../components/TopAppBar";
import { dahsboardAllRequest } from "./dashboardSlice";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../app/hooks";
import {
  FiBox,
  FiCalendar,
  FiCheckSquare,
  FiHome,
  FiImage,
} from "react-icons/fi";
import { HiOutlineDocument } from "react-icons/hi2";
import { IoDocumentTextOutline } from "react-icons/io5";
import DashboardTabs from "../../components/DashboardTabs";
import DashboardStatsSummaries from "../../components/DashboardSummary";
import {
  DevelopmentActivity,
  PieCharts,
} from "../../components/DashboardDevStats";

const dashBoardTabs = [
  {
    title: "Home",
    icon: FiHome,
  },
  {
    title: "Interface",
    icon: FiBox,
  },
  {
    title: "Components",
    icon: FiCalendar,
  },
  {
    title: "Pages",
    icon: HiOutlineDocument,
  },
  {
    title: "Forms",
    icon: FiCheckSquare,
  },
  {
    title: "Gallery",
    icon: FiImage,
  },
  {
    title: "Documentation",
    icon: IoDocumentTextOutline,
  },
];

function DashboardPage() {
  const dashboardStuffs = useAppSelector((state) => state.dashboard);
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(dashBoardTabs[0]);

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
          <div className="border-b border-gray-200 bg-white">
            <div className="px-4 flex justify-between items-center max-w-7xl mx-auto">
              <DashboardTabs
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                dashBoardTabs={dashBoardTabs}
              />
            </div>
          </div>
          {activeTab.title === "Home" && <DashboardHome />}
          {activeTab.title === "Interface" && <p>Interface component</p>}
          {activeTab.title === "Components" && <p>Components component</p>}
          {activeTab.title === "Pages" && <p>Interface component</p>}
          {activeTab.title === "Forms" && <p>Forms component</p>}
          {activeTab.title === "Gallery" && <p>Gallery component</p>}
          {activeTab.title === "Documentation" && (
            <p>Documentation component</p>
          )}
        </>
      )}
    </div>
  );
}

export default DashboardPage;

const DashboardHome = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <DashboardStatsSummaries />
      <div className="grid grid-cols-12 gap-2 my-10 p-4">
        <div className="col-span-6">
          <DevelopmentActivity />
        </div>
        <div className="col-span-6">
          <PieCharts />
        </div>
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
