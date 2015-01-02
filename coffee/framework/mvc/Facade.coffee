# 外观模式
class Facade
    # 初始化
    @init: ()->
        @commandMap = {}
        @mediatorMap = {}
        @notifierMap = {}
        @notifier = new Notifier()
        cc.log "mvc framework init success!"

    # 注册command
    @registerCommand: (notifierName,command)->
        unless @commandMap[notifierName]
            @commandMap[notifierName] = new command()

    # 注册mediator
    @registerMediator: (mediator)->
        unless @mediatorMap[mediator.getName()]
            @mediatorMap[mediator.getName()] = mediator
            @notifier.addObserver mediator

    # 移除command
    @removeCommand: (notifierName)->
        @commandMap[notifierName] = null

    # 移除mediator
    @removeMediator: (notifierName)->
        mediator = @mediatorMap[notifierName]
        if mediator
            @notifier.removeObserver mediator
            mediator.removeMediator()
        @mediatorMap[notifierName] = null

    # command是否存在
    @hasCommand: (notifierName)->
        return @commandMap[notifierName] isnt null

    # mediator是否存在
    @hasMediator: (notifierName)->
        return @mediatorMap[notifierName] isnt null

    # 发送消息通知
    @sendNotification: (notifierName,body,type)->
        command = @commandMap[notifierName]
        if command
            notifitionBody =
                name: notifierName
                body: body
                type: type
            command.execute notifitionBody
        @notifier.handleNotification(notifierName, body, type)
        