import Swal from 'sweetalert2'

const success = (title="Deleted!", text="Your product has been deleted.") => {
  Swal.fire({
    title: title,
    text: text,
    icon: "success",
    timer: 1500
  });
}

export default success


