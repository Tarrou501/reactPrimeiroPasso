import React, { ChangeEvent, useState } from 'react';
import GithubImage from './github.png';
import './App.css';
import { userGitHub } from './types/githubuser';

function App() {
  const [search, setSearch] = useState('');
  const [userData, setUserData] = useState<userGitHub>();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetch(`https://api.github.com/users/${search}`)
      .then(response => response.json())
      .then(userResponse => setUserData(userResponse));
    console.log(userData);
  }


  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setSearch(event.target.value);
  }

  return (
    <div className="container text-center">
      <h1 className="py-5 text-uppercase">Github profile</h1>
      <form onSubmit={handleSubmit}>

        <div className='form-group'>
          <div className='input-group'>
            <input type="text" className='form-control' required
              value={search}
              onChange={handleChange}></input>
            <span className='input-group-btn'>
              <button type='submit' className='btn btn-success'>Search</button>
            </span>
          </div>
        </div>
      </form>
      <div className='py-5'>
        {!userData && (
          <img src={GithubImage} className='responsive rounded-circle' alt="" height="200px" />
        )}
        {userData && (
          <div>
            <img src={userData.avatar_url} className='responsive rounded-circle' alt="" height="200px" />
            <h1 className='pt-5'>
              <a href={userData.html_url} target="_new" >{userData.name}</a>
            </h1>
            <h3>{userData.location}</h3>
            <p>
              <a href={userData.blog} target="_new" className="text-info">
                {userData.blog}
              </a>
            </p>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;
