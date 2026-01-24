import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { setorData } from "@/data/mockData";

interface HorizontalBarChartProps {
  title: string;
  description?: string;
}

export function HorizontalBarChart({ title, description }: HorizontalBarChartProps) {
  // Sort by quantidade descending and take top 8
  const sortedData = [...setorData]
    .sort((a, b) => b.quantidade - a.quantidade)
    .slice(0, 8);

  return (
    <Card className="card-hover">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={sortedData}
              layout="vertical"
              margin={{ top: 10, right: 30, left: 80, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" horizontal={false} />
              <XAxis
                type="number"
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => value.toLocaleString("pt-BR")}
                className="text-muted-foreground"
              />
              <YAxis
                type="category"
                dataKey="setor"
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                className="text-muted-foreground"
                width={75}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
                formatter={(value: number) => [
                  value.toLocaleString("pt-BR") + " empresas",
                  "Total",
                ]}
              />
              <Bar
                dataKey="quantidade"
                fill="hsl(var(--chart-1))"
                radius={[0, 4, 4, 0]}
                barSize={24}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
