import axios from "axios";

export const uploadImage = async (imageFile) => {
    if (!imageFile) return "Image file is required";

    const formData = new FormData();
    formData.append("image", imageFile);

    try {
        const response = await axios.post('http://localhost:5000/image/upload', formData);
        console.log("Uploaded Image URL: ", response.data.url);
        return response.data.url;
    } catch (error) {
        console.error("Error uploading image:", error);
        return "";
    }
}