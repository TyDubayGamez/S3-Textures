document.addEventListener('DOMContentLoaded', () => {
    const textureElements = document.querySelectorAll('.tx');

    textureElements.forEach(el => {
        const hex = el.getAttribute('data-hex');
        if (!hex) return;

        const cleaned = hex.replace(/\s+/g, '').toLowerCase();
        if (!/^[0-9a-f]{16}$/.test(cleaned)) {
            console.warn(`Invalid hex: ${hex}`);
            el.textContent = hex; // fallback to text
            return;
        }

        const filename = `0x${cleaned}.png`;
        const labelText = `0x${cleaned}.psg`;  // <--- changed label text here

        const img = document.createElement('img');
        img.src = `../tx/${filename}`;
        img.alt = filename;
        img.className = 'texture-image';

        const wrapper = document.createElement('div');
        wrapper.className = 'texture-wrapper';

        const label = document.createElement('div');
        label.className = 'hex-label';
        label.textContent = labelText;

        img.onerror = () => {
            wrapper.innerHTML = '';
            wrapper.appendChild(label);
        };

        img.onload = () => {
            wrapper.appendChild(img);
            wrapper.appendChild(label);
        };

        el.replaceWith(wrapper);
    });
});
