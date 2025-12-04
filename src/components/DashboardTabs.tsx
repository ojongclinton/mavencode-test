import { classNames } from "../helpers";

const DashboardTabs = ({
  setActiveTab,
  activeTab,
  dashBoardTabs,
}: {
  activeTab: { title: string; icon: any };
  setActiveTab: (v: { title: string; icon: any }) => void;
  dashBoardTabs: { title: string; icon: any }[];
}) => {
  return (
    <div className="flex gap-6">
      {dashBoardTabs.map((t) => {
        let isActive = activeTab.title === t.title;
        return (
          <p
            onClick={() => {
              setActiveTab(t);
            }}
            className={classNames(
              isActive
                ? "border-b border-[#4B87ED] text-[#4B87ED]"
                : " text-gray-400 hover:text-[#4B87ED] transition-colors duration-300",
              "py-4 text-sm flex items-center gap-[2px] cursor-pointer"
            )}
          >
            <t.icon /> {t.title}
          </p>
        );
      })}
    </div>
  );
};

export default DashboardTabs;
