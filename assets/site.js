document.addEventListener('DOMContentLoaded', function(){

  // navbar scroll
  const navbar = document.getElementById('navbar');
  if(navbar){
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    });
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }

  // mobile menu
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const closeMobile = document.getElementById('closeMobile');
  if(hamburgerBtn && mobileMenu){
    hamburgerBtn.addEventListener('click', () => mobileMenu.classList.add('open'));
    closeMobile.addEventListener('click', () => mobileMenu.classList.remove('open'));
    mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.remove('open')));
  }

  // hero slider (homepage only)
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('#heroDots span');
  if(slides.length){
    let current = 0;
    function showSlide(i){
      slides.forEach((s,idx)=>s.classList.toggle('active', idx===i));
      dots.forEach((d,idx)=>d.classList.toggle('active', idx===i));
      current = i;
    }
    dots.forEach(d => d.addEventListener('click', ()=> showSlide(parseInt(d.dataset.i))));
    setInterval(()=>{ showSlide((current+1)%slides.length); }, 6000);
  }

  // reveal on scroll
  const revealTargets = document.querySelectorAll('.info-card, .service-card, .contact-card, .fade-up');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, {threshold:0.12});
  revealTargets.forEach(el=>io.observe(el));

  // stagger cards
  document.querySelectorAll('.cards-grid .service-card').forEach((c,i)=>{ c.style.transitionDelay = (i%3)*0.08 + 's'; });
  document.querySelectorAll('.contact-grid .contact-card').forEach((c,i)=>{ c.style.transitionDelay = (i%3)*0.07 + 's'; });

  // count-up numbers
  const statNums = document.querySelectorAll('.stat-num');
  let counted = false;
  const infoCard = document.querySelector('.info-card');
  if(statNums.length && infoCard){
    const statIO = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting && !counted){
          counted = true;
          statNums.forEach(el=>{
            const target = parseInt(el.dataset.count, 10);
            const duration = 1200;
            const start = performance.now();
            function tick(now){
              const p = Math.min((now-start)/duration, 1);
              const eased = 1 - Math.pow(1-p, 3);
              const val = Math.floor(eased*target);
              el.textContent = val.toLocaleString('id-ID');
              if(p<1) requestAnimationFrame(tick);
              else el.textContent = target.toLocaleString('id-ID');
            }
            requestAnimationFrame(tick);
          });
        }
      });
    }, {threshold:0.4});
    statIO.observe(infoCard);
  }
});
