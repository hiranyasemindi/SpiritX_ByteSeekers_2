import { db, ref, onValue } from '../services/firebase';
const openAIKey = "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"; 
const GPT_MODEL = "gpt-4-turbo"; 

export const fetchPlayerDatabase = (setPlayerDatabase, setMessages) => {
    console.log("Fetching player database from Firebase...");

    setMessages([
        {
            sender: 'AI',
            message: "Loading player database...",
            time: new Date().toLocaleTimeString(),
        },
    ]);

    const playersRef = ref(db, 'players');

    const unsubscribe = onValue(playersRef, (snapshot) => {
        console.log("Snapshot received from Firebase:", snapshot.exists());

        if (snapshot.exists()) {
            const playersData = snapshot.val();
            const playersList = Object.keys(playersData).map(id => ({ id, ...playersData[id] }));
            setPlayerDatabase(playersList);
            setMessages([
                {
                    sender: 'AI',
                    message: "I have loaded the cricket player database. Ask me anything about team creation!",
                    time: new Date().toLocaleTimeString(),
                },
            ]);
        } else {
            console.warn("No player data found in Firebase.");
            setMessages([
                {
                    sender: 'AI',
                    message: "No player data found. Try adding some players first.",
                    time: new Date().toLocaleTimeString(),
                },
            ]);
        }
    });

    return unsubscribe;
};
export const getGPTResponse = async (userQuestion, playerDatabase) => {
    if (!playerDatabase || playerDatabase.length === 0) {
        console.warn("Player database is empty or not loaded yet.");
        return "Player database not loaded yet. Please wait.";
    }

    try {
        const requestBody = {
            model: GPT_MODEL,
            messages: [
                { role: "system", content: "Your name is Spiriter and You are an expert assistant for selecting a virtual cricket team within a budget. Answer based on the given player data only. If the question is outside cricket team selection, politely refuse.also mention your name when the startingchat with user" },
                { role: "user", content: `Here is the player database in JSON format:\n${JSON.stringify(playerDatabase)}` },
                { role: "user", content: userQuestion }
            ],
            temperature: 0.7,
            max_tokens: 200,
        };
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${openAIKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
        });
        console.log("OpenAI API response status:", response.status);
        if (!response.ok) {
            throw new Error(`Failed to get AI response. Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("OpenAI Response Data:", data);

        return data.choices[0]?.message?.content || "I couldn't generate a response.";
    } catch (error) {
        console.error("Error fetching AI response:", error);
        return "Sorry, I'm having trouble processing your request.";
    }
};
