document.addEventListener('DOMContentLoaded', () => {
  // Находим все ротаторы на странице для независимой работы
  const rotators = document.querySelectorAll('.rotator');

  rotators.forEach((rotator) => {
    const cases = Array.from(rotator.querySelectorAll('.rotator__case'));
    
    // Функция для запуска бесконечной смены фраз с разной скоростью
    const tick = () => {
      // Ищем текущий активный элемент
      const activeIndex = cases.findIndex(item => item.classList.contains('rotator__case_active'));
      const currentCase = cases[activeIndex];

      // Убираем активность с текущего элемента
      currentCase.classList.remove('rotator__case_active');

      // Вычисляем индекс следующего элемента (если дошли до конца — возвращаемся к 0)
      const nextIndex = (activeIndex + 1) % cases.length;
      const nextCase = cases[nextIndex];

      // Активируем следующий элемент
      nextCase.classList.add('rotator__case_active');

      // Применяем цвет из data-color (если он задан)
      if (nextCase.dataset.color) {
        nextCase.style.color = nextCase.dataset.color;
      }

      // Считываем скорость из data-speed (по умолчанию 1000мс)
      const speed = parseInt(nextCase.dataset.speed) || 1000;

      // Рекурсивно вызываем setTimeout для бесконечного цикла с динамическим временем
      setTimeout(tick, speed);
    };

    // Устанавливаем цвет для самого первого (стартового) элемента
    const firstActive = rotator.querySelector('.rotator__case_active');
    if (firstActive && firstActive.dataset.color) {
      firstActive.style.color = firstActive.dataset.color;
    }

    // Запускаем ротатор. Время первой смены берем из стартового элемента или 1000мс по умолчанию
    const initialSpeed = firstActive ? (parseInt(firstActive.dataset.speed) || 1000) : 1000;
    setTimeout(tick, initialSpeed);
  });
});
