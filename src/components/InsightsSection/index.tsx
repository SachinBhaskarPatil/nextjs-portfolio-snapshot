"use client";
import { HiLightBulb, HiTrendingUp, HiTrendingDown, HiShieldCheck } from 'react-icons/hi';
import { useState } from 'react';

interface Holding {
  name: string;
  type: string;
  invested: number;
  current: number;
  return: number;
  sipActive: boolean;
}

interface InsightsSectionProps {
  holdings: Holding[];
}

export default function InsightsSection({ holdings }: InsightsSectionProps) {
  const [tooltip, setTooltip] = useState<{ text: string; x: number; y: number } | null>(null);
  
  const totalInvested = holdings.reduce((sum, holding) => sum + holding.invested, 0);
  const totalCurrent = holdings.reduce((sum, holding) => sum + holding.current, 0);
  const totalReturn = totalCurrent - totalInvested;
  const totalReturnPercent = (totalReturn / totalInvested) * 100;

  const bestPerformer = holdings.reduce((best, holding) => 
    holding.return > best.return ? holding : best
  );

  const worstPerformer = holdings.reduce((worst, holding) => 
    holding.return < worst.return ? holding : worst
  );

  const activeSIPs = holdings.filter(holding => holding.sipActive).length;

  const insights = [
    {
      icon: HiTrendingUp,
      title: 'Top Performing Asset',
      value: bestPerformer.name,
      subtitle: `${bestPerformer.return.toFixed(2)}% return`,
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-50 dark:bg-green-900/20'
    },
    {
      icon: HiTrendingDown,
      title: 'Poor Performing Fund',
      value: worstPerformer.name,
      subtitle: `${worstPerformer.return.toFixed(2)}% return`,
      color: 'text-red-600 dark:text-red-400',
      bgColor: 'bg-red-50 dark:bg-red-900/20'
    },
    {
      icon: HiLightBulb,
      title: 'Recommended Rebalancing Alert',
      value: totalReturnPercent > 0 ? 'Good' : 'Needs Review',
      subtitle: `${totalReturnPercent.toFixed(2)}% overall return`,
      color: totalReturnPercent > 0 ? 'text-green-600 dark:text-green-400' : 'text-yellow-600 dark:text-yellow-400',
      bgColor: totalReturnPercent > 0 ? 'bg-green-50 dark:bg-green-900/20' : 'bg-yellow-50 dark:bg-yellow-900/20'
    }
  ];

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-soft border border-border-light dark:border-border-dark">
      <div className="px-4 sm:px-6 lg:px-8 py-3 sm:py-4 border-b border-border-light dark:border-border-dark">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
          Insights & Recommendations
        </h2>
      </div>
      
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
          {insights.map((insight, index) => (
            <div key={index} className={`p-3 sm:p-4 rounded-lg ${insight.bgColor} border border-gray-200 dark:border-gray-700`}>
              <div className="flex items-start gap-2 sm:gap-3">
                <div className={`p-1.5 sm:p-2 rounded-lg ${insight.bgColor} flex-shrink-0`}>
                  <insight.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${insight.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                    {insight.title}
                  </h3>
                  <p 
                    className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 dark:text-white mt-1 truncate cursor-help"
                    onMouseEnter={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      setTooltip({
                        text: insight.value,
                        x: rect.left + rect.width / 2,
                        y: rect.top - 10
                      });
                    }}
                    onMouseLeave={() => setTooltip(null)}
                  >
                    {insight.value}
                  </p>
                  <p className={`text-xs sm:text-sm font-medium ${insight.color} mt-1 truncate`}>
                    {insight.subtitle}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {tooltip && (
        <div 
          className="fixed z-50 px-3 py-2 text-sm font-medium text-white bg-gray-900 dark:bg-white dark:text-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 pointer-events-none transition-opacity duration-200"
          style={{
            left: tooltip.x,
            top: tooltip.y,
            transform: 'translateX(-50%) translateY(-100%)'
          }}
        >
          {tooltip.text}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 dark:border-t-white"></div>
        </div>
      )}
    </div>
  );
}