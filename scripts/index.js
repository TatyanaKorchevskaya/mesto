const profileInfoEditButton = document.querySelector(
  ".profile-info__edit-button"
);
const popupEdit = document.querySelector(".popup_edit-profile");
const buttonClosePopupEdit = popupEdit.querySelector(".popup__close");
const buttonSave = document.querySelector(".popup__submit");
const formElement = document.querySelector(".popup__form"); 
const nameInput = formElement.querySelector(".popup__input-name"); 
const jobInput = formElement.querySelector(".popup__input-job"); 
const profileName = document.querySelector(".profile-info__title");
const profileJob = document.querySelector(".profile-info__intro");

function togglePopup() {
  popupEdit.classList.toggle("popup_opened");
}
profileInfoEditButton.addEventListener("click", togglePopup);
buttonClosePopupEdit.addEventListener("click", togglePopup);

const submit = document.querySelector(".popup__form");

function handleFormSubmit(evt) {
  evt.preventDefault();
  togglePopup();
  profileName.textContent = `${nameInput.value}`;
  profileJob.textContent = `${jobInput.value}`;

}
submit.addEventListener("submit", handleFormSubmit);
