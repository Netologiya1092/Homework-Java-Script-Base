document.addEventListener('DOMContentLoaded', () => {
  const pollTitle = document.getElementById('poll__title');
  const pollAnswers = document.getElementById('poll__answers');
  const url = 'https://students.netoservices.ru/nestjs-backend/poll';

  // 1. Создаем GET-запрос для получения случайного опроса
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.responseType = 'json';

  xhr.addEventListener('readystatechange', () => {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      const pollId = xhr.response.id;
      const title = xhr.response.data.title;
      const answers = xhr.response.data.answers;

      // Отображаем заголовок опроса
      pollTitle.textContent = title;
      pollAnswers.innerHTML = '';

      // Создаем кнопки для каждого ответа
      answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.className = 'poll__answer';
        button.textContent = answer;

        // Навешиваем событие клика на кнопку ответа
        button.addEventListener('click', () => {
          // Выводим обязательное диалоговое окно
          alert('Спасибо, ваш голос засчитан!');

          // 2. Повышенный уровень: отправляем POST-запрос с результатами
          const postXhr = new XMLHttpRequest();
          postXhr.open('POST', url);
          postXhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
          postXhr.responseType = 'json';

          postXhr.addEventListener('readystatechange', () => {
            if (postXhr.readyState === XMLHttpRequest.DONE && (postXhr.status === 200 || postXhr.status === 201)) {
              const stat = postXhr.response.stat;
              pollAnswers.innerHTML = ''; // Очищаем контейнер от кнопок

              // Считаем сумму всех голосов для вычисления процентов
              const totalVotes = stat.reduce((sum, item) => sum + item.votes, 0);

              // Выводим результаты на страницу
              stat.forEach((item) => {
                const percent = totalVotes > 0 ? ((item.votes / totalVotes) * 100).toFixed(2) : 0;
                
                const resultRow = document.createElement('div');
                resultRow.style.margin = '10px 0';
                resultRow.innerHTML = `<strong>${item.answer}:</strong> ${percent}% (${item.votes} голосов)`;
                
                pollAnswers.appendChild(resultRow);
              });
            }
          });

          // Отправляем ID опроса и индекс выбранного ответа
          postXhr.send(`vote=${pollId}&answer=${index}`);
        });

        pollAnswers.appendChild(button);
      });
    }
  });

  xhr.send();
});
