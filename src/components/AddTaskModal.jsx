import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

const AddTaskModal = ({ modalRef, refetch }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  //  Submit the form
  const onSubmit = async (data) => {
    //  Add id and default status to the data
    const id = uuidv4();
    const status = "incomplete";
    data = { ...data, status, id };

    //   Get data to the local storage
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    if (tasks) {
      //   Add new task to the existing tasks
      localStorage.setItem("tasks", JSON.stringify([...tasks, data]));
    } else {
      //   Add new task to the local storage
      localStorage.setItem("tasks", JSON.stringify([data]));
    }
    //   Reset the form
    reset();

    //   Refetch the tasks
    refetch();

    //   Close the modal
    modalRef.current.close();

    //   Show success message
    toast.success("Task Added Successfully");
  };
  return (
    <dialog id="my_modal_1" className="modal" ref={modalRef}>
      <div className="modal-box ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-sm mx-auto mt-8 p-6 rounded"
        >
          <div>
            <label className="block mb-2">Task Name</label>
            <input
              placeholder="Task Name"
              {...register("name", { required: true })}
              className="w-full border p-2 mb-4"
            />
          </div>
          {/* errors will return when field validation fails  */}
          {errors.exampleRequired && (
            <span className="text-red-500">This field is required</span>
          )}
          <div>
            <label className="block mb-2">Description</label>
            <textarea
              placeholder="Description"
              {...register("description", { required: true })}
              className="w-full border p-2 mb-4"
            />
          </div>
          {errors.exampleRequired && (
            <span className="text-red-500">This field is required</span>
          )}
          <div>
            <label className="block mb-2">Priority</label>
            <select
              {...register("priority", { required: true })}
              className="w-full border p-2 mb-4"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high"> High</option>
            </select>
          </div>
          <div className="flex justify-between mt-4">
            <button
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => modalRef.current.close()}
            >
              Cancel
            </button>
            <input
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              value="Submit"
            />
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default AddTaskModal;
