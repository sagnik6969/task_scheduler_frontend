export default (task1, task2) => {
  return task1.data.attributes.progress - task2.data.attributes.progress
}
