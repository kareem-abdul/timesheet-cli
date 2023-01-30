/* tslint:disable */
/* eslint-disable */
/**
 * Kimai - API Docs
 * JSON API for the Kimai time-tracking software: [API documentation](https://www.kimai.org/documentation/rest-api.html), [Swagger definition file](doc.json) 
 *
 * The version of the OpenAPI document: 0.6
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


// May contain unused imports in some cases
// @ts-ignore
import { CustomerMeta } from './customer-meta';
// May contain unused imports in some cases
// @ts-ignore
import { Team } from './team';

/**
 * 
 * @export
 * @interface CustomerCollection
 */
export interface CustomerCollection {
    /**
     * 
     * @type {number}
     * @memberof CustomerCollection
     */
    'id'?: number;
    /**
     * 
     * @type {string}
     * @memberof CustomerCollection
     */
    'name': string;
    /**
     * 
     * @type {string}
     * @memberof CustomerCollection
     */
    'number'?: string;
    /**
     * 
     * @type {boolean}
     * @memberof CustomerCollection
     */
    'visible': boolean;
    /**
     * 
     * @type {string}
     * @memberof CustomerCollection
     */
    'currency': string;
    /**
     * All visible meta (custom) fields registered with this customer
     * @type {Array<CustomerMeta>}
     * @memberof CustomerCollection
     */
    'metaFields'?: Array<CustomerMeta>;
    /**
     * If no team is assigned, everyone can access the customer
     * @type {Array<Team>}
     * @memberof CustomerCollection
     */
    'teams'?: Array<Team>;
    /**
     * 
     * @type {string}
     * @memberof CustomerCollection
     */
    'color'?: string;
}

