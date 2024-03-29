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
 * @interface ActivityEditForm
 */
export interface ActivityEditForm {
    /**
     * 
     * @type {string}
     * @memberof ActivityEditForm
     */
    'name': string;
    /**
     * 
     * @type {string}
     * @memberof ActivityEditForm
     */
    'comment'?: string;
    /**
     * Project ID
     * @type {number}
     * @memberof ActivityEditForm
     */
    'project'?: number;
    /**
     * The hexadecimal color code (default: #d2d6de)
     * @type {string}
     * @memberof ActivityEditForm
     */
    'color'?: string;
    /**
     * 
     * @type {boolean}
     * @memberof ActivityEditForm
     */
    'visible'?: boolean;
}

