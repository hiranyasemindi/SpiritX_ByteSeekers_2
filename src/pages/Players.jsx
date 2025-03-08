import React, { useEffect, useState } from 'react'
import PlayerTable from '../components/PlayerTable'
import { useNavigate } from 'react-router-dom';
import { db, ref, get } from '../services/firebase'

export default function Players() {
  const [players, setPlayers] = useState([]);
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
    const playersRef = ref(db, 'players');
    get(playersRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const playersData = snapshot.val();
          const playersList = [];
          for (let id in playersData) {
            playersList.push({ id, ...playersData[id] });
          }
          console.log('playersList:', playersList);
          setPlayers(playersList);
        } else {
          console.log('No data available');
        }
      })
      .catch((error) => {
        console.error('Error retrieving players:', error);
      });
  }, []);
  const navigate = useNavigate()

  return (
    <PlayerTable playerList={players} categories={categories} universities={universities} onAddNewPlayer={() => navigate('add')} />
    // <>  </>
  )
}
