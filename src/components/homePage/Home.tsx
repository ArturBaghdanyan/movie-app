import { useState } from "react";

import { SideBar } from "./sideBar";
import MainContainer from "../main";

import style from "./style.module.scss";

const Home = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={style["home"]}>
      <div className={style['home__container']}>
        <SideBar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
        <MainContainer />
      </div>
    </div>
  );
};

export default Home;
