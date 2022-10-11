import React, { useState, useEffect } from "react";

import { Col, Input, Row } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { Card, Icon, Image } from "semantic-ui-react";
import { Pagination } from "antd";
import axios from "axios";

export default function BrowseLiveGames() {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<any>([]);

  const [search, setSearch] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      const response = await axios.get("http://127.0.0.1:8000/livegame/");
      setPosts(response.data);
      setLoading(false);
    };
    loadPosts();
  }, []);

  let navigate = useNavigate();

  let token = JSON.parse(localStorage.getItem("token") || "{}");

  console.log(typeof token === "string");

  const [games, setGames] = useState<any>([]);

  const getLiveGame = async (search: any, page: any) => {
    if (search === null) {
      const response = await axios.get(
        `http://127.0.0.1:8000/livegame/?page=${page}`
      );
      setGames(response?.data);
    } else {
      const response = await axios.get(
        `http://127.0.0.1:8000/livegame/?search=${search}&page=${page}`
      );
      setGames(response?.data);
    }
  };

  useEffect(() => {
    getLiveGame(search, page);
  }, [search, page]);

  const extra = (
    <div>
      <a>
        <Icon name="time" />
      </a>
      <br />
    </div>
  );

  return (
    <div
      style={{ marginTop: "-10px", background: "#f2f2f2", paddingTop: "5px" }}
    >
      <div style={{ width: "500px", marginTop: "15px", marginLeft: "400px" }}>
        <Input
          placeholder="Search Live Games"
          onChange={(e: any) => {
            setPage(1);
            setSearch(e.target.value);
          }}
        />
      </div>
      <>
        <Row
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
          style={{ width: "100%", marginLeft: "0px" }}
        >
          {games?.results?.map((game: any) => (
            <Col className="gutter-row" span={6}>
              <Card
                style={{ marginTop: "20px", width: "100%", height: "95%" }}
                onClick={() => navigate(`/viewlivegame/${game.id}`)}
              >
                <img
                  src={game.thumbnail_image}
                  style={{ height: "200px", width: "100%" }}
                />
                <Card.Content>
                  <Card.Header>{game.game_title}</Card.Header>
                  <Card.Meta>
                    <p
                      style={{ fontWeight: "bold" }}
                    >{`${game.team1} vs ${game.team2}`}</p>
                  </Card.Meta>
                </Card.Content>
                <Card.Content extra>
                  <div style={{ display: "flex" }}>
                    <Icon name="time" />{" "}
                    <p style={{ fontWeight: "bold" }}>
                      {game.broadcast_date_and_time}
                    </p>
                  </div>
                </Card.Content>
              </Card>

              {/* <Card
                // image={game.thumbnail_image}
                cover={
                  <img
                    alt="example"
                    src={game.thumbnail_image}
                  />
                }
                header={game.game_title}
                meta={`${game.team1} vs ${game.team2}`}
                extra={
                  <>
                    {" "}
                    <Icon name="time" /> {game.broadcast_date_and_time}
                  </>
                }
                style={{ marginTop: "20px", width: "100%", height: "95%" }}
                onClick={() => navigate(`/viewlivegame/${game.id}`)}
              /> */}
            </Col>
          ))}
        </Row>
      </>
      <span
        style={{
          display: "flex",
          justifyContent: "center",
          // marginTop: "200px",
        }}
      >
        <Pagination
          style={{
            marginTop: "30px",
            marginBottom: "20px",
            fontWeight: "bold",
          }}
          defaultCurrent={1}
          current={page}
          pageSize={8}
          total={posts?.count}
          onChange={(page) => {
            setPage(page);
          }}
        />
      </span>
    </div>
  );
}
