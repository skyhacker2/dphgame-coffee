# 通知者
class Notifier
    _name = "Notifier"

    constructor: ()->
        @container = {}

    # 添加一个观察者
    addObserver: (mediator)->
        array = mediator.getListNotifications()
        for v, key in array
            unless @container[v]
                @container[v] = []
            @container[v].push mediator

    # 删除一个观察者
    removeObserver: (mediator)->
        array = mediator.getListNotifications()
        for i in array
            if @container[i]
                for observer, index in @container[i]
                    if observer is mediator
                        @container[i].splice(index, 1)

    # 发送消息
    notiftyObservers: (notifierName,body,type)->
        observers = @container[notifierName]
        unless observers
            return
        notifitionBody = 
            name: notifierName
            body: body
            type: type

        for observer in observers
            observer.handleNotification(notifitionBody)