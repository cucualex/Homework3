class Backpack {
  constructor(capacity) {
    this.capacity = capacity;
  }

  pack(itemSize) {
    if (this.capacity[itemSize] > 0) {
      this.capacity[itemSize]--;
      return true;
    } else {
      return false;
    }
  }

  unpack(itemSize) {
    if (this.capacity[itemSize] < 2) {
      this.capacity[itemSize]++;
      return true;
    } else {
      return false;
    }
  }
}

class PackingService {
  constructor(backpackConfig) {
    this.backpack = new Backpack(backpackConfig);
    this.actions = [];
    this.itemCounter = 1;
  }

  processAction(actionType, itemSize) {
    if (actionType === "pack") {
      const result = this.backpack.pack(itemSize);
      if (result) {
        this.actions.push(this.itemCounter);
        this.itemCounter++;
      } else {
        this.actions.push(-1);
      }
    } else if (actionType === "unpack") {
      const result = this.backpack.unpack(itemSize);
      if (result) {
        this.actions.push(this.itemCounter - 1);
        this.itemCounter--;
      } else {
        this.actions.push(-2);
      }
    }
    this.updateActionLog();
  }

  updateActionLog() {
    const actionLog = document.getElementById("actionLog");
    actionLog.textContent = `Actions: [${this.actions.join(", ")}]`;
  }
}

const backpackConfig = {
  small: 8,
  medium: 4,
  big: 2,
};

const packingService = new PackingService(backpackConfig);

const inventoryButtons = document.querySelectorAll(".item-button");

inventoryButtons.forEach((button) => {
  button.addEventListener("click", handleClick);
});

function handleClick(e) {
  const dataSize = e.target.dataset.size;
  packingService.processAction("pack", dataSize);
}
