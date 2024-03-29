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
import { ProjectMeta } from './project-meta';
// May contain unused imports in some cases
// @ts-ignore
import { Team } from './team';

/**
 * 
 * @export
 * @interface ProjectCollection
 */
export interface ProjectCollection {
    /**
     * 
     * @type {string}
     * @memberof ProjectCollection
     */
    'parentTitle'?: string;
    /**
     * 
     * @type {number}
     * @memberof ProjectCollection
     */
    'customer'?: number;
    /**
     * 
     * @type {number}
     * @memberof ProjectCollection
     */
    'id'?: number;
    /**
     * 
     * @type {string}
     * @memberof ProjectCollection
     */
    'name': string;
    /**
     * 
     * @type {string}
     * @memberof ProjectCollection
     */
    'start'?: string;
    /**
     * 
     * @type {string}
     * @memberof ProjectCollection
     */
    'end'?: string;
    /**
     * 
     * @type {boolean}
     * @memberof ProjectCollection
     */
    'visible': boolean;
    /**
     * All visible meta (custom) fields registered with this project
     * @type {Array<ProjectMeta>}
     * @memberof ProjectCollection
     */
    'metaFields'?: Array<ProjectMeta>;
    /**
     * If no team is assigned, everyone can access the project (also depends on the teams of the customer)
     * @type {Array<Team>}
     * @memberof ProjectCollection
     */
    'teams'?: Array<Team>;
    /**
     * 
     * @type {string}
     * @memberof ProjectCollection
     */
    'color'?: string;
}

