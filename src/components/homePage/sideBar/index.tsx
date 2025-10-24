import { Link } from "react-router-dom";
import { Dispatch, SetStateAction, useState } from "react";

import searchIcon from "@/assets/icons/search.png";
import homeIcon from "@/assets/icons/home.png";
import tvShowIcon from "@/assets/icons/tvShowIcon.png";
import movesIcon from "@/assets/icons/moves.png";
import genresIcon from "@/assets/icons/genres.png";
import watchLaterIcon from "@/assets/icons/watchLater.png";

import style from "./style.module.scss";

const menuItems = [
  { icon: searchIcon, label: "Search", path: "/" },
  { icon: homeIcon, label: "Home", path: "/" },
  { icon: tvShowIcon, label: "TV shows", path: "/" },
  { icon: movesIcon, label: "Movies", path: "/" },
  { icon: genresIcon, label: "Genres", path: "/" },
  { icon: watchLaterIcon, label: "Watch Later", path: "/" },
];
interface ISide {
  isExpanded: boolean;
  setIsExpanded: Dispatch<SetStateAction<boolean>>;
}

export const SideBar = ({ isExpanded, setIsExpanded }: ISide) => {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  return (
    <aside
      className={`${style.pages} ${sidebarExpanded ? style.expanded : ""}`}
      onMouseEnter={() => setSidebarExpanded(true)}
      onMouseLeave={() => setSidebarExpanded(false)}
    >
      <div className={style.pages_container}>
        <div className={style.pages_container_icons}>
          <div className={style.pages_container_icons_column}>
            {menuItems.map((item, index) => (
              <div
                key={index}
                className={style.pages_container_icons_column_item}
              >
                {item.label === "Home" ? (
                  <div
                    className={`${
                      style.pages_container_icons_column_item_home
                    } ${sidebarExpanded ? style.homeIcon : ""}`}
                  >
                    <img src={item.icon} alt={item.label} />
                  </div>
                ) : (
                  <img src={item.icon} alt={item.label} />
                )}
              </div>
            ))}
          </div>

          <div
            className={`${style.pages_container_icons_text} ${
              sidebarExpanded ? style.textExpanded : ""
            } ${style.pagesItem}`}
          >
            {menuItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className={style.pages_container_icons_text_item}
                onClick={() => setIsExpanded(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div
        className={`${style.pages_footer} ${
          sidebarExpanded ? style.footerExpanded : ""
        }`}
      >
        <span>language</span>
        <span>get help</span>
        <span>exit</span>
      </div>
    </aside>
  );
};
