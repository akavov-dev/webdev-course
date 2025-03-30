const primaryButtons = document.querySelectorAll('.button--primary');
primaryButtons.forEach(primaryButton => {
    primaryButton.addEventListener('click', () => location.href='/catalog.html');
});
