export function createCard(cardData, onDeleteCard, onImageClick, toggleLike) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardElement.querySelector(".card__title").textContent = cardData.name;

  deleteButton.addEventListener("click", () => {
    onDeleteCard(cardElement);
  });

  likeButton.addEventListener("click", () => {
    toggleLike(likeButton);
  });

  cardImage.addEventListener("click", () => {
    onImageClick(cardData); // Вызываем обработчик клика по изображению
  });

  return cardElement;
}

// @todo: Функция лайка
export function toggleLike(likeButton) {
  likeButton.classList.toggle("card__like-button_is-active");
}

// @todo: Функция удаления карточки
export function deleteCard(cardElement) {
  cardElement.remove();
}
