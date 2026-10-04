document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form');
  const progress = document.getElementById('progress');
  const url = 'https://students.netoservices.ru/nestjs-backend/upload';

  form.addEventListener('submit', (event) => {
    // 1. Отменяем стандартную отправку формы (чтобы страница не перезагружалась)
    event.preventDefault();

    // 2. Собираем данные из формы с помощью FormData
    const formData = new FormData(form);

    // 3. Создаем XMLHttpRequest
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url);

    // 4. Отслеживаем прогресс загрузки файла НА СЕРВЕР через xhr.upload
    xhr.upload.addEventListener('progress', (e) => {
      if (e.lengthComputable) {
        // Вычисляем долю загруженного файла (от 0.0 до 1.0)
        const percentComplete = e.loaded / e.total;
        progress.value = percentComplete;
      }
    });

    // 5. Обрабатываем успешное или ошибочное завершение запроса
    xhr.addEventListener('readystatechange', () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status >= 200 && xhr.status < 300) {
          alert('Файл успешно загружен!');
        } else {
          alert(`Ошибка загрузки. Статус сервера: ${xhr.status}`);
        }
        // Сбрасываем индикатор прогресса обратно в 0 после завершения
        progress.value = 0.0;
        // Очищаем форму
        form.reset();
      }
    });

    // 6. Отправляем данные формы
    xhr.send(formData);
  });
});
