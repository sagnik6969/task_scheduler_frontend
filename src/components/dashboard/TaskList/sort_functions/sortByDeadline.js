export default (task1, task2) => {
  const deadline1 = new Date(
    Date.parse(task1.data.attributes.deadline.replace(/-/g, '/'))
  ).getTime()
  const deadline2 = new Date(
    Date.parse(task2.data.attributes.deadline.replace(/-/g, '/'))
  ).getTime()
  return deadline1 - deadline2
}
