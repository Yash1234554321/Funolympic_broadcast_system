import { Button, Form, Message } from "semantic-ui-react";
import { changePassword } from "../service";
import { message } from "antd";
import { Link, useNavigate } from "react-router-dom";

export default function ChangePassword(props: any) {
  let navigate = useNavigate();

  

  const onSubmit = (event: { preventDefault?: any; target?: any }) => {
    event.preventDefault();
    const { target } = event;
    // console.log(Object.fromEntries(new FormData(target)));
    let token = JSON.parse(localStorage.getItem("token") || "{}");
    

    //if login is successful navigate to dashboard page
    changePassword(Object.fromEntries(new FormData(target)),token)
      .then((response) => {
        setTimeout(() => {
          localStorage.removeItem("token");

          props.setRefresh(Math.random());
          message.success("Password changed successfully");
          navigate("/login");
        }, 1000);
      })

      //if any error occurs
      .catch((error) => {
        if (error?.response?.data.hasOwnProperty("old_password")) {
          message.error(error?.response?.data?.old_password[0]);
        }

        //check if username or password field is empty
        if (
          Object.fromEntries(new FormData(target)).old_password === "" ||
          Object.fromEntries(new FormData(target)).new_password === ""
        ) {
          message.error("Error. Please enter both passwords.");
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
        height: "90vh",
        backgroundColor: "white",
        paddingTop: "5px",
        marginTop: "-10px",
      }}
    >
      <Form
        onSubmit={onSubmit}
        style={{
          width: "380px",
          backgroundColor: "#000232",
          height: "500px",
          border: "2px solid",
          padding: "20px",
        }}
      >
        <div style={{ marginTop: "60px" }}>
          <span
            style={{
              fontSize: "25px",
              fontWeight: "bold",
              fontFamily: "monospace",
              marginLeft: "30px",
              color: "white",
            }}
          >
            Change Your Password
          </span>
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
            Old Password
          </label>
          <Form.Input
            fluid
            icon="lock"
            iconPosition="left"
            name="old_password"
            type="password"
            size="large"
            placeholder="Enter Old Password"
          />
          <label
            style={{
              fontWeight: "bold",
              fontSize: "20px",
              fontFamily: "monospace",
              color: "white",
            }}
          >
            New Password
          </label>
          <Form.Input
       
            icon="lock"
            iconPosition="left"
            type="password"
            name="new_password"
            size="large"
            placeholder="Enter new password"
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
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
}
