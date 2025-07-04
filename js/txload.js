document.addEventListener('DOMContentLoaded', () => {
    const textureElements = document.querySelectorAll('.tx');

    textureElements.forEach(el => {
        const hex = el.getAttribute('data-hex');
        if (!hex) return;

        const cleaned = hex.replace(/\s+/g, '').toLowerCase();
        if (!/^[0-9a-f]{16}$/.test(cleaned)) {
            console.warn(`Invalid hex: ${hex}`);
            return;
        }

        const filename = `0x${cleaned}.png`;
        const img = document.createElement('img');
        img.src = `tx/${filename}`;
        img.alt = filename;
        img.className = 'texture-image';

        // Clear the element content first
        el.textContent = '';

        // If image fails to load, restore original hex text
        img.onerror = () => {
            el.textContent = hex;
        };

        el.appendChild(img);
    });
});
