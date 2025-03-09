import React from "react";
import Card from "./Card";
import { FaRunning } from "react-icons/fa";
import { FaUsersLine } from "react-icons/fa6";
import { GiCricketBat } from "react-icons/gi";
import { MdCategory } from "react-icons/md";


import Skeleton from "react-loading-skeleton";

export default function DashboardStat({ isLoading, playersCount ,usersCount,teamsCount,categoriesCount}) {
  return (
    <div className="pb-6 w-full mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {isLoading ? (
        Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} height={150} className="w-full" />
        ))
      ) : (
        <>
          <Card icon={<FaRunning />} title="Players Count" value={playersCount} />
          <Card
            icon={<FaUsersLine />}
            title="All Users"
            value={usersCount}
          />
          <Card
            icon={<GiCricketBat />}
            title="All Teams count"
            value={teamsCount}
          />
            <Card
            icon={<MdCategory />}
            title="All Player Categories count"
            value={categoriesCount}
          />
        </>
      )}
    </div>
  );
}