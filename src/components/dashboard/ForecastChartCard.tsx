import { Link } from 'react-router-dom'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceArea,
  ReferenceLine,
} from 'recharts'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AlertTriangle } from 'lucide-react'
import { heroData } from '@/data/selectors'
import { formatCurrency, getDateForDay } from '@/lib/format'

const chartData = [
  { day: 1,  label: 'Oct 3',  actual: 10000, projected: undefined },
  { day: 4,  label: 'Oct 6',  actual: 9020,  projected: undefined },
  { day: 8,  label: 'Oct 10', actual: 6240,  projected: 6240 },
  { day: 12, label: 'Oct 14', actual: undefined, projected: 5320 },
  { day: 16, label: 'Oct 18', actual: undefined, projected: 4180 },
  { day: 20, label: 'Oct 22', actual: undefined, projected: 2840 },
  { day: 24, label: 'Oct 26', actual: undefined, projected: 1120 },
  { day: 26, label: 'Oct 28', actual: undefined, projected: 0, isDanger: true },
  { day: 28, label: 'Oct 30', actual: undefined, projected: -160, isDanger: true },
  { day: 30, label: 'Nov 1',  actual: undefined, projected: -320, isDanger: true },
]

function ForecastTooltip({
  active,
  payload,
}: {
  active?: boolean
  payload?: Array<{ value?: number; payload: { day?: number; label: string; isDanger?: boolean } }>
}) {
  if (!active || !payload?.length) return null
  const data = payload[0]
  const val = Number(data.value) || 0
  const isDanger = data.payload.isDanger || val <= 0
  const dayNum = data.payload.day

  return (
    <div className="bg-surface-raised border border-border rounded-[12px] p-2.5 shadow-md font-body text-xs">
      <p className="font-bold text-ink">
        {dayNum ? `${getDateForDay(dayNum)} (Day ${dayNum})` : data.payload.label}
      </p>
      <p className="font-mono text-sm font-semibold mt-0.5">
        <span className="text-ink-muted">Balance: </span>
        <span className={val <= 0 ? 'text-danger font-bold' : val < 2000 ? 'text-warning' : 'text-brand'}>
          {formatCurrency(val)}
        </span>
      </p>
      {isDanger && (
        <p className="text-[10px] text-danger font-semibold mt-1 flex items-center gap-1">
          <AlertTriangle size={11} /> Red Zone (₹0 reached)
        </p>
      )}
    </div>
  )
}

export function ForecastChartCard() {
  return (
    <Card className="h-full flex flex-col p-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
        <div>
          <h2 className="font-display font-[700] text-sm text-ink">Balance & Danger Zone Forecast</h2>
          <p className="font-body text-xs text-ink-muted">
            Solid green indicates actual spend up to Oct 10; dashed red shows projected burn.
          </p>
        </div>
        <Badge variant="danger" className="self-start sm:self-auto font-bold text-xs">
          <AlertTriangle size={11} className="mr-1" />
          Red Zone: {getDateForDay(heroData.dangerDay)} (Day {heroData.dangerDay})
        </Badge>
      </div>

      <div className="w-full flex-1 min-h-[220px]" aria-label="Balance forecast chart">
        <ResponsiveContainer width="100%" height={220}>
          <LineChart
            data={chartData}
            margin={{ top: 12, right: 32, left: -14, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" strokeOpacity={0.6} vertical={false} />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 11, fill: 'var(--ink-muted)', fontFamily: 'Manrope' }}
              axisLine={false}
              tickLine={false}
              interval="preserveStartEnd"
              padding={{ right: 18 }}
            />
            <YAxis
              tick={{ fontSize: 11, fill: 'var(--ink-muted)', fontFamily: 'JetBrains Mono' }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => formatCurrency(v, true)}
              domain={[-500, 11000]}
            />
            <Tooltip content={<ForecastTooltip />} />

            {/* Shaded Red Zone Area Below ₹0 */}
            <ReferenceArea
              y1={-500}
              y2={0}
              fill="var(--danger)"
              fillOpacity={0.12}
              stroke="var(--danger)"
              strokeOpacity={0.3}
            />

            {/* Zero line */}
            <ReferenceLine y={0} stroke="var(--danger)" strokeDasharray="3 3" strokeOpacity={0.6} />

            {/* Marker at Oct 28 (Danger Day) */}
            <ReferenceLine
              x="Oct 28"
              stroke="var(--danger)"
              strokeWidth={1.5}
              strokeDasharray="4 4"
              label={{
                value: 'Oct 28 (₹0)',
                position: 'top',
                fill: 'var(--danger)',
                fontSize: 10,
                fontWeight: 700,
              }}
            />

            {/* Solid line for actual spend up to Oct 10 */}
            <Line
              type="monotone"
              dataKey="actual"
              stroke="var(--brand)"
              strokeWidth={2.5}
              dot={{ r: 3.5, fill: 'var(--brand)' }}
              activeDot={{ r: 5, fill: 'var(--brand)' }}
              name="Actual Spend"
            />

            {/* Dashed red projection line from today to Nov 1 */}
            <Line
              type="monotone"
              dataKey="projected"
              stroke="var(--danger)"
              strokeWidth={2}
              strokeDasharray="4 4"
              dot={{ r: 3.5, fill: 'var(--danger)' }}
              activeDot={{ r: 5, fill: 'var(--danger)' }}
              name="Projected Burn"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Visible Red Zone Legend */}
      <div className="mt-2 pt-2 border-t border-border flex flex-wrap items-center justify-between gap-3 text-xs text-ink-muted">
        <div className="flex items-center gap-3.5">
          <span className="flex items-center gap-1.5 font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-brand" /> Actual (Oct 3–10)
          </span>
          <span className="flex items-center gap-1.5 font-medium">
            <span className="w-3 h-0.5 bg-danger border-b border-dashed border-danger" /> Projected (Oct 10–Nov 1)
          </span>
          {/* Visible Red Zone Tag */}
          <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-[5px] bg-danger-bg border border-danger/40 text-danger font-bold text-[11px]">
            <span className="w-2 h-2 rounded-[2px] bg-danger" />
            Red Zone (&lt;₹0 deficit)
          </span>
        </div>
        <Link to="/calendar" className="text-brand font-semibold hover:underline">
          View Calendar Grid →
        </Link>
      </div>
    </Card>
  )
}
