import {OptionsBase} from "../OptionsBase";
import {ResponseBodyBase} from "../ResponseBodyBase";

export interface RemoveCustomerOptions extends OptionsBase  {
    /**
     * Идентификатор покупателя в системе Продавца
     */
    CustomerKey: string;
    /**
     * IP-адрес запроса
     */
    IP?: string;
}

export interface RemoveCustomerResponseBody extends ResponseBodyBase {
    /**
     * Платежный ключ, выдается Продавцу при заведении терминала
     */
    TerminalKey: string;
    /**
     * Идентификатор покупателя в системе Продавца
     */
    CustomerKey: string;
    /**
     * Успешность операции (true/false)
     */
    Success: boolean;
    /**
     * Код ошибки, «0» - если успешно
     */
    ErrorCode: string;
    /**
     * Краткое описание ошибки
     */
    Message?: string;
    /**
     * Подробное описание ошибки
     */
    Details?: string;
}