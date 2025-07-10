"use client";
import { useState } from 'react';
import UserSummaryCard from '@/components/UserSummaryCard';
import AssetAllocationChart from '@/components/AssetAllocationChart';
import HoldingsTable from '@/components/HoldingsTable';
import InsightsSection from '@/components/InsightsSection';
import DateDropdown from '@/components/DateDropdown';
import DarkModeToggle from '@/components/DarkModeToggle';
import portfolioData from '@/data/portfolioData.json';
import { HiMenu } from 'react-icons/hi';
import ClientWrapper from '@/components/ClientWrapper';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const asOnDates = [
  '2024-07-09',
  '2024-06-30',
  '2024-06-01',
] as const;

type AsOnDate = typeof asOnDates[number];

const portfolioSnapshots: Record<AsOnDate, {
  user: typeof portfolioData.user,
  allocation: typeof portfolioData.allocation,
  holdings: typeof portfolioData.holdings,
}> = {
  '2024-07-09': {
    user: { ...portfolioData.user },
    allocation: [
      { type: 'Equity', percentage: 60, value: 759000 },
      { type: 'Debt', percentage: 30, value: 379500 },
      { type: 'Gold', percentage: 10, value: 126500 },
    ],
    holdings: [
      { name: 'Axis Bluechip Fund', type: 'Equity', invested: 120000, current: 148500, return: 23.75, sipActive: true },
      { name: 'SBI Gold Fund', type: 'Gold', invested: 50000, current: 57200, return: 14.4, sipActive: false },
      { name: 'HDFC Short Term Debt', type: 'Debt', invested: 200000, current: 212000, return: 6.0, sipActive: true },
      { name: 'ICICI Flexi Cap', type: 'Equity', invested: 100000, current: 137500, return: 37.5, sipActive: true },
    ],
  },
  '2024-06-30': {
    user: { ...portfolioData.user, portfolioValue: 1200000, invested: 1000000, return: 200000, xirr: 11.5 },
    allocation: [
      { type: 'Equity', percentage: 58, value: 696000 },
      { type: 'Debt', percentage: 32, value: 384000 },
      { type: 'Gold', percentage: 10, value: 120000 },
    ],
    holdings: [
      { name: 'Axis Bluechip Fund', type: 'Equity', invested: 120000, current: 140000, return: 16.7, sipActive: true },
      { name: 'SBI Gold Fund', type: 'Gold', invested: 50000, current: 56000, return: 12.0, sipActive: false },
      { name: 'HDFC Short Term Debt', type: 'Debt', invested: 200000, current: 210000, return: 5.0, sipActive: true },
      { name: 'ICICI Flexi Cap', type: 'Equity', invested: 100000, current: 130000, return: 30.0, sipActive: true },
    ],
  },
  '2024-06-01': {
    user: { ...portfolioData.user, portfolioValue: 1150000, invested: 980000, return: 170000, xirr: 10.8 },
    allocation: [
      { type: 'Equity', percentage: 55, value: 632500 },
      { type: 'Debt', percentage: 35, value: 402500 },
      { type: 'Gold', percentage: 10, value: 115000 },
    ],
    holdings: [
      { name: 'Axis Bluechip Fund', type: 'Equity', invested: 120000, current: 135000, return: 12.5, sipActive: true },
      { name: 'SBI Gold Fund', type: 'Gold', invested: 50000, current: 54000, return: 8.0, sipActive: false },
      { name: 'HDFC Short Term Debt', type: 'Debt', invested: 200000, current: 208000, return: 4.0, sipActive: true },
      { name: 'ICICI Flexi Cap', type: 'Equity', invested: 100000, current: 120000, return: 20.0, sipActive: true },
    ],
  },
};

