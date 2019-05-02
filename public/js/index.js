document.addEventListener('DOMContentLoaded', function() {
  let elems = document.querySelectorAll('.slider');
  let instances = M.Slider.init(elems, {});

  let dropDownElems = document.querySelectorAll('.dropdown-trigger');
  let dropDownInstances = M.Dropdown.init(dropDownElems, {
    hover: true,
    coverTrigger: false
  });
});