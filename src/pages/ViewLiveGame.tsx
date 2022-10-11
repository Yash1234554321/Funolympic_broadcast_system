import React, { createElement, useState, useEffect } from "react";
import "antd/dist/antd.css";
import axios from "axios";
import { Button, Comment, Form, Header } from "semantic-ui-react";

import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import { Avatar, message } from "antd";
import moment from "moment";
import { livecomment } from "../service";

export default function ViewLiveGame() {
  const [liveGame, setLiveGame] = useState<any>([]);
  const [comments, setComments] = useState<any>([]);
  const [refresh, setRefresh] = useState(Math.random());

  let param = useParams();

  let user = JSON.parse(localStorage.getItem("user") || "{}");

  console.log(user?.id);

  const getGames = async () => {
    const response = await axios.get(
      `http://127.0.0.1:8000/livegame/${param.id}`
    );
    // console.log(response.data);
    setLiveGame(response?.data);
  };

  const getComments = async () => {
    const response = await axios.get(`http://127.0.0.1:8000/listlivecomments/`);
    // console.log(response.data);
    setComments(response?.data);
  };

  useEffect(() => {
    getGames();
  }, []);

  useEffect(() => {
    getComments();
  }, [refresh]);

  const onSubmit = (event: { preventDefault?: any; target?: any }) => {
    event.preventDefault();
    const { target } = event;

    livecomment({
      content: Object.fromEntries(new FormData(target)).comment,
      author: user.id,
      live_game: param?.id,
    })
      .then((response) => {
        setRefresh(Math.random());
       
      })

      .catch((error) => {
        if (Object.fromEntries(new FormData(target)).comment === "") {
          message.error("Error. Comment cannot be empty.");
        }
      });
  };
  return (
    <div style={{ display: "flex",background:"#f2f2f2",paddingTop:"5px",marginTop: "-10px" }}>
      <div>
        <ReactPlayer style={{ margin: "50px" }} url={liveGame?.broadcast_url} />
      </div>
      <div
        style={{ marginTop: "50px",width:"500px",border:"0.1px dotted brown",background:"white" }}
      >
        <Comment.Group>
          <Header as="h3" dividing style={{textAlign:"center"}}>
            Comments
          </Header>

          {comments
            .filter((item2: any) => item2?.live_game?.id == param.id)
            .map((item: any) => (
              <Comment>
                <Avatar
                  style={{ backgroundColor: "green", verticalAlign: "middle" }}
                  size="default"
                >
                  {item?.author?.username.charAt(0).toUpperCase()}
                </Avatar>
                <Comment.Content>
                  <Comment.Author as="a">
                    <div style={{ marginLeft: "40px", marginTop: "-25px" }}>
                      {item?.author?.username}
                    </div>
                  </Comment.Author>
                  <div style={{ marginLeft: "100px", marginTop: "-18px" }}>
                    <Comment.Metadata>
                      {moment(item.broadcast_date_and_time)
                        .locale("en")
                        .fromNow()}
                    </Comment.Metadata>
                  </div>
                  <div style={{ marginLeft: "40px"}}>
                  <Comment.Text>{item?.content}</Comment.Text>
                  </div>
                </Comment.Content>
              </Comment>
            ))}
          <div>
            <Form reply onSubmit={onSubmit}>
              <div style={{ border:""}}>
              <Form.TextArea name="comment" />
              </div>
              <div style={{textAlign:"center"}}>
              <Button
                content="Add Comment"
                labelPosition="left"
                icon="edit"
                primary
              />
              </div>
            </Form>
          </div>
        </Comment.Group>
      </div>
    </div>
  );
}
