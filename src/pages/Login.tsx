import { Button, Form, Icon, Message } from "semantic-ui-react";
import { login } from "../service";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";
import userlogo from "../images/olympic.png";
import background from "../images/olympic-background.jpg";

export default function Login(props: any) {
  let token = JSON.parse(localStorage.getItem("token") || "{}");

  console.log(typeof token === "object");

  let navigate = useNavigate();

  const onSubmit = (event: { preventDefault?: any; target?: any }) => {
    event.preventDefault();
    const { target } = event;
    // console.log(Object.fromEntries(new FormData(target)));

    //if login is successful navigate to dashboard page
    login(Object.fromEntries(new FormData(target)))
      .then((response) => {
        console.log(response);
        props.setRefresh(Math.random());
        localStorage.setItem("token", JSON.stringify(response?.data?.access));
        localStorage.setItem("user", JSON.stringify(response?.data));
        message.success("Login successful");
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      })

      //if any error occurs
      .catch((error) => {
        //check if username or password field is empty
        if (
          Object.fromEntries(new FormData(target)).username === "" ||
          Object.fromEntries(new FormData(target)).password === ""
        ) {
          message.error("Error. Username or password field is empty.");
          //check if username exists or not
        } else if (error?.response?.data?.detail) {
          message.error(error?.response?.data?.detail);
        }
      });

    // console.log("FormData", Object.fromEntries(new FormData(target)));
  };

  //design for login
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        // backgroundColor: "#b224ef",
        backgroundColor: "white",
      }}
    >
      <Form
        onSubmit={onSubmit}
        style={{
          width: "390px",
          height: "500px",
          backgroundColor: "#000232",
          border: "2px solid",
          padding: "20px",
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              width: "100%",
              alignItems: "center",
            }}
          >
            
              <img src={userlogo} style={{ width: "70px", height: "auto" }} />
           
            <div
              style={{
                fontSize: "25px",
                fontWeight: "bold",
                fontFamily: "monospace",
                marginTop: "5px",

                color: "white",
              }}
            >
              Login to FunOlympic 
            </div>
          </div>
          <hr></hr>
          <br></br>

          <label
            style={{
              fontWeight: "bold",
              fontSize: "20px",
              fontFamily: "monospace",
              color: "white",
            }}
          >
            Username
          </label>
          <Form.Input
            fluid
            icon="user"
            iconPosition="left"
            name="username"
            size="large"
            placeholder="Enter Username"
          />
          <label
            style={{
              fontWeight: "bold",
              fontSize: "20px",
              fontFamily: "monospace",
              color: "white",
            }}
          >
            Password
          </label>
          <Form.Input
            id={"password"}
            icon="lock"
            iconPosition="left"
            type="password"
            name="password"
            size="large"
            placeholder="Enter password"
          />
          <Button
            style={{
              padding: "15px 30px",
              fontSize: "15px",
              fontWeight: "bold",
              width: "100%",
              fontFamily: "monospace",
              marginTop: "15px",
            }}
            color="teal"
            type="submit"
          >
            Login
          </Button>

          <p
            style={{
              marginTop: "7px",
              font: "5px",
              textAlign: "center",
              color: "white",
            }}
          >
            Don't have an account?{" "}
            <Link to="/register" style={{ color: "teal" }}>
              &nbsp;<u>Register Here</u>
            </Link>
          </p>
        </div>
      </Form>
    </div>
  );
}
