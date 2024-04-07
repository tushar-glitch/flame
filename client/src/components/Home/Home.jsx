import React, { useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import io from "socket.io-client"
import Sidebar from '../../pages/Sidebar';
const socket = io.connect("http://localhost:5000")
console.log(socket);


const Home = () => {
  const navigate = useNavigate();
  const rating = localStorage.getItem('rating')
  const lobbyStart = 50 * parseInt(rating / 50);
  const lobby = lobbyStart + '-' + (lobbyStart + 50);
  const joinLobby = () => {
    socket.emit("join_lobby", lobby)
  }
  useEffect(() => {
    socket.on("userPaired", (opponentSocketId) => {
      console.log("Paired with " + opponentSocketId);
      navigate("/play")
    })
    socket.on("wait", (lobby) => {
      console.log("Waiting for other players to join");
    })
  },[])
  return (
      <>
      <div className="flex">
        <Sidebar/>

      <div className="flex-1 bg-gray-100 p-8">
        <div className="max-w-lg mx-auto">
          {/* Profile Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Profile</h2>
            <div className="bg-white p-4 rounded-md shadow-md">
              <p>Username: JohnDoe</p>
              <p>Rating: 1800</p>
              <p>Rank: Diamond</p>
            </div>
          </div>

          {/* Play Options Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Play Options</h2>
            <div className="grid grid-cols-2 gap-4">
              <button className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-md" onClick={joinLobby}>
                Play 1v1
              </button>
              <button className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-md">
                Play a Friend
              </button>
            </div>
          </div>

          {/* Other Options Section */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Other Options</h2>
            <div className="grid grid-cols-2 gap-4">
              <button className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-md">
                Solve a Problem
              </button>
              <button className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-md">
                Global Leaderboard
              </button>
              <button className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-md">
                Battle History
              </button>
              <button className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-md">
                Upsolve a Question
              </button>
              <button className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-md">
                Watch a Battle
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Home
