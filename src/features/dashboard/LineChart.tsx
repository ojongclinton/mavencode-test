import { AreaChart, Area, ResponsiveContainer, Tooltip } from "recharts";




const TablerMinimalLineChart = ({chartData}:{
  chartData:{name:string;Purchases:number}[]
}) => {
  return (
    <div style={{ width: "100%", height: 180 }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={chartData}
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
