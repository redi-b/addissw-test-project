import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  LabelList,
} from "recharts";
import { Theme } from "@emotion/react";
import {
  ChartContainer,
  CustomTooltip,
  Title,
} from "@/components/ui/Analytics";
import { YearCount } from "@/types";


interface Props {
  data: YearCount[];
  theme: Theme;
}

const CustomTooltipContent = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <CustomTooltip>
        <div className="label">{`Year: ${label}`}</div>
        <div className="value">{`${payload[0].value} song${
          payload[0].value === 1 ? "" : "s"
        }`}</div>
      </CustomTooltip>
    );
  }
  return null;
};

export default function YearChart({ data, theme }: Props) {
  const sorted = [...data].sort((a, b) => a.year - b.year);

  return (
    <ChartContainer>
      <Title>Songs Per Year</Title>
      <ResponsiveContainer width="100%" height={360}>
        <BarChart
          data={sorted}
          margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
          barSize={Math.max(30, 80 / (data.length || 1))}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={theme.colors.border}
            opacity={0.4}
          />
          <XAxis
            dataKey="year"
            stroke={theme.colors.muted.foreground}
            fontSize={14}
            tickMargin={15}
            angle={0}
            textAnchor="middle"
            height={40}
            interval={0}
          />
          <YAxis
            allowDecimals={false}
            stroke={theme.colors.muted.foreground}
            fontSize={14}
            tickMargin={10}
            width={40}
          />
          <Tooltip
            content={<CustomTooltipContent />}
            cursor={{ fill: theme.colors.secondary.background, opacity: 0.2 }}
          />
          <Legend
            formatter={() => (
              <span
                style={{ color: theme.colors.foreground, fontSize: "14px" }}
              >
                Number of Songs
              </span>
            )}
            wrapperStyle={{ paddingTop: "32px" }}
          />
          <Bar
            dataKey="count"
            fill={theme.colors.tertiary.background}
            activeBar={{ fill: theme.colors.tertiary.hover }}
            isAnimationActive={true}
            animationDuration={400}
            radius={[6, 6, 0, 0]}
          >
            <LabelList
              dataKey="count"
              position="top"
              style={{
                fill: theme.colors.secondary.foreground,
                fontSize: "12px",
                fontWeight: 500,
              }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
