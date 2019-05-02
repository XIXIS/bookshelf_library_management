document.addEventListener('DOMContentLoaded', function() {
  let sliderElems = document.querySelectorAll('.slider');
  let sliderInstances = M.Slider.init(sliderElems, {});

  let dropDownElems = document.querySelectorAll('.dropdown-trigger');
  let dropDownInstances = M.Dropdown.init(dropDownElems, {
    hover: true,
    coverTrigger: false
  });

  let floatingActionButtonsElems = document.querySelectorAll('.fixed-action-btn');
  let floatingActionButtonInstances = M.FloatingActionButton.init(floatingActionButtonsElems, {});

  let modalElems = document.querySelectorAll('.modal');
  let modalInstances = M.Modal.init(modalElems, {});

  M.updateTextFields();
});

document.addEventListener('click', function (event) {

  // If the clicked element doesn't have the right selector, bail
  if (!event.target.matches('.view-book')) return;

  // Don't follow the link
  event.preventDefault();

  // Log the clicked element in the console
  console.log(event.target);

}, false);