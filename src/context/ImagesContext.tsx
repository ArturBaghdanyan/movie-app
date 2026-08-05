import { createContext, Dispatch, SetStateAction, useContext } from "react";
import { Data, Item } from "../types/moveTypes";

export interface ImagesContextType {
  imagesMap: Record<string, string>;
  cover: Record<string, string>;
  bgImage: string;
  handleVideoClick: () => void;
  playingVideo: boolean;
  setPlayingVideo: Dispatch<SetStateAction<boolean>>;
  data: Data | undefined;
  setData: Dispatch<SetStateAction<Data | undefined>>;
  selectedMovie: Item | undefined;
  setSelectedMovie: Dispatch<SetStateAction<Item | undefined>>;
}

export const ImagesContext = createContext<ImagesContextType | undefined>(
  undefined,
);

export const useImages = (): ImagesContextType => {
  const context = useContext(ImagesContext);

  if (context === undefined) {
    throw new Error("useImages must be used within an ImagesProvider");
  }

  return context;
};
