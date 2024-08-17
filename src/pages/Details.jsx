import {
  IonAvatar,
  IonBackButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSearchbar,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useEffect, useState } from "react";
import {
  chevronForward,
  gameController,
  tv,
  tvOutline,
  videocamOutline,
} from "ionicons/icons";
import { useParams } from "react-router";

const Details = () => {
  const [movie, setMovie] = useState({});
  const API_URI = "https://www.omdbapi.com/?apikey=72abd0e1";
  // get the id from url
  const movieId = useParams().id;
  useEffect(() => {
    // fetch movie details based on id
    const getMovieDetails = async (movieId) => {
      await fetch(API_URI + "&i=" + movieId)
        .then((response) => response.json())
        .then((data) => setMovie(data))
        .catch((error) => console.error("Error:", error));
    };
    getMovieDetails(movieId);
  }, []);
  console.log(movie);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={"danger"}>
          <IonBackButton slot="start" color={"light"} defaultHref="/" />
          <IonTitle>Movie Details</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className="contain">
          <IonItem>
            <IonLabel>
              <div className="font-bold text-center">{movie.Title}</div>
            </IonLabel>
          </IonItem>
          <IonImg src={movie.Poster}></IonImg>
          <IonItem>
            <IonLabel position="stacked">Year:</IonLabel>
            <IonLabel>{movie.Year}</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Genre:</IonLabel>
            <IonLabel>{movie.Genre}</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Director:</IonLabel>
            <IonLabel>{movie.Director}</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Actors:</IonLabel>
            <IonLabel>{movie.Actors}</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Plot:</IonLabel>
            <IonLabel>{movie.Plot}</IonLabel>
          </IonItem>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Details;
