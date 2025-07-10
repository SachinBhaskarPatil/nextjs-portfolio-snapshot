"use client";
import { HiTrendingUp, HiTrendingDown, HiCheckCircle, HiXCircle } from 'react-icons/hi';

interface Holding {
  name: string;
  type: string;
  invested: number;
  current: number;
  return: number;
  sipActive: boolean;
}

interface HoldingsTableProps {
  holdings: Holding[];
}

export default function HoldingsTable({ holdings }: HoldingsTableProps) {
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
    <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-soft border border-border-light dark:border-border-dark overflow-hidden">
      <div className="px-4 sm:px-6 lg:px-8 py-3 sm:py-4 border-b border-border-light dark:border-border-dark">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">Holdings</h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-zinc-800">
            <tr>
              <th className="px-2 sm:px-4 lg:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Fund Name
              </th>
              <th className="px-2 sm:px-4 lg:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Type
              </th>
              <th className="px-2 sm:px-4 lg:px-6 py-2 sm:py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Invested
              </th>
              <th className="px-2 sm:px-4 lg:px-6 py-2 sm:py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Current Value
              </th>
              <th className="px-2 sm:px-4 lg:px-6 py-2 sm:py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Return
              </th>
              <th className="px-2 sm:px-4 lg:px-6 py-2 sm:py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                SIP Active
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-zinc-900 divide-y divide-border-light dark:divide-border-dark">
            {holdings.map((holding, index) => (
              <tr key={index} className={`hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors duration-200 ${
                index % 2 === 0 ? 'bg-white dark:bg-zinc-900' : 'bg-gray-50 dark:bg-zinc-800'
              }`}>
                <td className="px-2 sm:px-4 lg:px-6 py-2 sm:py-4 whitespace-nowrap">
                  <div className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">
                    {holding.name}
                  </div>
                </td>
                <td className="px-2 sm:px-4 lg:px-6 py-2 sm:py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-1.5 sm:px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                    {holding.type}
                  </span>
                </td>
                <td className="px-2 sm:px-4 lg:px-6 py-2 sm:py-4 whitespace-nowrap text-right text-xs sm:text-sm text-gray-900 dark:text-white">
                  {formatCurrency(holding.invested)}
                </td>
                <td className="px-2 sm:px-4 lg:px-6 py-2 sm:py-4 whitespace-nowrap text-right text-xs sm:text-sm text-gray-900 dark:text-white">
                  {formatCurrency(holding.current)}
                </td>
                <td className="px-2 sm:px-4 lg:px-6 py-2 sm:py-4 whitespace-nowrap text-right">
                  <div className="flex items-center justify-end gap-1">
                    {holding.return > 0 ? (
                      <HiTrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                    ) : (
                      <HiTrendingDown className="w-3 h-3 sm:w-4 sm:h-4 text-red-500" />
                    )}
                    <span className={`text-xs sm:text-sm font-medium ${
                      holding.return > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                    }`}>
                      {formatPercentage(holding.return)}
                    </span>
                  </div>
                </td>
                <td className="px-2 sm:px-4 lg:px-6 py-2 sm:py-4 whitespace-nowrap text-center">
                  {holding.sipActive ? (
                    <HiCheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mx-auto" />
                  ) : (
                    <HiXCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 mx-auto" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 