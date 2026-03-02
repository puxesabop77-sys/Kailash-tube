import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { storage, db } from './firebase'; // Your firebase config
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";

export default function AdminPanel() {
  const [progress, setProgress] = useState(0);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const storageRef = ref(storage, `videos/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', 
      (snapshot) => {
        const p = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(p);
      }, 
      (error) => console.error(error),
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        await addDoc(collection(db, "videos"), { url, name: file.name, createdAt: new Date() });
        alert("Video Uploaded!");
        setProgress(0);
      }
    );
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: {'video/*': []} });

  return (
    <div className="p-10 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Hidden Admin Panel</h1>
      <div {...getRootProps()} className="border-2 border-dashed border-blue-400 p-20 cursor-pointer rounded-lg bg-gray-50">
        <input {...getInputProps()} />
        <p>Drag & drop video here, or click to upload</p>
      </div>
      {progress > 0 && <div className="mt-4 w-full bg-gray-200 rounded-full h-2.5">
        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
      </div>}
    </div>
  );
                                         }
    
