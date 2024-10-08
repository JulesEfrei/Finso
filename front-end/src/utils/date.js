export function formatDateToDMY(date) {
  const d = new Date(date);
  const yyyy = d.getFullYear();
  let mm = d.getMonth() + 1; // Months start at 0!
  let dd = d.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  return mm + "/" + dd + "/" + yyyy;
}

export const firstDateOfMonth = (date = new Date()) =>
  new Date(date.getFullYear(), date.getMonth(), 1);

export const lastDateOfMonth = (date = new Date()) =>
  new Date(date.getFullYear(), date.getMonth() + 1, 0);

export function monthlyDate(date = new Date()) {
  return [
    formatDateToDMY(firstDateOfMonth(date)),
    formatDateToDMY(lastDateOfMonth(date)),
  ];
}
