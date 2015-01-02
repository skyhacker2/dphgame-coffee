# 调停者类
class Mediator
    _name = "Mediator"

    constructor: (@name)->

    getName: ()->
        return null

    getListNotifications: ()->
        return []

    removeMediator: ()->

    handleNotification: (value)->