export default function Page() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState<AsOnDate>(asOnDates[0]);
  
  const snapshot = portfolioSnapshots[selectedDate];
  const user = snapshot.user;
  const allocation = snapshot.allocation;
  const holdings = snapshot.holdings;

  const openDrawer = () => {
    setDrawerVisible(true);
    setTimeout(() => setDrawerOpen(true), 10);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    setTimeout(() => setDrawerVisible(false), 300);
  };

  const handleDownloadPDF = async () => {
    const input = document.getElementById('portfolio-main-content');
    if (!input) return;
    const canvas = await html2canvas(input, { scale: 2, backgroundColor: '#fff', useCORS: true });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pageWidth;
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    let position = 0;
    if (pdfHeight < pageHeight) {
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    } else {
      let remainingHeight = pdfHeight;
      while (remainingHeight > 0) {
        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
        remainingHeight -= pageHeight;
        if (remainingHeight > 0) {
          pdf.addPage();
          position = position - pageHeight;
        }
      }
    }
    pdf.save('portfolio_snapshot.pdf');
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark transition-colors duration-300">
      <header className="sticky top-0 z-10 bg-white/90 dark:bg-zinc-900 backdrop-blur border-b border-border-light dark:border-border-dark shadow-soft flex flex-row items-center justify-between px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 lg:py-5 gap-2 sm:gap-4 transition-colors duration-300 min-w-0 w-full">
        <div className="flex items-center min-w-0 flex-1">
          <div className="flex flex-col min-w-0 flex-1">
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white leading-tight min-w-0 truncate">
              Portfolio Snapshot
            </h1>
            <span className="text-[10px] sm:text-xs md:text-sm text-gray-500 dark:text-gray-300 font-medium mt-1">Your investments at a glance</span>
          </div>
        </div>
        
        <div className="hidden sm:flex items-center gap-2 lg:gap-3 flex-shrink-0">
          <ClientWrapper 
            asOnDates={asOnDates}
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
          />
        </div>
        
        <button 
          className="sm:hidden ml-2 p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary/50 flex-shrink-0" 
          onClick={openDrawer}
          aria-label="Open menu"
        >
          <HiMenu className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 dark:text-gray-200" />
        </button>
      </header>

      {drawerVisible && (
        <div className="fixed inset-0 z-50 flex sm:hidden">
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" onClick={closeDrawer} />
          <div className={`ml-auto w-64 max-w-[80vw] h-full bg-white dark:bg-background-dark shadow-lg p-4 flex flex-col gap-4 transition-transform duration-300 ${drawerOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <button className="self-end mb-2 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 text-xl" onClick={closeDrawer} aria-label="Close menu">&times;</button>
            <div className="flex items-center gap-2 text-xs sm:text-sm">
              <span className="text-gray-600 dark:text-gray-300 whitespace-nowrap">As on Date:</span>
              <div className="w-24 sm:w-auto">
                <DateDropdown dates={asOnDates} selected={selectedDate} onChange={date => setSelectedDate(date as AsOnDate)} />
              </div>
            </div>
            <button 
              className="w-32 sm:w-auto px-3 sm:px-5 py-1.5 sm:py-2 rounded-lg bg-primary text-white font-semibold shadow-soft hover:bg-primary-light active:bg-primary-dark transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 text-xs sm:text-sm mt-2"
              onClick={handleDownloadPDF}
            >
              Download PDF
            </button>
            <div className="mt-2 flex justify-start scale-90 sm:scale-100 origin-left">
              <DarkModeToggle />
            </div>
          </div>
        </div>
      )}

      <main id="portfolio-main-content" className="max-w-4xl mx-auto p-3 sm:p-4 md:p-6 lg:p-8 space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-10">
        <UserSummaryCard
          name={user.name}
          pan={user.pan}
          riskProfile={user.riskProfile}
          portfolioValue={user.portfolioValue}
          invested={user.invested}
          overallReturn={user.return}
          overallReturnPercent={Number(((user.return / user.invested) * 100).toFixed(1))}
          xirr={user.xirr}
        />
        <AssetAllocationChart data={allocation} />
        <HoldingsTable holdings={holdings} />
        <InsightsSection holdings={holdings} />
      </main>
    </div>
  );
}
