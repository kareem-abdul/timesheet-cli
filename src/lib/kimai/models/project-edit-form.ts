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
 * @interface ProjectEditForm
 */
export interface ProjectEditForm {
    /**
     * 
     * @type {string}
     * @memberof ProjectEditForm
     */
    'name': string;
    /**
     * 
     * @type {string}
     * @memberof ProjectEditForm
     */
    'comment'?: string;
    /**
     * 
     * @type {string}
     * @memberof ProjectEditForm
     */
    'orderNumber'?: string;
    /**
     * 
     * @type {string}
     * @memberof ProjectEditForm
     */
    'orderDate'?: string;
    /**
     * 
     * @type {string}
     * @memberof ProjectEditForm
     */
    'start'?: string;
    /**
     * 
     * @type {string}
     * @memberof ProjectEditForm
     */
    'end'?: string;
    /**
     * Customer ID
     * @type {number}
     * @memberof ProjectEditForm
     */
    'customer': number;
    /**
     * The hexadecimal color code (default: #d2d6de)
     * @type {string}
     * @memberof ProjectEditForm
     */
    'color'?: string;
    /**
     * 
     * @type {boolean}
     * @memberof ProjectEditForm
     */
    'visible'?: boolean;
}

