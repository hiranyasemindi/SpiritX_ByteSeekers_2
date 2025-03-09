import { useEffect, useState } from "react";
import AddTeam from "../components/AddTeam";
import Team from "../components/Team";
import { db, onValue, ref } from "../services/firebase";

function UserTeam() {
    const [teams, setTeams] = useState({});
    const username = localStorage.getItem("username")
    
    useEffect(() => {
        const teamRef = ref(db, `teams/${username}`);

        const unsubscribe = onValue(teamRef, (snapshot) => {
            if (snapshot.exists()) {
                setTeams(snapshot.val()); 
            } else {
                setTeams(null); 
            }
        });

        return () => unsubscribe();
    }, []);
    return (
        <div className="w-full h-full">
            {teams.length == 0 ? (<>
                <AddTeam />
            </>) : (<>
                <Team />
            </>)}
        </div>
    )
}

export default UserTeam
