document.addEventListener("DOMContentLoaded", function () {
  const skillData = {
    courses: [
      "🐋研究鯨魚（文獻）",
      "🎵聽音樂",
      "🗻爬山"
    ],
    skills: [
      { name: "觀察力", level: 80 },
      { name: "思辨", level: 75 },
      { name: "警惕", level: 85 }
    ]
  };

  // 定義圖片 URL
  let imageUrls = [
    "https://media.tenor.com/t0h41-pnWAoAAAAM/sousou-no-frieren-%E8%91%AC%E9%80%81%E7%9A%84%E8%8A%99%E8%8E%89%E8%93%AE.gif",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRANZd20LEIX4cuqPaq9A48hkPAXx0ZUFSS1A&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWDLwoI_q6V4cy2EuVir28NSLTTjq0cUBhRg&s"
  ];

  // 取得 #courses 和 #skills
  const coursesSection = document.getElementById("courses");
  const skillsSection = document.getElementById("skills");

  // 生成「日常興趣」HTML
  coursesSection.innerHTML = `
      <h4>興趣</h4>
      <ul>
        ${skillData.courses.map((course) => `<li class="course-item">${course}</li>`).join("")}
      </ul>
    `;

  // 生成「技能條」HTML
  skillsSection.innerHTML = `
      <h4>技能條</h4>
      ${skillData.skills
        .map(
          (skill) => `
        <div class="skill-bar">
          <label>${skill.name} <span class="percentage">0%</span></label>
          <div class="bar">
            <div class="level" data-level="${skill.level}" style="width: 0;"></div>
          </div>
        </div>
      `
        )
        .join("")}
    `;

  // **讓技能條動畫運行**
  function animateSkillBars() {
    document.querySelectorAll(".skill-bar").forEach(skillBar => {
      let levelBar = skillBar.querySelector(".level");
      let percentageLabel = skillBar.querySelector(".percentage");
      let targetPercentage = parseInt(levelBar.getAttribute("data-level"));
      let currentPercentage = 0;
      let increment = targetPercentage / 50;

      let interval = setInterval(() => {
        if (currentPercentage >= targetPercentage) {
          clearInterval(interval);
          percentageLabel.textContent = targetPercentage + "%";
        } else {
          currentPercentage += increment;
          levelBar.style.width = currentPercentage + "%";
          percentageLabel.textContent = Math.floor(currentPercentage) + "%";
        }
      }, 20);
    });
  }

  // **呼叫 animateSkillBars()**
  setTimeout(animateSkillBars, 500);

  // 取得 .square-image
  const squareImages = document.querySelectorAll(".square-image");

  // 初始化圖片背景
  function initializeImages() {
    squareImages.forEach((img, index) => {
      img.style.backgroundImage = `url('${imageUrls[index]}')`;
    });
  }

  // **鯨魚彈窗邏輯**
  const whaleModal = document.getElementById("whaleModal");
  const closeBtn = document.querySelector(".close");
  const whaleImage = whaleModal.querySelector('img');

  // 使用事件代理綁定點擊事件
  coursesSection.addEventListener("click", function (event) {
    if (event.target.tagName === "LI" && event.target.textContent.includes("研究鯨魚")) {
      whaleModal.style.display = "flex";
    }
  });

  // 關閉彈窗
  closeBtn.addEventListener("click", function () {
    whaleModal.style.display = "none";
  });

  window.addEventListener("click", function (event) {
    if (event.target === whaleModal) {
      whaleModal.style.display = "none";
    }
  });

  // 初始化圖片
  initializeImages();

  // 隨機排列圖片背景
  function shuffleImages() {
    let shuffledUrls = [...imageUrls].sort(() => Math.random() - 0.5);
    squareImages.forEach((img, index) => {
      img.style.backgroundImage = `url('${shuffledUrls[index]}')`;
    });
  }

  // 綁定點擊事件
  document.querySelector(".square-images").addEventListener("click", shuffleImages);
});