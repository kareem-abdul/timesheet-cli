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
import { ActivityMeta } from './activity-meta';
// May contain unused imports in some cases
// @ts-ignore
import { Team } from './team';

/**
 * 
 * @export
 * @interface ActivityEntity
 */
export interface ActivityEntity {
    /**
     * 
     * @type {string}
     * @memberof ActivityEntity
     */
    'parentTitle'?: string;
    /**
     * 
     * @type {number}
     * @memberof ActivityEntity
     */
    'project'?: number;
    /**
     * 
     * @type {number}
     * @memberof ActivityEntity
     */
    'id'?: number;
    /**
     * 
     * @type {string}
     * @memberof ActivityEntity
     */
    'name': string;
    /**
     * 
     * @type {string}
     * @memberof ActivityEntity
     */
    'comment'?: string;
    /**
     * 
     * @type {boolean}
     * @memberof ActivityEntity
     */
    'visible': boolean;
    /**
     * All visible meta (custom) fields registered with this activity
     * @type {Array<ActivityMeta>}
     * @memberof ActivityEntity
     */
    'metaFields'?: Array<ActivityMeta>;
    /**
     * If no team is assigned, everyone can access the activity
     * @type {Array<Team>}
     * @memberof ActivityEntity
     */
    'teams'?: Array<Team>;
    /**
     * 
     * @type {number}
     * @memberof ActivityEntity
     */
    'budget': number;
    /**
     * 
     * @type {number}
     * @memberof ActivityEntity
     */
    'timeBudget': number;
    /**
     * 
     * @type {string}
     * @memberof ActivityEntity
     */
    'budgetType'?: string;
    /**
     * 
     * @type {string}
     * @memberof ActivityEntity
     */
    'color'?: string;
}

