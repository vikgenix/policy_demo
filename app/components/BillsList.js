"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  Filter,
  FileText,
  Calendar,
  Tag,
  ArrowRight,
  ExternalLink,
  Database,
} from "lucide-react";

export default function BillsListUI() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");

  // Dummy data for UI preview
  const bills = [
    {
      id: 1,
      name: "The Government of Union Territories (Amendment) Bill, 2025",
      shortName: "Government of Union Territories (Amendment) Bill",
      status: "In Committee",
      date: "2025-01-01",
      category: "Governance and Strategic Affairs",
      description:
        "This bill addresses governance and strategic affairs matters and is currently in committee.",
      year: "2025",
      hyphenatedName: "the-government-of-union-territories-amendment-bill-2025",
    },
    {
      id: 2,
      name: "The Jammu and Kashmir Reorganisation (Amendment) Bill, 2025",
      shortName: "Jammu and Kashmir Reorganisation (Amendment) Bill",
      status: "In Committee",
      date: "2025-01-01",
      category: "Governance and Strategic Affairs",
      description:
        "This bill addresses governance and strategic affairs matters and is currently in committee.",
      year: "2025",
      hyphenatedName:
        "the-jammu-and-kashmir-reorganisation-amendment-bill-2025",
    },
    {
      id: 3,
      name: "The Constitution (One Hundred and Thirtieth Amendment) Bill, 2025",
      shortName: "Constitution (130th Amendment) Bill",
      status: "In Committee",
      date: "2025-01-01",
      category: "Constitutional Amendments",
      description:
        "This bill addresses constitutional amendment matters and is currently in committee.",
      year: "2025",
      hyphenatedName:
        "the-constitution-one-hundred-and-thirtieth-amendment-bill-2025",
    },
    {
      id: 4,
      name: "The Promotion and Regulation of Online Gaming Bill, 2025",
      shortName: "Online Gaming Bill",
      status: "Passed",
      date: "2025-01-01",
      category: "Finance, Industry and Labour",
      description:
        "This bill addresses finance, industry and labour matters and has been passed.",
      year: "2025",
      hyphenatedName: "the-promotion-and-regulation-of-online-gaming-bill-2025",
    },
    {
      id: 5,
      name: "The Jan Vishwas (Amendment of Provisions) Bill, 2025",
      shortName: "Jan Vishwas (Amendment) Bill",
      status: "In Committee",
      date: "2025-01-01",
      category: "Governance and Strategic Affairs",
      description:
        "This bill addresses governance and strategic affairs matters and is currently in committee.",
      year: "2025",
      hyphenatedName: "the-jan-vishwas-amendment-of-provisions-bill-2025",
    },
  ];

  const openPRSIndia = () => {
    window.open("https://prsindia.org/billtrack/", "_blank");
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="flex-1 bg-gradient-to-b from-white/80 to-slate-50/60 backdrop-blur-sm flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-slate-200/50 bg-gradient-to-r from-white/90 to-slate-50/80">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-[#B20F38] to-[#8A0C2D] rounded-xl flex items-center justify-center glow">
              <FileText size={20} className="text-white" />
            </div>
            <div>
              <h2 className="text-slate-800 text-xl font-bold text-gradient">
                Bills Tracker
              </h2>
              <p className="text-slate-600 text-sm">
                Track and analyze parliamentary bills
              </p>
            </div>
          </div>

          {/* Data Source Info (Static) */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 text-slate-600 text-sm">
              <Database size={16} />
              <span>Mock Data</span>
            </div>
            <button className="btn-secondary flex items-center space-x-2 px-3 py-2 text-sm" onClick={openPRSIndia}>
              <ExternalLink size={16} />
              <span>PRS India</span>
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500"
            />
            <input
              type="text"
              placeholder="Search bills by name, description, or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/80 border border-slate-300/50 rounded-xl pl-12 pr-4 py-3 text-slate-800 placeholder-slate-500 focus:outline-none focus:border-[#B20F38]/50 focus:ring-2 focus:ring-[#B20F38]/20 transition-all duration-300"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3">
            {/* Category Filter */}
            <div className="flex items-center space-x-2">
              <Tag size={16} className="text-slate-600" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-white/80 border border-slate-300/50 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:border-[#B20F38]/50 text-sm"
              >
                <option>All</option>
                <option>Technology</option>
                <option>Health</option>
              </select>
            </div>

            {/* Status Filter */}
            <div className="flex items-center space-x-2">
              <Filter size={16} className="text-slate-600" />
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="bg-white/80 border border-slate-300/50 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:border-[#B20F38]/50 text-sm"
              >
                <option>All</option>
                <option>Pending</option>
                <option>Passed</option>
              </select>
            </div>

            {/* Year Filter */}
            <div className="flex items-center space-x-2">
              <Calendar size={16} className="text-slate-600" />
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="bg-white/80 border border-slate-300/50 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:border-[#B20F38]/50 text-sm"
              >
                <option>All</option>
                <option>2023</option>
                <option>2022</option>
              </select>
            </div>

            {/* Results Count */}
            <div className="ml-auto text-slate-600 text-sm bg-white/80 px-3 py-2 rounded-lg border border-slate-200">
              {bills.length} bills
            </div>
          </div>
        </div>
      </div>

      {/* Bills List */}
      <Link href='../chat'>
      <div className="flex-1 overflow-y-auto p-6" >
        <div className="space-y-4">
          {bills.map((bill) => (
            <div
              key={bill.id}
              className="glass-card p-6 hover-lift cursor-pointer group border border-slate-200/50"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  {/* Bill Header */}
                  <div className="flex items-start space-x-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#B20F38]/20 to-[#8A0C2D]/20 rounded-xl flex items-center justify-center border border-[#B20F38]/30">
                      <FileText size={24} className="text-[#B20F38]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-slate-800 font-bold text-lg mb-2 group-hover:text-[#B20F38] transition-colors">
                        {bill.shortName}
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        {bill.description}
                      </p>
                    </div>
                  </div>

                  {/* Bill Metadata */}
                  <div className="flex flex-wrap items-center gap-3 text-sm">
                    <div className="flex items-center space-x-2">
                      <Calendar size={14} className="text-slate-500" />
                      <span className="text-slate-600">
                        {formatDate(bill.date)}
                      </span>
                    </div>

                    <div className="px-3 py-1 rounded-full border border-green-300 bg-green-50 text-green-700">
                      {bill.status}
                    </div>

                    <div className="px-3 py-1 rounded-full border border-blue-300 bg-blue-50 text-blue-700">
                      {bill.category}
                    </div>

                    <div className="text-slate-500">Year: {bill.year}</div>
                  </div>
                </div>

                {/* Action Arrow */}
                <div className="w-8 h-8 bg-gradient-to-r from-[#B20F38]/20 to-[#8A0C2D]/20 rounded-lg flex items-center justify-center group-hover:from-[#B20F38]/30 group-hover:to-[#8A0C2D]/30 transition-all duration-200">
                  <ArrowRight
                    size={16}
                    className="text-[#B20F38] group-hover:translate-x-1 transition-transform"
                  />
                </div>
              </div>
            </div>
          ))}
          </div>      
        </div>
      </Link>
      
      
    </div>
  );
}
