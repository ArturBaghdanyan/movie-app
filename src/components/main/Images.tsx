import { useImages } from "../../context/ImagesContext";
import featuredTitleImage from "@/assets/FeaturedTitleImage.png";

import { Buttons } from "./buttons";
import style from "./style.module.scss";

export const Images = () => {
  const {
    data,
    selectedMovie,
    playingVideo,
    setPlayingVideo,
    handleVideoClick,
  } = useImages();

  const movieToShow = selectedMovie ?? data?.Featured;

  return (
    <div className={style["main__title"]}>
      <h2>{movieToShow?.Category}</h2>
      <div className={style["main__name"]}>
        {selectedMovie?.Id === data?.Featured.Id ? (
          <img src={featuredTitleImage} alt={data?.Featured.Title} />
        ) : (
          <span className={style["main__text"]}>{selectedMovie?.Title}</span>
        )}
      </div>
      <div className={style["main__metadata"]}>
        <span className={style["main__metadata-item"]}>
          {movieToShow?.ReleaseYear}
        </span>
        <span className={style["main__metadata-item"]}>
          {movieToShow?.MpaRating}
        </span>
        <span className={style["main__metadata-item"]}>
          {movieToShow?.Duration}
        </span>
      </div>
      <p>{movieToShow?.Description}</p>
      <Buttons onPlay={() => setPlayingVideo(true)} />

      {playingVideo && selectedMovie?.VideoUrl && (
        <video
          src={selectedMovie.VideoUrl}
          controls
          autoPlay
          onClick={handleVideoClick}
          className={style["main__video"]}
        />
      )}
    </div>
  );
};
