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
import { Activity } from './activity';
// May contain unused imports in some cases
// @ts-ignore
import { Customer } from './customer';
// May contain unused imports in some cases
// @ts-ignore
import { Project } from './project';
// May contain unused imports in some cases
// @ts-ignore
import { TeamMember } from './team-member';
// May contain unused imports in some cases
// @ts-ignore
import { User } from './user';

/**
 * 
 * @export
 * @interface Team
 */
export interface Team {
    /**
     * 
     * @type {User}
     * @memberof Team
     */
    'teamlead'?: User;
    /**
     * 
     * @type {Array<User>}
     * @memberof Team
     */
    'users'?: Array<User>;
    /**
     * 
     * @type {number}
     * @memberof Team
     */
    'id'?: number;
    /**
     * 
     * @type {string}
     * @memberof Team
     */
    'name': string;
    /**
     * 
     * @type {Array<TeamMember>}
     * @memberof Team
     */
    'members'?: Array<TeamMember>;
    /**
     * 
     * @type {Array<Customer>}
     * @memberof Team
     */
    'customers'?: Array<Customer>;
    /**
     * 
     * @type {Array<Project>}
     * @memberof Team
     */
    'projects'?: Array<Project>;
    /**
     * 
     * @type {Array<Activity>}
     * @memberof Team
     */
    'activities'?: Array<Activity>;
    /**
     * 
     * @type {string}
     * @memberof Team
     */
    'color'?: string;
}

