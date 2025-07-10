"use client";
import { HiUser, HiIdentification, HiShieldCheck, HiCurrencyRupee, HiTrendingUp } from 'react-icons/hi';

interface UserSummaryCardProps {
  name: string;
  pan: string;
  riskProfile: string;
  portfolioValue: number;
  invested: number;
  overallReturn: number;
  overallReturnPercent: number;
  xirr: number;
}

export default function UserSummaryCard({
  name,
  pan,
  riskProfile,
  portfolioValue,
  invested,
  overallReturn,
  overallReturnPercent,
  xirr
}: UserSummaryCardProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercentage = (percentage: number) => {
    return `${percentage > 0 ? '+' : ''}${percentage.toFixed(2)}%`;
  };

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-soft border border-border-light dark:border-border-dark">
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-6 lg:mb-8">
          <div className="p-2 sm:p-3 bg-primary/10 rounded-lg">
            <HiUser className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white truncate">
              {name}
            </h1>
            <div className="flex flex-col xs:flex-row items-start xs:items-center gap-2 xs:gap-4 mt-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-1 min-w-0">
                <HiIdentification className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                <span className="truncate">PAN: {pan}</span>
              </div>
              <div className="flex items-center gap-1 min-w-0">
                <HiShieldCheck className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                <span className="truncate">Risk: {riskProfile}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          <div className="text-center p-3 sm:p-4 rounded-lg bg-gray-50 dark:bg-zinc-800">
            <div className="flex items-center justify-center gap-1 sm:gap-2 mb-2">
              <HiCurrencyRupee className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
              <span className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">
                Portfolio Value
              </span>
            </div>
            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white break-words">
              {formatCurrency(portfolioValue)}
            </div>
          </div>

          <div className="text-center p-3 sm:p-4 rounded-lg bg-gray-50 dark:bg-zinc-800">
            <div className="flex items-center justify-center gap-1 sm:gap-2 mb-2">
              <HiCurrencyRupee className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
              <span className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">
                Total Invested
              </span>
            </div>
            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white break-words">
              {formatCurrency(invested)}
            </div>
          </div>

          <div className="text-center p-3 sm:p-4 rounded-lg bg-gray-50 dark:bg-zinc-800">
            <div className="flex items-center justify-center gap-1 sm:gap-2 mb-2">
              <HiTrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
              <span className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">
                Total Return
              </span>
            </div>
            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white break-words">
              {formatCurrency(overallReturn)}
            </div>
            <div className={`text-xs sm:text-sm font-medium ${
              overallReturnPercent > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
            }`}>
              {formatPercentage(overallReturnPercent)}
            </div>
          </div>

          <div className="text-center p-3 sm:p-4 rounded-lg bg-gray-50 dark:bg-zinc-800">
            <div className="flex items-center justify-center gap-1 sm:gap-2 mb-2">
              <HiTrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
              <span className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">
                XIRR
              </span>
            </div>
            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
              {xirr.toFixed(2)}%
            </div>
            <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              Annualized Return
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 