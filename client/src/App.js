
import { useEffect, useState } from 'react';

function App() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    console.log(process.env)
    fetch(process.env.REACT_APP_BASE_URL + 'list').then(res => {
      res.json().then(data => {
        setUsers(data)
      })
    })
  }, [])

  return (
    <ul>
      {users.map(item => {
        return (
          <li>{item.fname + " " + item.lname}</li>
        )
      })}
    </ul>
  );
}

export default App;
