import React from "react";

import styles from "./SignUp.module.css";
import Sign from "../../components/sign/Sign";
const SignUp = () => {
  return (
    <div className={styles["sign-up"]}>
      <Sign
        redirectedTo="/sign-in"
        redirectionText="If you'r already sign-up"
        submitText="sign-up"
        type={"SIGN-UP"}
      />
    </div>
  );
};

export default SignUp;
