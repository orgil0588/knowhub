import React, { Component } from "react";
import axios from "axios";
export default class Register extends Component {
  state = {
    name: null,
    email: null,
    password: null,
    image: null,
    error: null,
    loading: false,
    success: false,
  };

  handleType = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value, error: null });
  };
  handleClick = (e) => {
    const { name, email, image, password } = { ...this.state };
    this.setState({ loading: true });
    axios
      .post("http://localhost:8000/api/v1/users", {
        name,
        email,
        image,
        password,
      })
      .then((result) => {
        this.setState({ loading: false, success: true });
      })
      .catch((error) => {
        this.setState({
          error: error.response.data.error._message,
          loading: false,
        });
      });
  };
  render() {
    return (
      <div className="w-full h-screen mt-40 bg-black mx-auto md:w-8/12 lg:w-6/12">
        {this.state.error && (
          <div className="text-red-400 border border-red-400 py-2 px-4 my-4 ">
            {this.state.error}
          </div>
        )}
        {this.state.success && (
          <div className="text-green-400 border border-green-400 py-2 px-4 my-4 ">
            Бүртгэл амжилттай !!!
          </div>
        )}

        <div className="w-full mx-auto border border-gray-900 mt-20 p-10 ">
          {/* {this.state.token && <div>{this.state.token}</div>}
          {this.state.error && (
            <div className="text-red-400 border border-red-400 py-2 px-4 my-4 ">
              {this.state.error}
            </div>
          )} */}
          <div className="text-lg text-gray-100 font-semibold">Бүртгүүлэх</div>
          <div className="flex flex-col justify-center">
            <label className="mt-2 text-gray-400">Нэр</label>
            <input
              className="py-1 px-4 bg-transparent border border-gray-900"
              name="name"
              type="text"
              placeholder="Нэрээ бичнэ үү"
              onChange={this.handleType}
            />
          </div>
          <div className="flex flex-col justify-center">
            <label className="mt-2 text-gray-400">Имейл</label>
            <input
              className="py-1 px-4 bg-transparent border border-gray-900"
              name="email"
              type="text"
              placeholder="Email-ээ бичнэ үү"
              onChange={this.handleType}
            />
          </div>
          {/* <div className="flex flex-col justify-center">
            <label className="mt-2 text-gray-400">Зураг оруулах</label>
            <input
              className="py-1 px-4 bg-transparent border border-gray-900"
              name="image"
              type="file"
              accept="image/png, image/jpeg"
              onChange={(e) => {
                console.log(e.target.files)
              }}
            />
          </div> */}

          <div className="flex flex-col">
            <label className="mt-2 text-gray-400">Нууц үг</label>
            <input
              className="py-1 px-4 bg-transparent border border-gray-900"
              name="password"
              type="password"
              placeholder="Нууц үгээ бичнэ үү"
              onChange={this.handleType}
            />
          </div>
          <div
            className=" w-full bg-gray-900 mt-4 py-2 text-center cursor-pointer hover:bg-gray-800 "
            onClick={this.handleClick}
          >
            <a className="text-gray-100 text-md hover:text-gray-200 ">
              Бүртгүүлэх
            </a>
          </div>
        </div>
      </div>
    );
  }
}
