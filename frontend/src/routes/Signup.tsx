import React, { FormEvent, useState } from "react";
import axios from "axios";

import { ParticleBackground } from "../components/styled-components/Background/Background";
import { SignupUrl } from "../misc/backendUrls";
import {
  FormButton,
  FormInput,
  FormLabel,
  NewToThisLink,
  SignupForm,
  SignupH1,
  SignupWrapper,
  Eye,
} from "../components/containers/SignUpPage/Signup";
import { LinkToTHisPage } from "../components/styled-components/Link/LinkComponent";

import { useDispatch } from "react-redux";
import { signUp } from "../redux/reducer/UserReducer";

import ClosedEyeSvg from "../Icons/closedEye.svg";
import { useHistory } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useDispatch();
  const history = useHistory();

  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault();

    axios
      .post(SignupUrl, {
        name: username,
        email: email,
        password: password,
      })
      .then((data) => {
        if (data) {
          let userInfo = data.data;
          history.push("/home");
          dispatch(signUp(userInfo));
        }
      })
      .catch((err) =>
        typeof err.response.data === "string"
          ? alert(err.response.data)
          : alert(err.response.data[0])
      );
  };

  return (
    <ParticleBackground>
      <SignupWrapper>
        <SignupH1>XYZ</SignupH1>
        <SignupForm>
          <FormLabel>Username: </FormLabel>
          <FormInput
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <FormLabel>Email: </FormLabel>
          <FormInput
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <FormLabel>Password: </FormLabel>
          <FormInput
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Eye src={ClosedEyeSvg} />

          <FormButton onClick={onFormSubmit}>Sign up</FormButton>

          <NewToThisLink>
            Already have an account? {LinkToTHisPage("/login", "Login")}
          </NewToThisLink>
        </SignupForm>
      </SignupWrapper>
    </ParticleBackground>
  );
};

export default Signup;
