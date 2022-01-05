import Swal from "sweetalert2";

const customAlerts = {
  askLogout: () =>
    Swal.fire({
      title: "Logout",
      text: "Do you want to logout?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }),
  successLogout: () =>
    Swal.fire({
      icon: "success",
      title: "Successfully unlogged!",
      timer: 1500,
      showConfirmButton: false,
    }),
  successLogin: () =>
    Swal.fire({
      icon: "success",
      title: "Welcome to Wallatroll!",
      timer: 1500,
      showConfirmButton: false,
    }),
  successRegister: () =>
    Swal.fire({
      icon: "success",
      title: "Successfully Registered!",
      timer: 1500,
      showConfirmButton: false,
    }),
  error: (message) =>
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: message,
    }),
  successNewAdvertCreated: () =>
    Swal.fire({
      icon: "success",
      title: "Success",
      text: "New advert successfully created",
      timer: 1500,
      showConfirmButton: false,
    }),
  askDeleteAd: () =>
    Swal.fire({
      title: "Delete",
      text: "Do you want to delete?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }),
  successDeleteAd: () =>
    Swal.fire({
      icon: "success",
      title: "Successfully Deleted!",
      timer: 1500,
      showConfirmButton: false,
    }),
};

export default customAlerts;
