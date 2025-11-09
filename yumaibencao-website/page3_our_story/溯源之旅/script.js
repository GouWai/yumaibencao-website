

// 点击Banner按钮滚动到【团队架构与成员】部分（id="team"）
function scrollToContent() {
  // 定位到id为"team"的元素（即团队架构部分）
  const targetElement = document.getElementById('team');
  if (targetElement) { // 确保元素存在，避免报错
    targetElement.scrollIntoView({
      behavior: 'smooth', // 平滑滚动（保留原有体验）
      block: 'start' // 滚动后让目标元素顶部对齐视口顶部（确保在可见区域顶部）
    });
  }
}

// 其他原有脚本（导航栏高亮、滚动动画、卡片悬浮）保持不变...
window.onload = function () {
  const links = document.querySelectorAll('.nav-links a');
  links.forEach(link => {
    if (link.href === window.location.href) {
      link.classList.add('active');
    }
  });
  initScrollAnimation();
  initCardHover(); // 若之前有卡片悬浮函数，需保留
}

// 绘制组织架构图
document.addEventListener('DOMContentLoaded', function () {
  const ctx = document.getElementById('orgChart').getContext('2d');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['总经理', '技术部', '市场销售部', '财务后勤部', '宣传部'],
      datasets: [{
        label: '团队成员数量',
        data: [1, 3, 3, 2, 1],
        backgroundColor: [
          '#D4B16A',
          '#2D5D2A',
          '#3E7A3A',
          '#50914B',
          '#62A85C'
        ],
        borderWidth: 0,
        borderRadius: 4
      }]
    },
    options: {
      indexAxis: 'y',
      scales: {
        x: {
          beginAtZero: true,
          ticks: {
            precision: 0
          }
        }
      },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              return `成员数量: ${context.raw}`;
            }
          }
        }
      }
    }
  });
});

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// 回到顶部按钮
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    backToTopButton.classList.remove('opacity-0', 'invisible');
    backToTopButton.classList.add('opacity-100', 'visible');
  } else {
    backToTopButton.classList.remove('opacity-100', 'visible');
    backToTopButton.classList.add('opacity-0', 'invisible');
  }
});

backToTopButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});