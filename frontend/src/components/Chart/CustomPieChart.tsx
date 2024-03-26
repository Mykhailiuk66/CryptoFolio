import { useState } from 'react';
import { PieChart, Pie, Sector, ResponsiveContainer } from 'recharts';
import { PieSectorDataItem } from 'recharts/types/polar/Pie';
import { formatCurrency } from '../../utils';

interface CustomPieSectorDataItem extends PieSectorDataItem {
  middleLabelKey: string;
}

type CustomPieChartType<T> = {
  data: T[];
  middleLabelKey: string;
  labelKey: string
}

const renderActiveShape = (props: CustomPieSectorDataItem) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle,
    endAngle, fill, payload, value, middleLabelKey } = props;
  const sin = Math.sin(-RADIAN * midAngle!);
  const cos = Math.cos(-RADIAN * midAngle!);
  const sx = cx! + (outerRadius! + 10) * cos;
  const sy = cy! + (outerRadius! + 10) * sin;
  const mx = cx! + (outerRadius! + 30) * cos;
  const my = cy! + (outerRadius! + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  const mlk = (payload! as any)[middleLabelKey];

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {mlk}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius! + 6}
        outerRadius={outerRadius! + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#82ca9d">{`$${formatCurrency(value!)}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999" />

    </g>
  );
};



const CustomPieChart = <T,>({ data, middleLabelKey, labelKey }: CustomPieChartType<T>) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={800} height={800}>
        <Pie
          activeIndex={activeIndex}
          paddingAngle={3}
          activeShape={(props: PieSectorDataItem) => {
            const eProps: CustomPieSectorDataItem = {
              ...props,
              middleLabelKey,
            }

            return renderActiveShape(eProps)
          }}
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={80}
          outerRadius={100}
          fill="#12A081"
          dataKey={labelKey}
          onMouseEnter={onPieEnter}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CustomPieChart;
