let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
    // clear any existing timers
    clearInterval(countdown);

    const now = Date.now();
    const then = now + seconds * 1000;
   //console.log({now, then});
    displayTimeLeft(seconds);
    displayEndtime(then);


   countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    // check to stop timer, no negative seconds!
    if(secondsLeft < 0) {
        clearInterval(countdown);
        return;
    }

    // display it
    displayTimeLeft(secondsLeft);
   }, 1000);
}

// main timer display
function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainSeconds = seconds % 60;
    const display = `${minutes}:${remainSeconds < 10 ? '0' : ''}${remainSeconds}`;
    document.title = display;
    timerDisplay.textContent = display;
}

// time to "be back"
function displayEndtime(timestamp) {
    const end = new Date(timestamp);
    const hour = end.getHours();
    const adjustHour = hour > 12 ? hour - 12 : hour;
    const minutes = end.getMinutes();
    endTime.textContent = `Be Back At ${adjustHour}:${minutes < 10 ? '0' : ''}${minutes}`;
};

// preset time buttons
function startTimer() {
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
};
buttons.forEach(button => button.addEventListener('click', startTimer));

// enter minutes manually
document.customForm.addEventListener('submit', function(e){
    e.preventDefault();
    const mins = this.minutes.value;
    timer(mins * 60);
    this.reset();
});