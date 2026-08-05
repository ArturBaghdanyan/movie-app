import { useImages } from "../../context/ImagesContext";
import { MoveList } from "./moves/moves";
import { Images } from "./Images";
import type { Item } from "../../types/moveTypes";

import style from "./style.module.scss";

const MainContainer = () => {
  const { data, setPlayingVideo, setSelectedMovie, bgImage } = useImages();

  const handleMovieClick = (movie: Item) => {
    setSelectedMovie(movie);
    sessionStorage.setItem(
      "selectedMovie",
      JSON.stringify({ id: movie.Id, title: movie.Title }),
    );
    setPlayingVideo(false);
  };

  if (!data) return <div>Loading...</div>;

  return (
    <div
      style={{
        width: "100%",
        aspectRatio: "4 / 3",
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "top center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className={style["main"]}>
        <Images />

        <div className={style["main__trending"]}>
          <h4 className={style["main__trending-title"]}>Trending Now</h4>
          <div className={style["main__trending-list"]}>
            <MoveList data={data} onClick={handleMovieClick} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
