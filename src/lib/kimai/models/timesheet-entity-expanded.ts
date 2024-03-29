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
import { ActivityExpanded } from './activity-expanded';
// May contain unused imports in some cases
// @ts-ignore
import { ProjectExpanded } from './project-expanded';
// May contain unused imports in some cases
// @ts-ignore
import { TimesheetMeta } from './timesheet-meta';

/**
 * 
 * @export
 * @interface TimesheetEntityExpanded
 */
export interface TimesheetEntityExpanded {
    /**
     * 
     * @type {number}
     * @memberof TimesheetEntityExpanded
     */
    'user'?: number;
    /**
     * 
     * @type {Array<string>}
     * @memberof TimesheetEntityExpanded
     */
    'tags'?: Array<string>;
    /**
     * 
     * @type {number}
     * @memberof TimesheetEntityExpanded
     */
    'id'?: number;
    /**
     * 
     * @type {string}
     * @memberof TimesheetEntityExpanded
     */
    'begin': string;
    /**
     * 
     * @type {string}
     * @memberof TimesheetEntityExpanded
     */
    'end'?: string;
    /**
     * 
     * @type {number}
     * @memberof TimesheetEntityExpanded
     */
    'duration'?: number;
    /**
     * 
     * @type {ActivityExpanded}
     * @memberof TimesheetEntityExpanded
     */
    'activity': ActivityExpanded;
    /**
     * 
     * @type {ProjectExpanded}
     * @memberof TimesheetEntityExpanded
     */
    'project': ProjectExpanded;
    /**
     * 
     * @type {string}
     * @memberof TimesheetEntityExpanded
     */
    'description'?: string;
    /**
     * 
     * @type {number}
     * @memberof TimesheetEntityExpanded
     */
    'rate'?: number;
    /**
     * 
     * @type {number}
     * @memberof TimesheetEntityExpanded
     */
    'internalRate'?: number;
    /**
     * 
     * @type {number}
     * @memberof TimesheetEntityExpanded
     */
    'fixedRate'?: number;
    /**
     * 
     * @type {number}
     * @memberof TimesheetEntityExpanded
     */
    'hourlyRate'?: number;
    /**
     * 
     * @type {boolean}
     * @memberof TimesheetEntityExpanded
     */
    'exported': boolean;
    /**
     * 
     * @type {boolean}
     * @memberof TimesheetEntityExpanded
     */
    'billable': boolean;
    /**
     * All visible meta (custom) fields registered with this timesheet
     * @type {Array<TimesheetMeta>}
     * @memberof TimesheetEntityExpanded
     */
    'metaFields'?: Array<TimesheetMeta>;
}

