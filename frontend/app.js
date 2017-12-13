const Axios = axios;
const baseURL = 'http://localhost:8080';

/* == Model == */
const model = {
  // model with default values
  amount: 0,
  sCurr: 'EUR',
  tCurr: 'USD',
  conversion: 0
};
/* =========== */

/* == Controller == */
const controller = {
  init: function () {
    model.amount = 0;
    model.sCurr = 'EUR';
    model.tCurr = 'USD';
    model.conversion = 0 + ' USD';
    formView.init();
  },

  /*
  re-renders all the view components, I could have opted for rendering only parts that changed
  compared to previous states, but the APP is simple and it's fine in my opinion to perform a complete re-render
   */
  render: function () {
    formView.render();
  },

  getAmount: function () {
    return model.amount;
  },

  getSourceCurr: function () {
    return model.sCurr;
  },

  getTargetCurr: function () {
    return model.tCurr;
  },

  getConversion: function () {
    return model.conversion;
  },

  setAmount: function (val) {
    model.amount = val;
  },

  setSourceCurr: function (val) {
    model.sCurr = val.toUpperCase().trim();
  },

  setTargetCurr: function (val) {
    model.tCurr = val.toUpperCase().trim();
  },

  setConversion: function (val) {
    model.conversion = `${val.toFixed(4)} ${this.getTargetCurr()}`;
  },

  setErrorMessage: function (val) {
    model.conversion = val;
  },

  fetchConversion: function () {
    const sCurr = controller.getSourceCurr();
    const tCurr = controller.getTargetCurr();
    const amount = controller.getAmount();
    Axios.get(`${baseURL}/convert?sCurr=${sCurr}&tCurr=${tCurr}&amount=${amount}`)
      .then((res) => {
        if (res.data > 0) {
          controller.setConversion(res.data);
        } else {
          controller.setConversion(0);
        }
        controller.render();
      })
      .catch(error => {
        // this happens when Amount field is empty
        if (error.message === 'Network Error') {
          controller.setErrorMessage('The backend is not responding');
        } else if (error.response) {
          controller.setConversion(0);
        }
        controller.render();
      });
  }
};
/* =========== */


/* == Views == */
const formView = {
  init: function () {
    this.amountViewObj = new amountView('amount', false);
    this.amountViewObj.init();
    this.sCurrViewObj = new currencyView('sCurr');
    this.sCurrViewObj.init();
    this.tCurrViewObj = new currencyView('tCurr');
    this.tCurrViewObj.init();
    this.convViewObj = new amountView('conversion', true);
    this.convViewObj.init();
  },

  render: function () {
    this.amountViewObj.render();
    this.sCurrViewObj.render();
    this.tCurrViewObj.render();
    this.convViewObj.render();
  }
};

const amountView = function (id, readonly) {
  const self = this;
  self.init = function () {
    self.amountElement = document.getElementById(id);
    if (readonly) {
      self.readonly = true;
      self.amountElement.setAttribute('readonly', 'true');
    } else {
      self.amountElement.addEventListener('input', function () {
        if (isNaN(this.value)) {
          self.amountElement.style.color = '#b7410e';
          self.amountElement.style.fontWeight = 'bold';
        } else if (this.value.trim().length > 0) {
          self.amountElement.style.color = '#3498db';
          self.amountElement.style.fontWeight = 'normal';
          controller.setAmount(this.value);
          controller.fetchConversion();
        } else {
          self.amountElement.style.color = '#3498db';
          self.amountElement.style.fontWeight = 'normal';
          controller.setAmount(0);
          controller.setConversion(0);
          controller.render();
        }
      });
    }
    self.render();
  };

  this.render = function () {
    if (this.readonly) {
      this.amountElement.value = controller.getConversion();
    }
  };
};

const currencyView = function (id) {
  this.init = function () {
    this.currencyViewElement = document.getElementById(id);
    this.currencyViewElement.addEventListener('input', function () {
      if (id === 'sCurr') {
        controller.setSourceCurr(this.value);
      }
      if (id === 'tCurr') {
        controller.setTargetCurr(this.value);
      }
      controller.fetchConversion();
      controller.render();
    });
  };

  this.render = function () {
    if (id === 'sCurr') {
      this.currencyViewElement.value = controller.getSourceCurr();
    }
    if (id === 'tCurr') {
      this.currencyViewElement.value = controller.getTargetCurr();
    }
  };
};
/* =========== */

controller.init();