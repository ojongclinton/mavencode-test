import React from "react";
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { type DoughnutAndPieChartData } from "./types";

const RADIAN = Math.PI / 180;

interface CustomizedLabelProps {
  cx?: number;
  cy?: number;
  midAngle?: number;
  innerRadius?: number;
  outerRadius?: number;
  percent?: number;
}

const renderCustomizedLabel = ({
  cx = 0,
  cy = 0,
  midAngle = 0,
  innerRadius = 0,
  outerRadius = 90,
  percent = 0,
}: CustomizedLabelProps) => {
  // Calculates the position in the middle of the slice
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

interface PieChartProps {
  chartData: DoughnutAndPieChartData;
}

const PieChart: React.FC<PieChartProps> = ({ chartData }) => {
  const { data, colors } = chartData;
  const total = data.reduce((acc, item) => acc + item.value, 0);

  return (
    <div style={{ width: "100%", height: 210 }}>
      <ResponsiveContainer>
        <RechartsPieChart>
          <Pie
            data={data}
            innerRadius={0}
            outerRadius={90}
            dataKey="value"
            label={renderCustomizedLabel}
            labelLine={false}
            paddingAngle={0}
          >
            {data.map((_, index) => (
              <Cell
                key={`pie-cell-${index}`}
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
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChart;
