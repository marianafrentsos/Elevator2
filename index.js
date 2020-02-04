let displayA = document.querySelectorAll(".groundLift");
let displayB = document.querySelectorAll(".topLift");
let pointDown = document.querySelectorAll(".fa-arrow-down");
let pointUp = document.querySelectorAll(".fa-arrow-up");
let displayAtext = document.getElementById("displayA");
let displayBtext = document.getElementById("displayB");

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

  handleShow = (display, currentFloor) => {
    display.innerText = "This elevator is at floor " + currentFloor;
  };

  handleArrows = reqFloor => {
    let distanceA = Math.abs(elevatorA.floor - reqFloor);
    let distanceB = Math.abs(elevatorB.floor - reqFloor);

    if (reqFloor > elevatorA.floor && distanceA <= distanceB) {
      elevatorA.floor = reqFloor;
      elevatorA.direction = "up";
      elevatorB.direction = "idle";
      this.handleShow(displayAtext, reqFloor);

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
      this.handleShow(displayAtext, reqFloor);

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
      this.handleShow(displayBtext, reqFloor);

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
      this.handleShow(displayBtext, reqFloor);

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
    let buttonsA = document.querySelectorAll(".pressA");
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
        this.handleShow(displayAtext, target);
        this.handleDirectionUp();
        this.handleDirectionDown();
        return (elevatorA.floor = target);
      });
    });
  };

  handlePanelB = target => {
    let buttonsB = document.querySelectorAll(".pressB");
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

        this.handleShow(displayBtext, target);
        this.handleDirectionUp();
        this.handleDirectionDown();

        return (elevatorB.floor = target);
      });
    });
  };

  handleDirectionDown = () => {
    pointDown.forEach(element => {
      if (elevatorA.direction === "down" || elevatorB.direction === "down") {
        element.style.background = "orange";
      } else {
        element.style.background = "none";
      }
    });
  };

  handleDirectionUp = () => {
    pointUp.forEach(element => {
      if (elevatorA.direction === "up" || elevatorB.direction === "up") {
        element.style.background = "orange";
      } else {
        element.style.background = "none";
      }
    });
  };
}
elevatorA = new Lift(0, 0, "idle");
elevatorB = new Lift(6, 0, "idle");
