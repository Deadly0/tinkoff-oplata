import {OptionsBase} from "./OptionsBase";
import {ResponseBodyBase} from "./ResponseBodyBase";

export interface InitOptions extends OptionsBase {
    /**
     * Идентификатор терминала, выдается Продавцу Банком.
     * Max length: 20
     */
    TerminalKey: string;

    /**
     * Сумма в копейках.
     * Max length: 10
     */
    Amount: number;

    /**
     * Номер заказа в системе Продавца.
     * Max length: 50
     */
    OrderId: string;

    /**
     * IP-адрес клиента.
     * Max length: 40
     */
    IP?: string;

    /**
     * Краткое описание.
     * Max length: 250
     */
    Description?: string;

    /**
     * Код валюты ISO 4217 (например, 643). Если передан Currency, и он разрешен для Продавца, то транзакция будет инициирована в переданной валюте. Иначе будет использована валюта по умолчанию для данного терминала
     * Max length: 3
     */
    Currency: number;

    /**
     * Подпись запроса. Алгоритм формирования подписи описан в разделе "Подпись запросов"
     */
    Token: string;

    /**
     * Язык платежной формы. По умолчанию (если параметр не передан) - форма оплаты на русском языке.
     * ru - форма оплаты на русском языке;
     * en - форма оплаты на англифском языке.
     * Max length: 2
     */
    Language?: string;

    /**
     * Идентификатор покупателя в системе Продавца. Если передается, то для данного покупателя будет осуществлена привязка карты к данному идентификатору клиента CustomerKey. В нотификации на AUTHORIZED будет передан параметр CardId, подробнее см. метод GetGardList
     * Параметр обязателен, если Recurrent = Y
     * Max length: 36
     */
    CustomerKey?: string;

    /**
     * Если передается и установлен в Y, то регистрирует платеж как рекуррентный.
     * В этом случае после оплаты в нотификации на AUTHORIZED будет передан параметр RebillId для использования в методе Charge
     * Max length: 1
     */
    Recurrent?: string;

    /**
     * Cрок жизни ссылки. В случае, если текущая дата превышает дату переданную в данном параметре, ссылка для оплаты становится недоступной и платеж выполнить нельзя.
     *  Формат даты: YYYY-MM-DDTHH24:MI:SS+GMT
     *  Пример даты: 2016-08-31T12:28:00+03:00
     */
    RedirectDueDate?: Date;

    /**
     * Ключ=значение дополнительных параметров через “|”, например Email=a@test.ru|Phone=+71234567890.
     *
     * Если ключи или значения содержат в себе спец символы, то получившееся значение должно быть закодировано функцией urlencode.
     * При этом, обязательным является наличие дополнительного параметра Email. Прочие можно добавлять по желанию.
     * Данные параметры будут переданы на страницу оплаты (в случае ее кастомизации).
     * Максимальная длина для каждого передаваемого параметра: Ключ – 20 знаков, Значение – 100 знаков.
     * Максимальное количество пар «ключ-значение» не может превышать 20.
     * Пример передачи данных в параметре DATA: DATA=Phone=+71234567890|Email=a@test.com
     */
    DATA: string;
}

export interface InitResponseBody extends ResponseBodyBase {
    /**
     * Идентификатор терминала, выдается Продавцу Банком
     */
    TerminalKey: string;

    /**
     * Сумма в копейках
     */
    Amount: number;

    /**
     * Номер заказа в системе Продавца
     */
    OrderId: string;

    /**
     * Успешность операции
     */
    Success: boolean;

    /**
     * Статус транзакции:
     * - при успешном сценарии: NEW
     * - при неуспешном: REJECTED
     */
    Status: string;

    /**
     * Уникальный идентификатор транзакции в системе Банка
     */
    PaymentId: number;

    /**
     * Код ошибки, «0» - если успешно
     */
    ErrorCode: string;

    /**
     * Ссылка на страницу оплаты. По умолчанию ссылка доступна в течении 24 часов.
     */
    PaymentURL?: string;

    /**
     * Краткое описание ошибки
     */
    Message?: string;

    /**
     * Подробное описание ошибки
     */
    Details?: string;
}