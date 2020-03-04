import { formatFileDetails } from "./utils/_file";
// import { filesService } from "./_files";

function createFilePreview(file) {
  const filePreviewTemplate = document.querySelector(
    "template.js-preview-item"
  );

  const filePreview = filePreviewTemplate.content.cloneNode(true);
  const filePreviewImage = filePreview.querySelector("img");

  const fileDetails = formatFileDetails(file);

  filePreviewImage.src = file.imageSrc;
  filePreview.children[0].dataset[
    "id"
  ] = `${fileDetails.name}-${fileDetails.size}`;
  filePreview.querySelector(".js-title").textContent = fileDetails.name;
  filePreview.querySelector(".js-size").textContent = fileDetails.size;
  filePreview.querySelector(".js-type").textContent = fileDetails.type;

  return filePreview;
}

function deleteFilePreview(id) {
  const elem: HTMLElement = document.querySelector(`[data-id='${id}']`);
  elem.remove();
}

function renderFilePreview(file: File) {
  const fileReader = new FileReader();
  fileReader.readAsDataURL(file);
  fileReader.onloadend = () => {
    const filePreview = createFilePreview({
      name: file.name,
      size: file.size,
      type: file.type,
      imageSrc: fileReader.result
    });
    document.querySelector(".js-preview").appendChild(filePreview);

    [...document.querySelectorAll(".js-preview-item-delete-btn")].forEach(
      deleteBtn => {
        deleteBtn.onclick = function(e) {
          const id = e.target.parentElement.dataset.id;
          deleteFilePreview(id);
        };
      }
    );
  };
}

export { createFilePreview, deleteFilePreview, renderFilePreview };
