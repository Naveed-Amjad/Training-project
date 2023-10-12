// library imports
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';
// style imports
const CustomLineChart = ({ data }) => {
  return (
        <LineChart
            width={630}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5
            }}
        >
            <CartesianGrid strokeDasharray="2 2" />
            <XAxis dataKey="name" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Line
                yAxisId="left"
                type="monotone"
                dataKey="pv"
                stroke="#FF8339"
                activeDot={{ r: 8 }}
            />
            <Line yAxisId="right" type="monotone" dataKey="uv" stroke="#87C5FF" />
        </LineChart>
  );
}

export default CustomLineChart;
