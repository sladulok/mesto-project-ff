export function createCard(cardData, onDeleteCard, onImageClick, onLikeClick) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardImage = cardElement.querySelector(".card__image");
  const likeCounter = cardElement.querySelector(".card__like-counter");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardElement.querySelector(".card__title").textContent = cardData.name;

  // Проверяем, принадлежит ли карточка текущему пользователю
  if (cardData.owner._id !== window.userId) {
    deleteButton.style.display = 'none';
  }

  // Устанавливаем начальное состояние лайка и счетчик лайков
  updateLikeStatus(likeButton, likeCounter, cardData.likes);

  deleteButton.addEventListener("click", () => {
    onDeleteCard(cardElement, cardData._id);
  });

  likeButton.addEventListener("click", () => {
    onLikeClick(cardElement, cardData._id);
  });

  cardImage.addEventListener("click", () => {
    onImageClick(cardData);
  });

  return cardElement;
}

export function updateLikeStatus(likeButton, likeCounter, likes) {
  likeCounter.textContent = likes.length;
  if (likes.some(like => like._id === window.userId)) {
    likeButton.classList.add("card__like-button_is-active");
  } else {
    likeButton.classList.remove("card__like-button_is-active");
  }
}

export function toggleLike(cardElement, newLikes) {
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCounter = cardElement.querySelector(".card__like-counter");
  updateLikeStatus(likeButton, likeCounter, newLikes);
}

export function deleteCard(cardElement) {
  cardElement.remove();
}