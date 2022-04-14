import { useRouter } from "vue-router";
import { notify } from "@kyvg/vue3-notification";

export const getMessageErrorFormat = (error) => {
  const errorData = error.response.data;
  const entries = Object.entries(errorData);
  let message = "<ul>";
  if (entries.length > 0) for(const [key, value] of entries) message += `<li>${key}: ${value}</li>`;
  message += "</ul>"
  return message;
}

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
    notify({
      title: objectName,
      text: `El ${objectName} ha sido ${isCreate ? 'creado' : 'actualizado'} correctamente.`,
      type: 'success'
    });
  })
  .catch(error => {
    document.getElementById("modal").style.display = "flex";
    notify({title: objectName, text: getMessageErrorFormat(error), type: 'error'});
    onSetLoading(false);
  });
}

export const basicAuth = () => {
  const router = useRouter();
  const isAuth = localStorage.getItem("authToken");
  if (!isAuth) router.push({ name: "login" });
}