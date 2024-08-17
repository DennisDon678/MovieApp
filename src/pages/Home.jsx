import { IonAvatar, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonPage, IonSearchbar, IonTitle, IonToolbar } from '@ionic/react';
import './Home.css';
import { useEffect, useState } from 'react';
import { chevronForward, gameController, tv, tvOutline, videocamOutline} from 'ionicons/icons'

const Home = () => {
  const API_URI = "https://www.omdbapi.com/?apikey=72abd0e1";
  const [term, setTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const searchMovies = async () => {
    if(term == ''){
      setMovies([])
      return 
    }
   await fetch(API_URI + "&s=" + term, {
      method: "GET",
      mode: "cors",
    }).then((response) => response.json().then((responseData) => setMovies(responseData)))
  }

  useEffect(() => {
   searchMovies();
  }, [term]);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={"danger"}>
          <IonTitle>Movie Mania</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className="contain">
          <h1 className="font-bold text-2xl text-center mb-1">
            Welcome to Movie Mania!
          </h1>
          <p className="text-sm text-center mb-3">
            Built to allow your to explore the world of movies and games and
            shows.
          </p>

          <IonSearchbar
            color={"light"}
            onIonChange={(e) => setTerm(e.target.value)}
            debounce={300}
            placeholder="Movie name or Show name or Game name"
          ></IonSearchbar>

          <IonList>
            {movies.Search &&
              movies.Search.map((movie, index) => (
                <IonItem button key={index} href={"/movie/" + movie.imdbID}>
                  <IonAvatar slot="start">
                    <img
                      src={movie.Poster}
                      alt="Movie Poster"
                      className="w-full h-full"
                    />
                  </IonAvatar>
                  <IonLabel>
                    <h2>{movie.Title}</h2>
                    <p>Year: {movie.Year}</p>
                  </IonLabel>
                  <IonIcon
                    icon={
                      movie.Type == "movie"
                        ? videocamOutline
                        : movie.Type == "game"
                        ? gameController
                        : movie.Type == "series"
                        ? tvOutline
                        : null
                    }
                  ></IonIcon>
                  <IonIcon icon={chevronForward} slot="end"></IonIcon>
                </IonItem>
              ))}

            {movies.Search && movies.Search.length === 0 && (
              <IonLabel>
                <div>
                  <p className="text-center">
                    No movies found with the provided search term.
                  </p>
                </div>
              </IonLabel>
            )}
            {!movies.Search && (
              <IonLabel>
                <p className="text-center">Please enter a search term.</p>
              </IonLabel>
            )}
          </IonList>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
