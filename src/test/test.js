var MyMediator, startTest,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Facade.init();

MyMediator = (function(_super) {
  __extends(MyMediator, _super);

  function MyMediator() {
    return MyMediator.__super__.constructor.apply(this, arguments);
  }

  MyMediator.prototype.getListNotifications = function() {
    return ["AppStart"];
  };

  MyMediator.prototype.getName = function() {
    return this.name;
  };

  return MyMediator;

})(Mediator);

startTest = function() {
  var myMediator;
  myMediator = new MyMediator('StartMediator');
  cc.log(myMediator.getName());
  return cc.log(myMediator.getListNotifications());
};
