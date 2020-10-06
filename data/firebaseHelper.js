// Just because using firebase
export function transformJsonToArray(json) {
  const values = Object.values(json);
  const keys = Object.keys(json);
  values.forEach((item, idx) => {
    item.id = keys[idx];
  });
  return values;
}

export function transformJsonToObject(json, id) {
  const obj = {...json};
  obj.id = id;
  return obj;
}

export function transformObjectToJson(object) {
  const jsonObject = {...object};
  delete jsonObject.id;
  return jsonObject;
}
