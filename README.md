# User Portfolio Snapshot (Next.js)

A modern, mobile-first Next.js dashboard for visualizing a user's investment portfolio. Built for a fintech use case, this project demonstrates best practices in UI/UX, component structure, and responsive design using the Next.js App Router.

---

## 🚀 Use Case & Purpose

**User Portfolio Snapshot** provides a clean, interactive dashboard for logged-in users to view their investment portfolio at a glance. It showcases summary metrics, asset allocation, detailed holdings, and actionable insights—ideal for fintech applications and investment platforms.

---

## ✨ Features

- **Sticky Header** with title: `Portfolio Snapshot`
- **Date Dropdown** for selecting "As on Date"
- **Download PDF** button (UI + working PDF export)
- **User Summary Card**
  - Name: Rohan Sharma
  - PAN: ABCDE1234F
  - Risk Profile: Moderate
  - Portfolio Value, Total Invested, Overall Return, XIRR
- **Asset Allocation Pie Chart** (Recharts)
  - Equity, Debt, Gold breakdown
- **Holdings Table**
  - Columns: Fund Name, Type, Invested, Current Value, Return %, SIP Active
  - Zebra striping, hover effects, and fully mobile responsive
- **Bonus Features**
  - Insights Section: Top Performing Asset, Poor Performing Fund, Recommended Rebalancing Alert
  - Dark/Light Mode toggle
  - Download to PDF (functional)

---

## 🛠️ Tech Stack

- [Next.js](https://nextjs.org/) (App Router)
- [React 19](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Recharts](https://recharts.org/)
- [jsPDF](https://github.com/parallax/jsPDF) & [html2canvas](https://github.com/niklasvh/html2canvas) (PDF export)
- [TypeScript](https://www.typescriptlang.org/)
- Dummy JSON data (no backend)

---

## 📁 Folder & Component Structure

```
user-portfolio-snapshot-next/
├── public/
│   └── Porfolio.svg
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Root layout
│   │   ├── page.tsx             # Main dashboard page
│   │   └── api/portfolio/       # (Stub for API route)
│   ├── components/              # Reusable UI components
│   │   ├── AssetAllocationChart/
│   │   ├── DarkModeToggle.tsx
│   │   ├── DateDropdown/
│   │   ├── HoldingsTable/
│   │   ├── InsightsSection/
│   │   └── UserSummaryCard/
│   ├── data/                    # Dummy JSON data
│   ├── hooks/                   # Custom React hooks
│   └── globals.css              # Global styles
├── tailwind.config.js           # Tailwind config
├── package.json                 # Project metadata & scripts
└── README.md                    # Project documentation
```

---

## 📱 Mobile-First & Responsive

All UI is designed mobile-first and adapts seamlessly to all screen sizes.

---

## 🏁 Getting Started

1. **Clone the repo:**
   ```bash
   git clone <repo-url>
   cd user-portfolio-snapshot-next
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Start the dev server:**
   ```bash
   npm run dev
   ```
4. **Open in browser:**
   Visit [http://localhost:3000](http://localhost:3000)

---

## 📊 Data Model

Portfolio data is loaded from a local JSON file (`src/data/portfolioData.json`).

- **User:** name, PAN, risk profile, portfolio value, invested, return, XIRR
- **Allocation:** type, percentage, value
- **Holdings:** name, type, invested, current, return, sipActive

---

## 📝 Notes

- This project is frontend-only. No authentication or backend integration.
- PDF export is fully functional using `jsPDF` and `html2canvas`.
- All UI is mobile-first and dark mode ready.
- Built with Next.js App Router and React 19.

---
