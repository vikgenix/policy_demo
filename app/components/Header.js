"use client";
import { useState, useEffect } from "react";


import {
  Search,
  Filter,
  FileText,
  Calendar,
  Tag,
  ArrowRight,
  Loader2,
  ExternalLink,
  Database,
} from "lucide-react";
export default function Header() {

    const [dataSource, setDataSource] = useState("");
    const openPRSIndia = () => {
        window.open("https://prsindia.org/billtrack/", "_blank");
    };
    
    return (
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
                <span>{dataSource}</span>
            </div>
            <button
                onClick={openPRSIndia}
                className="btn-secondary flex items-center space-x-2 px-3 py-2 text-sm"
            >
                <ExternalLink size={16} />
                <span>PRS India</span>
            </button>
            </div>
        </div>
        </div>
  );
}
