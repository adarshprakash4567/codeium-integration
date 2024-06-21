import {
login,
// signup,
getUserDetails,
getUserList,
ReferFriend,
EditPassword,
EditUserDetail
  } from "../common/common";
  
  jest.mock("axios", () => require("../../utils/axios.mock"));
  
  describe("Admin Services Comp", () => {
    test("render comp", async () => {
      localStorage.setItem("refreshToken", "vazha");
      login({});
      // signup();
      getUserDetails();
      getUserList({});
      // EditUserDetail({});
      ReferFriend({});
      EditPassword({})
    });
  });
  