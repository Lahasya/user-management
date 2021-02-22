
import { useEffect, useState } from 'react';
import { Button, Table, Modal, Input, message } from 'antd';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState({ fname: '', lname: '' });
  const [popstate, setPopstate] = useState(false)

  useEffect(() => {
    console.log(process.env)
    fetch(process.env.REACT_APP_BASE_URL + 'list').then(res => {
      res.json().then(data => {
        setUsers(data)
      })
    })
  }, [])

  const handleOk = () => {
    if (name.fname.trim() !== '' && name.lname.trim() !== '') {
      axios.post(process.env.REACT_APP_BASE_URL + 'create', {
        fname: name.fname,
        lname: name.lname,
      })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      setPopstate(false);
    } else {
      message.warning('Please enter all the values');
    }

  };

  const handleCancel = () => {
    setPopstate(false);
  };

  return (
    <>
      <h1 style={{ marginBottom: '22px', marginLeft: '10px' }}>USER INFO</h1>
      <div style={{ marginBottom: '22px', marginLeft: '10px' }}>
        <Button type="primary" onClick={() => {
          setPopstate(true)
        }}>Register User</Button>
      </div>
      <div style={{ marginBottom: '22px', marginLeft: '10px', marginRight: '20px' }}>
        <Table dataSource={users} columns={[
          {
            title: 'First Name',
            dataIndex: 'fname',
            key: 'fname',
          },
          {
            title: 'Last Name',
            dataIndex: 'lname',
            key: 'lname',
          }
        ]} />;
      </div>
      {/*  {users.map(item => {
        return (
          <li>{item.fname + " " + item.lname}</li>
        )
      })} */}

      <Modal title="Registation" visible={popstate} onOk={handleOk} onCancel={handleCancel}
        okText="Register"
        cancelText="Cancel">
        <p>Please enter below detaisl to register</p>
        <p>
          <label>First Name</label>
          <Input placeholder="Enter First Name" onChange={(e) => {
            setName({ ...name, fname: e.target.value.trim() })
          }} />
        </p>
        <p>
          <label>Last Name</label>
          <Input placeholder="Enter Last Name" onChange={(e) => {
            setName({ ...name, lname: e.target.value.trim() })
          }} />
        </p>
      </Modal>
    </>
  );
}

export default App;
