Facade.init()
class MyMediator extends Mediator
    getListNotifications: ()->
        return [
            "AppStart"
        ]
    getName: ()->
        return @name

startTest = ()->
    myMediator = new MyMediator('StartMediator')
    cc.log myMediator.getName()
    cc.log myMediator.getListNotifications()
