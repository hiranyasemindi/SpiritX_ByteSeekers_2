import React from "react";

export default function TeamProfileCard({ teamName, points, spentAmount, User }) {
  return (
    <div className="max-w-7xl mx-auto pb-3">
      <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
        <div className="flex flex-col space-y-2 w-2/3">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            Team Name: {teamName}
            <span className="ml-3 inline-block px-3 py-1 text-sm font-semibold text-white bg-primary rounded-full">
              Points: {points}
            </span>
          </h2>
          <span className="text-black text-md font-bold">{User}</span>
          <p className="text-gray-600">
            Budget:{" "}
            <span className="text-primary text-lg font-semibold">
              LKR
              {spentAmount}
            </span>
          </p>
        </div>
        <div className="flex items-center justify-end ">
          <img
            src="/images/cricket.png"
            alt="Player Avatar"
            className="w-24 h-24 object-cover "
          />
        </div>
      </div>
    </div>
  );
}
