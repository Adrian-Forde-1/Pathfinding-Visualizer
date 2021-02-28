export const addEventListenersToGridRow = (row) => {
  row.addEventListener("drag", (e) => {
    e.preventDefault();
  });
  row.addEventListener("mousedown", (e) => {
    e.preventDefault();
  });
};
