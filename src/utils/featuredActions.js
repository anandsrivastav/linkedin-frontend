export function arrayUpdation(data = [], value = null) {
  if(!value) return data;

  if(data.indexOf(value) < 0) {
    data.push(value)
  } else {
    const index = data.indexOf(value)
    data.splice(index, 1)
  }
  return data;
}