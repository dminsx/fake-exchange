<template>
  <div class="about-exchange-page">
    <div class="about-card">
      <h1 class="page-title">О биржевом симуляторе</h1>
      <p class="intro-text">
        Добро пожаловать в учебный тренажёр, который позволяет вам
        попрактиковаться в торговле акциями без риска потери реальных средств.
        Все котировки генерируются динамически, а интерфейс максимально
        приближен к реальным биржевым терминалам.
      </p>

      <div class="section">
        <h2 class="section-title">Правила торговли</h2>
        <ul class="rules-list">
          <li>Начальный баланс — <strong>$75 000</strong>.</li>
          <li>
            Доступны акции трёх компаний: <strong>AAPL</strong>,
            <strong>GOOG</strong>, <strong>TSLA</strong>.
          </li>
          <li>
            Цена обновляется <strong>каждую секунду</strong> с шагом до ±3%.
          </li>
          <li>Вы можете покупать и продавать акции в любое время.</li>
          <li>Комиссия за сделки <strong>отсутствует</strong>.</li>
          <li>
            Весь портфель и история операций хранятся локально (в памяти
            браузера).
          </li>
        </ul>
      </div>

      <div class="section">
        <h2 class="section-title">Часто задаваемые вопросы</h2>
        <div class="faq-item">
          <p class="faq-question">Как купить акцию?</p>
          <p class="faq-answer">
            Нажмите кнопку <strong>Buy</strong> напротив нужной акции, введите
            количество и подтвердите.
          </p>
        </div>
        <div class="faq-item">
          <p class="faq-question">Как продать акцию?</p>
          <p class="faq-answer">
            Перейдите в раздел <strong>Ваш портфель</strong>, нажмите
            <strong>Sell</strong>, укажите количество и подтвердите.
          </p>
        </div>
        <div class="faq-item">
          <p class="faq-question">Что такое P&L?</p>
          <p class="faq-answer">
            Это прибыль или убыток по текущей позиции относительно стоимости
            покупки.
          </p>
        </div>
      </div>

      <div class="version-info">Версия симулятора: <strong>1.0.0</strong></div>
    </div>
  </div>
</template>

<script setup>
// Никакой логики не требуется
</script>

<style scoped>
.about-exchange-page {
  max-width: 1200px;
  margin: 40px auto;
  padding: 0 24px;
}

.about-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 40px 32px;
}

.page-title {
  font-size: 28px;
  font-weight: 600;
  color: var(--text);
  margin-bottom: 16px;
}

.intro-text {
  font-size: 16px;
  line-height: 1.6;
  color: var(--text-secondary);
  margin-bottom: 32px;
}

.section {
  margin-bottom: 32px;
}

.section-title {
  font-size: 20px;
  font-weight: 600;
  color: var(--text);
  margin-bottom: 16px;
}

.rules-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.rules-list li {
  padding: 10px 16px;
  background: #151820;
  border-radius: 8px;

  color: var(--text-secondary);
}

.rules-list li strong {
  color: var(--text);
}

.faq-item {
  background: #151820;
  border-radius: 10px;
  padding: 16px 20px;
  margin-bottom: 12px;
}

.faq-question {
  font-weight: 600;
  color: var(--text);
  margin-bottom: 6px;
}

.faq-answer {
  color: var(--text-secondary);
  font-size: 14px;
  line-height: 1.5;
}

.contact-info p {
  margin: 4px 0;
  color: var(--text-secondary);
}

.contact-info a {
  color: var(--blue);
  text-decoration: none;
}
.contact-info a:hover {
  text-decoration: underline;
}

.version-info {
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid var(--border-light);
  color: var(--text-muted);
  font-size: 14px;
}

@media (max-width: 600px) {
  .about-card {
    padding: 24px 16px;
  }
  .page-title {
    font-size: 22px;
  }
}
</style>
