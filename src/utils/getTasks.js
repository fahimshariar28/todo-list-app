const getTasks = (priority, setTasks) => {
  // get tasks from the local storage
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  // set tasks based on the priority
  if (priority === "all") {
    setTasks(tasks);
  }
  if (priority === "low") {
    const lowPriorityTasks = tasks?.filter((task) => task.priority === "low");
    setTasks(lowPriorityTasks);
  }
  if (priority === "medium") {
    const mediumPriorityTasks = tasks?.filter(
      (task) => task.priority === "medium"
    );
    setTasks(mediumPriorityTasks);
  }
  if (priority === "high") {
    const highPriorityTasks = tasks?.filter((task) => task.priority === "high");
    setTasks(highPriorityTasks);
  }
};
export default getTasks;
