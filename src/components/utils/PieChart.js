// library imports
import { PieChart, Pie, Cell } from 'recharts';
// component imports

// Redux imports

// style imports
const CustomPieChart = ({ data, colors }) => {
  return (
        <PieChart width={300} height={260}>
            <Pie
                data={data}
                cx={140}
                cy={130}
                innerRadius={70}
                outerRadius={110}
                fill="#8884d8"
                paddingAngle={-1}
                dataKey="value"
            >
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
            </Pie>
        </PieChart>
  );
}

export default CustomPieChart;
