const AD_FORM = document.querySelector('.ad-form');
const FILE_CHOOSER_AVATAR = AD_FORM.querySelector('#avatar');
const FILE_CHOOSER_PLACE = AD_FORM.querySelector('#images');
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const PLACE_PREVIEW_BLOCK = AD_FORM.querySelector('.ad-form__photo');
const PLACE_PREVIEW = document.createElement('img');
PLACE_PREVIEW.width = 70;
PLACE_PREVIEW.height = 70;
PLACE_PREVIEW.alt = 'Фотография места';

FILE_CHOOSER_AVATAR.addEventListener('change', () => {
  const avatarPreviewDiv = AD_FORM.querySelector('.ad-form-header__preview');
  const avatarPreview = avatarPreviewDiv.querySelector('img');
  const file = FILE_CHOOSER_AVATAR.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });

  if (matches) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      avatarPreview.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
});

FILE_CHOOSER_PLACE.addEventListener('change', () => {

  PLACE_PREVIEW_BLOCK.appendChild(PLACE_PREVIEW);
  const file = FILE_CHOOSER_PLACE.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });
  if (matches) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      PLACE_PREVIEW.src = reader.result;
    });
    reader.readAsDataURL(file);
  }
});
