// 网页加载完成后执行
window.addEventListener('load', function() {
    // 页面加载动画
    document.body.classList.add('loaded');
    
    // 初始化滚动动画
    initScrollAnimations();
    
    // 初始化卡片交互
    initCardInteractions();
    
    // 初始化Banner按钮交互
    initBannerButton();
    
    // 初始化平滑滚动
    initSmoothScroll();
});

// 初始化滚动动画
function initScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    fadeElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(element);
    });
    
    // 特殊动画元素
    const specialElements = document.querySelectorAll('.highlight-item, .virtue-item, .medicine-card');
    
    const specialObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, Math.random() * 300);
                specialObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    specialElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        specialObserver.observe(element);
    });
    
    // 时间线动画
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 200);
                timelineObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        if (index % 2 === 0) {
            item.style.transform = 'translateX(-30px)';
        } else {
            item.style.transform = 'translateX(30px)';
        }
        item.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        timelineObserver.observe(item);
    });
}

// 初始化卡片交互
function initCardInteractions() {
    // 故事卡片交互
    const storyCards = document.querySelectorAll('.story-card');
    storyCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
            card.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.12)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.08)';
        });
    });
    
    // 药材卡片交互增强
    const medicineCards = document.querySelectorAll('.medicine-card');
    medicineCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.medicine-icon');
            icon.style.transform = 'scale(1.1) rotate(5deg)';
            icon.style.boxShadow = '0 6px 16px rgba(44, 110, 73, 0.4)';
        });
        
        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.medicine-icon');
            icon.style.transform = 'scale(1) rotate(0)';
            icon.style.boxShadow = '0 4px 12px rgba(44, 110, 73, 0.3)';
        });
    });
}

// 初始化Banner按钮交互
function initBannerButton() {
    const bannerBtn = document.querySelector('.banner-btn');
    if (bannerBtn) {
        bannerBtn.addEventListener('click', () => {
            bannerBtn.style.transform = 'scale(0.95) translateY(-1px)';
            setTimeout(() => {
                bannerBtn.style.transform = 'scale(1) translateY(-3px)';
                // 点击按钮后平滑滚动到内容区域
                document.querySelector('.container').scrollIntoView({ 
                    behavior: 'smooth' 
                });
            }, 100);
        });
    }
}

// 初始化平滑滚动
function initSmoothScroll() {
    // 为所有内部链接添加平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({ 
                    behavior: 'smooth' 
                });
            }
        });
    });
}

// 返回顶部按钮功能
function initBackToTop() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerText = '↑';
    backToTopBtn.id = 'backToTop';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #2c6e49, #3fa36b);
        color: white;
        border: none;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(44, 110, 73, 0.3);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    document.body.appendChild(backToTopBtn);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ 
            top: 0, 
            behavior: 'smooth' 
        });
    });
    
    backToTopBtn.addEventListener('mouseenter', () => {
        backToTopBtn.style.transform = 'translateY(-3px) scale(1.05)';
        backToTopBtn.style.boxShadow = '0 8px 20px rgba(44, 110, 73, 0.4)';
    });
    
    backToTopBtn.addEventListener('mouseleave', () => {
        backToTopBtn.style.transform = 'translateY(0) scale(1)';
        backToTopBtn.style.boxShadow = '0 4px 12px rgba(44, 110, 73, 0.3)';
    });
}

// 当页面完全加载后初始化返回顶部按钮
window.addEventListener('load', initBackToTop);

// 监听窗口大小变化，调整响应式布局
window.addEventListener('resize', function() {
    // 对于时间线在小屏幕上的调整
    if (window.innerWidth < 768) {
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach(item => {
            item.style.justifyContent = 'flex-start';
            const content = item.querySelector('.timeline-content');
            if (content) {
                content.style.marginLeft = '40px';
                content.style.textAlign = 'left';
                content.style.width = 'calc(100% - 60px)';
            }
        });
    }
});

// 图片懒加载
function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const image = entry.target;
                    image.src = image.dataset.src;
                    image.removeAttribute('data-src');
                    imageObserver.unobserve(image);
                }
            });
        });
        
        lazyImages.forEach(image => {
            imageObserver.observe(image);
        });
    } else {
        // 回退方案
        lazyImages.forEach(image => {
            image.src = image.dataset.src;
            image.removeAttribute('data-src');
        });
    }
};

// 初始化图片懒加载
window.addEventListener('load', initLazyLoading);