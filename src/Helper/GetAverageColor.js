
function loadImage(link) {
    let image;
    const imageUrl = link;

    if (!imageUrl) {
        console.log("Please enter an image URL");
        return;
    }

    image = new Image();
    image.crossOrigin = "Anonymous";

    image.onload = function () {

    };

    image.onerror = function () {
        return "Error loading image";
    };

    image.src = imageUrl;
    return image
}

async function calculateAverageColor(link) {
    let image = loadImage(link);
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = image.width;
    canvas.height = image.height;
    context.drawImage(image, 0, 0);
    const imageData = context.getImageData(
        0,
        0,
        image.width,
        image.height
    ).data;
    const averageColor = calculateAverageColorFromImageData(imageData);
    return `rgba(${averageColor.red},${averageColor.green},${averageColor.blue})`;
}

function calculateAverageColorFromImageData(imageData) {
    let red = 0;
    let green = 0;
    let blue = 0;

    for (let i = 0; i < imageData.length; i += 4) {
        red += imageData[i];
        green += imageData[i + 1];
        blue += imageData[i + 2];
    }

    const totalPixels = imageData.length / 4; // Divide by 4 because each pixel has 4 channels (RGBA)
    const averageRed = Math.round(red / totalPixels);
    const averageGreen = Math.round(green / totalPixels);
    const averageBlue = Math.round(blue / totalPixels);

    return { red: averageRed, green: averageGreen, blue: averageBlue };
}

export default calculateAverageColor;