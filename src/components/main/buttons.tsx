import playButton from "@/assets/icons/play-button.png";

import style from "./style.module.scss";

interface ButtonsProps {
  onPlay: () => void;
}

export const Buttons = ({ onPlay }: ButtonsProps) => {
  return (
    <div className={style.main_title_buttons}>
      <div className={style.main_title_buttons_item}>
        <div className={style.main_title_buttons_item_play}>
          <img src={playButton} alt="play-button" />
               <button onClick={onPlay}>Play</button>
        </div>
      </div>
      <div
        className={`${style.main_title_buttons_item} ${style.main_title_buttons_more}`}
      >
        <button>More info</button>
      </div>
    </div>
  );
};
