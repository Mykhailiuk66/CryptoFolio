import { XAxis, YAxis, Tooltip, AreaChart, Area, Brush, ResponsiveContainer, CartesianGrid } from "recharts";
import { Payload } from "recharts/types/component/DefaultLegendContent";
import { DataKey } from "recharts/types/util/types";
import { formatCurrency } from "../../utils";


type CustomizedAxisTickProps = {
  x?: number;
  y?: number;
  angle?: number;
  payload?: {
    value: string | number | Date;
  };
}

type CustomAreaChartType<T> = {
  data: T[];
  xDataKey: DataKey<T>;
  yDataKey: DataKey<T>;
  showGrid?: boolean;
}
type CustomTooltipType = {
  active?: boolean;
  payload?: Payload[];
  label?: string;
}

const CustomizedAxisTick = ({ x, y, angle, payload }: CustomizedAxisTickProps) => (
  <g transform={`translate(${x},${y})`}>
    <text x={0} y={0} dy={12} fontSize={12} textAnchor="end" fill="#82ca9d" transform={`rotate(${angle ?? 0})`}>
      {payload!.value.toString()}
    </text>
  </g>
);


const CustomTooltip = ({ active, payload, label }: CustomTooltipType) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`${label}`}</p>
        <p className="intro">${formatCurrency(payload[0].value!)}</p>
      </div>
    );
  }

  return null;
};


const CustomAreaChart = <T,>({ data, xDataKey, yDataKey, showGrid }: CustomAreaChartType<T>) => {
  return (
    <ResponsiveContainer width="98%" height={350}>
      <AreaChart
        data={data}
        margin={{
          top: 10,
          right: 90,
          left: 50,
          bottom: 0,
        }}
        stackOffset="wiggle"
      >
        <XAxis
          tick={<CustomizedAxisTick angle={-35} />}
          height={60}
          dataKey={xDataKey}
          dy={100} />
        <YAxis
          tick={<CustomizedAxisTick />}
          dataKey={yDataKey}
          domain={['auto', (dataMax: number) => (dataMax * 1.05)]} />

        {showGrid && <CartesianGrid strokeDasharray="1 3"/>}

        <Tooltip content={<CustomTooltip />} />
        <XAxis dataKey="name" />
        <Area type="monotone" dataKey={yDataKey} stroke="#12A081" fill="#12A081" />
        <Brush dataKey={xDataKey} height={25} fill="#010100" stroke="#1ABF8B" />
      </AreaChart>
    </ResponsiveContainer>
  );
}


export default CustomAreaChart
