export type SummaryStat = {
  newValue: number;
  previous: number;
  code: string;
  name: string;
};

export interface ChartDataItem {
  name: string;
  value: number;
  [key: string]: any;
}

export interface DoughnutAndPieChartData {
  data: ChartDataItem[];
  colors: string[];
}

export interface LineChartItem {
  name: string;
  Purchases: number;
}

export interface CommitActivity {
  avatarUrl?: string;
  name: string;
  commit: string;
  date: string;
}
