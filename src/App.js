import React, {useState,useEffect} from 'react'
import './App.css';
import Modal from './components/Modal';
import axios from 'axios';  



const App = () => {
  const [modal, setModal] = useState(false);
  const [viewCompleted, setViewCompleted] = useState(false);
  const [activeItem, setActiveItem] = useState({
    title: '',
    description: '',
    completed: false
  });
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    refreshList();
  }, []);

  const refreshList = () => {
    axios
      .get('http://localhost:8000/api/tasks/')
      .then((res) => setTaskList(res.data))
      .catch((err) => console.log(err));
  };

  const toggle = () => {
    setModal(!modal);
  };

  const handleSubmit = (item) => {
    toggle();
    if (item.id) {
      axios
      .put(`http://localhost:8000/api/tasks/${item.id}/`, item)
      .then((res) => refreshList());
    } else {
      axios
      .post('http://localhost:8000/api/tasks/', item)
      .then((res) => refreshList());
    }
  };

  const handleDelete = (item) => {
    axios
    .delete(`http://localhost:8000/api/tasks/${item.id}/`)
    .then(res => refreshList())
  };



  const createItem = () => {
    const item = { title: '', description: '', completed: false };
    setActiveItem(item);
    toggle();
  };

  const editItem = (item) => {
    setActiveItem(item);
    toggle();
  };

  const displayCompleted = (status) => {
    setViewCompleted(status);
  };

  const renderTabList = () => {
    return (
      <div className="my-5 tab-list">
        <span onClick={() => displayCompleted(true)} className={viewCompleted ? 'active' : ''}>
          Completed
        </span>
        <span onClick={() => displayCompleted(false)} className={viewCompleted ? '' : 'active'}>
          Incompleted
        </span>
      </div>
    );
  };

  const renderItems = () => {
    const newItems = taskList.filter((item) => item.completed === viewCompleted);

    return newItems.map((item) => (
      <li key={item.id} className="list-group-item d-flex justify-content-between align-item-center">
        <span className={`todo-title mr-2 ${viewCompleted ? 'completed-todo' : ''}`}>{item.title}</span>
        <span>
          <button className="btn btn-info mx-2" onClick={() => editItem(item)}>
            Edit
          </button>
          <button className="btn btn-danger" onClick={() => handleDelete(item)}>
            Delete
          </button>
        </span>
      </li>
    ));
  };

  return (
    <main className="content p-3 mb-3 bg-info">
      <h1 className="text-white text-uppercase text-center my-4">Task Manager</h1>
      <div className="row">
        <div className="col-md-6 col-sm-10 mx-auto p-0">
          <div className="card p-3">
            <div>
              <button className="btn btn-warning" onClick={createItem}>
                Add Task
              </button>
            </div>
            {renderTabList()}
            <ul className="list-group list-group-flush">{renderItems()}</ul>
          </div>
        </div>
      </div>
      <footer className="my-3 mb-2 bg-info text-white text-center">&copy; 2023 All rights Reserved</footer>
      {modal ? <Modal activeItem={activeItem} toggle={toggle} onSave={handleSubmit} /> : null}
    </main>
  );
};

export default App;