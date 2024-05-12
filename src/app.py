from flask import Flask, request, jsonify
import os

app = Flask(__name__)

@app.route('/upload', methods=['POST'])
def upload_image():
    if 'image' not in request.files:
        return jsonify({'error': 'No file part'})
    
    image = request.files['image']
    if image.filename == '':
        return jsonify({'error': 'No selected file'})

    os.makedirs('uploads', exist_ok=True)
    # Save the image to a folder or process it as needed

    # if filename already exists, add a suffix to the filename
    save_dir = 'uploads'
    i = 1
    filename = '.'.join(image.filename.split('.')[:-1])
    extension = image.filename.split('.')[-1]
    while True:
        save_path = os.path.join(save_dir, f"{filename}{f'_{i}' if i > 1 else ''}.{extension}")
        if os.path.exists(save_path):
            i += 1
        else:
            break
    image.save(save_path)
    print(save_path)
    return jsonify({'success': 'Image uploaded successfully'})

if __name__ == '__main__':
    app.run(debug=True)
