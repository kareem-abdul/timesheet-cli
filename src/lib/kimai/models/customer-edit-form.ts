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



/**
 * 
 * @export
 * @interface CustomerEditForm
 */
export interface CustomerEditForm {
    /**
     * 
     * @type {string}
     * @memberof CustomerEditForm
     */
    'name': string;
    /**
     * 
     * @type {string}
     * @memberof CustomerEditForm
     */
    'number'?: string;
    /**
     * 
     * @type {string}
     * @memberof CustomerEditForm
     */
    'comment'?: string;
    /**
     * 
     * @type {string}
     * @memberof CustomerEditForm
     */
    'company'?: string;
    /**
     * 
     * @type {string}
     * @memberof CustomerEditForm
     */
    'vatId'?: string;
    /**
     * 
     * @type {string}
     * @memberof CustomerEditForm
     */
    'contact'?: string;
    /**
     * 
     * @type {string}
     * @memberof CustomerEditForm
     */
    'address'?: string;
    /**
     * 
     * @type {string}
     * @memberof CustomerEditForm
     */
    'country': string;
    /**
     * 
     * @type {string}
     * @memberof CustomerEditForm
     */
    'currency': string;
    /**
     * 
     * @type {string}
     * @memberof CustomerEditForm
     */
    'phone'?: string;
    /**
     * 
     * @type {string}
     * @memberof CustomerEditForm
     */
    'fax'?: string;
    /**
     * 
     * @type {string}
     * @memberof CustomerEditForm
     */
    'mobile'?: string;
    /**
     * 
     * @type {string}
     * @memberof CustomerEditForm
     */
    'email'?: string;
    /**
     * 
     * @type {string}
     * @memberof CustomerEditForm
     */
    'homepage'?: string;
    /**
     * 
     * @type {string}
     * @memberof CustomerEditForm
     */
    'timezone': string;
    /**
     * The hexadecimal color code (default: #d2d6de)
     * @type {string}
     * @memberof CustomerEditForm
     */
    'color'?: string;
    /**
     * 
     * @type {boolean}
     * @memberof CustomerEditForm
     */
    'visible'?: boolean;
}

