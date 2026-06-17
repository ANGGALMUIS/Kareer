import Swal from "sweetalert2";

export const showError = (title: string, text: string) => {
  return Swal.fire({
    icon: "error",
    title,
    text,

    confirmButtonText: "Mengerti",

    customClass: {
      popup: "rounded-3xl",
      confirmButton: "rounded-xl",
    },

    buttonsStyling: true,
  });
};

export const showSuccess = (title: string, text: string) => {
  return Swal.fire({
    icon: "success",
    title,
    text,

    confirmButtonText: "OK",

    customClass: {
      popup: "rounded-3xl",
      confirmButton: "rounded-xl",
    },
  });
};
