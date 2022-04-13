
export const handleCreateUpdate = (
    isCreate, 
    createAction, 
    updateAction, 
    objectData, 
    onSetLoading, 
    showModal, 
    getObjects,
    objectName
) => {
  const saveUpdate = isCreate ? createAction : updateAction;
  const data = JSON.parse(JSON.stringify(objectData));
  document.getElementById("modal").style.display = "none";
  onSetLoading(true);
  saveUpdate(data)
  .then(() => {
    showModal();
    getObjects();
    alert(objectName + " creado correctamente");
  })
  .catch(error => {
    const errorData = error.response.data;
    const entries = Object.entries(errorData);
    let message = "";
    if (entries.length > 0)
        for(const [key, value] of entries) message += `${key}: ${value}`
    document.getElementById("modal").style.display = "flex";
    alert("Ocurrió un error: " + message);
    onSetLoading(false);
  });
}