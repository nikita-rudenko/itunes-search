const acc = document.getElementsByClassName('columns');
const icon = document.getElementById('icon');
let i;

for (i = 1; i < acc.length; i++) {
  acc[i].addEventListener('click', function() {
    this.classList.toggle('active');
    const panel = this.nextElementSibling;
    if (this.classList.contains('active')) {
      icon.innerHTML = '−';
    } else {
      icon.innerHTML = '+';
    }

    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + 'px';
    }
  });
}
