import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";
import { timeSeriesData } from "@/data/mockData";

interface BarChartCardProps {
  title: string;
  description?: string;
}

export function BarChartCard({ title, description }: BarChartCardProps) {
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
              data={timeSeriesData}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="period"
                tick={{ fontSize: 11 }}
                tickLine={false}
                axisLine={false}
                className="text-muted-foreground"
              />
              <YAxis
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => value.toLocaleString("pt-BR")}
                className="text-muted-foreground"
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
                labelStyle={{ color: "hsl(var(--foreground))" }}
                formatter={(value: number, name: string) => [
                  value.toLocaleString("pt-BR"),
                  name === "aberturas" ? "Aberturas" : "Fechamentos",
                ]}
              />
              <Legend
                wrapperStyle={{ paddingTop: "20px" }}
                formatter={(value) =>
                  value === "aberturas" ? "Aberturas" : "Fechamentos"
                }
              />
              <Bar
                dataKey="aberturas"
                fill="hsl(var(--chart-1))"
                radius={[4, 4, 0, 0]}
                name="aberturas"
              />
              <Bar
                dataKey="fechamentos"
                fill="hsl(var(--chart-6))"
                radius={[4, 4, 0, 0]}
                name="fechamentos"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
