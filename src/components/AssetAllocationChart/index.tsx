"use client";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useState } from 'react';

interface AllocationData {
  type: string;
  percentage: number;
  value: number;
}

interface AssetAllocationChartProps {
  data: AllocationData[];
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b'];

export default function AssetAllocationChart({ data }: AssetAllocationChartProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handlePieEnter = (_: unknown, index: number) => {
    setActiveIndex(index);
  };

  const handlePieLeave = () => {
    setActiveIndex(null);
  };

  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ payload: AllocationData }> }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white dark:bg-zinc-800 p-2 sm:p-3 rounded-lg shadow-lg border border-gray-200 dark:border-zinc-700 text-xs sm:text-sm">
          <p className="font-semibold text-gray-900 dark:text-white">{data.type}</p>
          <p className="text-gray-600 dark:text-gray-300">
            {data.percentage}% • ₹{data.value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-soft p-4 sm:p-6 lg:p-8 border border-border-light dark:border-border-dark">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-4">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
          Asset Allocation
        </h2>
        <div className="flex flex-wrap items-center gap-2 sm:gap-4 w-full sm:w-auto">
          {data.map((item, index) => (
            <div key={item.type} className="flex items-center gap-1 sm:gap-2">
              <div 
                className="w-2 h-2 sm:w-3 sm:h-3 rounded-full flex-shrink-0" 
                style={{ backgroundColor: COLORS[index] }}
              />
              <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
                {item.type}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="h-48 sm:h-56 md:h-64 lg:h-72 mb-4 sm:mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius="40%"
              outerRadius="70%"
              paddingAngle={3}
              dataKey="percentage"
              onMouseEnter={handlePieEnter}
              onMouseLeave={handlePieLeave}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index % COLORS.length]}
                  stroke={activeIndex === index ? '#1e40af' : 'transparent'}
                  strokeWidth={activeIndex === index ? 2 : 0}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {data.map((item) => (
          <div key={item.type} className="text-center p-3 sm:p-4 rounded-lg bg-gray-50 dark:bg-zinc-800">
            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
              {item.percentage}%
            </div>
            <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1">
              {item.type}
            </div>
            <div className="text-sm sm:text-base lg:text-lg font-semibold text-gray-700 dark:text-gray-300">
              ₹{item.value.toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}