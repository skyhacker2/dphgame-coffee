var Command;

Command = (function() {
  var _name;

  _name = "Command";

  function Command() {}

  Command.prototype.execute = function(value) {};

  return Command;

})();

var Facade;

Facade = (function() {
  function Facade() {}

  Facade.init = function() {
    this.commandMap = {};
    this.mediatorMap = {};
    this.notifierMap = {};
    this.notifier = new Notifier();
    return cc.log("mvc framework init success!");
  };

  Facade.registerCommand = function(notifierName, command) {
    if (!this.commandMap[notifierName]) {
      return this.commandMap[notifierName] = new command();
    }
  };

  Facade.registerMediator = function(mediator) {
    if (!this.mediatorMap[mediator.getName()]) {
      this.mediatorMap[mediator.getName()] = mediator;
      return this.notifier.addObserver(mediator);
    }
  };

  Facade.removeCommand = function(notifierName) {
    return this.commandMap[notifierName] = null;
  };

  Facade.removeMediator = function(notifierName) {
    var mediator;
    mediator = this.mediatorMap[notifierName];
    if (mediator) {
      this.notifier.removeObserver(mediator);
      mediator.removeMediator();
    }
    return this.mediatorMap[notifierName] = null;
  };

  Facade.hasCommand = function(notifierName) {
    return this.commandMap[notifierName] !== null;
  };

  Facade.hasMediator = function(notifierName) {
    return this.mediatorMap[notifierName] !== null;
  };

  Facade.sendNotification = function(notifierName, body, type) {
    var command, notifitionBody;
    command = this.commandMap[notifierName];
    if (command) {
      notifitionBody = {
        name: notifierName,
        body: body,
        type: type
      };
      command.execute(notifitionBody);
    }
    return this.notifier.handleNotification(notifierName, body, type);
  };

  return Facade;

})();

var Mediator;

Mediator = (function() {
  var _name;

  _name = "Mediator";

  function Mediator(name) {
    this.name = name;
  }

  Mediator.prototype.getName = function() {
    return null;
  };

  Mediator.prototype.getListNotifications = function() {
    return [];
  };

  Mediator.prototype.removeMediator = function() {};

  Mediator.prototype.handleNotification = function(value) {};

  return Mediator;

})();

var Notifier;

Notifier = (function() {
  var _name;

  _name = "Notifier";

  function Notifier() {
    this.container = {};
  }

  Notifier.prototype.addObserver = function(mediator) {
    var array, key, v, _i, _len, _results;
    array = mediator.getListNotifications();
    _results = [];
    for (key = _i = 0, _len = array.length; _i < _len; key = ++_i) {
      v = array[key];
      if (!this.container[v]) {
        this.container[v] = [];
      }
      _results.push(this.container[v].push(mediator));
    }
    return _results;
  };

  Notifier.prototype.removeObserver = function(mediator) {
    var array, i, index, observer, _i, _len, _results;
    array = mediator.getListNotifications();
    _results = [];
    for (_i = 0, _len = array.length; _i < _len; _i++) {
      i = array[_i];
      if (this.container[i]) {
        _results.push((function() {
          var _j, _len1, _ref, _results1;
          _ref = this.container[i];
          _results1 = [];
          for (index = _j = 0, _len1 = _ref.length; _j < _len1; index = ++_j) {
            observer = _ref[index];
            if (observer === mediator) {
              _results1.push(this.container[i].splice(index, 1));
            } else {
              _results1.push(void 0);
            }
          }
          return _results1;
        }).call(this));
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  Notifier.prototype.notiftyObservers = function(notifierName, body, type) {
    var notifitionBody, observer, observers, _i, _len, _results;
    observers = this.container[notifierName];
    if (!observers) {
      return;
    }
    notifitionBody = {
      name: notifierName,
      body: body,
      type: type
    };
    _results = [];
    for (_i = 0, _len = observers.length; _i < _len; _i++) {
      observer = observers[_i];
      _results.push(observer.handleNotification(notifitionBody));
    }
    return _results;
  };

  return Notifier;

})();
