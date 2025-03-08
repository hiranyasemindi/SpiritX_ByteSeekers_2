import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Input from "./Input";
import Select from "./Selector";
import Button from "./Button";
import { validatePlayer } from "../utils/validations";
import toast from "react-hot-toast";
import { ref, set, push, db, get } from "../services/firebase";

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

        const validationErrors = validatePlayer(formData);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            if (isUpdate) {
                console.log("Updating Player Data:", formData);
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
