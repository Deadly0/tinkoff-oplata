import crypto = require('crypto');
import Axios = require('axios');

import {CancelOptions, CancelResponseBody} from './api/Cancel';
import {ChargeOptions, ChargeResponseBody} from './api/Charge';
import {ConfirmOptions, ConfirmResponseBody} from './api/Confirm';
import {GetStateOptions, GetStateResponseBody} from './api/GetState';
import {FinishOptions, FinishResponseBody} from './api/Finish';
import {InitOptions, InitResponseBody} from './api/Init';

import {OptionsBase} from "./api/OptionsBase";
import {Notification} from "./api/Notification";
import {ResendResponseBody} from "./api/Resend";
import {AddCustomerOptions, AddCustomerResponseBody} from "./api/card/AddCustomer";
import {GetCustomerOptions, GetCustomerResponseBody} from "./api/card/GetCustomer";
import {RemoveCustomerOptions, RemoveCustomerResponseBody} from "./api/card/RemoveCustomer";
import {GetCardListOptions, GetCardListResponseBody} from "./api/card/GetCardList";
import {RemoveCardOptions, RemoveCardResponseBody} from "./api/card/RemoveCard";

const URLs = {
    INIT:               'Init',
    CONFIRM:            'Confirm',
    CHARGE:             'Charge',
    CANCEL:             'Cancel',
    GET_STATE:          'GetState',
    RESEND:             'Resend',
    FINISH:             'FinishAuthorize',

    ADD_CUSTOMER:       'AddCustomer',
    GET_CUSTOMER:       'GetCustomer',
    REMOVE_CUSTOMER:    'RemoveCustomer',
    GET_CARD_LIST:      'GetCardList',
    REMOVE_CARD:        'RemoveCard'
};

export interface TinkoffOptions {
    terminalKey: string;
    password: string;
}

const axios = Axios.default.create({
    baseURL: `https://securepay.tinkoff.ru/v2/`,
});

export class Tinkoff {
    private readonly terminalKey: string;
    private readonly password: string;

    constructor(options: TinkoffOptions) {
        this.terminalKey = options.terminalKey;
        this.password = options.password;
    }

    init(options: InitOptions) {
        return this.perform<InitResponseBody>(URLs.INIT, options);
    }

    confirm(options: ConfirmOptions) {
        return this.perform<ConfirmResponseBody>(URLs.CONFIRM, options);
    }

    charge(options: ChargeOptions) {
        return this.perform<ChargeResponseBody>(URLs.CHARGE, options);
    }

    cancel(options: CancelOptions) {
        return this.perform<CancelResponseBody>(URLs.CANCEL, options);
    }

    finish(options: FinishOptions) {
        return this.perform<FinishResponseBody>(URLs.FINISH, options);
    }

    getState(options: GetStateOptions) {
        return this.perform<GetStateResponseBody>(URLs.GET_STATE, options);
    }

    resend() {
        return this.perform<ResendResponseBody>(URLs.RESEND, {});
    }

    addCustomer(options: AddCustomerOptions) {
        return this.perform<AddCustomerResponseBody>(URLs.ADD_CUSTOMER, options);
    }

    getCustomer(options: GetCustomerOptions) {
        return this.perform<GetCustomerResponseBody>(URLs.GET_CUSTOMER, options);
    }

    removeCustomer(options: RemoveCustomerOptions) {
        return this.perform<RemoveCustomerResponseBody>(URLs.REMOVE_CUSTOMER, options);
    }

    getCardList(options: GetCardListOptions) {
        return this.perform<GetCardListResponseBody>(URLs.GET_CARD_LIST, options);
    }

    removeCard(options: RemoveCardOptions) {
        return this.perform<RemoveCardResponseBody>(URLs.REMOVE_CARD, options);
    }

    isTokenValid(data: Notification) {
        return data.Token === this.generateToken({...data, Password: this.password});
    }

    private generateToken(body: Object) {
        const request = {...body, Password: this.password};

        const values = Object.keys(request)
            .filter(k => !['DATA', 'Receipt', 'Token'].includes(k))
            .sort()
            .map((key) => request[key])
            .join('');

        return crypto.createHash('sha256').update(values).digest('hex');
    };

    private perform<T>(url: string, options: OptionsBase) {
        const request = {...options, TerminalKey: this.terminalKey};

        return axios.post<T>(url, {...request, Token: this.generateToken(request)});
    }
}
