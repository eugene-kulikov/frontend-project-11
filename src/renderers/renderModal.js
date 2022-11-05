export default (state, elements, btn) => () => {
  const postId = btn.getAttribute('data-id');
  const postRead = elements.posts.querySelector(`a[data-id="${postId}"]`);
  postRead.classList.remove('fw-bold');
  postRead.classList.add('fw-normal', 'link-secondary');
  state.viewedPosts.push(postId);
  const { title, link, description } = state.posts.find((post) => post.id === postId);
  elements.modal.title.textContent = title;
  elements.modal.description.textContent = description;
  elements.modal.link.setAttribute('href', link);
};
