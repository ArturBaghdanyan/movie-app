import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { Data, Item } from "@/types/moveTypes";
import { Buttons } from "./buttons";
import { MoveList } from "./moves/moves";

import specials1 from "@/assets/https_specials-1.png";
import specials2 from "@/assets/https_specials-2.png";
import specials3 from "@/assets/https_specials-3.png";
import specials4 from "@/assets/https_specials-4.png";
import specials5 from "@/assets/https_specials-5.png";
import specials6 from "@/assets/https_specials-6.png";
import specials7 from "@/assets/https_specials-7.png";
import specials8 from "@/assets/https_specials-8.png";
import featuredTitleImage from "@/assets/FeaturedTitleImage.png";
import featuredCoverImage from "@/assets/FeaturedCoverImage.png";

import style from "./style.module.scss";

const MainContainer = () => {
  const [data, setData] = useState<Data>();
  const [selectedMovie, setSelectedMovie] = useState<Item>();
  const [playingVideo, setPlayingVideo] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  useEffect(() => {
    if (!data) return;

    const storedId = sessionStorage.getItem("selectedMovieId");

    if (storedId) {
      const seenMovie = data.TendingNow.find((m) => m.Id === storedId);
      setSelectedMovie(seenMovie ?? data.Featured);
    } else {
      setSelectedMovie(data.Featured);
    }
  }, [data]);

  const handleMovieClick = (movie: Item) => {
    setSelectedMovie(movie);
    sessionStorage.setItem(
      "selectedMovie",
      JSON.stringify({ id: movie.Id, title: movie.Title })
    );
    setPlayingVideo(false);
  };

  if (!data) return <div>Loading...</div>;

  const imagesMap: Record<string, string> = {
    "FeaturedTitleImage.png": featuredTitleImage,
    "https_specials-1.png": specials1,
    "https_specials-2.png": specials2,
    "https_specials-3.png": specials3,
    "https_specials-4.png": specials4,
    "https_specials-5.png": specials5,
    "https_specials-6.png": specials6,
    "https_specials-7.png": specials7,
    "https_specials-8.png": specials8,
    "https_specials-9.png": specials1,
    "https_specials-10.png": specials2,
    "https_specials-11.png": specials3,
  };

  const cover: Record<string, string> = {
    "FeaturedCoverImage.png": featuredCoverImage,
  };

  const movieToShow = selectedMovie ?? data.Featured;

  const coverFileName = movieToShow.CoverImage?.split("/").pop() ?? "";

  const bgImage =
    movieToShow.Id === data.Featured.Id
      ? cover["FeaturedCoverImage.png"]
      : (imagesMap[coverFileName] ?? movieToShow.CoverImage);

  const handleVideoClick = () => {
    navigate(`/movie/${movieToShow.Id}`);
  };

  return (
    <div
      style={{
        width: '100%',
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "right center",
      }}
    >
      <div className={style.main}>
        <div className={style.main_title}>
          <h2>{movieToShow.Category}</h2>
          <div className={style.main_title_name}>
            {selectedMovie?.Id === data?.Featured.Id ? (
              <img src={featuredTitleImage} alt={data.Featured.Title} />
            ) : (
              <span className={style.main_title_name_text}>
                {selectedMovie?.Title}
              </span>
            )}
          </div>
          <div className={style.main_title_time}>
            <span>{movieToShow.ReleaseYear}</span>
            <span>{movieToShow.MpaRating}</span>
            <span>{movieToShow.Duration}</span>
          </div>
          <p>{movieToShow.Description}</p>
          <Buttons onPlay={() => setPlayingVideo(true)} />

          {playingVideo && selectedMovie?.VideoUrl && (
            <video
              src={selectedMovie.VideoUrl}
              controls
              autoPlay
              onClick={handleVideoClick}
              className={style.main_video}
            />
          )}
        </div>

        <div className={style.main_trending}>
          <h4 className={style.main_trending_title}>Trending Now</h4>
          <div className={style.main_trending_images}>
            <MoveList data={data} onClick={handleMovieClick} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
