let pointDown = document.querySelectorAll(".fa-arrow-down");
let pointUp = document.querySelectorAll(".fa-arrow-up");
let displayAtext = document.getElementById("displayA");
let displayBtext = document.getElementById("displayB");
let activeA = document.getElementsByClassName("pressA active");
let buttonsA = document.querySelectorAll(".pressA");
let buttonsB = document.querySelectorAll(".pressB");
let activeB = document.getElementsByClassName("pressB active");
let alertText = document.getElementsByClassName("alertLift");

class Lift {
  constructor(floor, reqFloor, direction, target) {
    this.floor = floor;
    this.reqFloor = reqFloor;
    this.direction = direction;
    this.target = target;
    this.handlePanelA();
    this.handlePanelB();
    this.arrowDown();
    this.arrowUp();
  }

  handleDisplay = (display, currentFloor) => {
    display.innerText = "This elevator is on floor " + currentFloor;
    display.classList.add("active");
  };

  handleArrows = reqFloor => {
    let distanceA = Math.abs(elevatorA.floor - reqFloor);
    let distanceB = Math.abs(elevatorB.floor - reqFloor);

    if (reqFloor > elevatorA.floor && distanceA <= distanceB) {
      elevatorA.floor = reqFloor;
      elevatorA.direction = "up";
      elevatorB.direction = "idle";
      this.btnsDisplayA(reqFloor);
      this.handleDisplay(displayAtext, reqFloor);
      displayBtext.classList.remove("active");

      alert(
        "Elevator A is going " +
          `${elevatorA.direction}` +
          " to floor " +
          `${reqFloor}`
      );
      return;
    }

    if (reqFloor < elevatorA.floor && distanceA < distanceB) {
      elevatorA.floor = reqFloor;
      elevatorA.direction = "down";
      elevatorB.direction = "idle";
      this.btnsDisplayA(reqFloor);
      this.handleDisplay(displayAtext, reqFloor);
      displayBtext.classList.remove("active");

      alert(
        "Elevator A is going " +
          `${elevatorA.direction}` +
          " to floor " +
          `${reqFloor}`
      );
      return;
    }

    if (reqFloor < elevatorB.floor && distanceA > distanceB) {
      elevatorB.floor = reqFloor;
      elevatorB.direction = "down";
      elevatorA.direction = "idle";
      this.btnsDisplayB(reqFloor);

      this.handleDisplay(displayBtext, reqFloor);

      displayAtext.classList.remove("active");

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
      this.btnsDisplayB(reqFloor);
      this.handleDisplay(displayBtext, reqFloor);
      displayAtext.classList.remove("active");

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
        let activeA = document.getElementsByClassName("pressA active");

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
        this.handleDisplay(displayAtext, target);
        this.handleDirectionUp();
        this.handleDirectionDown();

        activeA[0].classList.remove("active");
        btn.classList.add("active");
      });
    });
  };

  handlePanelB = reqFloor => {
    buttonsB.forEach(btn => {
      btn.addEventListener("click", () => {
        reqFloor = Number(btn.innerText);

        if (reqFloor > elevatorB.floor) {
          elevatorB.direction = "up";
          elevatorA.direction = "idle";
          elevatorB.floor = reqFloor;

          return;
        }

        if (reqFloor < elevatorB.floor) {
          elevatorB.direction = "down";
          elevatorA.direction = "idle";
          elevatorB.floor = reqFloor;
          return;
        }

        activeB[0].classList.remove("active");
        btn.classList.add("active");

        this.handleDisplay(displayBtext, reqFloor);
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

  btnsDisplayA = reqFloor => {
    buttonsA.forEach(btn => {
      if (reqFloor == btn.innerText) {
        activeA[0].classList.remove("active");
        btn.classList.add("active");
      }
    });
  };

  btnsDisplayB = reqFloor => {
    buttonsB.forEach(btn => {
      if (reqFloor == btn.innerText) {
        activeB[0].classList.remove("active");
        btn.classList.add("active");
      }
    });
  };
}

elevatorA = new Lift(0, 0, "idle", 0);
elevatorB = new Lift(6, 0, "idle", 6);
