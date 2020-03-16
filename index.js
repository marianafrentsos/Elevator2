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
      elevatorA.floor = reqFloor;
      elevatorA.direction = "up";
      elevatorB.direction = "idle";
      this.handleDisplay(displayAtext, reqFloor);
      displayBtext.classList.remove("active");
      this.panelButtonsDisplayA(reqFloor);
      alert(
        "Elevator A is going " +
          `${elevatorA.direction}` +
          " to floor " +
          `${reqFloor}`
      );
      return;
    }

    if (reqFloor < elevatorA.floor && distanceA <= distanceB) {
      elevatorA.floor = reqFloor;
      elevatorA.direction = "down";
      elevatorB.direction = "idle";
      this.handleDisplay(displayAtext, reqFloor);
      displayBtext.classList.remove("active");
      this.panelButtonsDisplayA(reqFloor);

      alert(
        "Elevator A is going " +
          `${elevatorA.direction}` +
          " to floor " +
          `${reqFloor}`
      );
      return;
    }

    if (reqFloor < elevatorB.floor && distanceA >= distanceB) {
      elevatorB.floor = reqFloor;
      elevatorB.direction = "down";
      elevatorA.direction = "idle";
      this.handleDisplay(displayBtext, reqFloor);
      displayAtext.classList.remove("active");
      this.panelButtonsDisplayB(reqFloor);

      alert(
        "Elevator B is going " +
          `${elevatorB.direction}` +
          " to floor " +
          `${reqFloor}`
      );
      return;
    }
    if (reqFloor > elevatorB.floor && distanceA >= distanceB) {
      elevatorB.floor = reqFloor;
      elevatorB.direction = "up";
      elevatorA.direction = "idle";
      this.handleDisplay(displayBtext, reqFloor);
      displayAtext.classList.remove("active");
      this.panelButtonsDisplayB(reqFloor);

      alert(
        "Elevator B is going " +
          `${elevatorB.direction}` +
          " to floor " +
          `${reqFloor}`
      );
      return;
    }

    this.handleDirectionDown();
    this.handleDirectionUp();
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
    buttonsB.forEach(button => {
      if (button.innerText == reqFloor) {
        button.classList.add("active");
      }
    });
  };
  panelButtonsDisplayA = reqFloor => {
    activeA[0].classList.remove("active");
    buttonsA.forEach(button => {
      if (button.innerText == reqFloor) {
        button.classList.add("active");
      }
    });
  };
}

elevatorA = new Lift(0, 0, "idle");
elevatorB = new Lift(6, 0, "idle");
