document.getElementById('theme-toggle').addEventListener('click', function() {
    document.body.classList.toggle('coffee-theme');
    document.body.classList.toggle('dark-blue-theme');
});
console.log("Script loaded!");



document.querySelectorAll('.menu-item img').forEach(item => {
    item.addEventListener('click', event => {
        const imageSrc = event.target.src; 
        const modalImage = document.getElementById('modalImage');
        modalImage.src = imageSrc; 
        const modal = new bootstrap.Modal(document.getElementById('imageModal'));
        modal.show(); 
    });
});



