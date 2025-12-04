import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { type DoughnutAndPieChartData } from "./types";

const RADIAN = Math.PI / 180;

interface CustomizedLabelProps {
  cx: number;
  cy: number;
  midAngle?: number;
  innerRadius: number;
  outerRadius: number;
  percent?: number;
}

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle = 0,
  innerRadius,
  outerRadius,
  percent = 0,
}: CustomizedLabelProps) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize="12px"
      fontWeight="bold"
    >
      {`${(percent * 100).toFixed(1)}%`}
    </text>
  );
};

interface DoughnutChartProps {
  chartData: DoughnutAndPieChartData;
}

const DoughnutChart: React.FC<DoughnutChartProps> = ({ chartData }) => {
  const { data, colors } = chartData;
  const total = data.reduce((acc, item) => acc + item.value, 0);

  return (
    <div style={{ width: "100%", height: 210 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            innerRadius={60}
            outerRadius={90}
            dataKey="value"
            label={renderCustomizedLabel}
            labelLine={false}
            paddingAngle={0}
          >
            {data.map((_, index) => (
              <Cell
                key={`doughnut-cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number, name: string) => {
              const percentage = total > 0 ? (value / total) * 100 : 0;
              return [`${percentage.toFixed(1)}%`, name];
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DoughnutChart;
