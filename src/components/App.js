import React, { useState } from 'react'
import '../styles/App.css';

const App = () => {

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortAscending, setSortAscending] = useState(true);

  //new 
   const fetchData = async () => {
    setIsLoading(true);
    const response = await fetch(
      'https://content.newtonschool.co/v1/pr/main/users'
    );
    const data = await response.json();
    setIsLoading(false);
    setUsers(data);
  };

  const sortUsers = () => {
    setSortAscending(!sortAscending);
    const sortedUsers = [...users].sort((a, b) =>
      sortAscending
        ? a.name.length - b.name.length
        : b.name.length - a.name.length
    );
    setUsers(sortedUsers);
  };
  //

   return (
    <div id="main">
      <h2>User List</h2>
      <button className="fetch-data-btn" onClick={fetchData}>
        Fetch User Data
      </button>
      <button className="sort-btn" onClick={sortUsers}>
        {sortAscending
          ? 'Sort by name length (ascending)'
          : 'Sort by name length (descending)'}
      </button>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="users-section">
          {users.map((user) => (
            <li key={user.id}>
              <section className="id-section">{user.id}</section>
              <section className="name-email-section">
                <p className="name">Name: {user.name}</p>
                <p className="email">Email: {user.email}</p>
              </section>
            </li>
          ))}
        </div>
      )}
    </div>
  );
}


export default App;
