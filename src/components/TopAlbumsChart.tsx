import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  ChartContainer,
  CustomTooltip,
  Title,
} from "@/components/ui/Analytics";
import { Theme } from "@emotion/react";
import { AlbumCount } from "@/types";

interface Props {
  data: AlbumCount[];
  theme: Theme;
}

const CustomTooltipContent = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const albumName = payload[0].name || "No Album";
    return (
      <CustomTooltip>
        <div className="label">{albumName}</div>
        <div className="value">{`${payload[0].value} song${
          payload[0].value === 1 ? "" : "s"
        }`}</div>
      </CustomTooltip>
    );
  }
  return null;
};

const PIE_COLORS = [
  "#4F46E5", // Indigo
  "#10B981", // Emerald
  "#F59E0B", // Amber
  "#EF4444", // Red
  "#6366F1", // Blue-Violet
  "#14B8A6", // Teal
];

export default function TopAlbumsChart({ data, theme }: Props) {
  const transformed = data.slice(0, 6).map((item) => ({
    ...item,
    album: item.album || "No Album",
  }));

  return (
    <ChartContainer>
      <Title>Top Albums</Title>
      <ResponsiveContainer width="100%" height={360}>
        <PieChart margin={{ top: 0, bottom: 0 }}>
          <Pie
            data={transformed}
            dataKey="count"
            nameKey="album"
            cx="50%"
            cy="50%"
            outerRadius={110}
            innerRadius={40}
            label={({ name, percent }) =>
              `${name} ${percent ? `(${(percent * 100).toFixed(0)}%)` : ""}`
            }
            labelLine={{ stroke: "#8884d8" }}
            isAnimationActive
            animationDuration={400}
          >
            {transformed.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={PIE_COLORS[index % PIE_COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltipContent />} />
          <Legend
            verticalAlign="bottom"
            formatter={(value) => (
              <span
                style={{
                  color: theme.colors.foreground,
                  fontSize: "14px",
                }}
              >
                {value}
              </span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
