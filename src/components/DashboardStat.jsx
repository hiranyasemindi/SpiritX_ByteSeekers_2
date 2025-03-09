import React from "react";
import Card from "./Card";
import { FaMedal, FaRunning, FaTrophy } from "react-icons/fa";
import { MdOutlineSportsCricket } from "react-icons/md";
import Skeleton from "react-loading-skeleton";

export default function DashboardStat({ isLoading }) {
  return (
    <div className="pb-6 w-full mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {isLoading ? (
        Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} height={150} className="w-full" />
        ))
      ) : (
        <>
          <Card icon={<FaRunning />} title="Overall Runs" value="3456" />
          <Card
            icon={<MdOutlineSportsCricket />}
            title="Overall Wickets"
            value="120"
          />
          <Card
            icon={<FaMedal />}
            title="Highest Run Scorer"
            value="Ravi Sharma"
          />
          <Card
            icon={<FaTrophy />}
            title="Highest Wicket Taker"
            value="Ajay Kumar"
          />
        </>
      )}
    </div>
  );
}