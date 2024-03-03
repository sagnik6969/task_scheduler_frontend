export default (taskA, taskB) => {
  return new Date(taskB.data.attributes.created_at) - new Date(taskA.data.attributes.created_at)
}
