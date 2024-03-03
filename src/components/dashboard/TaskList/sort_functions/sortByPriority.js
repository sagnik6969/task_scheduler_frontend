const priorities = {
  Normal: 0,
  Important: 1,
  'Very Important': 2
}

export default (task1, task2) => {
  return priorities[task2.data.attributes.priority] - priorities[task1.data.attributes.priority]
}
