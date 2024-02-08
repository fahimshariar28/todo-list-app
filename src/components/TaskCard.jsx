import { FaTrashAlt, FaLongArrowAltRight, FaEdit } from "react-icons/fa";
import { toast } from "react-hot-toast";
import UpdateTaskModal from "./UpdateTaskModal";
import { useRef } from "react";

const TaskCard = ({ task, refetch }) => {
  // get tasks from the local storage
  const tasks = JSON.parse(localStorage.getItem("tasks"));

  let updatedStatus;
  if (task.status === "incomplete") {
    updatedStatus = "processing";
  } else if (task.status === "processing") {
    updatedStatus = "complete";
  }

  const handleStatus = (id) => {
    // update status in the local storage
    const updatedTasks = tasks?.map((task) => {
      if (task.id === id) {
        task.status = updatedStatus;
      }
      return task;
    });

    //   update the local storage
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    toast.success(`Status Updated to ${updatedStatus}`);
    refetch();
  };

  const handleDelete = async (id) => {
    // delete task from the local storage
    const remainingTask = tasks?.filter((task) => task.id !== id);
    // update the local storage
    localStorage.setItem("tasks", JSON.stringify(remainingTask));
    toast.success("Task Deleted");
    refetch();
  };

  const modalRef = useRef(null);
  const openModal = () => {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };

  return (
    <>
      <UpdateTaskModal task={task} modalRef={modalRef} refetch={refetch} />
      <div className="bg-secondary/10 rounded-md p-5">
        <div className="flex justify-between">
          <h1
            className={`text-lg font-semibold mb-3 ${
              task.priority === "high" ? "text-red-500" : " "
            } ${task.priority === "medium" ? "text-yellow-500" : " "} ${
              task.priority === "low" ? "text-green-500" : " "
            }`}
          >
            {task?.name}
          </h1>
          <p
            className={`text-lg ${
              task.priority === "high" ? "text-red-500" : " "
            } ${task.priority === "medium" ? "text-yellow-500" : " "} ${
              task.priority === "low" ? "text-green-500" : " "
            }`}
          >
            {task?.priority}
          </p>
        </div>
        <p className="mb-3">{task?.description}</p>
        <div className="flex justify-between mt-3">
          <button onClick={openModal} className="flex gap-2 items-center">
            Edit <FaEdit />
          </button>
          <div className="flex gap-3">
            <button onClick={() => handleDelete(task.id)} title="Delete">
              <FaTrashAlt className="h-5 w-5 text-red-500" />
            </button>
            {task.status !== "complete" && (
              <button
                onClick={() => handleStatus(task.id)}
                title="Update Status"
              >
                <FaLongArrowAltRight className="h-5 w-5 text-primary" />
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskCard;
