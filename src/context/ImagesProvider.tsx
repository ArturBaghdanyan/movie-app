import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Data, Item } from "../types/moveTypes";
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
import { ImagesContext } from "./ImagesContext";

export const ImagesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();
  const [data, setData] = useState<Data>();
  const [selectedMovie, setSelectedMovie] = useState<Item>();
  const [playingVideo, setPlayingVideo] = useState(false);

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

  const movieToShow = selectedMovie ?? data?.Featured;

  const coverFileName = movieToShow?.CoverImage?.split("/").pop() ?? "";

  const bgImage =
    movieToShow?.Id === data?.Featured.Id
      ? cover["FeaturedCoverImage.png"]
      : (imagesMap[coverFileName] ?? movieToShow?.CoverImage);

  const handleVideoClick = () => {
    navigate(`/movie/${movieToShow?.Id}`);
  };
  return (
    <ImagesContext.Provider
      value={{
        imagesMap,
        cover,
        bgImage,
        handleVideoClick,
        playingVideo,
        setPlayingVideo,
        data,
        setData,
        selectedMovie,
        setSelectedMovie,
      }}
    >
      {children}
    </ImagesContext.Provider>
  );
};
