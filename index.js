import { combineLatest, fromEvent } from "rxjs";
import { map, filter } from "rxjs/operators";

// elements
const loanAmount = document.getElementById("loanAmount");
const interest = document.getElementById("interest");
const loanLength = document.querySelectorAll(".loanLength");
const expected = document.getElementById("expected");

// helpers
const createInputValueStreams = (elem) => {
  return fromEvent(elem, "input").pipe(
    map((event) => parseFloat(event.target.value))
  );
};

// streams
const interest$ = createInputValueStreams(interest);
const loanAmount$ = createInputValueStreams(loanAmount);
const loanLength$ = createInputValueStreams(loanLength);

combineLatest([interest$, loanAmount$, loanLength$])
  .pipe(
    map(([interest, loanAmount, loadLength]) => {
      return calculateMortgage(interest, loanAmount, loadLength);
    }),
    filter((amount) => !isNaN(amount))
  )
  .subscribe((amount) => {
    expected.innerHTML = amount;
  });

function calculateMortgage(interest, loanAmount, loanLength) {
  const calculatedInterest = interest / 1200;
  const total =
    (loanAmount * calculatedInterest) /
    (1 - Math.pow(1 / (1 + calculatedInterest), loanLength));

  return total.toFixed(2);
}
