import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useContext } from "react";
import Pagination from "react-bootstrap/Pagination";
import "../Styles/App.css";
import Home from "./Home";
import { MyContext } from "./Context";

const Main = () => {
  const dispatch = useDispatch();
  const theme = useSelector((e) => e.theme);
  const { page, setPage } = useContext(MyContext);

  return (
    <>
      <Home />
      <Pagination
        className={theme ? "light pagination" : "dark pagination"}
        onClick={() => dispatch({ type: "empty_arr" })}
      >
        <Pagination.Item
          className="li_item"
          disabled={page === 1 ? true : false}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </Pagination.Item>
        <Pagination.Item
          className="li_item"
          active={page === 1 ? true : false}
          onClick={() => setPage(1)}
        >
          {1}
        </Pagination.Item>
        <Pagination.Item
          className="li_item"
          active={page === 2 ? true : ""}
          onClick={() => setPage(2)}
        >
          {2}
        </Pagination.Item>
        <Pagination.Item
          className="li_item"
          active={page === 3 ? true : ""}
          onClick={() => setPage(3)}
        >
          {3}
        </Pagination.Item>
        <Pagination.Item
          className="li_item"
          active={page === 4 ? true : ""}
          onClick={() => setPage(4)}
        >
          {4}
        </Pagination.Item>
        <Pagination.Ellipsis
          className="li_item"
          onClick={() => setPage(page + 1)}
        >
          ..
        </Pagination.Ellipsis>
        <Pagination.Ellipsis
          active={page > 4 ? true : true}
          onClick={() => setPage(page + 10)}
        >
          {page} <sup>(+10)</sup>
        </Pagination.Ellipsis>
        <Pagination.Item className="li_item" onClick={() => setPage(468)}>
          {468}
        </Pagination.Item>
        <Pagination.Item
          className="li_item"
          disabled={page === 468 ? true : null}
          onClick={() => setPage(page + 1)}
        >
          Next
        </Pagination.Item>
      </Pagination>
    </>
  );
};

export default Main;
