import "./chart.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Chart({ title, data, dataKey, grid }) {

  return (
    <div className="chart">
      <h3 className="chartTitle">{title}</h3>
      <ResponsiveContainer width="100%" aspect={5 / 1}>
        <LineChart data={data}>
          <XAxis dataKey="desc" stroke="#01773e" />
          <YAxis> 
            <Label angle={270} position="left" style={{textAnchor:"middle"}}> Değerler</Label>
          </YAxis>
          
          <Line type="monotone" dataKey={dataKey} stroke="#01773e" />
          <Line type="monotone" dataKey="bookmark.length" stroke="#869b13" />
          <Line type="monotone" dataKey="statuscount.length" stroke="#ac1111" />
          <Tooltip />
          {grid && <CartesianGrid stroke="#ccddd5" strokeDasharray="15 15" />}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
