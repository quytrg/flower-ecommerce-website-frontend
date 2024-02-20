import Swal from 'sweetalert2'

const loading = (title="Updating product", text="Please wait...") => {
  return Swal.fire({
    title: title,
    text: text,
    didOpen: () => {
      Swal.showLoading();
    },
  })
} 

export default loading
