// script.js

// ===== FAQ アコーディオン =====
document.querySelectorAll('.question').forEach(btn => {
  btn.addEventListener('click', function() {
    const answer = this.nextElementSibling;
    const isActive = answer.style.display === 'block';
    // すべて閉じる
    document.querySelectorAll('.answer').forEach(a => a.style.display = 'none');
    // クリックしたやつだけ開く
    if (!isActive) answer.style.display = 'block';
  });
});

// ===== モーダルウィンドウ =====
const modal = document.getElementById('modal');
const openBtn = document.getElementById('openModal');
const closeBtn = document.querySelector('.close');

openBtn.addEventListener('click', () => {
  modal.style.display = 'flex';
});
closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});
window.addEventListener('click', e => {
  if (e.target === modal) modal.style.display = 'none';
});

// ===== スライダー（横スクロール／ドラッグ対応） =====
const slider = document.querySelector('.slider');
let isDown = false, startX, scrollLeft;

slider.addEventListener('mousedown', e => {
  isDown = true;
  slider.classList.add('active');
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});
slider.addEventListener('mouseleave', () => {
  isDown = false;
  slider.classList.remove('active');
});
slider.addEventListener('mouseup', () => {
  isDown = false;
  slider.classList.remove('active');
});
slider.addEventListener('mousemove', e => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 1.5; // スクロール感度
  slider.scrollLeft = scrollLeft - walk;
});



// タッチ対応
slider.addEventListener('touchstart', e => {
  isDown = true;
  startX = e.touches[0].pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});
slider.addEventListener('touchend', () => {
  isDown = false;
});
slider.addEventListener('touchmove', e => {
  if (!isDown) return;
  const x = e.touches[0].pageX - slider.offsetLeft;
  const walk = (x - startX) * 1.5;
  slider.scrollLeft = scrollLeft - walk;
});

// ===== Stickyナビ（背景色変化） =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.style.background = '#ffe7ca';
    navbar.style.boxShadow = '0 2px 10px rgba(200,130,50,0.10)';
  } else {
    navbar.style.background = '#fff';
    navbar.style.boxShadow = '0 2px 6px rgba(0,0,0,0.03)';
  }
});

// ===== スクロールアニメーション（シンプルver.） =====
const animTargets = document.querySelectorAll('.feature-box, .slider img, .faq-item');
function animateOnScroll() {
  animTargets.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 60) {
      el.style.opacity = 1;
      el.style.transform = 'translateY(0)';
    }
  });
}
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', () => {
  animTargets.forEach(el => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(40px)';
    el.style.transition = 'opacity 0.7s, transform 0.7s';
  });
  animateOnScroll();
});
