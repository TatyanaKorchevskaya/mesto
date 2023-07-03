const profileInfoEditButton = document.querySelector(
  '.profile-info__edit-button'
);
const popupEdit = document.querySelector('.popup');
const buttonClosePopupEdit = popupEdit.querySelector('.popup__close');
const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_job');
const profileName = document.querySelector('.profile-info__title');
const profileJob = document.querySelector('.profile-info__intro');

function togglePopup() {
  popupEdit.classList.toggle('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function closePopup() {
  popupEdit.classList.remove('popup_opened');
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup();
}
formElement.addEventListener('submit', handleFormSubmit);
profileInfoEditButton.addEventListener('click', togglePopup);
buttonClosePopupEdit.addEventListener('click', closePopup);
