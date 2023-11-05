import React, { useRef, useState } from "react";
import { Link, Navigate } from "react-router-dom";

import useUserContext from "../../context/userContex";
import ACTION_TYPE from "../../context/userReducer";

import bgImage from "../../../assets/images/blog-3.jpg";

import styles from "./HomePage.module.css";
import GridLettering from "../../components/grid lettering/GridLettering";

const HomePage = () => {
  const [userState, userDispatch] = useUserContext();
  const servicesRef = useRef(undefined);
  const headerRef = useRef(undefined);
  const [signout, setSignout] = useState(false);
  if (!userState.id || signout) {
    return <Navigate to="/sign-in" />;
  }
  return (
    <div className={styles.home}>
      <header ref={headerRef}>
        <div className={styles["image-container"]}>
          <img src={bgImage} alt="background" />
        </div>
        <div className={styles["intro"]}>
          <h1>Welcome to Student Record Management System</h1>
          <button
            onClick={(event) => {
              servicesRef.current.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Read more
          </button>
        </div>
      </header>
      <div ref={servicesRef} className={styles["services"]}>
        <GridLettering
          word={"Services"}
          letter_styles={{
            border: "1px solid rgba(0, 0, 0, .1)",
            backgroundColor: "rgba(250, 120, 10, .1)",
            transform: "skew(0, -25deg)",
            fontSize: "3rem",
            marginRight: ".45rem",
          }}
        />
        <div className={styles["services-container"]}>
          <div className={styles["service"]}>
            <div className={styles["icon"]}>👨‍💻</div>
            <p>
              This Student Record Management System could be used to Write
              records of your students.
            </p>
          </div>
          <div className={styles["service"]}>
            <div className={styles["icon"]}>🧙‍♂️</div>
            <p>
              This Student Record Management System could be used to edit the
              records of your students.
            </p>
          </div>
          <div className={styles["service"]}>
            <div className={styles["icon"]}>🙅‍♂️</div>
            <p>
              This Student Record Management System could be used to delete the
              records of your students.
            </p>
          </div>
          <div className={styles["service"]}>
            <div className={styles["icon"]}>🗃️</div>
            <p>
              This Student Record Management System could be used to save the
              records of your students in cloud.
            </p>
          </div>
        </div>
      </div>
      <footer>
        <address>
          <p className={styles["author"]}>
            author of application:
            <span>Nesredin Getahun</span>
          </p>
          <p className={styles["tel"]}>
            tel:
            <span>+251 962875515</span>
          </p>
          <p className={styles["address"]}>
            Location:
            <span>Addis Ababa, Kilito, AASTU</span>
          </p>
        </address>
        <div className={styles["options-container"]}>
          <ul className={styles["links"]}>
            <li>
              <button
                onClick={(event) => {
                  headerRef.current.scrollIntoView({ behavior: "smooth" });
                }}
              >
                🔝
              </button>
            </li>
            <li>
              <Link to="/get-records">get records</Link>
            </li>
            <li>
              <Link to="/create-record">create records</Link>
            </li>
            <li>
              <Link
                to="/sign-out"
                onClick={(event) => {
                  event.preventDefault();
                  setSignout(true);
                  userDispatch({
                    type: ACTION_TYPE.SIGN_OUT,
                  });
                }}
              >
                sign out
              </Link>
            </li>
          </ul>

          <div className={styles["social-medias"]}>
            <span>facebook</span>
            <span>github</span>
            <span>tweeter</span>
            <span>Instagram</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
