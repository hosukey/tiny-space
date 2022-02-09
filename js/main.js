'use strict';
// filter items
const filterTitle = document.querySelectorAll('.filter-title');
const allCategoryPosts = document.querySelectorAll('.all');

for (let i = 0; i < filterTitle.length; i++) {
  filterTitle[i].addEventListener(
    'click',
    filterPosts.bind(this, filterTitle[i])
  );
}

function filterPosts(item) {
  changeActivePosition(item);
  for (let i = 0; i < allCategoryPosts.length; i++) {
    if (allCategoryPosts[i].classList.contains(item.attributes.id.value)) {
      allCategoryPosts[i].style.display = 'block';
    } else {
      allCategoryPosts[i].style.display = 'none';
    }
  }
}

function changeActivePosition(activeItem) {
  for (let i = 0; i < filterTitle.length; i++) {
    filterTitle[i].classList.remove('active');
  }
  activeItem.classList.add('active');
}
