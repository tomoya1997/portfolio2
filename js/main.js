document.addEventListener('DOMContentLoaded', function() {
    const toggle = document.getElementById('toggle');
    const resize = document.getElementById('resize');
    const closeBtn = document.querySelector('.close-btn');
    const resizeLinks = document.querySelectorAll('#resize ul li a');

    toggle.addEventListener('click', function() {
        this.classList.toggle('on');
        resize.classList.toggle('active');
    });

    resizeLinks.forEach(link => {
        link.addEventListener('click', function() {
            this.classList.toggle('on');
            resize.classList.toggle('active');
        });
    });

    closeBtn.addEventListener('click', function() {
        this.classList.toggle('on');
        resize.classList.toggle('active');
    });

    function animateElement(selector, delay, properties) {
        const element = document.querySelector(selector);
        if (element) {
            element.style.opacity = '0';
            element.style.transform = `translateY(${properties.y || 0}px)`;
            
            setTimeout(() => {
                element.style.transition = 'all 1s cubic-bezier(0.19, 1, 0.22, 1)';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0px)';
            }, delay * 1000);
        }
    }

    function animateStaggered(selector, delay, stagger) {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element, index) => {
            element.style.opacity = '0';
            setTimeout(() => {
                element.style.transition = 'all 1s cubic-bezier(0.19, 1, 0.22, 1)';
                element.style.opacity = '1';
            }, (delay + index * stagger) * 1000);
        });
    }

    animateElement('#brand', 0.4, { y: 10 });
    animateStaggered('#menu li a', 0.4, 0.1);

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.wow').forEach(element => {
        observer.observe(element);
    });
});
