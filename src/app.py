import base64
import io
from flask import Flask, request, jsonify, send_file
import cv2
import os
import re
from PIL import Image
from deepface import DeepFace

app = Flask(__name__)
db_parent_folder = os.path.join("..", "..")
original_folder = os.getcwd()


@app.route("/upload", methods=["POST"])
def upload_image():
    try:
        if "image" not in request.files:
            raise Exception("No image passed")

        image = request.files["image"]
        if image.filename == "":
            raise Exception("No image selected")

        os.makedirs("uploads", exist_ok=True)
        # Save the image to a folder or process it as needed

        # if filename already exists, add a suffix to the filename
        save_dir = "uploads"
        i = 1
        filename = ".".join(image.filename.split(".")[:-1])
        extension = image.filename.split(".")[-1]
        while True:
            save_path = os.path.join(
                save_dir, f"{filename}{f'_{i}' if i > 1 else ''}.{extension}"
            )
            if os.path.exists(save_path):
                i += 1
            else:
                break
        image.save(save_path)
        
        img = cv2.imread(save_path)
        if img.shape[1] > 1920: img = resize_image(img, new_width=1920)
        os.chdir(db_parent_folder)
        img, labels = label_faces(img)
        os.chdir(original_folder)

        # save the labeled img
        labeled_save_path = ".".join(save_path.split(".")[:-1]) + "_labeled." + extension
        cv2.imwrite(labeled_save_path, img)

        with open(labeled_save_path, "rb") as f:
            img_bytes = f.read()

        # # Convert NumPy array to PIL image
        # img_pil = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        # img_pil = Image.fromarray(img_pil)
        # # img_pil = Image.open(io.BytesIO(img))

        # # Convert PIL image to PNG bytes
        # img_bytes = io.BytesIO()
        # img_pil.save(img_bytes, format=f"{extension.upper()}")
        # img_bytes.seek(0)

        # Encode the image bytes to base64
        image_base64 = base64.b64encode(img_bytes).decode('utf-8')

        # return send_file(img_bytes, mimetype=f"image/{extension}")
        return jsonify(
            {
                "message": "success",
                "labels": list(labels),
                "image": image_base64,
            }
        )
    except Exception as e:
        return jsonify({"message": "failed", "details": str(e)})


def label_faces(image):
    tmpImage = image.copy()

    # Convert the image to grayscale (face detection works on grayscale images)
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # Load the pre-trained face detection classifier
    face_cascade = cv2.CascadeClassifier(
        cv2.data.haarcascades + "haarcascade_frontalface_default.xml"
    )

    # Detect faces in the image
    faces = face_cascade.detectMultiScale(
        gray, scaleFactor=1.1, minNeighbors=5, minSize=(20, 20)
    )

    # Draw rectangles around the detected faces
    # print("faces:", faces)
    peopleFound = set()
    for x, y, w, h in faces:
        personImage = image[y : y + h, x : x + w].copy()
        dfs = DeepFace.find(
            img_path=personImage,
            db_path="class_db2",
            silent=True,
            enforce_detection=False,
        )

        personPredictions = dfs[0]["identity"]
        notPredicted = personPredictions.shape[0] == 0
        if notPredicted:
            personName = "Unknown"
        else:
            personName = re.split(r"[\\.]", dfs[0]["identity"][0])[1]
        peopleFound.add(personName)

        """ Uncomment this block to display each face 1-by-1 and its closest match"""
        # personImage = cv2.putText(
        #     personImage,
        #     personName,
        #     (10, personImage.shape[0] - 10),
        #     cv2.FONT_HERSHEY_SIMPLEX,
        #     1,
        #     (255,255,255),
        #     4,
        #     cv2.LINE_AA,
        # )

        # cv2.imshow(personName, resize_image(personImage, new_height=300))
        # if not notPredicted: cv2.imshow("our find", resize_image(cv2.imread(dfs[0]["identity"][0]), new_height=300))
        # print(dfs[0][["identity","distance"]].head())
        # cv2.waitKey(0)
        # cv2.destroyAllWindows()

        cv2.rectangle(tmpImage, (x, y), (x + w, y + h), (0, 255, 0), 2)

        # Display the face number
        cv2.putText(
            tmpImage,
            f"{personName}",
            (x, y - 10),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.9,
            (0, 255, 0),
            2,
        )
    return (tmpImage, peopleFound)


def resize_image(image, new_width=None, new_height=None):
    # Get the original dimensions
    (height, width) = image.shape[:2]

    # If new width and new height are not provided, return the original image
    if new_width is None and new_height is None:
        return image

    # If new width is provided, calculate the aspect ratio and resize the image
    if new_width is not None:
        ratio = new_width / float(width)
        new_height = int(height * ratio)
    # If new height is provided, calculate the aspect ratio and resize the image
    else:
        ratio = new_height / float(height)
        new_width = int(width * ratio)

    # Resize the image with the calculated dimensions
    resized_image = cv2.resize(
        image, (new_width, new_height), interpolation=cv2.INTER_AREA
    )
    return resized_image


if __name__ == "__main__":
    app.run(debug=False)
