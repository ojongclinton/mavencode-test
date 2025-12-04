import { AreaChart, Area, ResponsiveContainer, Tooltip } from "recharts";


const developmentActivityData = [
  { name: "Jan", Purchases: 100 },
  { name: "Feb", Purchases: 350 },
  { name: "Mar", Purchases: 50 },
  { name: "Apr", Purchases: 130 },
  { name: "May", Purchases: 900 },
  { name: "Jun", Purchases: 230 },
  { name: "Jul", Purchases: 750 },
  { name: "Aug", Purchases: 490 },
  { name: "Sep", Purchases: 800 },
  { name: "Oct", Purchases: 944 },
  { name: "Nov", Purchases: 1300 },
  { name: "Dec", Purchases: 1050 },
];

// --- The React Component ---
const TablerMinimalLineChart = () => {
  return (
    <div style={{ width: "100%", height: 180 }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={developmentActivityData}
          margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
        >
          <defs>
            <linearGradient
              id="colorPurchasesMinimal"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="5%" stopColor="#4e79a7" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#4e79a7" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <Tooltip cursor={{ stroke: "#999", strokeDasharray: "3 3" }} />
          <Area
            type="linear"
            dataKey="Purchases"
            stroke="#4e79a7"
            fill="url(#colorPurchasesMinimal)"
            strokeWidth={2}
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TablerMinimalLineChart;
