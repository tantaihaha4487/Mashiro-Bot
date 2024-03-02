const { createCanvas, loadImage } = require('@napi-rs/canvas');

/**
 * 
 * @param {string} avatarURL - User avatar url (user.displayAvatarURL())
 * @returns image buffer
 */
async function generateBanner(avatarURL) {
    try {

        // Load background image
        const bgImage = await loadImage('src/img/background.jpg');
        const bgWidth = bgImage.width;
        const bgHeight = bgImage.height;

        // Create canvas with same dimensions as background image
        const canvas = createCanvas(bgWidth, bgHeight);
        const ctx = canvas.getContext('2d');

        // Draw background image
        ctx.drawImage(bgImage, 0, 0, bgWidth, bgHeight);

        // Load user's display avatar
        const userAvatarURL = avatarURL.replace('.webp', '.png');
        const roundedImage = await loadImage(userAvatarURL);

        // Make rounded image bigger
        const enlargedWidth = roundedImage.width * 2; // Change the factor as needed
        const enlargedHeight = roundedImage.height * 2; // Change the factor as needed

        // Calculate position to center enlarged rounded image
        const centerX = (bgWidth - enlargedWidth) / 2;
        const centerY = (bgHeight - enlargedHeight) / 2;

        // Draw stroked circle around enlarged rounded image
        const radius = enlargedWidth / 2;
        const circleCenterX = centerX + radius;
        const circleCenterY = centerY + radius;
        ctx.save();
        ctx.beginPath();
        ctx.arc(circleCenterX, circleCenterY, radius, 0, Math.PI * 2);
        ctx.strokeStyle = 'white'; // Set stroke color
        ctx.lineWidth = 10; // Set stroke width
        ctx.stroke();
        ctx.closePath();
        ctx.clip();

        // Draw rounded image with enlarged size
        ctx.drawImage(roundedImage, centerX, centerY, enlargedWidth, enlargedHeight);
        ctx.restore();

        return canvas.encode('jpeg');
    } catch (error) {
        console.error('Error editing picture:', error);
        return Buffer.alloc(0); // Return an empty buffer
    }
}


module.exports = { generateBanner }