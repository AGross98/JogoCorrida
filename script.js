document.addEventListener('DOMContentLoaded', function() {
  const cars = document.querySelectorAll('.car');
  const raceBtn = document.getElementById('raceBtn');
  const betAmountInput = document.getElementById('betAmount');
  const carSelect = document.getElementById('carSelect');
  const resultDiv = document.getElementById('result');
  const saldoDiv = document.getElementById('saldo');
  let raceInProgress = false;
  let saldo = 100;

  raceBtn.addEventListener('click', function() {
      if (!raceInProgress) {
          const betAmount = parseInt(betAmountInput.value);
          if (isNaN(betAmount) || betAmount < 5) {
              alert('Aposta inválida. O valor mínimo de aposta é 5.');
              return;
          }

          const selectedCar = carSelect.value;
          race(selectedCar, betAmount);
      }
  });

  function race(selectedCar, betAmount) {
      raceInProgress = true;
      const raceDistance = 450; // Distância da pista
      const speeds = [3, 4, 5]; // Velocidades dos carros (em pixels por movimento)

      cars.forEach(car => {
          car.style.left = '0px'; // Resetar a posição dos carros
      });

      const raceInterval = setInterval(() => {
          cars.forEach((car, index) => {
              const randomSpeed = speeds[Math.floor(Math.random() * speeds.length)];
              const currentPosition = parseInt(car.style.left) || 0;
              const newPosition = currentPosition + randomSpeed;

              car.style.left = newPosition + 'px';

              if (newPosition >= raceDistance) {
                  clearInterval(raceInterval);
                  raceInProgress = false;
                  if (car.id === selectedCar) {
                      saldo += betAmount;
                      resultDiv.textContent = `Parabéns! Seu carro ganhou! Você ganhou ${betAmount} dinheiros.`;
                  } else {
                      saldo -= betAmount;
                      resultDiv.textContent = `Seu carro perdeu! Você perdeu ${betAmount} dinheiros.`;
                  }
                  saldoDiv.textContent = `Saldo: ${saldo} dinheiros.`;
                  if (saldo <= 0) {
                      alert("Você ficou sem dinheiro! O jogo será reiniciado.");
                      saldo = 100;
                      saldoDiv.textContent = `Saldo: ${saldo} dinheiros.`;
                  }
              }
          });
      }, 50);
  }
});


/* document.addEventListener('DOMContentLoaded', function() {
  const cars = document.querySelectorAll('.car');
  const raceBtn = document.getElementById('raceBtn');
  const betAmountInput = document.getElementById('betAmount');
  const carSelect = document.getElementById('carSelect');
  const resultDiv = document.getElementById('result');
  const moneyDiv = document.getElementById('money');
  let raceInProgress = false;
  let money = 100;

  raceBtn.addEventListener('click', function() {
      if (!raceInProgress) {
          const betAmount = parseInt(betAmountInput.value);
          if (isNaN(betAmount) || betAmount < 5 || betAmount > money) {
              alert('Aposta inválida. O valor mínimo de aposta é 5 e você não pode apostar mais do que tem.');
              return;
          }

          const selectedCar = carSelect.value;
          race(selectedCar, betAmount);
      }
  });

  function race(selectedCar, betAmount) {
      raceInProgress = true;
      money -= betAmount;
      moneyDiv.textContent = `Dinheiro: ${money}`;

      const raceDistance = 550; // Distância da pista
      const speeds = [3, 4, 5]; // Velocidades dos carros (em pixels por movimento)

      const raceInterval = setInterval(() => {
          cars.forEach((car, index) => {
              const randomSpeed = speeds[Math.floor(Math.random() * speeds.length)];
              const currentPosition = parseInt(car.style.left) || 0;
              const newPosition = currentPosition + randomSpeed;

              car.style.left = newPosition + 'px';

              if (newPosition >= raceDistance) {
                  clearInterval(raceInterval);
                  raceInProgress = false;
                  if (car.id === selectedCar) {
                      money += betAmount * 2;
                      resultDiv.textContent = `Parabéns! Seu carro ganhou! Você ganhou ${betAmount * 2} dinheiros.`;
                  } else {
                      resultDiv.textContent = `Seu carro perdeu! Você perdeu ${betAmount} dinheiros.`;
                  }
                  moneyDiv.textContent = `Dinheiro: ${money}`;
              }
          });
      }, 50);
  }
});
 */