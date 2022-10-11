import React, { useState } from "react";
import { Button, Checkbox, Form, Message } from "semantic-ui-react";
import { register } from "../service";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";
import ReCAPTCHA from "react-google-recaptcha";

export default function Register() {
  let navigate = useNavigate();

  const [errors, setErrors] = useState();

  const [captchaResult, setCaptchaResult] = useState();

  const onSubmit = (event: { preventDefault?: any; target?: any }) => {
    event.preventDefault();
    const { target } = event;

    //if register is successful navigate to login page
    register(Object.fromEntries(new FormData(target)))
      .then((response) => {
        message.success("Register successful");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      })

      //if any error occurs
      .catch((error) => {
        //check if any fields are empty
        if (
          Object.fromEntries(new FormData(target)).username === "" ||
          Object.fromEntries(new FormData(target)).email === "" ||
          Object.fromEntries(new FormData(target)).password === "" ||
          Object.fromEntries(new FormData(target)).password2 === ""
        ) {
          message.error("Error. Fields cannot be empty.");
          //check if username already exists
        } else if (error?.response?.data?.username?.[0]) {
          message.error(
            "Username already exists. Please use another username."
          );
          //check if email already exists
        } else if (error?.response?.data?.email?.[0]) {
          message.error("Email already exists. Please use another email.");
          //check if both passwords match and also check if password is strong
        } else if (error?.response.data.password?.[0]) {
          message.error(error?.response.data.password?.[0]);
        }
      });

    console.log("FormData", Object.fromEntries(new FormData(target)));
  };

  //requesting captcha
  const handleRecaptcha = (value: any) => {
    fetch("http://127.0.0.1:8000/recaptcha/", {
      method: "POST",
      body: JSON.stringify({ captcha_value: value }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        setCaptchaResult(data.captcha.success);
      });
  };

  //design for register
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          backgroundColor: "white",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Form
          onSubmit={onSubmit}
          style={{
            width: "500px",
            border: "2px solid",
            padding: "20px",
            backgroundColor: "#000232",
          }}
        >
          <span
            style={{
              fontSize: "25px",
              fontWeight: "bold",
              fontFamily: "monospace",
              marginLeft: "90px",
              color: "white",
            }}
          >
            Register for FunOlympic
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
            Username
          </label>
          <Form.Input
            name="username"
            placeholder="Enter Username"
            icon="user"
            iconPosition="left"
          />
          <label
            style={{
              fontWeight: "bold",
              fontSize: "20px",
              fontFamily: "monospace",
              color: "white",
            }}
          >
            Email
          </label>
          <Form.Input
            type="email"
            name="email"
            placeholder="Enter email"
            icon="mail"
            iconPosition="left"
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
            type="password"
            name="password"
            placeholder="Enter Password"
            icon="lock"
            iconPosition="left"
          />
          <label
            style={{
              fontWeight: "bold",
              fontSize: "20px",
              fontFamily: "monospace",
              color: "white",
            }}
          >
            Confirm Password
          </label>
          <Form.Input
            type="password"
            name="password2"
            placeholder="Confirm Password"
            icon="lock"
            iconPosition="left"
          />

          <div className="captcha">
            <ReCAPTCHA
              sitekey="6LfgFn0gAAAAAJTqgF2rymj6sAyTqm0-RFssIDmI"
              onChange={handleRecaptcha}
            />

            {/* disabled button if captcha not verified */}
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
              disabled={captchaResult ? false : true}
            >
              Register
            </Button>
          </div>

          <p
            style={{
              marginTop: "7px",
              font: "5px",
              textAlign: "center",
              color: "white",
            }}
          >
            Already have an account?{" "}
            <Link to="/login" style={{ color: "teal" }}>
              &nbsp;<u>Login Here</u>
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
}
