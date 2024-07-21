import { Slide, toast } from 'react-toastify';


export const notifySuccess = (text) => toast.success(text || "Success", {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: true,
  progress: undefined,
  theme: "dark",
  transition: Slide,
});
export const notifyError = (text) => toast.error(text || "Something went wrong!", {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: true,
  progress: undefined,
  theme: "dark",
  transition: Slide,
});