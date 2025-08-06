import {
  LineChart,
  Line,
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
import { MonthlyCount } from "@/types";

interface Props {
  data: MonthlyCount[];
  theme: Theme;
}

const CustomTooltipContent = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <CustomTooltip>
        <div className="label">{label}</div>
        <div className="value">{`${payload[0].value} song${
          payload[0].value === 1 ? "" : "s"
        }`}</div>
      </CustomTooltip>
    );
  }
  return null;
};

export default function MonthlyChart({ data, theme }: Props) {
  const transformed = data
    .map((d) => ({
      label: `${d.year}-${String(d.month).padStart(2, "0")}`,
      count: d.count,
    }))
    .sort((a, b) => a.label.localeCompare(b.label));

  return (
    <ChartContainer>
      <Title>Monthly Song Creation</Title>
      <ResponsiveContainer width="100%" height={360}>
        <LineChart
          data={transformed}
          margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={theme.colors.border}
            opacity={0.4}
          />
          <XAxis
            dataKey="label"
            stroke={theme.colors.muted.foreground}
            fontSize={14}
            tickMargin={15}
            angle={-30}
            textAnchor="end"
            height={50}
            interval="preserveStartEnd"
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
            cursor={{
              stroke: theme.colors.tertiary.background,
              strokeWidth: 1,
              opacity: 0.2,
            }}
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
          <Line
            type="monotone"
            dataKey="count"
            stroke={theme.colors.tertiary.background}
            strokeWidth={2}
            activeDot={{ r: 6, fill: theme.colors.tertiary.hover }}
            isAnimationActive={true}
            animationDuration={400}
          >
            <LabelList
              dataKey="count"
              position="top"
              style={{
                fill: theme.colors.tertiary.foreground,
                fontSize: "12px",
                fontWeight: 500,
              }}
            />
          </Line>
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
