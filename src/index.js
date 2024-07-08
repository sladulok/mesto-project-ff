import "./pages/index.css";
import { createCard, deleteCard, toggleLike } from "./components/card.js";
import { openModal, closeModal } from "./components/modal.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import {
  getInitialCards,
  getUserInfo,
  addCard,
  deleteCardApi,
  likeCard,
  unlikeCard,
  updateUserProfile,
  updateUserAvatar,
} from "./components/api.js";

const nameElement = document.querySelector(".profile__title");
const jobElement = document.querySelector(".profile__description");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupsClose = document.querySelectorAll(".popup__close");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const editProfileForm = document.querySelector(".popup__form_type_edit");
const nameInput = editProfileForm.querySelector(".popup__input_type_name");
const jobInput = editProfileForm.querySelector(
  ".popup__input_type_description"
);
const addCardForm = popupTypeNewCard.querySelector(".popup__form");
const cardNameInput = addCardForm.querySelector(".popup__input_type_card-name");
const cardLinkInput = addCardForm.querySelector(".popup__input_type_url");
const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");
const popupTypeImage = document.querySelector(".popup_type_image");
const cardsContainer = document.querySelector(".places__list");
const avatarElement = document.querySelector(".profile__image");
const avatarEditButton = document.querySelector(".profile__image-button");
const popupUpdateAvatar = document.querySelector(".popup_type_update-avatar");
const avatarForm = popupUpdateAvatar.querySelector(
  ".popup__form_type_update-avatar"
);
const avatarUrlInput = avatarForm.querySelector(
  ".popup__input_type_avatar-url"
);

const validationSettings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

function renderLoading(button, isLoading, loadingText = 'Сохранение...', originalText = 'Сохранить') {
  if (isLoading) {
    button.textContent = loadingText;
    button.disabled = true;
  } else {
    button.textContent = originalText;
    button.disabled = false;
  }
}

function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();
  const submitButton = evt.submitter;
  renderLoading(submitButton, true);

  const newName = nameInput.value;
  const newJob = jobInput.value;

  updateUserProfile(newName, newJob)
    .then((updatedUser) => {
      updateUserInfo(updatedUser);
      closeModal(popupTypeEdit);
    })
    .catch((err) => console.error("Ошибка при обновлении профиля:", err))
    .finally(() => renderLoading(submitButton, false));
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const submitButton = evt.submitter;
  renderLoading(submitButton, true, 'Создание...', 'Создать');

  const cardName = cardNameInput.value;
  const cardLink = cardLinkInput.value;

  addCard(cardName, cardLink)
    .then((newCardData) => {
      const newCard = createCard(
        newCardData,
        handleDeleteCard,
        onImageClick,
        handleLikeClick,
        window.userId
      );
      cardsContainer.prepend(newCard);
      closeModal(popupTypeNewCard);
      evt.target.reset();
    })
    .catch((err) => console.error("Ошибка при добавлении карточки:", err))
    .finally(() => renderLoading(submitButton, false, 'Создание...', 'Создать'));
}

function onImageClick(cardData) {
  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  popupCaption.textContent = cardData.name;
  openModal(popupTypeImage);
}

function updateUserInfo(userData) {
  nameElement.textContent = userData.name;
  jobElement.textContent = userData.about;
  avatarElement.style.backgroundImage = `url(${userData.avatar})`;
}

function renderCards(cards) {
  cardsContainer.innerHTML = "";
  cards.forEach((cardData) => {
    const card = createCard(
      cardData,
      handleDeleteCard,
      onImageClick,
      handleLikeClick,
      window.userId
    );
    cardsContainer.append(card);
  });
}

function initialDataLoad() {
  Promise.all([getUserInfo(), getInitialCards()])
    .then(([userData, cards]) => {
      window.userId = userData._id;
      updateUserInfo(userData);
      renderCards(cards);
    })
    .catch((err) => {
      console.error("Ошибка при загрузке начальных данных:", err);
    });
}

function handleDeleteCard(cardElement, cardId) {
  deleteCardApi(cardId)
    .then(() => {
      deleteCard(cardElement);
    })
    .catch((err) => console.error("Ошибка при удалении карточки:", err));
}

function handleLikeClick(cardElement, cardId) {
  const likeButton = cardElement.querySelector(".card__like-button");
  const isLiked = likeButton.classList.contains("card__like-button_is-active");

  const likeAction = isLiked ? unlikeCard : likeCard;

  likeAction(cardId)
    .then((updatedCard) => {
      toggleLike(cardElement, updatedCard.likes);
    })
    .catch((err) => console.error("Ошибка при обновлении лайка:", err));
}

function handleAvatarUpdate(event) {
  event.preventDefault();
  const submitButton = event.submitter;
  renderLoading(submitButton, true);

  const avatarUrl = avatarUrlInput.value;
  updateUserAvatar(avatarUrl)
    .then((updatedUser) => {
      avatarElement.style.backgroundImage = `url(${updatedUser.avatar})`;
      closeModal(popupUpdateAvatar);
      event.target.reset();
    })
    .catch((error) => console.error("Ошибка при обновлении аватара:", error))
    .finally(() => renderLoading(submitButton, false));
}

document.addEventListener("DOMContentLoaded", () => {
  initialDataLoad();

  enableValidation(validationSettings);

  editProfileForm.addEventListener("submit", handleEditProfileFormSubmit);
  addCardForm.addEventListener("submit", handleAddCardSubmit);

  profileEditButton.addEventListener("click", () => {
    nameInput.value = nameElement.textContent;
    jobInput.value = jobElement.textContent;
    clearValidation(editProfileForm, validationSettings);
    openModal(popupTypeEdit);
  });

  profileAddButton.addEventListener("click", () => {
    addCardForm.reset();
    clearValidation(addCardForm, validationSettings);
    openModal(popupTypeNewCard);
  });

  avatarEditButton.addEventListener("click", () => {
    avatarForm.reset();
    clearValidation(avatarForm, validationSettings);
    openModal(popupUpdateAvatar);
  });

  avatarForm.addEventListener("submit", handleAvatarUpdate);

  popupsClose.forEach((button) => {
    button.addEventListener("click", () => {
      const popup = button.closest(".popup");
      closeModal(popup);
    });
  });
});
