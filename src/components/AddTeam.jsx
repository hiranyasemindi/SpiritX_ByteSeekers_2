import { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import toast from "react-hot-toast";
import { db, ref, set } from "../services/firebase";
import { useNavigate } from "react-router-dom";

function AddTeam() {
    const [teamName, setTeamName] = useState("");
    const [budget, setBudget] = useState(9000000);
    const username = localStorage.getItem("username")
    const navigate = useNavigate()

    const handleAddTeam = () => {
        if (teamName.trim() === "") {
            toast.error("Team name required")
        };

        const teamData = {
            teamName,
            budget,
            players: [],
        };

        set(ref(db, `teams/${username}`), teamData)
            .then(() => {
                toast.success("Team created successfully!");
            })
            .catch(() => toast.error("Error creating team."));
        setTeamName("");
        navigate('/user/team')
    };

    return (
        <div className="p-5 bg-white shadow-md rounded-md">
            <h2 className="text-xl font-semibold mb-3">Add Your Team</h2>
            <div className="flex items-center space-x-3">
                <Input
                    type="text"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    placeholder="Enter team name"
                />
                <Button styles={'w-1/6'} onClick={handleAddTeam}>Add Team</Button>
            </div>
        </div>
    );
}

export default AddTeam;
