import React from 'react';
import Players from './Players';
import { Link } from 'react-router-dom';

class GithubBattle extends React.Component {
  constructor(props) {
    super();
    this.state = {
      inputText1: '',
      inputText2: '',
      hideForm1: false,
      hideForm2: false,
      data1: '',
      data2: '',
      closeUser1Data: true,
      closeUser2Data: true,
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let id = event.target.dataset.id;
    if (this.state[id]) {
      fetch(`https://api.github.com/users/${this.state[id]}`)
        .then((res) => res.json())
        .then((data) => {
          if (id === 'inputText1') {
            this.setState({
              [id]: '',
              data1: data,
              hideForm1: true,
              closeUser1Data: false,
            });
          } else {
            this.setState({
              [id]: '',
              data2: data,
              hideForm2: true,
              closeUser2Data: false,
            });
          }
        });
    }
  };

  hadleChange = ({ target }) => {
    let { value } = target;
    let id = target.dataset.id;
    this.setState({ [id]: value });
  };

  handleKeyPress = (event) => {
    if (event.target === 13) {
      this.handleSubmit(event);
    }
  };

  closeUserData = ({ target }) => {
    let id = target.dataset.id;
    if (id === 'user1') {
      this.setState((prevState) => ({
        hideForm1: !prevState.hideForm1,
        closeUser1Data: !prevState.closeUser1Data,
        data1: '',
      }));
    } else {
      this.setState((prevState) => ({
        hideForm2: !prevState.hideForm2,
        closeUser2Data: !prevState.closeUser2Data,
        data2: '',
      }));
    }
  };

  render() {
    return (
      <main className="flex flex-col items-center">
        <section className="w-4/6">
          <h1 className="text-center text-4xl mb-12">Instructions</h1>
          <div className="flex justify-between">
            <div className="flex-35 flex flex-col items-center">
              <h3 className="text-center text-2xl">Enter two Github users</h3>
              <div
                className={
                  this.props.darkMode
                    ? 'bg-gray-600 h-64  text-center w-64 flex justify-center items-center my-3'
                    : 'bg-gray-300 h-64  text-center w-64 flex justify-center items-center my-3'
                }
              >
                <i className="fas fa-user-friends text-9xl text-green-400"></i>
              </div>
            </div>

            <div className="flex-35 flex flex-col items-center">
              <h3 className="text-center text-2xl">Battle</h3>
              <div
                className={
                  this.props.darkMode
                    ? 'bg-gray-600 h-64  text-center w-64 flex justify-center items-center my-3'
                    : 'bg-gray-300 h-64  text-center w-64 flex justify-center items-center my-3'
                }
              >
                <i className="fas fa-balance-scale text-9xl text-blue-500"></i>
              </div>
            </div>

            <div className="flex-35 flex flex-col items-center">
              <h3 className="text-center text-2xl">Know the Winner</h3>
              <div
                className={
                  this.props.darkMode
                    ? 'bg-gray-600 h-64  text-center w-64 flex justify-center items-center my-3'
                    : 'bg-gray-300 h-64  text-center w-64 flex justify-center items-center my-3'
                }
              >
                <i className="fas fa-shield-alt text-9xl text-yellow-400"></i>
              </div>
            </div>
          </div>
        </section>
        <section className="mt-32">
          <h2 className="text-center text-3xl">Players</h2>
          <div className="flex justify-between mt-6">
            <Players
              {...this.state}
              handleChange={this.hadleChange}
              handleSubmit={this.handleSubmit}
              handleKeyPress={this.handleKeyPress}
              closeUserData={this.closeUserData}
              darkMode={this.props.darkMode}
            />
          </div>

          <div className="text-center py-12">
            <Link
              to={{
                pathname: '/userbattle',
                state: [this.state.data1, this.state.data2],
              }}
            >
              <h4
                className={
                  !this.state.closeUser1Data && !this.state.closeUser2Data
                    ? 'visible bg-black text-white py-3 px-8 font-bold inline-block rounded-md'
                    : 'hidden'
                }
              >
                Battle
              </h4>
            </Link>
          </div>
        </section>
      </main>
    );
  }
}

export default GithubBattle;
