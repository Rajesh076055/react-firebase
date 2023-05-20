import { Auth } from './components/Auth';
import './App.css';
import { db,auth,storage } from './config/firebase';
import { useEffect, useState } from 'react';
import {getDocs, collection, addDoc, deleteDoc, updateDoc, doc} from 'firebase/firestore';
import {ref, uploadBytes} from 'firebase/storage';
function App() {

  const [movies, setMovies] = useState([]);

  const [movieName, setMovieName] = useState('');
  const [movieDate,setMovieDate] = useState(0);
  const [isOscarMovie, setIsOscarMovie] = useState(true);
  const [updateTitle,setUpdatedTitle] = useState('');
  
  //file uploading state
  const [fileUpload,setFileUpload] = useState(null)

  const moviesCollectionRef = collection(db, 'movies');


  

  useEffect(()=>{
    async function getMovieList()
    {
      try {
        const data = await getDocs(moviesCollectionRef);
        const filteredData = data.docs.map((doc)=>({
          ...doc.data(),
           id:doc.id}));

        setMovies(filteredData);

      } catch (error) {
        console.error(error);
      }

      
    }

    getMovieList();
  },[movies]);

  const deleteMovie = async(ID) => {
    const movieDoc = doc(db, 'movies',ID);
    await deleteDoc(movieDoc);
  }

  const updateMovie = async(ID) => {
    const movieDoc = doc(db, 'movies', ID);
    await updateDoc(movieDoc, {title:updateTitle})
  }
  const handleNewMovie = async()=>{
    try {
      await addDoc(moviesCollectionRef, {
        title: movieName,
        releaseDate: movieDate,
        isOscar: isOscarMovie,
        userId: auth?.currentUser?.uid
      });

      
    } catch (error) {
      console.error(error);
    }
 
  }

  const uploadFile = async() => {
    if (!fileUpload) return;
    const filesFolderRef = ref(storage,`projectFiles/${fileUpload.name}`);
    try {
      await uploadBytes(filesFolderRef,fileUpload);
    } catch (error) {
     console.error(error); 
    }
    

  }

  return (
    <div className="App">
      <Auth/>
      
      <div>
        <input placeholder='movie name' type='text' onChange={(e)=>setMovieName(e.target.value)}/>
        <input placeholder='release Date...' type='number' onChange={(e)=>setMovieDate(e.target.value)}/>
        <input placeholder='Oscar or not?' type='checkbox' checked={isOscarMovie} onChange={(e)=>setIsOscarMovie(e.target.checked)}/>
        <label>Received an oscar?</label>

        <button onClick={handleNewMovie}>Submit Movie</button>
      </div>
      {movies.map((eachMovie,index)=>{
        return (
          <div key = {index}>
            <h1 style = {eachMovie.isOscar?{'color':'green'}:{'color':'red'}}>{eachMovie.title}</h1>
            <h2>Date: {eachMovie.releaseDate}</h2>
            <button onClick={()=>deleteMovie(eachMovie.id)}>Delete</button>
            <input placeholder='Update Title...' type='text' onChange={(e)=>setUpdatedTitle(e.target.value)}></input>
            <button onClick={()=>updateMovie(eachMovie.id)}>Update Title</button>
          </div>
        )
      })}

      <div>
        <input type='file' onChange={(e)=>setFileUpload(e.target.files[0])}/>
        <button onClick={uploadFile}>Upload File</button>
      </div>
    </div>
  );
}

export default App;
