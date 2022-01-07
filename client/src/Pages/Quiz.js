import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
export default class Quiz extends Component {
  state = {
    error: null,
    loading: false,
    quizs: [],
  };

  componentDidMount = () => {
    this.setState({ loading: true });
    axios
      .get("http://localhost:8000/api/v1/quizs", {
        headers: {
          Authorization: `Basic ${localStorage.getItem("token")}`,
        },
      })
      .then((result) => {
        this.setState({ quizs: result.data.data, loading: false });

        console.log(this.state.quizs);
      })
      .catch((err) => this.setState({ loading: false, error: err }));
  };

  render() {
    return (
      <div className=" bg-black">
        {this.state.loading ? (
          <div className="text-center">Уншиж байна...</div>
        ) : (
          <div className="w-full mt-20 bg-black mx-auto md:w-8/12 lg:w-6/12">
            {this.state.quizs.map((e, index) => {
              return (
                <div className="my-10 p-10 bg-gray-900 " key={e + index}>
                  <div className="flex justify-between items-center ">
                    {/* <div className="w-10 h-10 rounded-full bg-gray-800 mr-4"></div> */}

                    <div>
                      <div className="text-lg text-gray-100 font-semibold">
                        {e.title}
                      </div>
                      <div className="text-gray-400 text-xs">
                        {e.createdAt.split("T")[0]}
                      </div>
                    </div>
                    <div className=" py-1 bg-blue-400 bg-opacity-20 text-blue-400 w-3/12 text-center font-bold">
                      {e.category.name}
                    </div>
                  </div>

                  <div className="flex justify-between items-center"></div>
                  <div className="text-gray-200 my-4">{e.description}</div>
                  {e.image !== "no-image.jpg" ? (
                    <div>
                      <div className="bg-gray-800">
                        <img
                          className="h-40 mx-auto "
                          src={`data:image/jpeg;base64,${e.image}`}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gray-800"></div>
                  )}
                  <div className="flex justify-between items-center">
                    <div className="flex">
                      {e.tags.map((el, index) => {
                        return (
                          <div key={(el, index)} className="mr-4 cursor-pointer text-gray-600">
                            {`#${el}`}
                          </div>
                        );
                      })}
                    </div>
                    <Link to={`/quiz/${e._id}`}>
                      <button className="text-gray-100 py-1 px-4 border-2 border-white hover:border-transparent">Эхлэх</button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}
