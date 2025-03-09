import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Input from "./Input";
import Select from "./Selector";
import Button from "./Button";
import { validatePlayer } from "../utils/validations";
import toast from "react-hot-toast";
import { ref, set, push, db, get } from "../services/firebase";
import { calculateBattingAverage, calculateBattingStrikeRate, calculateBowlingStrikeRate, calculateEconomyRate, calculatePlayerPoints, calculatePlayerValue } from "../utils/helper";

const PlayerForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isUpdate = location.pathname.includes("edit");
    const { player } = location.state || {};

    if (isUpdate && !player) {
        navigate("/admin/players");
    }

    const calculateBudget = (player) => {
        console.log(player)
        const battingStrike = calculateBattingStrikeRate(player.totalRuns, player.ballsFaced);
        const battingAverage = calculateBattingAverage(player.totalRuns, player.inningsPlayed);
        const bowlingStrikeRate = calculateBowlingStrikeRate(player.oversBowled, player.wickets);
        const economyRate = calculateEconomyRate(player.runsConceded, player.oversBowled);
        const playerPoints = calculatePlayerPoints(battingStrike, battingAverage, bowlingStrikeRate, economyRate);
        console.log(battingStrike, battingAverage, bowlingStrikeRate, economyRate, playerPoints);
        const playerValue = calculatePlayerValue(playerPoints);
        return playerValue;
    };

    const [formData, setFormData] = useState({
        playerName: player?.playerName || "",
        university: player?.university || "",
        category: player?.category || "",
        totalRuns: parseInt(player?.totalRuns) || 0,
        ballsFaced: parseInt(player?.ballsFaced) || 0,
        inningsPlayed: parseInt(player?.inningsPlayed) || 0,
        wickets: parseInt(player?.wickets) || 0,
        oversBowled: parseInt(player?.oversBowled) || 0,
        runsConceded: parseInt(player?.runsConceded) || 0,
        playerValue: parseInt(player?.playerValue) || 0,
    });

    const [errors, setErrors] = useState({});
    const [universities, setUniversities] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const universitiesRef = ref(db, 'universities');
        const categoriesRef = ref(db, 'categories');

        const fetchData = async () => {
            try {
                const universitiesSnapshot = await get(universitiesRef);
                if (universitiesSnapshot.exists()) {
                    const universitiesData = universitiesSnapshot.val();
                    const universitiesList = Object.values(universitiesData);
                    setUniversities(universitiesList);
                }

                const categoriesSnapshot = await get(categoriesRef);
                if (categoriesSnapshot.exists()) {
                    const categoriesData = categoriesSnapshot.val();
                    const categoriesList = Object.values(categoriesData);
                    setCategories(categoriesList);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);



    const handleChange = (e) => {
        const updatedData = { ...formData, [e.target.name]: e.target.value };

        const newPlayerValue = calculateBudget(updatedData);
        console.log(newPlayerValue)

        setFormData({ ...updatedData, playerValue: newPlayerValue });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const validationErrors = validatePlayer(formData);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            if (isUpdate) {
                const playerRef = ref(db, `players/${player.id}`);
                set(playerRef, formData)
                    .then(() => {
                        toast.success("Player updated successfully");
                        navigate("/admin/players");
                    })
                    .catch((error) => {
                        toast.error("Error updating player: " + error.message);
                    }
                    );
            } else {
                const newPlayerRef = push(ref(db, 'players'));
                set(newPlayerRef, formData)
                    .then(() => {
                        toast.success("Player added successfully");
                        navigate("/admin/players");
                    })
                    .catch((error) => {
                        toast.error("Error adding player: " + error.message);
                    });

            }
        }
    };

    return (
        <div className="w-full mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{isUpdate ? "Update Player" : "Add New Player"}</h2>
            <p className="text-gray-600 mb-10">{isUpdate ? "Edit the player details below." : "Fill in the details below to add a new player to the database."}</p>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <Input
                        label="Player Name"
                        name="playerName"
                        placeholder="Enter player name"
                        value={formData.playerName}
                        onChange={handleChange}
                        error={errors.playerName}
                    />
                    {errors.playerName && <p className="text-red-500 text-sm mt-1">{errors.playerName}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Select
                            label="University"
                            name="university"
                            options={universities}
                            value={formData.university}
                            onChange={handleChange}
                            error={errors.university}
                        />
                        {errors.university && <p className="text-red-500 text-sm mt-1">{errors.university}</p>}
                    </div>
                    <div>
                        <Select
                            label="Category"
                            name="category"
                            options={categories}
                            value={formData.category}
                            onChange={handleChange}
                            error={errors.category}
                        />
                        {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <Input
                            label="Total Runs"
                            name="totalRuns"
                            type="number"
                            placeholder="Enter runs"
                            value={formData.totalRuns}
                            onChange={handleChange}
                            error={errors.totalRuns}
                        />
                        {errors.totalRuns && <p className="text-red-500 text-sm mt-1">{errors.totalRuns}</p>}
                    </div>
                    <div>
                        <Input
                            label="Balls Faced"
                            name="ballsFaced"
                            type="number"
                            placeholder="Enter balls faced"
                            value={formData.ballsFaced}
                            onChange={handleChange}
                            error={errors.ballsFaced}
                        />
                        {errors.ballsFaced && <p className="text-red-500 text-sm mt-1">{errors.ballsFaced}</p>}
                    </div>
                    <div>
                        <Input
                            label="Innings Played"
                            name="inningsPlayed"
                            type="number"
                            placeholder="Enter innings"
                            value={formData.inningsPlayed}
                            onChange={handleChange}
                            error={errors.inningsPlayed}
                        />
                        {errors.inningsPlayed && <p className="text-red-500 text-sm mt-1">{errors.inningsPlayed}</p>}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <Input
                            label="Wickets"
                            name="wickets"
                            type="number"
                            placeholder="Enter wickets"
                            value={formData.wickets}
                            onChange={handleChange}
                            error={errors.wickets}
                        />
                        {errors.wickets && <p className="text-red-500 text-sm mt-1">{errors.wickets}</p>}
                    </div>
                    <div>
                        <Input
                            label="Overs Bowled"
                            name="oversBowled"
                            type="number"
                            placeholder="Enter overs"
                            value={formData.oversBowled}
                            onChange={handleChange}
                            error={errors.oversBowled}
                        />
                        {errors.oversBowled && <p className="text-red-500 text-sm mt-1">{errors.oversBowled}</p>}
                    </div>
                    <div>
                        <Input
                            label="Runs Conceded"
                            name="runsConceded"
                            type="number"
                            placeholder="Enter runs conceded"
                            value={formData.runsConceded}
                            onChange={handleChange}
                            error={errors.runsConceded}
                        />
                        {errors.runsConceded && <p className="text-red-500 text-sm mt-1">{errors.runsConceded}</p>}
                    </div>
                </div>

                <div className="flex justify-end ">
                    <Button children={isUpdate ? "Update Player" : "Add Player"} />
                </div>
            </form>
        </div>
    );
};

export default PlayerForm;
