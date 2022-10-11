import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card } from "semantic-ui-react";
import { Pagination } from "antd";
import axios from "axios";
import { Col, Input, Row } from "antd";

import Search from "../UI/Search";

export default function BrowseMatchHighlights() {
  let navigate = useNavigate();

  const [games, setGames] = useState<any>([]);

  const [search, setSearch] = useState(null);
  const [page, setPage] = useState(1);

  // const getGames = async () => {
  //   const response = await axios.get("http://127.0.0.1:8000/gamehighlight/");
  //   // console.log(response.data);
  //   setGames(response.data);
  // };

  const getLiveGame = async (search: any, page: any) => {
    if (search === null) {
      const response = await axios.get(
        `http://127.0.0.1:8000/gamehighlight/?page=${page}`
      );
      setGames(response?.data);
    } else {
      const response = await axios.get(
        `http://127.0.0.1:8000/gamehighlight/?search=${search}&page=${page}`
      );
      setGames(response?.data);
    }
  };

  useEffect(() => {
    getLiveGame(search, page);
  }, [search, page]);

  return (
    <div style={{ marginTop: "-10px", background:"#f2f2f2",paddingTop:"5px" }}>
      <div style={{ width:"500px",marginTop:"10px",marginLeft:"400px"}}>
        <Input
          placeholder="Search Match Highlights"
          onChange={(e: any) => {
            setPage(1);
            setSearch(e.target.value);
          }}
        />
      </div>

      {games?.results?.map((game: any) => (
        <Card
          style={{ margin: "30px auto", width: "85%", padding: "32px" }}
          onClick={() => navigate(`/viewmatchhighlight/${game.id}`)}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <img
              src={game.team1_logo}
              alt="logo"
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                marginTop: "-10px",
              }}
            />
            <div style={{ width: "140px", marginLeft: "-320px" }}>
              {game.team1}
            </div>
            <div style={{ marginTop: "-26px" }}>
              <h3 style={{ textAlign: "center" }}>{game.game_title}</h3>
              <h3
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "20px",
                }}
              >
                {game.team1_score} : {game.team2_score}
              </h3>
            </div>
            <div style={{ width: "130px" }}>{game.team2}</div>
            <img
              src={game.team2_logo}
              alt="logo"
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                marginTop: "-10px",
                marginLeft: "-390px",
              }}
            />
          </div>
        </Card>
      ))}

      <span style={{ display: "flex", justifyContent: "center" }}>
        <Pagination
          defaultCurrent={1}
          current={page}
          pageSize={8}
          total={games?.count}
          onChange={(page) => {
            setPage(page);
          }}
        />
      </span>
    </div>
  );
}
