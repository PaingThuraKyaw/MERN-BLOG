import { useState, ChangeEvent } from "react";
import { ControllerRenderProps, FieldErrors } from "react-hook-form";
import { FormDataProp } from "../../type";
const FileProvider = ({
  field,
  errors,
}: {
  field: ControllerRenderProps<FormDataProp, "file">;
  errors: FieldErrors<FormDataProp>;
}) => {
  //useState
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    field.onChange({ target: { value: file, name: field.name } });
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    } else {
      setSelectedImage(null);
    }
  };

  const fileErrorMsg = errors.file?.message;

  return (
    <div className=" my-6">
      <label
        htmlFor="fileInput"
        className="cursor-pointer bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md transition duration-300 ease-in-out"
      >
        file choosen
      </label>
      <input
        type="file"
        id="fileInput"
        className="hidden"
        accept="image/*"
        onChange={handleImageChange}
        // {...register("file")}
      />
      {fileErrorMsg && <p className="py-1">{fileErrorMsg as string}</p>}

      {selectedImage && (
        <div className="pt-2">
          <img
            src={selectedImage}
            alt="Selected Image"
            className="max-w-sm max-h-40 mx-auto"
          />
        </div>
      )}
    </div>
  );
};

export default FileProvider;
