(function () {
    const cursor = document.querySelector(".sisf-js-cursor");
    if (!cursor) return;

    const follower = cursor.querySelector(".sisf-js-follower");

    let mouseX = 0;
    let mouseY = 0;

    let currentX = 0;
    let currentY = 0;

    let lastX = 0;
    let lastY = 0;

    let rotation = 0;

    cursor.classList.add("is-enabled");

    // track mouse
    document.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animate() {
        // smooth follow
        const dx = mouseX - currentX;
        const dy = mouseY - currentY;

        currentX += dx * 0.12;
        currentY += dy * 0.12;

        // calculate speed (for spin)
        const speed = Math.sqrt(
            (currentX - lastX) ** 2 + (currentY - lastY) ** 2
        );

        // increase rotation based on speed
        rotation += speed * 0.6;

        // apply transform (move + rotate)
        follower.style.transform =
            `translate(${currentX}px, ${currentY}px) rotate(${rotation}deg)`;

        lastX = currentX;
        lastY = currentY;

        requestAnimationFrame(animate);
    }

    animate();
})();