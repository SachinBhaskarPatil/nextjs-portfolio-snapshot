"use client";
import DateDropdown from './DateDropdown';
import DarkModeToggle from './DarkModeToggle';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

type AsOnDate = '2024-07-09' | '2024-06-30' | '2024-06-01';

interface ClientWrapperProps {
  asOnDates: readonly AsOnDate[];
  selectedDate: AsOnDate;
  onDateChange: (date: AsOnDate) => void;
}

export default function ClientWrapper({ asOnDates, selectedDate, onDateChange }: ClientWrapperProps) {
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
    <>
      <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mr-1 whitespace-nowrap flex-shrink-0">As on Date:</span>
      <DateDropdown dates={asOnDates} selected={selectedDate} onChange={date => onDateChange(date as AsOnDate)} />
      <button 
        className="px-2 sm:px-3 lg:px-5 py-1.5 sm:py-2 rounded-lg bg-primary text-white font-semibold shadow-soft hover:bg-primary-light active:bg-primary-dark transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 text-xs sm:text-sm whitespace-nowrap flex-shrink-0" 
        onClick={handleDownloadPDF}
      >
        <span className="sm:hidden">PDF</span>
        <span className="hidden sm:inline">Download PDF</span>
      </button>
      <div className="flex-shrink-0">
        <DarkModeToggle />
      </div>
    </>
  );
} 