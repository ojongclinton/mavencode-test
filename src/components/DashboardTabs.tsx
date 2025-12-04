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

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTabTitle = event.target.value;
    const selectedTab = dashBoardTabs.find(t => t.title === selectedTabTitle);
    
    if (selectedTab) {
      setActiveTab(selectedTab);
    }
  };

  return (
    <>
      <div className="sm:hidden w-full mb-4">
        <label htmlFor="dashboard-select" className="sr-only">Select a Dashboard Tab</label>
        <select
          id="dashboard-select"
          value={activeTab.title}
          onChange={handleSelectChange}
          className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-[#4B87ED] focus:ring-[#4B87ED] sm:text-sm mt-3"
        >
          {dashBoardTabs.map((t) => (
            <option key={t.title} value={t.title}>
              {t.title}
            </option>
          ))}
        </select>
      </div>
      <div className="hidden sm:flex gap-6 border-b border-gray-200">
        {dashBoardTabs.map((t) => {
          let isActive = activeTab.title === t.title;
          return (
            <p
              key={t.title}
              onClick={() => {
                setActiveTab(t);
              }}
              className={classNames(
                isActive
                  ? "border-b-2 border-[#4B87ED] text-[#4B87ED]"
                  : " text-gray-400 hover:text-[#4B87ED] transition-colors duration-300",
                "py-3 text-sm flex items-center gap-[2px] cursor-pointer -mb-[1px]"
              )}
            >
              <t.icon /> {t.title}
            </p>
          );
        })}
      </div>
    </>
  );
};

export default DashboardTabs;
