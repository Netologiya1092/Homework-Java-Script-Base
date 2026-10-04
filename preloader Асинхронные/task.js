document.addEventListener('DOMContentLoaded', () => {
  const loader = document.getElementById('loader');
  const itemsContainer = document.getElementById('items');
  const url = 'https://students.netoservices.ru/nestjs-backend/slow-get-courses';

  // Функция для отрисовки валют в HTML-структуру
  const renderCourses = (valuteData) => {
    // Очищаем контейнер перед новой вставкой
    itemsContainer.innerHTML = '';

    // Перебираем объект с валютами
    Object.values(valuteData).forEach((currency) => {
      const itemHtml = `
        <div class="item">
          <div class="item__code">${currency.CharCode}</div>
          <div class="item__value">${currency.Value}</div>
          <div class="item__currency">руб.</div>
        </div>
      `;
      itemsContainer.insertAdjacentHTML('beforeend', itemHtml);
    });
  };

  // Повышенный уровень сложности: проверяем наличие сохраненного кэша
  const cachedData = localStorage.getItem('cached_valute');
  if (cachedData) {
    try {
      const parsedData = JSON.parse(cachedData);
      renderCourses(parsedData);
      // Сразу убираем лоадер, так как старые данные уже отобразились на экране
      loader.classList.remove('loader_active');
    } catch (e) {
      console.error('Ошибка чтения кэша:', e);
    }
  }

  // Создаем классический асинхронный запрос XMLHttpRequest
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.responseType = 'json'; // Указываем, что ждем JSON-формат

  // Навешиваем обработчик события окончания загрузки
  xhr.addEventListener('readystatechange', () => {
    // Ждем, пока запрос полностью завершится (DONE = 4)
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status >= 200 && xhr.status < 300) {
        // Защита структуры: ищем объект Valute в ответе
        const valute = xhr.response && xhr.response.response && xhr.response.response.Valute;

        if (valute) {
          // Выводим актуальные курсы на страницу
          renderCourses(valute);
          // Перезаписываем кэш в localStorage свежими данными
          localStorage.setItem('cached_valute', JSON.stringify(valute));
        }
      } else {
        console.error(`Ошибка выполнения запроса. Статус: ${xhr.status}`);
      }

      // Скрываем анимацию загрузки в любом случае (даже при ошибке)
      loader.classList.remove('loader_active');
    }
  });

  // Отправляем запрос на сервер
  xhr.send();
});
