import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import { collection, getDocs } from "firebase/firestore";

export default function VideoGallery() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const querySnapshot = await getDocs(collection(db, "videos"));
      setVideos(querySnapshot.docs.map(doc => doc.data()));
    };
    fetchVideos();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold mb-8">My Private Theater</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((vid, index) => (
          <div key={index} className="bg-zinc-900 p-4 rounded-xl">
            <video controls className="w-full rounded-md shadow-lg">
              <source src={vid.url} type="video/mp4" />
            </video>
            <p className="mt-2 text-sm text-gray-400">{vid.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
    }
            
