export function openModal(element) {
    element.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeModalWithEsc);
    element.addEventListener('click', closeModalOverlay);
  }
  
  export function closeModal(element) {
    element.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeModalWithEsc);
    element.removeEventListener('click', closeModalOverlay);
  }
  
  function closeModalOverlay(evt) {
    if (evt.target.classList.contains('popup_is-opened')) {
      closeModal(evt.target);
    }
  }
  
  function closeModalWithEsc(evt) {
    if (evt.key === 'Escape') {
      const popupIsOpened = document.querySelector('.popup_is-opened');
      if (popupIsOpened) { // Проверка, существует ли открытый попап
        closeModal(popupIsOpened);
      }
    }
  }