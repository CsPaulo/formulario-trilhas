document.addEventListener('DOMContentLoaded', function () {
  const dateInput = document.getElementById('data-nascimento');
  dateInput.addEventListener('input', function () {
    const value = dateInput.value;
    const [day, month, year] = value.split('-');
    dateInput.value = `${day}/${month}/${year}`;
  });
});
