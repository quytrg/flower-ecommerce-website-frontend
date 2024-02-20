import Swal from 'sweetalert2'

const confirm = (title="Are you sure?", text="You won't be able to revert this!", confirmButtonText="Yes, delete it!") => {
  return Swal.fire({
    title: title,
    text: text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: confirmButtonText,
  })
} 

export default confirm
