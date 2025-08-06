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
import { ArtistCount } from "@/types";

interface Props {
  data: ArtistCount[];
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

export default function ArtistChart({ data, theme }: Props) {
  return (
    <ChartContainer>
      <Title>Songs Per Artist</Title>
      <ResponsiveContainer width="100%" height={360}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
          barSize={Math.max(30, 80 / (data.length || 1))}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={theme.colors.border}
            opacity={0.4}
          />
          <XAxis
            dataKey="artist"
            stroke={theme.colors.muted.foreground}
            fontSize={14}
            tickMargin={15}
            angle={-30}
            textAnchor="end"
            height={50}
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
            fill={theme.colors.primary.background}
            activeBar={{ fill: theme.colors.primary.hover }}
            isAnimationActive={true}
            animationDuration={400}
            radius={[6, 6, 0, 0]}
          >
            <LabelList
              dataKey="count"
              position="top"
              style={{
                fill: theme.colors.primary.foreground,
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
