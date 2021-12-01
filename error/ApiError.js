class ApiError extends Error {

    constructor(status, message) { //статус код и сообщение, которое будет возвращаться на клиент
        super(); //родительский конструктор
        this.status = status
        this.message = message
    }

    static badReauest(message) {
        return new ApiError(404, message) // 404 «не найдено»
    }

    static internal(message) {
        return new ApiError(500, message) // 500 «внутренняя ошибка сервера»
    }

    static farbidden(message) {
        return new ApiError(403, message) // 403 «запрещено»
    }

}

module.exports = ApiError