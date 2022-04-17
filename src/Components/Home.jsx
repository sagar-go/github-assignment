import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useContext } from "react";
import { MyContext } from "./Context";

import "../Styles/App.css";
import { RiStarSmileFill } from "react-icons/ri";
import { GoRepoForked } from "react-icons/go";
import { FiExternalLink } from "react-icons/fi";
import Spinner from "react-bootstrap/Spinner";

const Home = () => {
  const dispatch = useDispatch();
  const arr = useSelector((e) => e.arr);
  const theme = useSelector((e) => e.theme);
  const { page, setPage } = useContext(MyContext);
  const [num, setnum] = useState();
  const [lang, setlang] = useState("javascript");
  const [src, setsrc] = useState("");
  const [last, setlast] = useState(100);

  useEffect(() => {
    call();
  }, [page, lang]);

  const call = async () => {
    const resp = await fetch(
      `https://api.github.com/search/repositories?q=language:${lang}&sort=stars&order=desc&page=${page}page&per_page=20`
    );
    const data = await resp.json();
    console.log(data);
    dispatch({ type: "set_arr", payload: data.items });
    // setlast(Math.floor(data.total_count / 20));
    // setnum(Math.floor(data.total_count / 20));
    const total = resp.headers.get("link");
    console.log(total);
  };

  const list = arr.filter((e) =>
    e.name.toLowerCase().includes(src.toLowerCase())
  );

  const select = (e) => {
    if (e.target.value === "1") {
      dispatch({ type: "sort_items" });
    } else {
      dispatch({ type: "sort_items2" });
    }
    console.log(e.target.value);
  };

  const select2 = (e) => {
    if (e.target.value === "1") {
      dispatch({ type: "sort_name" });
    } else {
      dispatch({ type: "sort_name2" });
    }
    console.log(e.target.value);
  };

  const select3 = (e) => {
    setlang(e.target.value);
    console.log(e.target.value);
    dispatch({ type: "empty_arr" });
  };

  const redirect = (e) => {
    window.open(e.html_url);
  };

  return (
    <div>
      <div className={theme ? "light" : "dark"}>
        <div className="title">
          <input
            type="text"
            value={src}
            placeholder="Find a repository..."
            onChange={(e) => setsrc(e.target.value)}
          />

          <div>
            <select onChange={select3}>
              <option disabled selected hidden>
                Language
              </option>
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="golang">Go/Golang</option>
              <option value="css">CSS</option>
            </select>

            <select onChange={select2}>
              <option disabled selected hidden>
                Sort by Name
              </option>
              <option value="1">Ascending</option>
              <option value="2">Descending</option>
            </select>

            <select onChange={select}>
              <option disabled selected hidden>
                Sort by Stars
              </option>
              <option value="1">Low to High</option>
              <option value="2">High to Low</option>
            </select>
          </div>
        </div>

        <div className="container">
          {arr.length === 0 ? (
            <div className="spinparent">
              <Spinner
                className="spinner"
                animation="border"
                role="status"
              ></Spinner>
            </div>
          ) : (
            <>
              {list.length ? (
                list.map((e) => (
                  <div key={e.id}>
                    <div className="cards">
                      <div className="card1">
                        <img className="img2" src={e.owner.avatar_url} alt="" />
                        <h4>{e.owner.login}</h4>
                      </div>
                      <div className="card2">
                        <span
                          style={{ transition: "0.7s ease-in-out" }}
                          onClick={() => redirect(e)}
                        >
                          {e.name}
                        </span>
                        <p>{e.description?.substring(0, 200)}</p>
                        <div className="below">
                          <span> Language : {e.language} </span>
                          <div>
                            {" "}
                            <RiStarSmileFill
                              color={theme ? "orange" : "yellow"}
                              style={{ transition: "0.7s ease-in-out" }}
                            />
                            {e.stargazers_count}
                            <GoRepoForked
                              color={theme ? "orange" : "yellow"}
                              style={{ transition: "0.7s ease-in-out" }}
                            />{" "}
                            {e.forks_count}{" "}
                          </div>
                        </div>
                      </div>
                      <div>
                        <a href={e.html_url} target={"_blank"}>
                          <FiExternalLink size={"30px"} cursor={"pointer"} />
                        </a>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="result">
                  <h2>No results found..</h2>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
