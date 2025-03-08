import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Input from "./Input";
import Select from "./Selector";
import Button from "./Button";

const PlayerForm = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const isUpdate = location.pathname.includes("edit");

    const [formData, setFormData] = useState({
        playerName: "",
        university: "",
        category: "",
        totalRuns: "",
        ballsFaced: "",
        inningsPlayed: "",
        wickets: "",
        oversBowled: "",
        runsConceded: ""
    });

    const universities = [
        { value: "uni1", label: "XYZ University" },
        { value: "uni2", label: "ABC University" },
        { value: "uni3", label: "PQR University" }
    ];

    const categories = [
        { value: "batsman", label: "Batsman" },
        { value: "bowler", label: "Bowler" },
        { value: "allrounder", label: "All-Rounder" }
    ];

    // Simulate fetching player data for update
    useEffect(() => {
        if (isUpdate) {
            const playerId = location.pathname.split("/").pop();
            console.log(`Fetching data for player ID: ${playerId}`);
            const playerData = {
                playerName: "John Doe",
                university: "uni1",
                category: "batsman",
                totalRuns: 500,
                ballsFaced: 300,
                inningsPlayed: 10,
                wickets: 10,
                oversBowled: 50,
                runsConceded: 200
            };
            setFormData(playerData);
        }
    }, [isUpdate, location.pathname]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isUpdate) {
            console.log("Updating Player Data:", formData);
        } else {
            console.log("Adding New Player Data:", formData);
        }
        navigate("/admin/players");
    };

    return (
        <div className="w-full mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{isUpdate ? "Update Player" : "Add New Player"}</h2>
            <p className="text-gray-600 mb-10">{isUpdate ? "Edit the player details below." : "Fill in the details below to add a new player to the database."}</p>

            <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                    label="Player Name"
                    name="playerName"
                    placeholder="Enter player name"
                    value={formData.playerName}
                    onChange={handleChange}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Select
                        label="University"
                        name="university"
                        options={universities}
                        value={formData.university}
                        onChange={handleChange}
                    />
                    <Select
                        label="Category"
                        name="category"
                        options={categories}
                        value={formData.category}
                        onChange={handleChange}
                    />
                </div>

                {/* Player Stats (Three in One Row) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input
                        label="Total Runs"
                        name="totalRuns"
                        type="number"
                        placeholder="Enter runs"
                        value={formData.totalRuns}
                        onChange={handleChange}
                    />
                    <Input
                        label="Balls Faced"
                        name="ballsFaced"
                        type="number"
                        placeholder="Enter balls faced"
                        value={formData.ballsFaced}
                        onChange={handleChange}
                    />
                    <Input
                        label="Innings Played"
                        name="inningsPlayed"
                        type="number"
                        placeholder="Enter innings"
                        value={formData.inningsPlayed}
                        onChange={handleChange}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input
                        label="Wickets"
                        name="wickets"
                        type="number"
                        placeholder="Enter wickets"
                        value={formData.wickets}
                        onChange={handleChange}
                    />
                    <Input
                        label="Overs Bowled"
                        name="oversBowled"
                        type="number"
                        placeholder="Enter overs"
                        value={formData.oversBowled}
                        onChange={handleChange}
                    />
                    <Input
                        label="Runs Conceded"
                        name="runsConceded"
                        type="number"
                        placeholder="Enter runs conceded"
                        value={formData.runsConceded}
                        onChange={handleChange}
                    />
                </div>

                <div className="flex justify-end ">
                    <Button children={isUpdate ? "Update Player" : "Add Player"} />
                </div>

            </form>
        </div>
    );
};

export default PlayerForm;
