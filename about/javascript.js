const loadImage = (img) => {
  const url = img.getAttribute("lazy-src");
  const src = img.getAttribute("src");
  if (src) {
    return;
  }
  img.setAttribute('src', url);
  img.removeAttribute('lazy-src');
};

const loadSection = (section) => {
  section.classList.add('active');
  section.removeAttribute('section-load');
};

const lazyLoadImage = () => {
  let lazyImage = document.querySelectorAll("[lazy-src]");

  let observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        loadImage(entry.target);
      }
    });
  });

  lazyImage.forEach(img => {
    observer.observe(img);
  })
};

const lazySection = () => {
  let sectionTest = document.querySelectorAll('[section-load]');

  let observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        loadSection(entry.target);
      }
    });
  });

  sectionTest.forEach(section => {
    observer.observe(section)
  });
};

const ready = () => {
  if ("IntersectionObserver" in window) {
    lazyLoadImage();
    lazySection();
  }
};

document.addEventListener("DOMContentLoaded", ready);
