let pointDown = document.querySelectorAll(".fa-arrow-down");
let pointUp = document.querySelectorAll(".fa-arrow-up");
let displayAtext = document.getElementById("displayAFloor");
let displayBtext = document.getElementById("displayBFloor");
let activeA = document.getElementsByClassName("pressA active");
let buttonsA = document.querySelectorAll(".pressA");
let buttonsB = document.querySelectorAll(".pressB");
let activeB = document.getElementsByClassName("pressB active");

class Lift {
  constructor(floor, reqFloor, direction) {
    this.floor = floor;
    this.reqFloor = reqFloor;
    this.direction = direction;
    this.handlePanelA();
    this.handlePanelB();
    this.arrowDown();
    this.arrowUp();
  }

  handleDisplay = (display, currentFloor) => {
    display.innerText = currentFloor;
    display.classList.add("activeFloorDisplay");
  };

  handleArrows = reqFloor => {
    let distanceA = Math.abs(elevatorA.floor - reqFloor);
    let distanceB = Math.abs(elevatorB.floor - reqFloor);

    if (reqFloor > elevatorA.floor && distanceA <= distanceB) {
      elevatorA.direction = "up";
      elevatorB.direction = "idle";

      this.handleDirectionDown();
      this.handleDirectionUp();
      let countdown = setInterval(() => {
        if (elevatorA.floor > reqFloor) {
          elevatorA.floor = reqFloor;
          clearInterval(countdown);
        } else {
          this.panelButtonsDisplayA(elevatorA.floor);
          this.handleDisplay(displayAtext, elevatorA.floor);
          elevatorA.floor++;
        }
      }, 1000);
      return;
    }

    if (reqFloor < elevatorA.floor && distanceA <= distanceB) {
      elevatorA.direction = "down";
      elevatorB.direction = "idle";
      this.handleDirectionDown();
      this.handleDirectionUp();

      let countdown = setInterval(() => {
        if (elevatorA.floor === reqFloor) {
          elevatorA.floor = reqFloor;
          this.panelButtonsDisplayA(elevatorA.floor);
          this.handleDisplay(displayAtext, elevatorA.floor);
          clearInterval(countdown);
        } else {
          this.panelButtonsDisplayA(elevatorA.floor);
          this.handleDisplay(displayAtext, elevatorA.floor);
          elevatorA.floor--;
        }
      }, 1000);

      return;
    }

    if (reqFloor < elevatorB.floor && distanceA >= distanceB) {
      elevatorB.direction = "down";
      elevatorA.direction = "idle";

      let countdown = setInterval(() => {
        if (elevatorB.floor === reqFloor) {
          elevatorB.floor = reqFloor;
          this.panelButtonsDisplayB(elevatorB.floor);
          this.handleDisplay(displayBtext, elevatorB.floor);
          clearInterval(countdown);
        } else {
          this.panelButtonsDisplayB(elevatorB.floor);
          this.handleDisplay(displayBtext, elevatorB.floor);
          elevatorB.floor--;
        }
      }, 1000);

      return;
    }
    if (reqFloor > elevatorB.floor && distanceA >= distanceB) {
      elevatorB.direction = "up";
      elevatorA.direction = "idle";

      this.handleDirectionDown();
      this.handleDirectionUp();
      let countdown = setInterval(() => {
        if (elevatorB.floor > reqFloor) {
          elevatorB.floor = reqFloor;
          clearInterval(countdown);
        } else {
          this.panelButtonsDisplayB(elevatorB.floor);
          this.handleDisplay(displayBtext, elevatorB.floor);
          elevatorB.floor++;
        }
      }, 1000);
      return;
    }
  };

  arrowDown = reqFloor => {
    let arrowDown = document.querySelectorAll(".down");
    arrowDown.forEach(arrow => {
      arrow.addEventListener("click", () => {
        reqFloor = Number(arrow.value);
        this.handleArrows(reqFloor);
      });
    });
  };

  arrowUp = reqFloor => {
    let arrowUp = document.querySelectorAll(".up");
    arrowUp.forEach(arrow => {
      arrow.addEventListener("click", () => {
        reqFloor = Number(arrow.value);
        this.handleArrows(reqFloor);
      });
    });
  };

  handlePanelA = target => {
    buttonsA.forEach(btn => {
      btn.addEventListener("click", () => {
        target = btn.innerText;
        if (target > elevatorA.floor) {
          elevatorA.direction = "up";
          elevatorB.direction = "idle";
          elevatorA.floor = target;
          return;
        }

        if (target < elevatorA.floor) {
          elevatorA.direction = "down";
          elevatorB.direction = "idle";
          elevatorA.floor = target;
          return;
        }
        const handleClassActive = () => {
          activeA[0].classList.remove("active");
          btn.classList.add("active");
        };

        handleClassActive();
        this.handleDisplay(displayAtext, target);
        this.handleDirectionUp();
        this.handleDirectionDown();
      });
    });
  };

  handlePanelB = target => {
    buttonsB.forEach(btn => {
      btn.addEventListener("click", () => {
        target = btn.innerText;

        if (target > elevatorB.floor) {
          elevatorB.direction = "up";
          elevatorA.direction = "idle";
          elevatorB.floor = target;
          return;
        }

        if (target < elevatorB.floor) {
          elevatorB.direction = "down";
          elevatorA.direction = "idle";
          elevatorB.floor = target;
          return;
        }

        const handleClassActive = () => {
          activeB[0].classList.remove("active");
          btn.classList.add("active");
        };

        handleClassActive();
        this.handleDisplay(displayBtext, target);
        this.handleDirectionUp();
        this.handleDirectionDown();
      });
    });
  };

  handleDirectionDown = () => {
    pointDown.forEach(element => {
      if (elevatorA.direction === "down" || elevatorB.direction === "down") {
        element.classList.add("active");
      } else {
        element.classList.remove("active");
      }
    });
  };

  handleDirectionUp = () => {
    pointUp.forEach(element => {
      if (elevatorA.direction === "up" || elevatorB.direction === "up") {
        element.classList.add("active");
      } else {
        element.classList.remove("active");
      }
    });
  };

  panelButtonsDisplayB = reqFloor => {
    activeB[0].classList.remove("active");
    setTimeout(() => {
      buttonsB.forEach(button => {
        if (button.innerText == reqFloor) {
          button.classList.add("active");
        }
      });
    }, 0);
  };
  panelButtonsDisplayA = floor => {
    activeA[0].classList.remove("active");
    setTimeout(() => {
      buttonsA.forEach(button => {
        if (button.innerText == floor) {
          button.classList.add("active");
        }
      });
    }, 0);
  };
}

elevatorA = new Lift(0, 0, "idle");
elevatorB = new Lift(6, 0, "idle");
