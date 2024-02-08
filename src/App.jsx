import { useEffect, useRef, useState } from "react";
import AddTaskModal from "./components/AddTaskModal";
import TaskCard from "./components/TaskCard";
import getTasks from "./utils/getTasks";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [priority, setPriority] = useState("all");

  useEffect(() => {
    getTasks(priority, setTasks);
  }, [priority]);

  // refetch tasks
  const refetch = () => {
    getTasks(priority, setTasks);
  };

  // Modal
  const modalRef = useRef(null);
  const openModal = () => {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };

  const incompleteTasks = tasks?.filter((task) => task.status === "incomplete");
  const processingTasks = tasks?.filter((task) => task.status === "processing");
  const completeTasks = tasks?.filter((task) => task.status === "complete");

  return (
    <>
      <div>
        <AddTaskModal modalRef={modalRef} refetch={refetch} />
      </div>
      <div className="col-span-9 px-10 pt-10">
        <h1 className="text-xl text-center">Tasks</h1>
        <div className="flex justify-between items-center">
          {/* Total Tasks */}
          <div>
            <p>Total Tasks: {tasks?.length}</p>
          </div>
          <div>
            <select onChange={(e) => setPriority(e.target.value)}>
              <option value="all">All Tasks</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high"> High</option>
            </select>
          </div>
          {/* Button to create task */}
          <div>
            <button className="btn btn-primary btn-sm" onClick={openModal}>
              Create New Task
            </button>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-5 mt-5">
          <div className="relative overflow-auto">
            <div className="flex sticky top-0  justify-between bg-[#D3DDF9] p-5 rounded-md mb-3">
              <h1>Incomplete</h1>
              <p className="bg-primary text-white w-6 h-6 grid place-content-center rounded-md">
                {incompleteTasks.length}
              </p>
            </div>
            <div className="space-y-3">
              {incompleteTasks.map((item) => (
                <TaskCard key={item.id} refetch={refetch} task={item} />
              ))}
            </div>
          </div>
          <div className="relative overflow-auto">
            <div className="flex sticky top-0 justify-between bg-[#D3DDF9] p-5 rounded-md mb-3">
              <h1>In Progress</h1>
              <p className="bg-primary text-white w-6 h-6 grid place-content-center rounded-md">
                {processingTasks.length}
              </p>
            </div>
            <div className="space-y-3">
              {processingTasks.map((item) => (
                <TaskCard key={item.id} refetch={refetch} task={item} />
              ))}
            </div>
          </div>
          <div className="relative overflow-auto">
            <div className="flex sticky top-0 justify-between bg-[#D3DDF9] p-5 rounded-md mb-3">
              <h1>Completed</h1>
              <p className="bg-primary text-white w-6 h-6 grid place-content-center rounded-md">
                {completeTasks.length}
              </p>
            </div>
            <div className="space-y-3">
              {completeTasks.map((item) => (
                <TaskCard key={item.id} refetch={refetch} task={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
