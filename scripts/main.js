// main.js — тема, модалки, формы, diary quick add
(function () {
  // THEME TOGGLE
  const themeToggles = document.querySelectorAll('.js-theme-toggle');
  const body = document.body;
  const saved = localStorage.getItem('site-theme');
  if (saved) body.classList.remove('theme--light'), body.classList.remove('theme--dark'), body.classList.add(saved);
  themeToggles.forEach(btn => btn.addEventListener('click', () => {
    if (body.classList.contains('theme--dark')) {
      body.classList.remove('theme--dark'); body.classList.add('theme--light'); localStorage.setItem('site-theme', 'theme--light');
    } else {
      body.classList.remove('theme--light'); body.classList.add('theme--dark'); localStorage.setItem('site-theme', 'theme--dark');
    }
  }));

  // PROJECT MODAL (projects.html)
  const projectModal = document.getElementById('projectModal');
  if (projectModal) {
    const grid = document.getElementById('projectsGrid');
    grid && grid.addEventListener('click', (e) => {
      const card = e.target.closest('.project-card');
      if (!card) return;
      const data = JSON.parse(card.getAttribute('data-project'));
      document.getElementById('modalTitle').textContent = data.title;
      document.getElementById('modalImg').src = data.img;
      document.getElementById('modalDesc').textContent = data.desc;
      document.getElementById('modalLive').href = data.live || '#';
      document.getElementById('modalRepo').href = data.repo || '#';
      projectModal.showModal();
    });

    projectModal.addEventListener('click', (ev) => {
      if (ev.target === projectModal) projectModal.close();
    });
  }

  // PROJECT FILTERS
  const filterBtns = document.querySelectorAll('.js-filter');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      const cards = document.querySelectorAll('.project-card');
      cards.forEach(c => {
        if (filter === 'all' || c.dataset.type === filter) c.style.display = '';
        else c.style.display = 'none';
      });
    });
  });

  // CONTACT FORM
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }
      const fd = new FormData(contactForm);
      const obj = Object.fromEntries(fd.entries());
      console.log('Contact form submitted:', obj);
      alert('Спасибо! Ваше сообщение принято.');
      contactForm.reset();
    });
  }

  // DIARY add entry
  const addBtn = document.querySelector('.js-add-entry');
  if (addBtn) {
    addBtn.addEventListener('click', () => {
      const text = prompt('Текст записи (например: "20 дек — Сделал X")');
      if (!text) return;
      const ul = document.getElementById('diaryList');
      const li = document.createElement('li');
      li.textContent = text;
      ul.prepend(li);
    });
  }
})();
