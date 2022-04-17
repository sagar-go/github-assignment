import React from "react";
import "../Styles/App.css";
import "../Styles/Nav.css";
import { FaMoon, FaGithub, FaSun } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";

const Nav = () => {
  const dispatch = useDispatch();
  const theme = useSelector((e) => e.theme);

  return (
    <>
      <nav className={theme ? "light " : "dark "}>
        <FaGithub
          size={"40px"}
          color={theme ? "black" : "gray"}
          cursor={"pointer"}
        />
        {theme ? (
          <FaSun
            size={"30px"}
            onClick={() => dispatch({ type: "set_theme" })}
            color={theme ? "orange" : "yellow"}
            cursor={"pointer"}
          />
        ) : (
          <FaMoon
            size={"30px"}
            onClick={() => dispatch({ type: "set_theme" })}
            color={theme ? "orange" : "yellow"}
            cursor={"pointer"}
          />
        )}
      </nav>
    </>
  );
};

export default Nav;
