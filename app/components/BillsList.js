"use client";

import { useEffect, useState } from "react";
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
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle,
} from "lucide-react";
import ChatInterface from "./ChatInterface";

export default function BillsListUI() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch bills from API
  useEffect(() => {
    const fetchBills = async () => {
      try {
        const res = await fetch("/api/bills");
        const data = await res.json();
        console.log(data);
        setBills(data);
      } catch (err) {
        console.error("Failed to fetch bills:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBills();
  }, []);

  const openPRSIndia = () => {
    window.open("https://prsindia.org/billtrack/", "_blank");
  };

  // Get unique statuses from bills for filter options
  const getUniqueStatuses = () => {
    const statuses = bills.map((bill) => bill.status).filter(Boolean);
    return [...new Set(statuses)];
  };

  // Get status icon and color
  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "passed":
        return { icon: CheckCircle, color: "text-green-600 bg-green-100" };
      case "pending":
        return { icon: Clock, color: "text-yellow-600 bg-yellow-100" };
      case "introduced":
        return { icon: AlertCircle, color: "text-blue-600 bg-blue-100" };
      case "rejected":
        return { icon: XCircle, color: "text-red-600 bg-red-100" };
      default:
        return { icon: Clock, color: "text-gray-600 bg-gray-100" };
    }
  };

  // Filter bills based on search term and status
  const filteredBills = bills.filter((bill) => {
    const matchesSearch = bill.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === "All" || bill.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

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

          {/* Data Source Info */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 text-slate-600 text-sm">
              <Database size={16} />
              <span>PRS India Data</span>
            </div>
            <button
              className="btn-secondary flex items-center space-x-2 px-3 py-2 text-sm"
              onClick={openPRSIndia}
            >
              <ExternalLink size={16} />
              <span>PRS India</span>
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500"
            />
            <input
              type="text"
              placeholder="Search bills by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/80 border border-slate-300/50 rounded-xl pl-12 pr-4 py-3 text-slate-800 placeholder-slate-500 focus:outline-none focus:border-[#B20F38]/50 focus:ring-2 focus:ring-[#B20F38]/20 transition-all duration-300"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-slate-700">
              <Filter size={16} />
              <span className="text-sm font-medium">Filter by Status:</span>
            </div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-white/80 border border-slate-300/50 rounded-lg px-3 py-2 text-slate-800 text-sm focus:outline-none focus:border-[#B20F38]/50 focus:ring-2 focus:ring-[#B20F38]/20 transition-all duration-300"
            >
              <option value="All">All Status</option>
              {getUniqueStatuses().map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Bills List */}
      <div className="flex-1 overflow-y-auto p-6">
        {loading ? (
          <p className="text-slate-600">Loading bills...</p>
        ) : (
          <div className="space-y-4">
            {filteredBills.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-slate-600">
                  No bills found matching your criteria.
                </p>
              </div>
            ) : (
              filteredBills.map((bill, idx) => {
                const statusInfo = getStatusIcon(bill.status);
                const StatusIcon = statusInfo.icon;

                return (
                  <Link
                    key={idx}
                    href={{
                      pathname: "../chat",
                      query: { pdf: bill.pdf },
                    }}
                    target="_blank"
                    className="block"
                  >
                    <div className="glass-card p-6 hover-lift cursor-pointer group border border-slate-200/50">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          {/* Bill Title and Status */}
                          <div className="flex items-start justify-between mb-3">
                            <h3 className="text-slate-800 font-bold text-lg group-hover:text-[#B20F38] transition-colors flex-1 pr-4">
                              {bill.title}
                            </h3>

                            {/* Status Badge */}
                            {bill.status && (
                              <div
                                className={`flex items-center space-x-1 px-3 py-1 rounded-full ${statusInfo.color} transition-all duration-200`}
                              >
                                <StatusIcon size={14} />
                                <span className="text-sm font-medium">
                                  {bill.status}
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Bill Link */}
                          <p className="text-slate-600 text-sm leading-relaxed break-all">
                            {bill.link}
                          </p>
                        </div>

                        {/* Action Arrow */}
                        <div className="w-8 h-8 bg-gradient-to-r from-[#B20F38]/20 to-[#8A0C2D]/20 rounded-lg flex items-center justify-center group-hover:from-[#B20F38]/30 group-hover:to-[#8A0C2D]/30 transition-all duration-200 ml-4">
                          <ArrowRight
                            size={16}
                            className="text-[#B20F38] group-hover:translate-x-1 transition-transform"
                          />
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
}
