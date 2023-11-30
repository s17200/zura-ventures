import React, { useState, useEffect } from "react";
import homeIcon from "../assets/home.svg";
import plusIcon from "../assets/Vector.svg";
import codingImage from "../assets/coding.png";
import CustomPopup from "./Popup";
import ProjectList from "./AllProjects";
import EmailSubscriptionPopup from "./Email";

const HomePage = () => {
  const [isPopupVisible, setPopupVisibility] = useState(false);
  const [isEmailPopupVisible, setEmailPopupVisibility] = useState(false);
  const [areProjectsVisible, setProjectsVisibility] = useState(false);
  const userToken = localStorage.getItem("email") || "";

  const toggleCustomPopup = () => {
    console.log("hey")
    setPopupVisibility(!isPopupVisible);
  };

  const handleCloseEmailSubscriptionPopup = () => {
    setEmailPopupVisibility(false);
  };

  const toggleProjectList = () => {
    setProjectsVisibility(true);
    window.location.reload();
  };

  useEffect(() => {
    if (userToken) {
      setPopupVisibility(false);
      setProjectsVisibility(true);
    }
  }, []);

  useEffect(() => {
    setEmailPopupVisibility(true);
  }, []);

  useEffect(() => {
    if (isPopupVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isPopupVisible]);

  return (
    <div className="max-w-screen-lg mx-auto">
      {isEmailPopupVisible && userToken === "" ? (
        <EmailSubscriptionPopup
          show={isEmailPopupVisible}
          handleCloseEmailSubscriptionPopup={handleCloseEmailSubscriptionPopup}
          setEmailPopupVisibility={setEmailPopupVisibility}
        />
      ) : (
        <></>
      )}

      <div
        className="flex border border-gray-500 rounded-full my-7 w-40 px-2 py-1 mb-0 mx-0"
        onClick={() => {
          setProjectsVisibility(false);
        }}
      >
        <img src={homeIcon} alt="back-to-home" className="h-6 mr-1 " />
        <p className="h-5 text-gray-600">Back to Home</p>
      </div>

      {areProjectsVisible ? (
        <ProjectList
          setProjectsVisibility={setProjectsVisibility}
          toggleCustomPopup={toggleCustomPopup}
          isPopupVisible={isPopupVisible}
          toggleProjectList={toggleProjectList}
          
        />
      ) : (
        <div>
          <p className="text-purple-700 text-4xl font-bold text-center font-Roboto" >
            Create a New Project
          </p>

          <div className="flex flex-col justify-center">
            <div className="flex justify-center">
              <img src={codingImage} alt="coding" className="w-1/2" />
            </div>

            <div>
              <p className="text-gray-600 text-center font-roboto text-35 font-normal">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in
              </p>
            </div>
          </div>

          <div className="flex justify-center">
            <div
              className="w-72 h-110 flex items-center justify-center  my-6 rounded-lg bg-gray-900 px-2 py-2"
              onClick={toggleCustomPopup}
            >
              <img src={plusIcon} alt="plus" className="h-8 w-8 m-2" />
              <p className="text-white text-2xl font-bold text-center font-Roboto">
                Create New Project
              </p>
            </div>
          </div>

          {isPopupVisible && (
            <CustomPopup
              toggleCustomPopup={toggleCustomPopup}
              toggleProjectList={toggleProjectList}
              setProjectsVisibility={setProjectsVisibility}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default HomePage;
